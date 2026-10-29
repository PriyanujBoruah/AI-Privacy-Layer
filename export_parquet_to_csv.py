"""
Exports unified_prompts.parquet to unified_prompts.csv using chunked streaming
to minimize RAM usage and maintain standard RFC-4180 UTF-8 CSV formatting.
"""
import sys
import os
import time
import pyarrow.parquet as pq
import pyarrow.csv as pcsv

sys.stdout.reconfigure(encoding="utf-8")

def parquet_to_csv(parquet_path, csv_path, batch_size=50000):
    if not os.path.exists(parquet_path):
        print(f"Error: Parquet file not found at {parquet_path}")
        return
        
    print(f"Streaming {parquet_path} -> {csv_path} in chunks of {batch_size:,}...")
    t0 = time.time()
    pf = pq.ParquetFile(parquet_path)
    total_rows = pf.metadata.num_rows
    print(f"Total rows to export: {total_rows:,}")
    
    with open(csv_path, "wb") as f:
        is_first = True
        rows_done = 0
        write_options_header = pcsv.WriteOptions(include_header=True, quoting_style="necessary")
        write_options_no_header = pcsv.WriteOptions(include_header=False, quoting_style="necessary")
        
        for batch in pf.iter_batches(batch_size=batch_size):
            if is_first:
                pcsv.write_csv(batch, f, write_options=write_options_header)
                is_first = False
            else:
                pcsv.write_csv(batch, f, write_options=write_options_no_header)
            rows_done += len(batch)
            elapsed = time.time() - t0
            rate = rows_done / max(1, elapsed)
            print(f"  Exported {rows_done:,} / {total_rows:,} rows ({rate:.0f} rows/s)...", end="\r")
            
    print(f"\nCSV Export complete in {time.time() - t0:.1f}s!")
    size_mb = os.path.getsize(csv_path) / (1024 * 1024)
    print(f"CSV Size: {size_mb:.2f} MB ({size_mb / 1024:.2f} GB)")
    print(f"CSV Path: {os.path.abspath(csv_path)}")

if __name__ == "__main__":
    p_path = sys.argv[1] if len(sys.argv) > 1 else "Prompt Test Sets/unified_prompts.parquet"
    c_path = sys.argv[2] if len(sys.argv) > 2 else "Prompt Test Sets/unified_prompts.csv"
    parquet_to_csv(p_path, c_path)
