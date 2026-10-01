# Systemic Resilience Copilot

A public-safe banking ICT recovery decision-support prototype for Hack Apertus.

## What it does
A synthetic scenario is evaluated through a transparent recovery sequence. The UI identifies the first unresolved or binding recovery weakness, shows the supporting evidence/rule trace, proposes the narrowest justified action, and supports before/after comparison.

**Main demo:** a backup exists, but the same workload recovers in 95 minutes against a 60-minute tolerance. The deterministic engine identifies an execution weakness and blocks premature downstream capacity conclusions.

## Architecture
- browser UI: `index.html`
- deterministic decision logic: embedded public-safe prototype logic
- live AI: same-origin serverless endpoints in `api/apertus/`
- model: `swiss-ai/Apertus-8B-Instruct-2509:publicai`
- provider route: Hugging Face OpenAI-compatible router
- secret: `HF_TOKEN`, server-side only

Apertus explains/challenges a decision. It cannot override the deterministic recovery-state result.

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
6. Run the Case B demo and press **Why? Ask Apertus**.

Do not place the Hugging Face token in GitHub, `index.html`, or screenshots.

## GitHub-only fallback
The static `index.html` can be hosted separately without the AI endpoint. In that mode the deterministic demo still works, but the product must be described as **Apertus-ready**, not live-Apertus-enabled.

## Public-safety boundary
This package does not contain private R2 research files, reviewer material, unpublished manuscript text, real bank confidential data, or deployment credentials.
