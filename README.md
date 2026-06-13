# TOEIC Mastery Simulator

A high-fidelity, fully interactive **TOEIC® Listening & Reading** practice platform.
It functions as a professional exam simulator that trains students toward maximum
scores through authentic items, strict time-management conditioning, and a
mandatory **3-tier professional feedback** system on every question.

Built with **React + Vite**. The entire interface, content, and feedback are in
English, in keeping with the real exam experience.

---

## Features

### Three core modules (Main Menu)

1. **Full Simulation Diagnostic** — a timed cross-section spanning all seven
   parts (Listening 1–4, Reading 5–7) to establish a baseline.
2. **Targeted Section Practice** — drill any single part in small, manageable
   blocks (≈5 questions per set; conversations/talks/passages presented whole).
3. **Pacing & Speed-Hack Drill** — timed drills with per-question target
   countdowns, plus an expandable **Speed-Hack Reference** that teaches
   grammar/vocabulary categorization (Parts 5–6) and keyword-first skimming
   (Part 7).

### Authentic exam mechanics

- **Listening (Parts 1–4)** are rendered as an audio-playback system:
  the script appears inside an `[AUDIO SCRIPT / DESIGNATED ACCENT: …]` frame.
  Read it once, then **hide it** to answer from memory — simulating the single
  audio play and training auditory retention. Items embed real TOEIC audio
  distractors (homophones, repeated words used out of context, misleading
  statements).
- **Reading (Parts 5–7)** include incomplete sentences, text completion (with a
  sentence-insertion blank), and single / double / **triple** passages
  (emails, memos, advertisements, web pages) with cross-reference questions.
- **Active testing** — you must submit your answers for a set before the keys,
  scores, and feedback are revealed.

### The 3-Tier Professional Feedback System

After grading, every question shows:

1. **Correct Answer Analysis** — why the key fits (grammatical / contextual).
2. **Distractor Breakdown** — why each other option is wrong or flawed.
3. **Time-Hack Strategy ⚡** — a pattern-recognition shortcut to solve that item
   type in under ~15 seconds.

### Performance report

Headline score and band (Foundation → Exam-Ready), section and per-part
breakdowns, total time, pacing-target compliance, and a full item review.

---

## AI Mode (optional, hybrid)

The simulator ships with a curated, ready-to-use question bank — **no setup
required**. Optionally, enable **AI Mode** to generate unlimited fresh,
exam-standard items on demand using the Claude API.

- Click **AI Mode** in the header, paste your **Anthropic API key**, choose a
  model (default **Claude Opus 4.8**), and enable it.
- Generated items follow the simulator's internal schema and flow through the
  exact same quiz + 3-tier feedback components as the built-in bank.
- The key is stored only on your device (in-memory + optional `localStorage`)
  and is sent directly from the browser to the Anthropic API via the
  `anthropic-dangerous-direct-browser-access` header.

> ⚠️ Browser-direct API access exposes the key to client-side code. For shared
> or production deployments, route generation through a backend instead of
> entering a key in the browser.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run bundle   # build + inline into ONE self-contained HTML file
```

### Single-file build (open on a phone, offline)

`npm run bundle` produces **`dist/toeic-mastery-simulator.html`** — a single
self-contained file with all CSS and JavaScript inlined and no external
references. Copy it to a phone (AirDrop, cloud drive, email) and open it in any
mobile browser; it runs fully offline. AI Mode remains optional and only
activates if you enter your own Anthropic API key.

The build sets `base: './'`, so `dist/` can be served from any sub-path
(e.g. GitHub Pages project sites) with no extra configuration.

---

## Project structure

```
src/
  main.jsx                 React entry point
  App.jsx                  View state machine (menu → quiz → results)
  styles.css               Theme & layout
  data/
    questionBank.js        Curated TOEIC items (Parts 1–7) + 3-tier feedback
    strategies.js          Speed-hack reference & pacing targets
  ai/
    generate.js            Optional Claude API question generation
  components/
    Banner.jsx             Header / ASCII banner / AI Mode entry
    MainMenu.jsx           Three core modules
    SectionSelect.jsx      Targeted Section Practice picker
    PacingModule.jsx       Timed drills + Speed-Hack Reference
    QuizSession.jsx        Quiz engine (sets, timing, grading)
    Stimulus.jsx           Audio-script / passage / sentence rendering
    FeedbackPanel.jsx      The 3-tier feedback display
    Timer.jsx              Count-up timer with pacing target
    Results.jsx            Performance report
    AISettings.jsx         AI Mode configuration modal
```

---

*TOEIC is a registered trademark of ETS. This is an independent educational
practice tool and is not affiliated with or endorsed by ETS.*
