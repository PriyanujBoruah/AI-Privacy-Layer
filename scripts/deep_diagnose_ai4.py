import sys, io, json, re, requests

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = 'D:/Compliance Datasets/AI4Privacy/1english_openpii_30k.jsonl'
s = requests.Session()

missed_by_label = {}
samples_by_label = {}
total_gt = 0
intercepted_gt = 0
zero_leak_docs = 0
total_docs = 0

with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        total_docs += 1
        if total_docs > 500: break
        obj = json.loads(line)
        text = obj.get('source_text', '')
        privacy_mask = obj.get('privacy_mask', [])
        if not text: continue

        gt = [p['value'].strip() for p in privacy_mask if len(p.get('value', '').strip()) >= 2]
        total_gt += len(gt)

        try:
            r = s.post('http://127.0.0.1:8787/v1/tokenize', json={'text': text, 'policy': 'GDPR_GLOBAL'}, timeout=5)
            sanitized = r.json().get('sanitizedText', '')
        except Exception as e:
            continue

        doc_misses = []
        for pm in privacy_mask:
            val = pm.get('value', '').strip()
            label = pm.get('label', 'UNKNOWN')
            if len(val) < 2: continue
            rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(val) + r'(?![A-Za-z0-9])')
            if rx.search(sanitized):
                # Missed!
                missed_by_label[label] = missed_by_label.get(label, 0) + 1
                if label not in samples_by_label:
                    samples_by_label[label] = []
                if len(samples_by_label[label]) < 4:
                    # find location in text
                    idx = text.find(val)
                    ctx = text[max(0, idx-40):min(len(text), idx+len(val)+40)] if idx != -1 else ""
                    samples_by_label[label].append((val, ctx))
                doc_misses.append(val)
            else:
                intercepted_gt += 1

        if len(doc_misses) == 0:
            zero_leak_docs += 1

print(f"Evaluated {total_docs} docs:")
print(f"Zero-Leak Docs: {zero_leak_docs}/{total_docs} ({(zero_leak_docs/total_docs)*100:.2f}%)")
print(f"Recall: {intercepted_gt}/{total_gt} ({(intercepted_gt/total_gt)*100:.2f}%)")
print("\nMissed counts by label:")
sorted_labels = sorted(missed_by_label.items(), key=lambda x: x[1], reverse=True)
for label, cnt in sorted_labels:
    print(f"  {label:<16}: {cnt}")

print("\n--- Samples of Misses by Label ---")
for label, cnt in sorted_labels[:12]:
    print(f"\nLabel [{label}]:")
    for val, ctx in samples_by_label[label]:
        print(f"  Value: {repr(val)} in context: ...{repr(ctx)}...")
