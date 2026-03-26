#!/usr/bin/env node
// Добавляет навигационное меню в каждую главу: извлекает ## заголовки → генерирует TOC → вставляет в начало
const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '..', 'chapters');
const outputDir = path.join(__dirname, '..');

// Получить список глав
const chapterFiles = fs.readdirSync(chaptersDir)
  .filter(f => f.match(/^chapter-(\d+)\.md$/))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });

// Преобразовать текст заголовка в anchor ID
function textToAnchor(text) {
  return text
    .replace(/[`*_~]/g, '') // убрать форматирование
    .replace(/[^\w\s\u0400-\u04FF-]/g, '') // убрать всё кроме букв/цифр/пробелов/кириллицы
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // пробелы → дефисы
    .replace(/-+/g, '-')  // несколько дефисов → один
    .replace(/^-|-$/g, ''); // убрать крайние дефисы
}

// Обработать одну главу
function processChapter(chapterFile) {
  const chapterNum = chapterFile.match(/\d+/)[0];
  const sourcePath = path.join(chaptersDir, chapterFile);
  const outputPath = path.join(outputDir, `chapter-${chapterNum}`, 'index.md');
  
  let md = fs.readFileSync(sourcePath, 'utf8');
  
  // Извлечь frontmatter
  const frontmatterMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
  const body = md.slice(frontmatter.length);
  
  // Извлечь title из frontmatter
  let title = `Глава ${chapterNum}`;
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  if (titleMatch) title = titleMatch[1].trim();
  
  // Найти все ## заголовки (не ###, не #)
  const headerRegex = /^##\s+(.+)$/gm;
  const headers = [];
  let match;
  while ((match = headerRegex.exec(body)) !== null) {
    headers.push(match[1]);
  }
  
  // Генерировать TOC
  const tocItems = headers.map(h => {
    const anchor = textToAnchor(h);
    const cleanLabel = h.replace(/[`*_~]/g, '').trim();
    return `- [${cleanLabel}](#${anchor})`;
  }).join('\n');
  
  const toc = tocItems.length > 0 
    ? `\n<details>\n<summary><b>Содержание</b></summary>\n\n${tocItems}\n\n</details>\n`
    : '';
  
  // Добавить anchor IDs к ## заголовкам
  let modifiedBody = body.replace(/^## (.+)$/gm, (line, headerText) => {
    const anchor = textToAnchor(headerText);
    return `## ${headerText} {#${anchor}}`;
  });
  
  // Собрать результат: frontmatter → TOC → body с якорями
  const result = frontmatter + '\n' + toc + '\n' + modifiedBody;
  
  // Записать
  fs.writeFileSync(outputPath, result);
  console.log(`✓ chapter-${chapterNum}: ${headers.length} разделов → ${outputPath}`);
}

// Обработать все главы
for (const cf of chapterFiles) {
  try {
    processChapter(cf);
  } catch (e) {
    console.error(`✗ ${cf}: ${e.message}`);
  }
}

console.log(`\nГотово: ${chapterFiles.length} глав`);
