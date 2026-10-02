# Systemic Resilience Copilot — Final Release Gate

Date: 2026-10-02

## Release verdict

**READY — all internal release gates pass.**

The public package, deployment, live Apertus path, submission story, public-safety boundary and final video are internally release-ready. External hackathon form fields, upload limits and submission-window requirements remain separate from this technical gate.

## Gate checklist

### 1. Public repository — PASS
- Public repo is present and current.
- README describes the production flow and architecture.
- Novelty, systemic lens, evidence boundary and behavioral audit are documented.
- No private R2 repository reference was found in the public code search.

### 2. Secret / credential hygiene — PASS
- Public-safe manifest excludes deployment credentials and private research assets.
- Repository code search returned no exposed Hugging Face token value.
- `HF_TOKEN` remains server-side only.
- Production smoke output reports `secret_exposed: false`.

### 3. Public-safety / science boundary — PASS
- Synthetic/public-safe scenarios only.
- No provider-danger score or event probability.
- Shared recovery exposure is not converted into a B3 shortage claim without demand/capacity evidence.
- UNKNOWN remains an allowed terminal state.
- Frozen R2 science is not rewritten by the hackathon product layer.

### 4. Submission story — PASS
Canonical judge flow is locked:

Scenario → Apertus → Rules → Decision → Why / Fix → Systemic lens

Proof path:

95 min > 60 min → S5 RED / B2 → repair execution → 45 min → S6 UNKNOWN → systemic lens → S7 UNKNOWN.

### 5. Final submission video — PASS
Verified final artifact:
- `Systemic_Resilience_Copilot_SUBMISSION_FINAL_1080p.mp4`
- 1920×1080
- 30 fps
- H.264
- duration 146.267 s (~2:26.3)
- burned-in English captions
- reconstructed public-safe product walkthrough, not represented as continuous live capture.

### 6. Deployment status — PASS
Live-parse code and smoke-gate commit:
- `14ad08d19127934124dd2865b61ae9eb3cbb3a7b`
- Vercel status: SUCCESS.

### 7. Live Apertus status — PASS
Production proof records show:
- configured: true
- mode: live
- model: `swiss-ai/Apertus-8B-Instruct-2509:publicai`
- secret exposure blocked.

### 8. Live Apertus explanation / challenge — PASS
Existing production evidence shows Apertus returning a live explanation/challenge while preserving the deterministic decision and exposing missing evidence.

### 9. Live Apertus parse — PASS
The production path now includes narrow host-side explicit-fact reconciliation after Apertus extraction. It may only restore facts literally present in the scenario and cannot infer downstream risk states.

Automated production smoke proof:
- GitHub Actions run: `37000909044`
- workflow job: `production-smoke`
- conclusion: SUCCESS
- first attempt HTTP: 200
- mode: live
- model: `swiss-ai/Apertus-8B-Instruct-2509:publicai`
- critical workload: `retail payments processing service`
- recovery target: 60 min
- failure domain known: YES
- recovery route outside failure domain: YES
- same workload supported: YES
- execution tested: YES
- observed recovery: 95 min
- simultaneous demand: UNKNOWN
- capacity: UNKNOWN
- deterministic expected result: S5 RED / B2 / REPAIR_EXECUTION
- parse latency observed in smoke: 4321 ms
- secret_exposed: false

Closure log line:
`PASS: production live Apertus parse -> 60/95 -> S5 RED/B2`

See `LIVE_PARSE_CLOSURE.md` for the exact closure record.

## Final internal release result

**READY FOR SUBMISSION PACKAGE ASSEMBLY.**

No remaining internal science, product, live-Apertus, deployment, public-safety or video blocker is recorded in this gate.

Before pressing the external hackathon submit button, only verify the platform-specific form requirements, required links, upload/hosting limits, deadline, and any mandatory team/profile fields.
