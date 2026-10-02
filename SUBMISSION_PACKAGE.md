# Hack Apertus — Submission Package

Project: **Systemic Resilience Copilot**  
Track: **2B — Apertus Adoption: Own Project**

## Project name

**Systemic Resilience Copilot**

## Tagline

**AI-assisted banking ICT recovery decisions with transparent rules and evidence.**

## One-line pitch

Apertus turns messy recovery scenarios into structured evidence, while deterministic rules identify the first binding or unresolved recovery condition and the next justified action.

## 10-second pitch

A backup on paper is not the same as executable recovery. Systemic Resilience Copilot uses Apertus plus transparent recovery rules to show which recovery assumption fails first, why, and what is justified next.

## Short description

Systemic Resilience Copilot is a public-safe decision-support prototype for banking ICT recoverability. Apertus parses normal-language recovery scenarios and later challenges/explains the result, while deterministic rules preserve `UNKNOWN`, stop at the first binding condition, and prevent unsupported downstream conclusions. The main demo shows 95-minute recovery against a 60-minute tolerance, producing S5 RED / B2; after a narrow fix, the workflow exposes the next evidence gap instead of declaring full resilience.

## Full Devpost-style description

### Inspiration

Operational-resilience reviews contain many lists of providers, backups and controls, but those lists do not prove that a critical banking workload can actually recover in time. The key question is more operational: **which recovery assumption fails first, and what should be tested or changed next?**

### What it does

The product runs an ordered evidence-to-decision workflow:

**Scenario → Apertus → validated evidence → deterministic rules → decision → Apertus challenge/explanation → fix → systemic lens**

Apertus extracts only explicitly stated recovery facts. Missing information remains `UNKNOWN`. Deterministic rules then identify the first binding or unresolved recovery condition. After the decision is fixed, Apertus can challenge the interpretation, explain the result and surface missing evidence, but cannot overwrite the rule state.

In the main synthetic case, the same workload recovers in 95 minutes against a 60-minute tolerance. Recovery independence passes, but execution does not, so the workflow stops at **S5 RED / B2 / REPAIR_EXECUTION**. After the execution time is improved to 45 minutes, S5 passes and the next unresolved state is **S6 UNKNOWN**. Only then does the systemic lens open. A supporting case with three synthetic institutions reaches **S7 UNKNOWN** because assured recovery capacity, priority and coordination are not established.

### How we built it

- Apertus 8B for scenario parsing and post-decision challenge/explanation;
- constrained JSON schema and host validation;
- narrow explicit-fact reconciliation for facts literally present in the scenario;
- deterministic JavaScript decision rules;
- public-safe synthetic demo cases;
- Vercel deployment;
- GitHub Actions validation and production smoke testing;
- server-side secret handling for the live model endpoint.

### Challenges

The hardest product challenge was preventing a language model from becoming the hidden decision-maker. The architecture therefore separates language understanding from state transition. Apertus handles unstructured evidence and explanation; deterministic rules remain authoritative. A second challenge was model extraction variability, which was addressed with host-side reconciliation that can restore only explicit facts and may not infer adequacy, probability or systemic risk.

### Accomplishments

- working public browser prototype;
- live Apertus integration before and after the decision;
- production smoke proof for the canonical 60/95 → S5 RED/B2 path;
- transparent first-RED / first-UNKNOWN rule sequence;
- a systemic lens that refuses to infer a capacity shortage from shared exposure alone;
- public-safe evidence boundary;
- reproducible public repository and demo video.

### What we learned

For high-stakes resilience workflows, the useful role for an LLM is not to output a risk score. It is stronger when it helps convert messy language into a constrained evidence problem, explains a transparent decision, and makes missing evidence visible.

### What's next

The next product step is to integrate richer private or supervisory evidence sources, add configurable institution-specific rule packs, and test the workflow with domain experts. A sovereign deployment can also replace the current hosted inference route with a compatible self-hosted Apertus endpoint while preserving the same UI and deterministic decision engine.

## Why Apertus is substantive

**Before the decision** Apertus:
- parses natural-language recovery scenarios;
- extracts explicit facts;
- preserves missing facts as `UNKNOWN`.

**After the decision** Apertus:
- challenges the interpretation;
- explains the fixed result;
- surfaces missing evidence;
- references supplied evidence/rules.

