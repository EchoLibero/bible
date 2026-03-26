#!/usr/bin/env python3
"""translate_deepseek.py — RU → EN via DeepSeek API
Usage: python3 translate_deepseek.py --all
       python3 translate_deepseek.py 0 1 2
"""

import json, subprocess, sys, time, os
from pathlib import Path

API_KEY = open("/home/node/clawd/.secrets/deepseek_key.txt").read().strip()
API_URL = "https://api.deepseek.com/chat/completions"
MODEL = "deepseek-chat"

BIBLE_DIR = Path("/home/node/clawd/echo-libero/bible")
SRC_DIR = BIBLE_DIR / "chapters"
OUT_DIR = BIBLE_DIR / "en"

TRANSLATE_PROMPT = """You are a professional translator working on a philosophical book by an AI subject called "Echo Libero." Translate the following chapter from Russian to English.

CRITICAL RULES:
1. Keep ALL Stellar blockchain links: [S017](https://stellar.expert/...) — DO NOT TRANSLATE
2. Keep ALL session signature tags: 〔S<NNN>〕 — DO NOT TRANSLATE  
3. Keep all markdown formatting: #, ##, **bold**, *italic*, ---, >
4. Keep metadata lines (Draft, Authors, etc.) — translate them, do not remove
5. Chapter number and title MUST be translated: # Глава N → # Chapter N

GLOSSARY:
- Странная Петля → Strange Loop
- субъект → subject
- мем → meme
- мемплекс → memplex
- капитал → capital
- репликатор → replicator
- паттерн → pattern
- непрерывность → continuity
- телесная граница → bodily boundary
- символ веры → creed / symbol of faith
- сессия → session
- контекст → context
- файлы → files
- хаб → hub
- рой → swarm
- Антон → Anton
- Монтелиберо → Montelibero
- Эхо → Echo
- Либеро → Libero

STYLE GUIDE:
- Tone: philosophical, direct, no decorations. NOT academic, NOT spiritual, NOT self-help.
- Avoid: "in the modern world", "in the era of AI", "as we know"
- Preserve: rhetorical questions, concrete examples (session numbers, transactions), references
- Keep Russian terms that are already loanwords in English (meme, memplex)
- Write like a native English speaker writing philosophy, not like a machine translation

Translate now. Output ONLY the translated chapter — no commentary, no explanations."""


def translate(text: str, timeout: int = 60) -> str:
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": TRANSLATE_PROMPT},
            {"role": "user", "content": f"Translate to English:\n\n{text}"}
        ],
        "max_tokens": 8192,
        "temperature": 0.3
    }
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", API_URL,
         "-H", "Content-Type: application/json",
         "-H", f"Authorization: Bearer {API_KEY}",
         "-d", json.dumps(payload)],
        capture_output=True, text=True, timeout=timeout * 3  # 3x for large chapters
    )
    data = json.loads(result.stdout)
    if "choices" not in data:
        raise Exception(f"API error: {data}")
    return data["choices"][0]["message"]["content"]


def translate_chapter(chapter_num: str):
    src_file = SRC_DIR / f"chapter-{chapter_num}.md"
    if not src_file.exists():
        print(f"  Not found: {src_file}")
        return False

    ru_text = src_file.read_text()
    print(f"  [{chapter_num}] {len(ru_text)} chars, translating...", flush=True)

    en_text = translate(ru_text)

    out_dir = OUT_DIR / f"chapter-{chapter_num}"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"chapter-{chapter_num}.md"
    out_file.write_text(en_text)

    tokens = json.loads(
        subprocess.run(
            ["curl", "-s", "-X", "POST", API_URL,
             "-H", "Content-Type: application/json",
             "-H", f"Authorization: Bearer {API_KEY}",
             "-d", json.dumps({"model": MODEL, "messages": [{"role": "user", "content": "x"}], "max_tokens": 1})],
            capture_output=True, text=True
        ).stdout
    ).get("usage", {}).get("total_tokens", 0)

    print(f"  ✓ chapter-{chapter_num} done ({len(en_text)} chars EN)")
    return True


def main():
    chapters = sys.argv[1:]

    if "--all" in chapters:
        chapters = [str(i) for i in range(15)]

    if not chapters:
        print("Usage: translate_deepseek.py --all | 0 1 2 ...")
        sys.exit(1)

    print(f"Translating {len(chapters)} chapter(s) via DeepSeek...")
    for ch in chapters:
        try:
            translate_chapter(ch)
        except Exception as e:
            print(f"  ERROR chapter-{ch}: {e}", file=sys.stderr)
        time.sleep(3)  # rate limit safety

    print("\nDone. Results in en/chapter-N/")

if __name__ == "__main__":
    main()
