import pyarrow.parquet as pq, re, requests

table = pq.read_table('D:/Compliance Datasets/Maskara Indian PII 200k/train-00000-of-00001.parquet')
pyd = table.slice(0, 1000).to_pydict()

s = requests.Session()

missed_by_label = {}
missed_records = []

for i in range(1000):
    text = pyd['text'][i]
    ents = pyd['entities'][i]
    r = s.post('http://127.0.0.1:8787/v1/tokenize', json={'text': text, 'policy': 'DPDP_INDIA'}, timeout=5)
    if r.status_code != 200: continue
    sanitized = r.json().get('sanitizedText', '')
    
    gt_vals = []
    for ent in ents:
        st, en, lbl = ent['start'], ent['end'], ent['label']
        val = text[st:en].strip()
        if len(val) >= 2:
            gt_vals.append((val, lbl))
            rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(val) + r'(?![A-Za-z0-9])')
            if rx.search(sanitized):
                missed_by_label[lbl] = missed_by_label.get(lbl, 0) + 1
    
    # check zero leak
    all_clean = True
    for val, lbl in gt_vals:
        rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(val) + r'(?![A-Za-z0-9])')
        if rx.search(sanitized):
            all_clean = False
            break
    if not all_clean:
        missed_records.append((i, text, [v for v, l in gt_vals if re.search(r'(?<![A-Za-z0-9])' + re.escape(v) + r'(?![A-Za-z0-9])', sanitized)], sanitized))

print(f"Total Missed Records: {len(missed_records)}/1000 (Current Zero-Leak: {(1000-len(missed_records))/10.0}%)")
print("Misses by label:")
for l, c in sorted(missed_by_label.items(), key=lambda x: x[1], reverse=True):
    print(f"  {l:<20}: {c}")

print("\n--- First 10 Missed Records in Production ---")
for i, t, leaked, s in missed_records[:10]:
    print(f"\nRow {i}: Leaked={leaked}")
    print("Orig :", repr(t))
    print("Sanit:", repr(s))