The model does not set the deterministic recovery state.

## Judging-criteria alignment — Track 2B

### Purposeful use of AI

Apertus performs the language-heavy steps that fixed rules do poorly: unstructured extraction, challenge and explanation. It is not added as decoration and it is not allowed to replace the rule engine.

### Technical rigour

The prototype uses constrained schemas, enum/numeric validation, explicit-fact reconciliation, deterministic rules, safe release classes, server-side credentials, local QA, production smoke testing and documented claim boundaries.

### Value, cost & scalability

The workflow uses the LLM narrowly: one parse call and one optional explanation call. Deterministic evaluation is local. This reduces model dependence, keeps the architecture inspectable and supports batch processing. No unsupported fixed inference-cost claim is made because cost depends on the deployment provider.

### Sovereign deployability

The system uses an open Apertus model and a configurable API base. The current public demo uses hosted inference for accessibility, but the adapter can target another compatible Apertus endpoint. A fully air-gapped inference server is not demonstrated in this prototype and is stated as future deployment work.

### Implementation feasibility

The system is already deployed, the full decision path works in-browser, and the production live-Apertus smoke gate passes the canonical scenario.

## Main proof path

**95 min > 60 min → S5 RED / B2 → REPAIR_EXECUTION → 45 min → S6 UNKNOWN → Systemic lens → S7 UNKNOWN**

## Key guardrails

- shared provider ≠ shared failure;
- backup existence ≠ executable recovery;
- provider diversity ≠ demonstrated independent recoverability;
- shared recovery exposure ≠ proven capacity shortage;
- `UNKNOWN` remains `UNKNOWN`;
- no event probability or provider-danger score;
- public evidence is not presented as equivalent to confidential supervisory information.

## New project / pre-existing work boundary

The **Systemic Resilience Copilot product implementation was built during Hack Apertus**. The new hackathon output includes the public UI, live Apertus integration, parse/explanation contracts, deterministic workflow implementation, host-side reconciliation, evidence UX, systemic lens, public-safe synthetic cases, deployment, production smoke test and submission/demo materials.

The project is informed by pre-existing research on banking ICT recoverability. That research remains separate background IP. The public hackathon repository does not contain unpublished manuscript text, private workbooks, reviewer-sensitive files, confidential bank data or private repository contents.

## Dataset field

**Not applicable.** The prototype does not depend on a submitted external dataset. All demo scenarios are synthetic and public-safe.

## Built with

- Apertus 8B (`swiss-ai/Apertus-8B-Instruct-2509:publicai`)
- JavaScript
- HTML / CSS
- Vercel
- Hugging Face OpenAI-compatible routing for the current live demo
- GitHub / GitHub Actions

## Links

**Live demo**  
https://systemic-resilience-copilot.vercel.app/

**Public source repository**  
https://github.com/rostys-fintech/systemic-resilience-copilot

**Technical report**  
https://github.com/rostys-fintech/systemic-resilience-copilot/blob/main/TECHNICAL_REPORT.md

**Submission video**  
Final file prepared: `Systemic_Resilience_Copilot_SUBMISSION_FINAL_1080p.mp4`  
Public video URL: **TO ADD when the submission form confirms its accepted video-hosting format.**

## Suggested screenshot set

1. Hero + `95 minutes vs 60` + visible Apertus live status.
2. Decision view: `Recovery is too slow` / `S5 RED · B2`.
3. Systemic lens: three synthetic institutions + `S7 UNKNOWN` + refused shortage conclusion.

## Licensing

- Source code: **Apache License 2.0** (`LICENSE`)
- Documentation/design/text: **CC BY 4.0** (`LICENSE-DOCS`)
- Submitted dataset: none

## Current submission status

### READY
- project title;
- track selection;
- tagline;
- short and long description;
- technical report;
- public repository;
- live demo;
- judging-criteria answers;
- open-source licensing;
- production proof;
- final 1080p demo video file.

### STILL EXTERNAL / FORM-DEPENDENT
- exact Devpost submission-form fields once the organizer exposes them;
- public-hosted video URL in the format accepted by the form;
- participant/team profile fields;
- final submit action.

## Deadline

**16 October 2026, 12:00 CEST. No extension.**
