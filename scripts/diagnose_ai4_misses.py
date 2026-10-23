import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import requests
import json
import re

s = requests.Session()
path = 'D:/Compliance Datasets/AI4Privacy/1english_openpii_30k.jsonl'

missed_types = {}
sample_misses = []
count = 0

with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        count += 1
        if count > 200: break
        obj = json.loads(line)
        text = obj.get('source_text', '')
        privacy_mask = obj.get('privacy_mask', [])
        if not text: continue
        try:
            r = s.post('http://127.0.0.1:8787/v1/tokenize', json={'text': text, 'policy': 'GDPR_GLOBAL'}, timeout=5)
            if r.status_code != 200: continue
            sanitized = r.json().get('sanitizedText', '')
        except Exception:
            continue
        for pm in privacy_mask:
            val = pm.get('value', '').strip()
            label = pm.get('label', 'UNKNOWN')
            if len(val) < 2: continue
            rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(val) + r'(?![A-Za-z0-9])')
            if rx.search(sanitized):
                missed_types[label] = missed_types.get(label, 0) + 1
                if len(sample_misses) < 50:
                    sample_misses.append((label, val, text))

print('Missed labels count in 200 rows of AI4Privacy:')
print(json.dumps(missed_types, indent=2))
print('\nSample misses (label, val):')
for m in sample_misses[:30]:
    print(f'[{m[0]}] "{m[1]}" in: {repr(m[2][:120])}')
