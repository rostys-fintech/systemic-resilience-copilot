# Systemic Resilience Copilot — Screen Capture Execution Gate

**Stage:** live product capture
**Required source:** production browser session at `https://systemic-resilience-copilot.vercel.app/`
**Status:** BLOCKED until real browser clips are recorded or uploaded.

## Why this gate exists
The submission video must prove the actual product flow. A local/mock reconstruction is not sufficient for the final hackathon video because it would not prove live Apertus execution.

## Required capture conditions
- Chrome, 1920×1080 if possible, 100% zoom.
- Bookmarks bar hidden; unrelated tabs closed; notifications disabled.
- Production page hard-refreshed before capture.
- Top-right status must visibly show **Apertus live · parse + challenge**.
- Default Northstar synthetic scenario restored.
- Do not capture a run that falls back to the deterministic fixture.

## Seven required raw clips

### 01_hero_product.mp4
Start on the hero. Hold the product name, `Apertus live` status, 95-vs-60 demo fact, and six-step flow. Slow cursor movement only.

### 02_parse.mp4
Click **Structure with Apertus & analyse**. Capture the full extraction progress until the validated facts panel is visible. The final frame must show:
- critical workload populated;
- recovery target = 60 min;
- failure domain = YES;
- recovery route = Independent;
- execution test = Tested;
- observed recovery = 95 min;
- parse tag = **Apertus live**;
- capacity / simultaneous-demand evidence still UNKNOWN.

### 03_decision.mp4
Continue through the deterministic rule animation and hold the final decision. Required visible proof:
- **Recovery is too slow**;
- **95 min > 60 min**;
- next action = repair execution;
- if technical trace is opened, it must show S5 RED / B2 / R-S5-02 / REPAIR_EXECUTION.

### 04_apertus_why.mp4
Click **Why? Ask Apertus**. Capture the live review sequence. Required visible proof:
- **Apertus live review**;
- explanation;
- challenge;
- missing evidence;
- validated evidence/rule references;
- deterministic decision unchanged.

### 05_fix.mp4
Click **Apply the fix**. Capture repair → retest → rerun. Hold the before/after result. Required visible proof:
- observed recovery changes to 45 min;
- S5 passes;
- next state becomes **S6 UNKNOWN**;
- no claim that the system is fully resilient.

### 06_systemic.mp4
Click **Open systemic lens**. Capture Aurora + Meridian + Harbor → ResilienceGrid and the systemic evidence animation. Required final proof:
- S4 PASS;
- S5 PASS;
- simultaneous claimants = 3;
- assured capacity / rights = UNKNOWN;
- **S7 UNKNOWN**;
- refused conclusion: shared recovery resource ≠ B3 capacity shortage.

### 07_close.mp4
Hold a clean product frame for 6–10 seconds. Prefer the product name plus a concise result/evidence frame; no extra cursor movement.

## Capture quality rules
- Record each clip with 1–2 seconds of clean head and tail room for editing.
- Do not narrate while recording; the locked voice-over is already rendered separately.
- Keep browser-native audio muted unless a later edit explicitly needs click sounds.
- Do not expose HF_TOKEN, Vercel settings, GitHub private assets, unpublished R2 material, or any credentials.
- If a live Apertus call fails, discard that take and rerun only the affected clip.

## Current implementation preflight
The current repository build contains all required judge-facing controls and states: hero + six-step flow, `parseBtn`, validated structured facts, deterministic decision card, `whyBtn`, `fixBtn`, before/after card, `systemicBtn`, and the S7 UNKNOWN systemic result.

## Environment limitation recorded
The connected Vercel integration currently denies direct programmatic access to this deployment from the assistant environment. Therefore the final live proof footage cannot be captured truthfully from here without a real browser session. The correct path is to record the seven production clips in the user's browser and upload them; the edit can then be assembled against the already-rendered 146.286-second voice track.

## Gate condition
**PASS only when all seven raw clips exist and the five product-truth proofs are visible:**
1. Apertus live status;
2. live parsed facts;
3. S5 RED / B2 decision;
4. Apertus live review;
5. S6 UNKNOWN → S7 UNKNOWN progression.
