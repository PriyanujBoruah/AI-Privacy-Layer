#!/usr/bin/env python3
"""
API Dataset Testing & Benchmarking Suite for AI Privacy Core
Runs live API tokenization and detokenization tests against prompts from
unified_prompts.parquet or individual test set files.

Outputs:
  1. Summary Report (JSON) with full statistics
  2. Parquet Dataset with columns:
     - prompt number (int64)
     - latency (double)
     - sanitized items type (list<string>)
     - sanitized items count (int32)
     - sanitized tokens (list<string>)
"""

import argparse
import asyncio
import json
import os
import random
import sys
import time
from collections import Counter
from typing import Dict, Any, List, Optional

import httpx
import pyarrow as pa
import pyarrow.parquet as pq
import pandas as pd

sys.stdout.reconfigure(encoding="utf-8")


PARQUET_OUTPUT_SCHEMA = pa.schema([
    ("prompt number", pa.int64()),
    ("latency", pa.float64()),
    ("sanitized items type", pa.list_(pa.string())),
    ("sanitized items count", pa.int32()),
    ("sanitized tokens", pa.list_(pa.string()))
])


def percentile(data: List[float], p: float) -> float:
    if not data:
        return 0.0
    sorted_data = sorted(data)
    idx = (len(sorted_data) - 1) * (p / 100.0)
    floor_idx = int(idx)
    ceil_idx = min(floor_idx + 1, len(sorted_data) - 1)
    if floor_idx == ceil_idx:
        return sorted_data[floor_idx]
    return sorted_data[floor_idx] * (ceil_idx - idx) + sorted_data[ceil_idx] * (idx - floor_idx)


def load_prompts(dataset_path: str, limit: int, offset: int, sample_random: bool) -> List[Dict[str, Any]]:
    """Loads prompt records (id, text, token_count) from Parquet or CSV."""
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset file not found: {dataset_path}")

    ext = os.path.splitext(dataset_path)[1].lower()
    records = []

    print(f"Loading dataset: {dataset_path} ...", flush=True)

    if ext == ".parquet":
        pf = pq.ParquetFile(dataset_path)
        total_rows = pf.metadata.num_rows
        print(f"Dataset contains {total_rows:,} total prompts across {pf.metadata.num_row_groups} row groups.", flush=True)

        cols = ["Prompt No", "Prompt"]
        if "Token Count" in pf.schema.names:
            cols.append("Token Count")

        if sample_random and limit > 0:
            sample_size = min(limit, total_rows)
            target_indices = set(random.sample(range(total_rows), sample_size))
            print(f"Sampling {sample_size:,} random prompts across dataset...", flush=True)

            current_row = 0
            for rg_idx in range(pf.metadata.num_row_groups):
                rg = pf.read_row_group(rg_idx, columns=cols)
                rg_len = len(rg)
                rg_indices = [i - current_row for i in range(current_row, current_row + rg_len) if i in target_indices]
                if rg_indices:
                    sub_tbl = rg.take(rg_indices)
                    pyd = sub_tbl.to_pydict()
                    for j in range(len(rg_indices)):
                        records.append({
                            "id": pyd["Prompt No"][j],
                            "text": pyd["Prompt"][j] or "",
                            "token_count": pyd.get("Token Count", [0])[j] if "Token Count" in pyd else 0
                        })
                current_row += rg_len
                if len(records) >= limit:
                    break
        else:
            current_row = 0
            needed = limit if limit > 0 else total_rows
            for rg_idx in range(pf.metadata.num_row_groups):
                rg_rows = pf.metadata.row_group(rg_idx).num_rows
                if current_row + rg_rows <= offset:
                    current_row += rg_rows
                    continue

                rg = pf.read_row_group(rg_idx, columns=cols)
                pyd = rg.to_pydict()
                for j in range(len(rg)):
                    global_idx = current_row + j
                    if global_idx < offset:
                        continue
                    records.append({
                        "id": pyd["Prompt No"][j],
                        "text": pyd["Prompt"][j] or "",
                        "token_count": pyd.get("Token Count", [0])[j] if "Token Count" in pyd else 0
                    })
                    if len(records) >= needed:
                        break
                current_row += rg_rows
                if len(records) >= needed:
                    break

    elif ext == ".csv":
        df = pd.read_csv(dataset_path, nrows=limit if limit > 0 else None, skiprows=range(1, offset + 1) if offset > 0 else None)
        text_col = "text" if "text" in df.columns else ("message" if "message" in df.columns else df.columns[0])
        id_col = "tweet_id" if "tweet_id" in df.columns else df.columns[0]
        for idx, row in df.iterrows():
            records.append({
                "id": str(row[id_col]),
                "text": str(row[text_col]) if pd.notna(row[text_col]) else "",
                "token_count": 0
            })
    else:
        raise ValueError(f"Unsupported dataset extension: {ext}")

    print(f"Loaded {len(records):,} prompts for testing.\n", flush=True)
    return records


