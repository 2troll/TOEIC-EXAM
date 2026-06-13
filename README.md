# TOEIC Mastery Simulator

A high-fidelity, fully interactive **TOEIC® Listening & Reading** practice platform.
It functions as a professional exam simulator that trains students toward maximum
scores through authentic items, strict time-management conditioning, and a
mandatory **3-tier professional feedback** system on every question.

Built with **React + Vite**. The entire interface, content, and feedback are in
English, in keeping with the real exam experience.

---

## Features

### Exams & modules (Main Menu)

1. **Full Exam** — a complete test across all seven parts (Listening 1–4,
   Reading 5–7), the closest to the real exam experience.
2. **Listening Test** — Parts 1–4 with **spoken audio** (see below).
3. **Reading Test** — Parts 5–7.
4. **Targeted Section Practice** — drill any single part in small, manageable
   blocks (≈5 questions per set; conversations/talks/passages presented whole).
5. **Pacing & Speed-Hack Drill** — timed drills with per-question target
   countdowns, plus an expandable **Speed-Hack Reference** that teaches
   grammar/vocabulary categorization (Parts 5–6) and keyword-first skimming
   (Part 7).

Every exam ends with a **score** and a full **error review**.

### Authentic exam mechanics

- **Listening (Parts 1–4)** play **real spoken audio**. The simulator reads each
  script aloud in its assigned accent (American / British / Australian /
  Canadian) using the device's built-in voices (Web Speech API); two-speaker
  conversations alternate male/female voices. Press **▶ Play audio**, listen,
  then answer — the **transcript stays hidden** (revealable for study), as on
  the real test. Items embed authentic audio distractors (homophones, repeated
  words used out of context, misleading statements).
  *Note: the original ETS recordings are copyrighted and not included; the app
  generates the spoken audio on the device.*
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
mobile browser; it runs fully offline. (Spoken audio uses the device's built-in
voices, so it needs a device with text-to-speech available.)

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
  audio/
    speech.js              Text-to-speech engine for listening audio
  components/
    Banner.jsx             Header / ASCII banner
    MainMenu.jsx           Full Exam, Listening/Reading tests, practice, pacing
    SectionSelect.jsx      Targeted Section Practice picker
    PacingModule.jsx       Timed drills + Speed-Hack Reference
    QuizSession.jsx        Quiz engine (sets, timing, grading)
    Stimulus.jsx           Passage / sentence rendering
    AudioPlayer.jsx        Spoken-audio player for listening parts
    FeedbackPanel.jsx      The 3-tier feedback display
    Timer.jsx              Count-up timer with pacing target
    Results.jsx            Performance report
```

---

*TOEIC is a registered trademark of ETS. This is an independent educational
practice tool and is not affiliated with or endorsed by ETS.*
