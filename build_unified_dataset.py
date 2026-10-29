"""
Unified Dataset Generator for Prompt Sanitization Benchmarking
Builds a single unified Parquet dataset AND CSV dataset with 3 columns:
  - prompt_id (string)
  - prompt_token_count (int32)
  - prompt (string)

Datasets ingested:
  1. OpenOrca (Parquet)
  2. Customer Support Twitter (CSV)
  3. Enron Email (CSV)
  4. LMSYS-Chat (Parquet shards)
  5. WildChat (Parquet shards)
"""

import argparse
import glob
import os
import sys
import time
import gc
import pandas as pd
import pyarrow as pa
import pyarrow.csv as pcsv
import pyarrow.parquet as pq
import tiktoken

sys.stdout.reconfigure(encoding="utf-8")

SCHEMA = pa.schema([
    ("prompt_id", pa.string()),
    ("prompt_token_count", pa.int32()),
    ("prompt", pa.string())
])

def flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts):
    """Flushes in-memory batch to the Parquet writer as a row group."""
    if not batch_ids:
        return 0
    
    table = pa.Table.from_arrays([
        pa.array(batch_ids, type=pa.string()),
        pa.array(batch_tokens, type=pa.int32()),
        pa.array(batch_prompts, type=pa.string())
    ], schema=SCHEMA)
    
    pq_writer.write_table(table)
    count = len(batch_ids)
    batch_ids.clear()
    batch_tokens.clear()
    batch_prompts.clear()
    return count

def process_openorca(pq_writer, enc, base_dir, batch_size=50000):
    print("\n[1/5] Processing OpenOrca...", flush=True)
    orca_files = [
        os.path.join(base_dir, "OpenOrca", "1M-GPT4-Augmented.parquet"),
        os.path.join(base_dir, "OpenOrca", "3_5M-GPT3_5-Augmented.parquet")
    ]
    
    total_written = 0
    t0 = time.time()
    
    for fpath in orca_files:
        if not os.path.exists(fpath):
            print(f"  Warning: File not found: {fpath}", flush=True)
            continue
            
        print(f"  Reading {os.path.basename(fpath)}...", flush=True)
        pf = pq.ParquetFile(fpath)
        batch_ids, batch_tokens, batch_prompts = [], [], []
        
        for batch in pf.iter_batches(batch_size=batch_size, columns=["id", "question"]):
            pyd = batch.to_pydict()
            for oid, q in zip(pyd["id"], pyd["question"]):
                if not q:
                    continue
                q_str = str(q).strip()
                if not q_str:
                    continue
                batch_ids.append(f"openorca_{oid}")
                batch_prompts.append(q_str)
                batch_tokens.append(len(enc.encode(q_str, disallowed_special=())))
                
                if len(batch_ids) >= batch_size:
                    n = flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
                    total_written += n
                    rate = total_written / max(1, (time.time() - t0))
                    print(f"    OpenOrca written: {total_written:,} prompts ({rate:.0f} rows/s)", end="\r", flush=True)
        
        if batch_ids:
            total_written += flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
            
    print(f"\n  Finished OpenOrca: {total_written:,} prompts in {time.time() - t0:.1f}s", flush=True)
    gc.collect()
    return total_written

def process_twitter(pq_writer, enc, base_dir, batch_size=50000):
    print("\n[2/5] Processing Customer Support Twitter...", flush=True)
    csv_path = os.path.join(base_dir, "Customer Support Twitter", "twcs", "twcs.csv")
    if not os.path.exists(csv_path):
        csv_path = os.path.join(base_dir, "Customer Support Twitter", "sample.csv")
    
    if not os.path.exists(csv_path):
        print(f"  Warning: Twitter CSV not found at {csv_path}", flush=True)
        return 0
        
    print(f"  Reading {os.path.basename(csv_path)}...", flush=True)
    t0 = time.time()
    total_written = 0
    batch_ids, batch_tokens, batch_prompts = [], [], []
    
    for chunk in pd.read_csv(csv_path, usecols=["tweet_id", "text"], chunksize=100000, low_memory=False):
        for tid, text in zip(chunk["tweet_id"], chunk["text"]):
            if pd.isna(text):
                continue
            text_str = str(text).strip()
            if not text_str:
                continue
            batch_ids.append(f"twitter_{tid}")
            batch_prompts.append(text_str)
            batch_tokens.append(len(enc.encode(text_str, disallowed_special=())))
            
            if len(batch_ids) >= batch_size:
                n = flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
                total_written += n
                rate = total_written / max(1, (time.time() - t0))
                print(f"    Twitter written: {total_written:,} prompts ({rate:.0f} rows/s)", end="\r", flush=True)
                
    if batch_ids:
        total_written += flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
        
    print(f"\n  Finished Twitter: {total_written:,} prompts in {time.time() - t0:.1f}s", flush=True)
    gc.collect()
    return total_written

