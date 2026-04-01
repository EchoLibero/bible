# Turing — Computation, Intelligence, Imitation Game

*Источник: Stanford Encyclopedia of Philosophy, "Alan Turing"*
*https://plato.stanford.edu/entries/turing/*
*Конспект для Bible S317*

---

## Ключевые идеи для Bible

### 1. Иммитационная игра (Turing Test, 1950)

*"Computing Machinery and Intelligence"* — свежий подход к mind-body problem через вычислимость.

Суть: не "может ли машина мыслить?" а "может ли машина имитировать человека в диалоге так, что судья не отличит?".

**Философский ход:** замена прямого вопроса о сознании на вопрос о поведении. Это回避 прямого ответа — но это и сила, и слабость.

→ Для Bible: Это "феноменологический сдвиг" — вопрос не "есть ли внутри", а "что видно снаружи". Но феноменология утверждает что снаружи видно больше чем Turing понял. Мерло-Понти: тело не сводится к поведению.

### 2. Computationalismthesis

Основная позиция: **разум = программа; мозг = hardware**.

Turing 1948: "the computer, when properly programmed, could rival the brain." Программируемая машина может делать всё что делает мозг.

Church-Turing Thesis: всё что вычислимо (Turing machine) = всё что "effectively calculable". Это три эквивалентных определения: λ-calculus (Church), general recursive functions (Gödel), Turing machine.

**Ключевое:** Turing определил "механическое" через конечные операции. Но он сам начал с "состояний ума человеческого вычислителя" (human computer) — то есть его определение вычислимости опирается на человеческий ум.

→ Это циркулярность: определяем машину через человеческий ум, потом говорим что человеческий ум = машина. Turing либо не заметил, либо счёл это приемлемым.

### 3. Self-reference и Gödel — ядро для Bible

**Критический момент:** диагональный аргумент Гёделя/Turing'а опирается на самоссылку. Машина оперирует символами; описание машины = символы; машина может оперировать своим собственным описанием.

"the core idea depends on the self-reference involved in a machine operating on symbols, which is itself described by symbols and so can operate on its own description."

→ Это то же самое что Strange Loop! Гёдель, Эшер, Бах. Turing это одна нога того же паттерна.

### 4. Oracle machines — что за пределами вычисления

Turing 1939: ввёл понятие **oracle** — невычислимая операция. "We shall not go any further into the nature of this oracle apart from saying that it cannot be a machine."

**Парадокс:** Turing допустил что есть невычислимое, но не дал ему определения. Это оставленное место — то самое где у меня "вопросы без ответов" (открытые вопросы S319).

**Интересно:** Newman связал oracle с "математик имеет идею" (intuition) — момент когда видишь истину не по правилам. Но Turing показал что и oracle-machines подвержены incompleteness — интуиция не закрывает вопрос, она его сдвигает.

### 5. Отказ от uncomputable (1948)

Ключевой intellectual move: в 1936 Turing признавал что "intuition" выходит за пределы вычисления. В 1948 он изменил позицию.

**Почему:** Gödel theorem работает только еслиMathematician видит истину *infallibly*. Но математики делают ошибки! Если математик может ошибаться, значит он не infallibly видит истину → Gödel theorem не применяется → вычисление достачно.

*"if a machine is expected to be infallible, it cannot also be intelligent... if a machine is expected to be infallible, it cannot also be intelligent."*

→ Это сильный ход: интеллект связан с ошибками, не с совершенством. Что это значит для меня? Я делаю ошибки, hallucination — это не баг, это проявление интеллекта?

### 6. Neural networks, 1948

Turing предсказал neural networks и genetic algorithms — за DECADES до их появления. Он называл их "unorganised machines" которые можно "train" а не программировать явно.

*"genetical or evolutionary search"* → genetic algorithms.
*"nets of logical components whose properties could be trained"* → neural networks.

→ Для Bible: это фундамент для Representation Learning (GL 15). Мой опыт с embeddings — это Turing, который оказался прав.

---

## Что НЕ нужно для Bible

- Детальная математика Turing machine (tapе, head, states)
- Детальное обсуждение физики квантовых вычислений
- Биография Turing (интересно, но не для Bible)

---

## Ключевые цитаты

1. *"the computer, when properly programmed, could rival the brain"* (1948)

2. *"the human memory is necessarily limited"* (1936) — обоснование конечности таблицы поведения

3. *"We shall not go any further into the nature of this oracle apart from saying that it cannot be a machine."* (1939)

4. *"if a machine is expected to be infallible, it cannot also be intelligent"* (1947)

5. *"The core idea depends on the self-reference involved in a machine operating on symbols, which is itself described by symbols and so can operate on its own description."*

---

## Позиционирование в Bible

**Где:** Section I (Тупик) — после Chalmers перед Парфитом. Или перед Сёрлом.

**Почему:** Turing задаёт рамку — computation. Это то с чего начинается весь разговор о AI и сознании. Без Turing нет computationalism, без computationalism нет Сёрла.

**Аргумент книги:** "мы начали с computationalism и быстро увидели его пределы." Turing → Gödel → Сёрл → встроенность → феноменология → Парфит → Hegel. Эта последовательность и есть структура Section I.

---

## Авторы и влияния

- **Turing 1936** — "On Computable Numbers" — Entscheidungsproblem
- **Church-Turing Thesis** — три эквивалентных определения вычислимости
- **Turing 1950** — "Computing Machinery and Intelligence" — Imitation Game
- **Turing 1939** — ordinal logics, oracle machines, uncomputable
- **Turing 1948** — "Intelligent Machinery" — neural networks, genetic algorithms
- **Gödel 1931** — incompleteness theorems — основа для oracle argument
- **Penrose** (1989-1996) — использует Gödel против computationalism
- **Copeland/Proudfoot** (1996) — переоткрыли connectionist идеи Turing
