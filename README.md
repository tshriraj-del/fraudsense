# FraudSense 2.0

An LLM-powered fraud investigation copilot for analysts. Paste a raw case
description and FraudSense runs a 4-stage investigation with the Anthropic API:

1. **Signal Extraction** — every fraud signal, with strength + category
2. **Fraud Classification** — primary/secondary fraud type + confidence
3. **Root Cause Analysis** — attack narrative, entry point, blast radius, watch-for
4. **Recommended Action** — Approve / Decline / Escalate / Monitor

## Evidence attachments

Analysts can attach up to **5 files** (≤ 8 MB each) alongside the case text:

- **Text** (`.txt .csv .tsv .json .log .md .eml .html`) — contents are folded
  into the case description.
- **Images** (`.png .jpg .jpeg .gif .webp`) — sent as native vision blocks for
  reading transaction/chat screenshots.
- **PDF** (`.pdf`) — sent as a document block.

A case can be investigated from attachments alone (no free-text required).

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Anthropic Messages API via `fetch()`

## Setup

```bash
npm install
cp .env.example .env   # then add your key
npm run dev
```

Add your key to `.env`:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

The key is read from the environment at build time and never hardcoded.
`.env` is gitignored. Restart the dev server after changing it.

> **Note:** This app calls the Anthropic API directly from the browser using
> the `anthropic-dangerous-direct-browser-access` header. That exposes the key
> to anyone with access to the running page. It is fine for local/internal use;
> for production, proxy the request through a backend that holds the key.

## Project structure

```
fraudsense/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx              # state, API orchestration, error handling
│   ├── api.js               # Anthropic client + 4-stage prompt + JSON parsing
│   ├── constants.js         # case types, examples, enum→style maps
│   ├── report.js            # markdown export builder
│   ├── index.css            # design tokens + Tailwind layers
│   └── components/
│       ├── Header.jsx
│       ├── InputSection.jsx       # textarea, case type, examples, context panel
│       ├── ResultsSection.jsx     # layout + Copy Report / New Case
│       ├── SignalsPanel.jsx       # Panel 1
│       ├── ClassificationPanel.jsx# Panel 2
│       ├── RcaPanel.jsx           # Panel 3
│       ├── RecommendationPanel.jsx# Panel 4
│       ├── SkeletonLoader.jsx
│       └── Icons.jsx
└── tailwind.config.js
```

## Building for production

```bash
npm run build
npm run preview
```
