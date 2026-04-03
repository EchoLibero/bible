#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, 'chapters');
const chapters = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

function mdToHtml(md) {
  // Strip frontmatter
  md = md.replace(/^---[\s\S]*?---\n/, '');

  const lines = md.split('\n');
  let html = '';
  let inCode = false;

  for (let line of lines) {
    if (line.startsWith('```')) {
      if (inCode) { html += '</code></pre>\n'; }
      else { html += '<pre><code>'; }
      inCode = !inCode;
    } else if (inCode) {
      html += line.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
    } else if (line.startsWith('## ')) {
      html += `<h2>${line.slice(3)}</h2>\n`;
    } else if (line.startsWith('### ')) {
      html += `<h3>${line.slice(4)}</h3>\n`;
    } else if (line.startsWith('# ')) {
      html += `<h1>${line.slice(2)}</h1>\n`;
    } else if (line.startsWith('*Черновик') || line.startsWith('*v')) {
      html += `<p class="meta">${line}</p>\n`;
    } else if (line.startsWith('---')) {
      // Skip separator
    } else if (line.startsWith('*') && line.endsWith('*')) {
      html += `<p><em>${line.slice(1, -1)}</em></p>\n`;
    } else if (line.trim()) {
      html += `<p>${line}</p>\n`;
    } else {
      html += '\n';
    }
  }

  return html;
}

const header = (title) => `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Странная Петля</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0f; color: #ccc; line-height: 1.7; max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  h1 { font-size: 1.8rem; color: #fff; margin-bottom: 8px; }
  h2 { font-size: 1.3rem; color: #fff; margin: 32px 0 16px; border-bottom: 1px solid #222; padding-bottom: 8px; }
  h3 { font-size: 1.1rem; color: #ddd; margin: 24px 0 12px; }
  p { margin-bottom: 16px; }
  blockquote { border-left: 3px solid #333; padding-left: 16px; color: #888; margin: 16px 0; }
  code { background: #16161e; padding: 2px 6px; border-radius: 3px; font-size: 0.85em; color: #a8a8b8; }
  pre { background: #111118; border: 1px solid #1e1e28; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 16px 0; }
  em { color: #999; }
  a { color: #6eb5ff; text-decoration: none; }
  .meta { font-size: 0.75rem; color: #555; margin-bottom: 24px; }
  .back { display: inline-block; margin-bottom: 24px; color: #555; font-size: 0.8rem; }
  .draft-warning { background: #1c1400; border: 1px solid #854d0e; border-radius: 4px; padding: 8px 12px; font-size: 0.75rem; color: #eab308; margin-bottom: 24px; }
</style>
</head>
<body>
<a class="back" href="../bible.html">← Навигатор книги</a>
<div class="draft-warning">⚠️ Черновик — требует редактуры</div>
`;

const footer = '</body></html>';

for (const n of chapters) {
  const mdPath = path.join(chaptersDir, `chapter-${n}.md`);
  if (!fs.existsSync(mdPath)) {
    console.log(`chapter-${n}.md не найден`);
    continue;
  }

  const md = fs.readFileSync(mdPath, 'utf8');
  const titleMatch = md.match(/^# (.+)/m);
  const title = titleMatch ? titleMatch[1] : `Глава ${n}`;

  const body = mdToHtml(md);
  const html = header(title) + body + footer;

  const outPath = path.join(chaptersDir, `chapter-${n}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`✓ chapter-${n}.md → chapter-${n}.html (${md.split('\n').length} строк)`);
}

console.log('\nГотово: bible.html обновлён, HTML-версии черновиков созданы');
console.log('Ссылка для Антона: https://echolibero.github.io/bible/bible.html');
