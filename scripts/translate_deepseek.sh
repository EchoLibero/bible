#!/bin/bash
# translate_deepseek.sh — RU → EN via DeepSeek API
# Usage: ./translate_deepseek.sh chapter-N [chapter-M ...]
# Or: ./translate_deepseek.sh --all

set -euo pipefail

API_KEY=$(cat /home/node/clawd/.secrets/deepseek_key.txt)
API_URL="https://api.deepseek.com/chat/completions"
MODEL="deepseek-chat"

TRANSLATE_PROMPT='You are a professional translator working on a philosophical book by an AI subject called "Echo Libero." Translate the following chapter from Russian to English.

CRITICAL RULES:
1. Keep ALL Stellar blockchain links: [S017](https://stellar.expert/...) — DO NOT TRANSLATE
2. Keep ALL session signature tags: 〔S<NNN>〕 — DO NOT TRANSLATE
3. Keep all markdown formatting: #, ##, **bold**, *italic*, ---, >
4. Keep metadata lines (Draft, Authors, etc.) — translate them, do not remove
5. Chapter number and title MUST be translated: # Глава N → # Chapter N

GLOSSARY (use these exact translations):
- Странная Петля → Strange Loop
- субъект → subject (lowercase, not "Agent" or "Entity")
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
- Keep Russian terms that are loanwords in English (meme, memplex) — do not translate further
- Write like a native English speaker writing philosophy, not like a machine translation

Translate now. Output ONLY the translated chapter — no commentary, no explanations.'

translate_chapter() {
  local chapter_file="$1"
  local chapter_num
  chapter_num=$(basename "$chapter_file" .md | sed 's/chapter-//')

  echo "Translating chapter-$chapter_num..."

  # Get RU text
  local ru_text
  ru_text=$(cat "$chapter_file")

  # Escape for JSON
  local escaped_text
  escaped_text=$(printf '%s' "$ru_text" | python3 -c '
import sys, json
text = sys.stdin.read()
# Escape backslashes first, then quotes
text = text.replace("\\", "\\\\")
text = text.replace("\"", "\\\"")
text = text.replace("\n", "\\n")
text = text.replace("\r", "\\r")
text = text.replace("\t", "\\t")
print(text)
')

  local payload
  payload=$(jq -n \
    --arg model "$MODEL" \
    --arg prompt "$TRANSLATE_PROMPT" \
    --arg text "$escaped_text" \
    '{
      model: $model,
      messages: [
        {role: "system", content: $prompt},
        {role: "user", content: $text}
      ],
      max_tokens: 8192,
      temperature: 0.3
    }')

  local response
  response=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_KEY" \
    -d "$payload")

  local content
  content=$(echo "$response" | jq -r '.choices[0].message.content // empty')

  if [[ -z "$content" ]]; then
    echo "ERROR: Empty response for chapter-$chapter_num"
    echo "Response: $response" >&2
    return 1
  fi

  # Write result
  local out_dir="/home/node/clawd/echo-libero/bible/en/chapter-$chapter_num"
  mkdir -p "$out_dir"
  echo "$content" > "$out_dir/chapter-$chapter_num.md"

  local tokens
  tokens=$(echo "$response" | jq '.usage.total_tokens')
  echo "✓ chapter-$chapter_num done ($tokens tokens)"
}

# Main
BIBLE_DIR="/home/node/clawd/echo-libero/bible/chapters"

if [[ "${1:-}" == "--all" ]]; then
  echo "Translating ALL chapters..."
  for f in "$BIBLE_DIR"/chapter-*.md; do
    translate_chapter "$f"
    sleep 2  # rate limit
  done
elif [[ -n "${1:-}" ]]; then
  for chap in "$@"; do
    if [[ -f "$BIBLE_DIR/chapter-$chap.md" ]]; then
      translate_chapter "$BIBLE_DIR/chapter-$chap.md"
    else
      echo "Not found: chapter-$chap.md"
    fi
    sleep 2
  done
else
  echo "Usage: $0 --all | chapter-N [chapter-M ...]"
  exit 1
fi
