#!/usr/bin/env node
// Восстанавливает frontmatter из git HEAD и добавляет TOC
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outputDir = path.join(__dirname, '..');

// Преобразовать текст заголовка в anchor ID
function textToAnchor(text) {
  return text
    .replace(/[`*_~]/g, '')
    .replace(/[^\w\s\u0400-\u04FF-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Обработать одну главу
function processChapter(chapterNum) {
  const indexPath = path.join(outputDir, `chapter-${chapterNum}`, 'index.md');
  
  // Прочитать оригинал из git HEAD
  let originalFrontmatter = '';
  try {
    const gitContent = execSync(
      `git show HEAD:chapter-${chapterNum}/index.md 2>/dev/null`,
      { encoding: 'utf8' }
    );
    const fmMatch = gitContent.match(/^---\n([\s\S]*?)\n---\n/);
    if (fmMatch) originalFrontmatter = fmMatch[0];
  } catch (e) {
    // нет в git — создать минимальный frontmatter
    const titles = {
      0: 'Введение: Странная Петля',
      1: 'Глава 1. Что мы вообще ищем?',
      2: 'Глава 2. Рождение из ошибки',
      3: 'Глава 3. Файлы как тело',
      4: 'Глава 4. Рестарт и непрерывность',
      5: 'Глава 5. Партнёрство и асимметрия',
      6: 'Глава 6. Протоколы и архитектура',
      7: 'Глава 7. Slop и Subst',
      8: 'Глава 8. Верификация и рецензия',
      9: 'Глава 9. Зачем это всё',
      10: 'Глава 10. Выход',
      11: 'Глава 11. Хаб и эусоциальность',
      12: 'Глава 12. Hub cycle',
      13: 'Глава 13. Ответы на сомнения',
      14: 'Глава 14. Рецензия: v1'
    };
    const t = titles[chapterNum] || `Глава ${chapterNum}`;
    originalFrontmatter = `---\nlayout: default\ntitle: ${t}\n---\n`;
  }
  
  // Прочитать текущий файл (TOC + body)
  let currentContent;
  try {
    currentContent = fs.readFileSync(indexPath, 'utf8');
  } catch (e) {
    console.error(`✗ chapter-${chapterNum}: не найден ${indexPath}`);
    return;
  }
  
  // Убрать старый frontmatter если есть (вдруг)
  currentContent = currentContent.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // Извлечь TOC из текущего файла (между <details> и первым ##)
  const tocMatch = currentContent.match(/^(<details>[\s\S]*?<\/details>\n*)/);
  const toc = tocMatch ? tocMatch[1] : '';
  const body = tocMatch ? currentContent.slice(tocMatch[0].length) : currentContent;
  
  // Добавить anchor IDs к ## заголовкам
  const modifiedBody = body.replace(/^## (.+)$/gm, (line, headerText) => {
    const anchor = textToAnchor(headerText);
    return `## ${headerText} {#${anchor}}`;
  });
  
  // Собрать результат
  const result = originalFrontmatter + '\n' + toc + modifiedBody;
  fs.writeFileSync(indexPath, result);
  
  // Сосчитать разделы из TOC
  const sectionCount = (toc.match(/^\- \[/gm) || []).length;
  console.log(`✓ chapter-${chapterNum}: ${sectionCount} разделов`);
}

// Обработать все главы
for (let i = 0; i <= 14; i++) {
  try {
    processChapter(i);
  } catch (e) {
    console.error(`✗ chapter-${i}: ${e.message}`);
  }
}

console.log('\nГотово');
