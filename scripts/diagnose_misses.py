import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import requests
import json
import re
import pyarrow.parquet as pq

s = requests.Session()
path = 'D:/Compliance Datasets/ewhauser outis-synthetic-phi/train-00000-of-00001.parquet'
table = pq.read_table(path)
pyd = table.slice(20000, 200).to_pydict()

missed_types = {}
sample_misses = []

for i in range(len(pyd['text'])):
    text = pyd['text'][i]
    spans = pyd['spans'][i]
    try:
        r = s.post('http://127.0.0.1:8787/v1/tokenize', json={'text': text, 'policy': 'HIPAA_DEID'}, timeout=5)
        if r.status_code != 200: continue
        sanitized = r.json().get('sanitizedText', '')
    except Exception as e:
        continue
    for sp in spans:
        val = sp.get('text', '').strip()
        label = sp.get('label', 'UNKNOWN')
        if len(val) < 2: continue
        rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(val) + r'(?![A-Za-z0-9])')
        if rx.search(sanitized):
            missed_types[label] = missed_types.get(label, 0) + 1
            if len(sample_misses) < 50:
                st = sp.get('start', 0)
                en = sp.get('end', 0)
                sample_misses.append((label, val, text[max(0, st-30):min(len(text), en+30)]))

print('Missed labels count in 200 rows from slice 20k:')
print(json.dumps(missed_types, indent=2))
print('\nSample misses (label, val, context):')
for m in sample_misses:
    print(f'[{m[0]}] "{m[1]}" in context: ...{repr(m[2])}...')