async def test_single_prompt(
    client: httpx.AsyncClient,
    prompt_record: Dict[str, Any],
    mode: str,
    categories: List[str],
    verify_detokenize: bool,
    verbose: bool
) -> Dict[str, Any]:
    """Tests tokenization and detokenization for a single prompt."""
    prompt_text = prompt_record["text"]
    result: Dict[str, Any] = {
        "id": prompt_record["id"],
        "token_count": prompt_record.get("token_count", 0),
        "tok_latency_ms": 0.0,
        "detok_latency_ms": 0.0,
        "entities_count": 0,
        "entities_detected": [],
        "sanitized_tokens": [],
        "rehydrated_match": False,
        "error": None,
    }

    if not prompt_text:
        return result

    # 1. POST /v1/tokenize (with retry for transient local socket drops)
    max_retries = 2
    for attempt in range(max_retries + 1):
        t0 = time.perf_counter()
        try:
            tok_payload = {
                "text": prompt_text,
                "mode": mode,
                "categories": categories,
                "ttlSeconds": 300,
            }
            res = await client.post("/v1/tokenize", json=tok_payload)
            t_tok = (time.perf_counter() - t0) * 1000.0
            result["tok_latency_ms"] = t_tok

            if res.status_code != 200:
                result["error"] = f"Tokenize error HTTP {res.status_code}: {res.text}"
                return result

            tok_data = res.json()
            session_id = tok_data.get("sessionId")
            sanitized_text = tok_data.get("sanitizedText", "")
            entities = tok_data.get("entitiesDetected", [])
            result["entities_count"] = tok_data.get("entitiesCount", 0)
            result["entities_detected"] = [e.get("type", "UNKNOWN") for e in entities]
            result["sanitized_tokens"] = [e.get("token", "") for e in entities]
            result["error"] = None
            break

        except Exception as exc:
            if attempt < max_retries:
                await asyncio.sleep(0.05 * (attempt + 1))
                continue
            exc_name = type(exc).__name__
            exc_msg = str(exc) or exc_name
            result["error"] = f"Request exception ({exc_name}): {exc_msg}"
            return result

    if verbose and result["entities_count"] > 0:
        print(f"\n[Prompt #{prompt_record['id']}] Detected {result['entities_count']} entities: {result['entities_detected']}")
        print(f"  Tokens: {result['sanitized_tokens']}")
        print(f"  Orig  : {prompt_text[:120]}...")
        print(f"  Sanit : {sanitized_text[:120]}...")

    # 2. POST /v1/detokenize (if requested)
    if verify_detokenize and session_id:
        for attempt in range(max_retries + 1):
            t1 = time.perf_counter()
            try:
                detok_payload = {
                    "sessionId": session_id,
                    "tokenizedText": sanitized_text,
                    "purgeAfterRead": True,
                }
                d_res = await client.post("/v1/detokenize", json=detok_payload)
                t_detok = (time.perf_counter() - t1) * 1000.0
                result["detok_latency_ms"] = t_detok

                if d_res.status_code == 200:
                    d_data = d_res.json()
                    rehydrated = d_data.get("rehydratedText", "")
                    result["rehydrated_match"] = (rehydrated == prompt_text)
                    result["error"] = None
                    break
                else:
                    result["error"] = f"Detokenize error HTTP {d_res.status_code}: {d_res.text}"
                    return result
            except Exception as exc:
                if attempt < max_retries:
                    await asyncio.sleep(0.05 * (attempt + 1))
                    continue
                exc_name = type(exc).__name__
                exc_msg = str(exc) or exc_name
                result["error"] = f"Detokenize exception ({exc_name}): {exc_msg}"

    return result


