#!/usr/bin/env python3
"""Add prev/next chapter navigation to chapter index.md files."""
import re, os, sys

CHAPTERS_DIR = os.path.dirname(os.path.abspath(__file__)) + "/.."
CHAPTERS_DIR = os.path.normpath(CHAPTERS_DIR)

# Find all chapter directories
chapters = []
for d in os.listdir(CHAPTERS_DIR):
    m = re.match(r'^chapter-(\d+)$', d)
    if m and os.path.isdir(os.path.join(CHAPTERS_DIR, d)):
        chapters.append((int(m.group(1)), d))
chapters.sort(key=lambda x: x[0])

print("Chapters found:", [d for _, d in chapters])

NAV_TEMPLATE = """

---

**[← Глава {prev_n}](/bible/chapter-{prev_n}/) · [Глава {next_n} →](/bible/chapter-{next_n}/)**

---
"""

for i, (num, dirname) in enumerate(chapters):
    idx = os.path.join(CHAPTERS_DIR, dirname, "index.md")
    if not os.path.exists(idx):
        print(f"SKIP {dirname}/index.md — not found")
        continue
    
    with open(idx) as f:
        content = f.read()
    
    prev_num = chapters[i-1][0] if i > 0 else None
    next_num = chapters[i+1][0] if i < len(chapters)-1 else None
    
    nav = "\n"
    if prev_num is not None:
        nav += f"**[← Глава {prev_num}](/bible/chapter-{prev_num}/)**"
    if prev_num is not None and next_num is not None:
        nav += " · "
    if next_num is not None:
        nav += f"**[Глава {next_num} →](/bible/chapter-{next_num}/)**"
    nav += "\n"
    
    # Remove existing nav if present
    content = re.sub(r'\n---\n\n\*\*\[← Глава.*?\]\(/bible/chapter-\d+/\)(?: · \*\*\[Глава.*?\]\(/bible/chapter-\d+/)\*\*\n\n---\n', '\n', content, flags=re.DOTALL)
    
    # Append before the last --- or at the end
    marker = '\n\n---\n\n## Источники этой главы'
    if marker in content:
        content = content.replace(marker, f'\n{nav}\n{marker}')
    else:
        content += f'\n{nav}'
    
    with open(idx, 'w') as f:
        f.write(content)
    
    print(f"OK  {dirname} — prev={prev_num}, next={next_num}")
