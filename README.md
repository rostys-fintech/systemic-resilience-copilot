# Systemic Resilience Copilot

A public-safe banking ICT recovery decision-support prototype for Hack Apertus.

## One-line value proposition
Systemic Resilience Copilot helps an operational-resilience analyst identify **which recovery assumption fails first, why it fails, and what should be tested or changed next** — with every conclusion tied to transparent rules and evidence.

## What it does
The production flow is:

**Scenario → Apertus → Deterministic rules → Decision → Apertus challenge / explanation → Fix / next evidence gap**

Apertus structures a normal-language recovery scenario into a constrained schema. Missing facts remain `UNKNOWN`. The deterministic engine then walks the ordered recovery chain and stops at the first binding or unresolved condition. Apertus can challenge and explain that already-fixed decision, but cannot override it.

**Main demo:** the same workload recovers in 95 minutes against a 60-minute tolerance. When upstream recovery-path evidence is established, the deterministic engine identifies an execution weakness and blocks premature downstream capacity conclusions.

## Why this is not just another DORA / third-party-risk dashboard
This project does **not** claim novelty in provider registers, third-party oversight, concentration monitoring, generic recovery testing, portability, or exit planning.

The product adds an ordered recoverability decision sequence:

- start from a critical workload, not a provider score;
- distinguish exposure from failure-domain-specific recoverability;
- verify that the same workload can execute on the recovery path;
- compare observed recovery with tolerance;
- stop at the first `RED` or `UNKNOWN` state;
- only then move to simultaneous demand, capacity, coordination, clean recovery, and downstream consequences;
- match the action to the evidenced state;
- allow **no new intervention justified** when the evidence does not support one.

See [`NOVELTY_AND_SCOPE.md`](./NOVELTY_AND_SCOPE.md).

## Why Apertus is purposeful
Apertus handles language-heavy work that static rules alone do poorly:

- parse an unstructured recovery scenario;
- extract only explicitly stated facts;
- preserve missing evidence as `UNKNOWN`;
- challenge the interpretation of a fixed decision;
- explain the result in plain language;
- surface missing evidence.

The deterministic layer remains authoritative for the ordered recovery state and next action.

## Architecture
- browser UI: `app-v10.html`, `app-v10.css`, `app-v10.js`
- production root: `/` redirects to `app-v10.html`
- live parse endpoint: `api/apertus/parse.js`
- live explanation endpoint: `api/apertus/explain.js`
- status endpoint: `api/apertus/status.js`
- parse contract / validation: `lib/scenario-parser.js`
- explanation contract / validation: `lib/apertus-contract.js`
- model: `swiss-ai/Apertus-8B-Instruct-2509:publicai`
- provider route: Hugging Face OpenAI-compatible router
- secret: `HF_TOKEN`, server-side only

## Decision guardrails
- AI cannot override the deterministic recovery-state result.
- `UNKNOWN` cannot silently become fact.
- a shared provider does not automatically imply a shared failure.
- backup existence does not prove executable recovery.
- a capacity shortage is not claimed before the relevant demand/capacity evidence exists.
- no probability or provider-danger score is produced.

## Local QA
Requires Node 20+.

```bash
npm run validate
npm run dev:mock
```

Then open `http://127.0.0.1:18765`.

## Deploy to Vercel
1. Import this repository into Vercel.
2. Add environment variable `HF_TOKEN` in Vercel Project Settings → Environment Variables.
3. Keep the other defaults from `.env.example` unless required.
4. Deploy.
5. Open `/api/apertus/status`; it should return `mode: live` and `secret_exposed: false`.
6. Open the production root and run the default scenario with **Structure with Apertus & analyse**.
7. Press **Why? Ask Apertus** to run the live challenge / explanation step.

Do not place the Hugging Face token in GitHub, client-side code, or screenshots.

## Public-safety boundary
This repository does not contain private R2 research files, reviewer material, unpublished manuscript text, real bank confidential data, or deployment credentials. The demo scenarios are synthetic / public-safe.