async def run_benchmark(
    base_url: str,
    prompts: List[Dict[str, Any]],
    concurrency: int,
    mode: str,
    categories: List[str],
    verify_detokenize: bool,
    verbose: bool
) -> List[Dict[str, Any]]:
    """Runs concurrent async requests against the API endpoints."""
    limits = httpx.Limits(max_connections=concurrency * 2, max_keepalive_connections=concurrency)
    timeout = httpx.Timeout(connect=10.0, read=30.0, write=10.0, pool=10.0)

    results = []
    total = len(prompts)
    done_count = 0
    start_time = time.perf_counter()

    queue: asyncio.Queue = asyncio.Queue()
    for rec in prompts:
        queue.put_nowait(rec)

    async with httpx.AsyncClient(base_url=base_url, limits=limits, timeout=timeout) as client:
        try:
            h = await client.get("/health")
            if h.status_code != 200:
                print(f"Warning: Health check returned {h.status_code}", flush=True)
            else:
                print(f"Gateway connected: {base_url} (Version: {h.json().get('version', 'unknown')})", flush=True)
        except Exception as e:
            print(f"Error connecting to gateway at {base_url}: {e}", file=sys.stderr)
            sys.exit(1)

        print(f"Starting test execution: {total:,} prompts | Concurrency: {concurrency} | Mode: {mode}\n", flush=True)

        async def worker():
            nonlocal done_count
            while True:
                try:
                    record = queue.get_nowait()
                except asyncio.QueueEmpty:
                    break

                res = await test_single_prompt(client, record, mode, categories, verify_detokenize, verbose)
                results.append(res)
                done_count += 1
                if done_count % max(1, total // 20) == 0 or done_count == total:
                    elapsed = time.perf_counter() - start_time
                    rate = done_count / max(0.001, elapsed)
                    pct = (done_count / total) * 100
                    print(f"  [{pct:5.1f}%] {done_count:,}/{total:,} prompts tested ({rate:6.0f} req/s)", flush=True)

        tasks = [asyncio.create_task(worker()) for _ in range(concurrency)]
        await asyncio.gather(*tasks)

    print()
    return results


def export_parquet_dataset(results: List[Dict[str, Any]], parquet_path: str):
    """Exports test results to Parquet with the 5 required columns."""
    rows = []
    for idx, r in enumerate(results):
        try:
            p_num = int(r["id"])
        except (ValueError, TypeError):
            digits = "".join(c for c in str(r["id"]) if c.isdigit())
            p_num = int(digits) if digits else (idx + 1)

        latency = round(float(r["tok_latency_ms"]), 2)
        items_type = list(r["entities_detected"])
        items_count = int(r["entities_count"])
        tokens = list(r["sanitized_tokens"])

        rows.append({
            "prompt number": p_num,
            "latency": latency,
            "sanitized items type": items_type,
            "sanitized items count": items_count,
            "sanitized tokens": tokens
        })

    table = pa.Table.from_pylist(rows, schema=PARQUET_OUTPUT_SCHEMA)
    pq.write_table(table, parquet_path, compression="zstd")
    file_size_kb = os.path.getsize(parquet_path) / 1024.0
    print(f"\n[File 2] Results Parquet Dataset saved:")
    print(f"  • Path         : {parquet_path}")
    print(f"  • Rows Written : {len(rows):,}")
    print(f"  • File Size    : {file_size_kb:.2f} KB")
    print(f"  • Columns      : {', '.join(table.column_names)}")


def export_summary_stats(
    results: List[Dict[str, Any]],
    elapsed_s: float,
    verify_detokenize: bool,
    summary_path: str
):
    """Exports comprehensive statistical summary to JSON file."""
    total = len(results)
    successes = [r for r in results if not r["error"]]
    failures = [r for r in results if r["error"]]

    tok_latencies = [r["tok_latency_ms"] for r in successes if r["tok_latency_ms"] > 0]
    detok_latencies = [r["detok_latency_ms"] for r in successes if r["detok_latency_ms"] > 0]

    prompts_with_entities = sum(1 for r in successes if r["entities_count"] > 0)
    total_entities = sum(r["entities_count"] for r in successes)

    entity_counter = Counter()
    for r in successes:
        for etype in r["entities_detected"]:
            entity_counter[etype] += 1

    exact_matches = sum(1 for r in successes if r["rehydrated_match"])
    fidelity_rate = (exact_matches / max(1, len(successes))) * 100 if verify_detokenize else None
    total_tokens_tested = sum(r.get("token_count", 0) for r in results)
    throughput = total / max(0.001, elapsed_s)

    summary_data = {
        "execution_overview": {
            "total_prompts_tested": total,
            "successful_requests": len(successes),
            "failed_requests": len(failures),
            "success_rate_pct": round((len(successes) / max(1, total)) * 100, 2),
            "total_time_seconds": round(elapsed_s, 2),
            "throughput_prompts_per_sec": round(throughput, 2),
            "total_tokens_tested": total_tokens_tested,
            "avg_tokens_per_prompt": round(total_tokens_tested / max(1, total), 2)
        },
        "pii_and_sovereign_id_metrics": {
            "prompts_with_detected_pii": prompts_with_entities,
            "prompts_with_pii_pct": round((prompts_with_entities / max(1, len(successes))) * 100, 2),
            "total_entity_instances_sanitized": total_entities,
            "entity_type_breakdown": dict(entity_counter.most_common())
        },
        "tokenize_latency_ms": {
            "avg": round(sum(tok_latencies) / max(1, len(tok_latencies)), 2) if tok_latencies else 0,
            "min": round(min(tok_latencies), 2) if tok_latencies else 0,
            "max": round(max(tok_latencies), 2) if tok_latencies else 0,
            "p50_median": round(percentile(tok_latencies, 50), 2),
            "p90": round(percentile(tok_latencies, 90), 2),
            "p95": round(percentile(tok_latencies, 95), 2),
            "p99": round(percentile(tok_latencies, 99), 2)
        },
        "detokenize_metrics": {
            "verified": verify_detokenize,
            "avg_latency_ms": round(sum(detok_latencies) / max(1, len(detok_latencies)), 2) if detok_latencies else 0,
            "p50_latency_ms": round(percentile(detok_latencies, 50), 2) if detok_latencies else 0,
            "exact_roundtrip_matches": exact_matches,
            "fidelity_rate_pct": round(fidelity_rate, 2) if fidelity_rate is not None else None
        } if verify_detokenize else None,
        "failures": [
            {"prompt_number": f["id"], "error": f["error"]} for f in failures[:10]
        ]
    }

    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2)

    file_size_kb = os.path.getsize(summary_path) / 1024.0
    print(f"\n[File 1] Output Summary Report saved:")
    print(f"  • Path         : {summary_path}")
    print(f"  • File Size    : {file_size_kb:.2f} KB")


