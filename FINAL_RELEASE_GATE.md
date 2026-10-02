# Systemic Resilience Copilot — Final Release Gate

Date: 2026-10-02

## Release verdict

**BLOCKED — one production-proof blocker remains.**

The public package, submission story, safety boundary and final video are ready. The only release blocker is the live Apertus parse path for the default Northstar scenario: the latest observed production run did not preserve all explicit fields and therefore stopped at S3 UNKNOWN instead of the intended S5 RED / B2 state.

## Gate checklist

### 1. Public repository — PASS
- Public repo is present and current.
- README describes the production flow and architecture.
- Novelty, systemic lens, evidence boundary and behavioral audit are documented.
- No private R2 repository reference was found in the public code search.

### 2. Secret / credential hygiene — PASS
- Public-safe manifest excludes deployment credentials and private research assets.
- Repository code search returned no `hf_` token string.
- `HF_TOKEN` remains described as server-side only.

### 3. Public-safety / science boundary — PASS
- Synthetic/public-safe scenarios only.
- No provider-danger score or event probability.
- Shared recovery exposure is not converted into a B3 shortage claim without demand/capacity evidence.
- UNKNOWN remains an allowed terminal state.
- Frozen R2 science is not rewritten by the hackathon product layer.

### 4. Submission story — PASS
Canonical judge flow is locked:

Scenario → Apertus → Rules → Decision → Why / Fix → Systemic lens

Intended proof path:

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
Latest repository commit checked for deployment status:
- commit: `4b6fc83b3acf1b9e23e93eba89f1960f01ecb9da`
- Vercel status: SUCCESS.

### 7. Live Apertus status — PASS from existing proof
Existing proof records:
- configured: true
- mode: live
- model: `swiss-ai/Apertus-8B-Instruct-2509:publicai`
- secret_exposed: false.

### 8. Live Apertus explanation / challenge — PASS from existing proof
Existing production evidence shows Apertus returning a live explanation/challenge while preserving the deterministic decision and exposing missing evidence.

### 9. Live Apertus parse — BLOCKER
Latest observed production screenshots show:
- Apertus live is active;
- 60-minute target is preserved;
- 95-minute observed recovery is preserved;
- independent route and tested state are preserved;
- but `critical_workload` and `failure_domain_known` remain UNKNOWN;
- deterministic rules therefore stop at S3 `Failure domain is not proven` instead of S5 RED / B2.

This fails the canonical submission proof path.

The current parser prompt already contains explicit field-level instructions for the Northstar wording, so prompt-only hardening is not enough evidence of closure.

## Exact release closure

Do not submit as FINAL until the production parse path is made robust and one production-level smoke test proves the following from the default Northstar text:

- critical workload = stated retail-payments workload;
- recovery target = 60 min;
- failure domain known = YES;
- recovery route outside failure domain = YES;
- same workload supported = YES;
- execution tested = YES;
- observed recovery = 95 min;
- simultaneous demand = UNKNOWN;
- capacity = UNKNOWN;
- deterministic result = S5 RED / B2 / REPAIR_EXECUTION.

## Recommended technical closure path

Add a narrow host-side explicit-fact reconciliation layer after Apertus extraction and before deterministic rules. It may only recover facts that are literally present in the submitted scenario and must never infer downstream risk, capacity shortage, probability, or adequacy. Then add an automated production smoke test against `/api/apertus/parse` using the canonical synthetic Northstar scenario and fail CI unless the exact S5/B2 preconditions are returned.

This keeps the architecture intact:
- Apertus still performs the language extraction;
- host validation prevents loss of explicit facts;
- deterministic rules remain authoritative;
- UNKNOWN remains UNKNOWN when no explicit fact exists.
