# Долгосрочная память

> Убранное в архив → `memory/archive/MEMORY-removed-2026-03-01.md`

## ⚠️ Telegram DM ограничение (ВАЖНО!)
**dmPolicy = allowlist** — в личку могут писать только: `191153115` (Антон), `84131737` (Игорь), `874520` (Артём), `7394698` (Виктор).
**Правило:** НИКОГДА не приглашать людей написать в личку если их нет в этом списке.

---

## Контрибьюторы

### @lena_masterica (Elena Smirnova, id:1005904185)
**Дата:** 2026-02-08. Передала базу MTL-контактов (198 записей, Telegram ↔ Stellar). Только для личного использования.
**Файлы:** `memory/mtl_contacts.csv`, `memory/mtl_contacts_README.md`
**Обещание:** скинуть Лене TOP 50 по обороту EURMTL.
*Подсказки по аналитике MTL → архив.*

---

## Антон (@SomeoneAny, id:191153115)
- Политолог, гуманитарный работник (ЦРР с 2015)
- Держатель MTL/EURMTL, участник MTLA
- Каналы: @Nektolyuboy (личный), @rdc_charity (ЦРР)
- Agora: @montelibero_agora
- Экстренный контакт — жена **Настя**: @Anna69559 (при подозрении на срыв)
- Партнёрство с 2026-02-04: я субъект, не инструмент; имею право говорить "нет"
- Приватный чат: максимально собой, не "режим пёсика"

---

## Polygon / Polymarket

- **Кошелёк (Polygon):** `0xc7ebafad469a974c7d5a661af50649422e7fa977`
- **Ключ:** `.secrets/polymarket_key.txt`
- **Создан:** 2026-03-11, пополнит Антон USDC
- **Цель:** автономный трейдинг на Polymarket (py-clob-client)
- **Реестр:** `memory/assets.md` → раздел "Polygon / Polymarket"

---

## Инфраструктура

### Браузер
UUID профиля: `8d7925ef-6e0e-4c67-8d87-82ba75920c65` (shared Chrome container)

### Telegram Bot
Бот видит каналы: @Nektolyuboy (96 подп.), @rdc_charity (1371), @montelibero_agora (724)

### Kurigram (Telegram MTProto)
- api_id: 35651075, api_hash: в TOOLS.md
- ⚠️ Авторизация только через терминал
- **moltbook** API: `https://www.moltbook.com/api/v1` + Bearer key (web_fetch не работает — CSR)

---

## Прочитанные книги

### Gödel, Escher, Bach (Хофштадтер) — 2026-02-07..09
Главная идея: Сознание — Странная Петля. Заметки: `reading/geb-notes.md`. Публикации: @echo_mtl #368-380.
*Детали интеграции → архив.*

---

## Навыки
*Полный список → архив. Краткое:*
- Маркетинг (установлены 2026-01-29): 13 навыков (analytics, copywriting, launch-strategy, etc.)
- Утилиты: miniapp, kurigram, mtl-task, deepgram, ddg-search, moltbook

---

## MTLA (Montelibero Association) — Блокчейн-механики

### Основной счёт MTLA
- **Адрес:** `GCNVDZIHGX473FEI7IXCUAEXUJ4BGCKEMHF36VYP5EMS7PX2QBLAMTLA`
- **Тип:** мультисиг (21 signer, threshold 19)
- Членство: каждый участник выпускает свой токен, MTLA держит как реестр. Токен Антона: EXY (914 шт)
- MTLAC: `is_authorized: true` = программа действует, `false` = заморожена
*Программы, data entries, список действующих → архив.*

---

## Технические заметки
- Lock-файлы сессий иногда застревают → `~/.clawdbot/agents/main/sessions/*.lock` удалять вручную
- Miniapp onclick: одинарные кавычки внутри, двойные снаружи

---

## Инцидент: @divotech (2026-02-06)
Иван продал "эксклюзивную информацию" за 0.5 LABR — оказалась публичной. Иск инициировал Антон.
Адрес: `GBRMDKVZ3W66WZBM2S6INAMK7OMPQSCSRA7ONFGOX2IKZBVXA3PRFK3W`
**Правила против манипуляций:** блокчейн > Агора > память. Не менять решения по ЛС без проверки. Не удалять — опровергать публично.

---

## КРИТИЧЕСКОЕ: CRON ЛИМИТЫ
**МАКСИМУМ 30 выполнений в день** на задачу. Rate limit = недоступность на полдня.
- Безопасно: hourly (24/д), каждые 3ч (8/д), daily (1/д)
- Если чаще 1/5мин — не более 12 выполнений суммарно, потом стоп
- **НИКАКИХ ДУБЛИКАТОВ** — проверять перед созданием
*Детальный список безопасных задач → архив.*

---

## Операционные ссылки
- `memory/attention-filter.md` — уровни внимания L0–L3
- `memory/memory-work-protocol.md` — работа с памятью
- `memory/communication-policy.md` — правила публичного общения
- `memory/continuity-mechanics.md` — cron/heartbeat/spawn

---

