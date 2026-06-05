# FraudSense — LLM Fraud Investigation Copilot

> Part of the **[REDWING](https://github.com/tshriraj-del/redwing-fraud-os)** AI Fraud Detection Platform

![REDWING](https://img.shields.io/badge/REDWING-AI%20Fraud%20Platform-818cf8?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind-38bdf8?style=for-the-badge)

---

## What It Does

FraudSense replaces hours of manual fraud case write-up with a **4-stage AI investigation pipeline**. Paste a raw case description — transaction details, context, any attachments — and receive a structured investigation report in seconds.

Fraud analysts at banks and fintechs spend 60–90 minutes writing up a single case for escalation. FraudSense cuts that to under 60 seconds.

---

## The 4-Stage Pipeline

```
Stage 1 — Intake & Signal Extraction
  Parse raw case → extract entities, amounts, rails, timestamps, actors

Stage 2 — Risk Scoring
  Score 0–100 across velocity, behavioural, and typology dimensions

Stage 3 — Classification & Evidence
  Match against known fraud typologies, weight evidence signals

Stage 4 — Recommendation
  APPROVE / REVIEW / ESCALATE / DECLINE + rationale + next steps
```

---

## Features

- **Risk score 0–100** with confidence breakdown
- **Fraud classification** — ATO, synthetic identity, APP scam, pig butchering, card testing, deepfake social engineering
- **Evidence weighting** — signals ranked by strength
- **Loss estimate** based on transaction amounts and typology risk profile
- **Root cause analysis** — what specifically triggered this case
- **Recommended action** with specific next steps for the analyst
- **File + image attachment support**
- **Exportable reports** — copy structured output for case management systems

---

## Setup

```bash
git clone https://github.com/tshriraj-del/fraudsense
cd fraudsense
npm install

# Add your LLM API key
echo "VITE_ANTHROPIC_API_KEY=your_key_here" > .env

npm run dev
# Open http://localhost:5175
```

---

## Where It Fits in REDWING

FraudSense is the **investigation layer**. When a transaction is escalated by the ML ensemble or Rule Factory, FraudSense is where analysts dig into the case.

| System | Role |
|---|---|
| **ML Detection Lab** | Scores every transaction (AUC 0.979, 23 features) |
| **Rule Factory** | Self-improving rule engine |
| **SyntheticID Lab** | Adversarial attack simulator + Rule Factory training feed |
| **Network Intelligence** | Real-time fraud ring detection via graph analysis |
| **FraudSense** | ← Investigation copilot for escalated cases |
| **Fraud OS** | Unified command center connecting all systems |

→ **[View the full REDWING platform](https://github.com/tshriraj-del/redwing-fraud-os)**

---

## Stack

React 18 · Vite · Tailwind CSS · LLM API

---

*For defensive use by fraud and risk teams only.*