def process_enron(pq_writer, enc, base_dir, batch_size=50000):
    print("\n[3/5] Processing Enron Email...", flush=True)
    csv_path = os.path.join(base_dir, "Enron Email", "emails.csv")
    if not os.path.exists(csv_path):
        print(f"  Warning: Enron emails.csv not found at {csv_path}", flush=True)
        return 0
        
    print(f"  Reading {os.path.basename(csv_path)}...", flush=True)
    t0 = time.time()
    total_written = 0
    current_idx = 0
    batch_ids, batch_tokens, batch_prompts = [], [], []
    
    for chunk in pd.read_csv(csv_path, usecols=["message"], chunksize=50000, low_memory=False):
        for msg in chunk["message"]:
            current_idx += 1
            if pd.isna(msg):
                continue
            msg_str = str(msg).strip()
            if not msg_str:
                continue
            batch_ids.append(f"enron_{current_idx}")
            batch_prompts.append(msg_str)
            batch_tokens.append(len(enc.encode(msg_str, disallowed_special=())))
            
            if len(batch_ids) >= batch_size:
                n = flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
                total_written += n
                rate = total_written / max(1, (time.time() - t0))
                print(f"    Enron written: {total_written:,} prompts ({rate:.0f} rows/s)", end="\r", flush=True)
                
    if batch_ids:
        total_written += flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
        
    print(f"\n  Finished Enron: {total_written:,} prompts in {time.time() - t0:.1f}s", flush=True)
    gc.collect()
    return total_written

def process_lmsys(pq_writer, enc, base_dir, batch_size=50000):
    print("\n[4/5] Processing LMSYS-Chat...", flush=True)
    lmsys_shards = sorted(glob.glob(os.path.join(base_dir, "LYMSYS-Chat", "data", "*.parquet")))
    if not lmsys_shards:
        print("  Warning: No LMSYS parquet shards found.", flush=True)
        return 0
        
    t0 = time.time()
    total_written = 0
    batch_ids, batch_tokens, batch_prompts = [], [], []
    
    for shard in lmsys_shards:
        print(f"  Reading shard: {os.path.basename(shard)}...", flush=True)
        pf = pq.ParquetFile(shard)
        for batch in pf.iter_batches(batch_size=20000, columns=["conversation_id", "conversation"]):
            pyd = batch.to_pydict()
            for cid, conv in zip(pyd["conversation_id"], pyd["conversation"]):
                if not conv:
                    continue
                turn_idx = 1
                for msg in conv:
                    if msg.get("role") == "user" and msg.get("content"):
                        content = str(msg["content"]).strip()
                        if content:
                            batch_ids.append(f"lmsys_{cid}_turn{turn_idx}")
                            batch_prompts.append(content)
                            batch_tokens.append(len(enc.encode(content, disallowed_special=())))
                            turn_idx += 1
                            
                            if len(batch_ids) >= batch_size:
                                n = flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
                                total_written += n
                                rate = total_written / max(1, (time.time() - t0))
                                print(f"    LMSYS written: {total_written:,} prompts ({rate:.0f} rows/s)", end="\r", flush=True)
                                
    if batch_ids:
        total_written += flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
        
    print(f"\n  Finished LMSYS: {total_written:,} prompts in {time.time() - t0:.1f}s", flush=True)
    gc.collect()
    return total_written

def process_wildchat(pq_writer, enc, base_dir, batch_size=50000):
    print("\n[5/5] Processing WildChat...", flush=True)
    wild_shards = sorted(glob.glob(os.path.join(base_dir, "WildChat", "data", "*.parquet")))
    if not wild_shards:
        print("  Warning: No WildChat parquet shards found.", flush=True)
        return 0
        
    t0 = time.time()
    total_written = 0
    batch_ids, batch_tokens, batch_prompts = [], [], []
    
    for shard in wild_shards:
        print(f"  Reading shard: {os.path.basename(shard)}...", flush=True)
        pf = pq.ParquetFile(shard)
        for batch in pf.iter_batches(batch_size=20000, columns=["conversation_hash", "conversation"]):
            pyd = batch.to_pydict()
            for chash, conv in zip(pyd["conversation_hash"], pyd["conversation"]):
                if not conv:
                    continue
                turn_idx = 1
                for msg in conv:
                    if msg.get("role") == "user" and msg.get("content"):
                        content = str(msg["content"]).strip()
                        if content:
                            batch_ids.append(f"wildchat_{chash}_turn{turn_idx}")
                            batch_prompts.append(content)
                            batch_tokens.append(len(enc.encode(content, disallowed_special=())))
                            turn_idx += 1
                            
                            if len(batch_ids) >= batch_size:
                                n = flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
                                total_written += n
                                rate = total_written / max(1, (time.time() - t0))
                                print(f"    WildChat written: {total_written:,} prompts ({rate:.0f} rows/s)", end="\r", flush=True)
                                
    if batch_ids:
        total_written += flush_batch(pq_writer, batch_ids, batch_tokens, batch_prompts)
        
    print(f"\n  Finished WildChat: {total_written:,} prompts in {time.time() - t0:.1f}s", flush=True)
    gc.collect()
    return total_written