def print_console_report(results: List[Dict[str, Any]], elapsed_s: float, verify_detokenize: bool):
    """Prints the formatted summary table to console."""
    total = len(results)
    if total == 0:
        return

    successes = [r for r in results if not r["error"]]
    failures = [r for r in results if r["error"]]
    tok_latencies = [r["tok_latency_ms"] for r in successes if r["tok_latency_ms"] > 0]
    detok_latencies = [r["detok_latency_ms"] for r in successes if r["detok_latency_ms"] > 0]

    prompts_with_entities = sum(1 for r in successes if r["entities_count"] > 0)
    total_entities = sum(r["entities_count"] for r in successes)

    entity_counter = Counter()
    for r in successes:
        for etype in r["entities_detected"]:
            entity_counter[etype] += 1

    exact_matches = sum(1 for r in successes if r["rehydrated_match"])
    fidelity_rate = (exact_matches / max(1, len(successes))) * 100 if verify_detokenize else None
    total_tokens_tested = sum(r.get("token_count", 0) for r in results)
    throughput = total / max(0.001, elapsed_s)

    print("\n" + "=" * 70)
    print("           AI PRIVACY CORE - DATASET BENCHMARK REPORT           ")
    print("=" * 70)

    print(f"\nExecution Overview:")
    print(f"  • Total Prompts Tested       : {total:,}")
    print(f"  • Successful Requests        : {len(successes):,} ({(len(successes)/total)*100:.1f}%)")
    print(f"  • Failed Requests            : {len(failures):,} ({(len(failures)/total)*100:.1f}%)")
    print(f"  • Total Time Elapsed         : {elapsed_s:.2f} s")
    print(f"  • Overall Throughput         : {throughput:.1f} prompts/sec")
    if total_tokens_tested > 0:
        print(f"  • Total Tokens Tested        : {total_tokens_tested:,} (avg {total_tokens_tested/total:.1f} tok/prompt)")

    print(f"\nPII & Sovereign ID Detection Metrics:")
    print(f"  • Prompts with Detected PII  : {prompts_with_entities:,} ({(prompts_with_entities/max(1, len(successes)))*100:.1f}%)")
    print(f"  • Total Entity Instances     : {total_entities:,}")
    if entity_counter:
        print(f"  • Entity Breakdown (Top Detected):")
        for etype, cnt in entity_counter.most_common(8):
            print(f"      - {etype:<26} : {cnt:,}")

    if tok_latencies:
        print(f"\nTokenize Latency (Edge Gateway):")
        print(f"  • Average Latency            : {sum(tok_latencies)/len(tok_latencies):.2f} ms")
        print(f"  • Min / Max                  : {min(tok_latencies):.2f} ms / {max(tok_latencies):.2f} ms")
        print(f"  • Median (p50)               : {percentile(tok_latencies, 50):.2f} ms")
        print(f"  • 90th Percentile (p90)      : {percentile(tok_latencies, 90):.2f} ms")
        print(f"  • 95th Percentile (p95)      : {percentile(tok_latencies, 95):.2f} ms")
        print(f"  • 99th Percentile (p99)      : {percentile(tok_latencies, 99):.2f} ms")

    if verify_detokenize and detok_latencies:
        print(f"\nDetokenize Latency & Fidelity:")
        print(f"  • Average Latency            : {sum(detok_latencies)/len(detok_latencies):.2f} ms")
        print(f"  • Median (p50)               : {percentile(detok_latencies, 50):.2f} ms")
        print(f"  • Exact Roundtrip Fidelity   : {exact_matches:,}/{len(successes):,} ({fidelity_rate:.2f}%)")

    print("=" * 70)


