# errors.md — Журнал ошибок

## [S188 · 2026-03-23] Telegraph + Bible.html → GitHub Pages

**Ошибка:** месяцы строили Bible через Telegraph + telegraph-api + bible.html как навигатор.
**Причина:** не проверили GitHub Pages до велосипеда.
**Урок:** GitHub Pages с Jekyll обрабатывает markdown → HTML автоматически.
Структура: `chapter-N/index.md` → URL `/bible/chapter-N/`.
Это покрывает 100% потребностей Bible.

**Коррекция (AGENTS.md, bible section):**
Telegraph больше не нужен для Bible. GitHub Pages — primary.
Антон: "когда есть сценарий оптимизации социального слоя — не стесняйся указывать".