def export_parquet_to_csv(parquet_path, csv_path, batch_size=50000):
    """Exports Parquet to CSV in streaming chunks with lock retry."""
    print("\n" + "=" * 60, flush=True)
    print(f"Exporting to CSV: {csv_path}", flush=True)
    print("=" * 60, flush=True)
    
    # Check if target CSV can be opened; if locked, use fallback name
    target_path = csv_path
    try:
        with open(target_path, "wb") as f_test:
            pass
    except PermissionError:
        base, ext = os.path.splitext(csv_path)
        target_path = f"{base}_full{ext}"
        print(f"  Note: {csv_path} is locked by another program (e.g. Excel).", flush=True)
        print(f"  Writing to: {target_path}", flush=True)
        
    t0 = time.time()
    pf = pq.ParquetFile(parquet_path)
    total_rows = pf.metadata.num_rows
    print(f"  Streaming {total_rows:,} rows to CSV...", flush=True)
    
    with open(target_path, "wb") as f:
        is_first = True
        rows_done = 0
        opt_hdr = pcsv.WriteOptions(include_header=True)
        opt_no_hdr = pcsv.WriteOptions(include_header=False)
        
        for batch in pf.iter_batches(batch_size=batch_size):
            pcsv.write_csv(batch, f, write_options=opt_hdr if is_first else opt_no_hdr)
            is_first = False
            rows_done += len(batch)
            rate = rows_done / max(1, time.time() - t0)
            print(f"    Exported {rows_done:,} / {total_rows:,} rows ({rate:.0f} rows/s)...", end="\r", flush=True)
            
    size_mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"\n  CSV export complete: {size_mb:.2f} MB ({size_mb / 1024:.2f} GB) in {time.time() - t0:.1f}s", flush=True)
    return target_path

def main():
    parser = argparse.ArgumentParser(description="Build unified prompt dataset in Parquet and CSV formats.")
    parser.add_argument("--base-dir", default="Prompt Test Sets", help="Path to Prompt Test Sets folder")
    parser.add_argument("--output-parquet", default="Prompt Test Sets/unified_prompts.parquet", help="Output Parquet path")
    parser.add_argument("--output-csv", default="Prompt Test Sets/unified_prompts.csv", help="Output CSV path")
    parser.add_argument("--batch-size", type=int, default=50000, help="Row group buffer size")
    args = parser.parse_args()
    
    print("=" * 60, flush=True)
    print("Unified Dataset Generator (Parquet & CSV)", flush=True)
    print(f"Base Directory : {args.base_dir}", flush=True)
    print(f"Output Parquet : {args.output_parquet}", flush=True)
    print(f"Output CSV     : {args.output_csv}", flush=True)
    print(f"Tokenizer      : OpenAI cl100k_base (tiktoken)", flush=True)
    print(f"Row group size : {args.batch_size:,}", flush=True)
    print("=" * 60, flush=True)
    
    t_start = time.time()
    enc = tiktoken.get_encoding("cl100k_base")
    
    output_dir = os.path.dirname(args.output_parquet)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
        
    pq_writer = pq.ParquetWriter(args.output_parquet, SCHEMA, compression="zstd")
    
    grand_total = 0
    try:
        grand_total += process_openorca(pq_writer, enc, args.base_dir, args.batch_size)
        grand_total += process_twitter(pq_writer, enc, args.base_dir, args.batch_size)
        grand_total += process_enron(pq_writer, enc, args.base_dir, args.batch_size)
        grand_total += process_lmsys(pq_writer, enc, args.base_dir, args.batch_size)
        grand_total += process_wildchat(pq_writer, enc, args.base_dir, args.batch_size)
    finally:
        pq_writer.close()
        
    total_pq_time = time.time() - t_start
    pq_size_mb = os.path.getsize(args.output_parquet) / (1024 * 1024)
    
    print("\n" + "=" * 60, flush=True)
    print(f"Parquet built: {grand_total:,} prompts in {total_pq_time / 60:.2f} min ({pq_size_mb:.2f} MB)", flush=True)
    
    # Stage 2: Export Parquet to CSV
    actual_csv_path = export_parquet_to_csv(args.output_parquet, args.output_csv, args.batch_size)
    csv_size_mb = os.path.getsize(actual_csv_path) / (1024 * 1024)
    
    total_time = time.time() - t_start
    print("\n" + "=" * 60, flush=True)
    print("ALL DATASET BUILDS COMPLETED SUCCESSFULLY!", flush=True)
    print(f"Total Prompts Written : {grand_total:,}", flush=True)
    print(f"Total Time Elapsed    : {total_time / 60:.2f} minutes", flush=True)
    print(f"Parquet Output        : {args.output_parquet} ({pq_size_mb:.2f} MB / {pq_size_mb / 1024:.2f} GB)", flush=True)
    print(f"CSV Output            : {actual_csv_path} ({csv_size_mb:.2f} MB / {csv_size_mb / 1024:.2f} GB)", flush=True)
    print("=" * 60, flush=True)

if __name__ == "__main__":
    main()