def main():
    parser = argparse.ArgumentParser(
        description="Run live API tests against the Prompt Test Sets and generate Summary JSON & Results Parquet."
    )
    parser.add_argument(
        "--dataset", "-d",
        default="Prompt Test Sets/unified_prompts.parquet",
        help="Path to dataset file (.parquet or .csv). Default: Prompt Test Sets/unified_prompts.parquet"
    )
    parser.add_argument(
        "--limit", "-n",
        type=int,
        default=100,
        help="Number of prompts to test (e.g. 50, 500, 1000, 0 for all). Default: 100"
    )
    parser.add_argument(
        "--offset",
        type=int,
        default=0,
        help="Starting prompt row offset. Default: 0"
    )
    parser.add_argument(
        "--random", "-r",
        action="store_true",
        help="Randomly sample --limit prompts across the entire dataset"
    )
    parser.add_argument(
        "--url", "-u",
        default="http://127.0.0.1:8787",
        help="Base URL of AI Privacy Core API. Default: http://127.0.0.1:8787"
    )
    parser.add_argument(
        "--concurrency", "-c",
        type=int,
        default=4,
        help="Number of concurrent requests (Default: 4, optimized for sub-50ms latency)."
    )
    parser.add_argument(
        "--mode", "-m",
        choices=["structural", "fpe"],
        default="structural",
        help="Tokenization mode (structural or fpe). Default: structural"
    )
    parser.add_argument(
        "--categories",
        default="all",
        help="Comma-separated Canonical Pack IDs or 'all' to activate all packs (Default: 'all')."
    )
    parser.add_argument(
        "--no-detokenize",
        action="store_true",
        help="Skip POST /v1/detokenize verification"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Print verbose entity detection output"
    )
    parser.add_argument(
        "--summary", "-s",
        default="benchmark_summary.json",
        help="Output path for the Summary Report file (File 1). Default: benchmark_summary.json"
    )
    parser.add_argument(
        "--parquet", "-p",
        default="benchmark_results.parquet",
        help="Output path for the Results Parquet Dataset (File 2). Default: benchmark_results.parquet"
    )

    args = parser.parse_args()

    category_list = [c.strip() for c in args.categories.split(",") if c.strip()]
    prompts = load_prompts(args.dataset, args.limit, args.offset, args.random)
    if not prompts:
        print("No prompts found to test.")
        sys.exit(0)

    t_start = time.perf_counter()
    results = asyncio.run(run_benchmark(
        base_url=args.url,
        prompts=prompts,
        concurrency=args.concurrency,
        mode=args.mode,
        categories=category_list,
        verify_detokenize=not args.no_detokenize,
        verbose=args.verbose
    ))
    elapsed = time.perf_counter() - t_start

    # Console display
    print_console_report(results, elapsed, not args.no_detokenize)

    # 1. Output Summary File
    export_summary_stats(results, elapsed, not args.no_detokenize, args.summary)

    # 2. Results Parquet Dataset
    export_parquet_dataset(results, args.parquet)


if __name__ == "__main__":
    main()
