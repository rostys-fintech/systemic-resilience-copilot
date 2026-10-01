# Hack Apertus — Submission Story / Demo Script

Product: **Systemic Resilience Copilot**

Purpose: one canonical judge-facing story. The video should show the working product, not explain the research paper.

## One-line story

**A backup on paper is not the same as executable recovery. Systemic Resilience Copilot uses Apertus plus transparent recovery rules to show which recovery assumption fails first, why, and what is actually justified next.**

## 10-second pitch

Banks can map dependencies and backups, but that does not prove they can recover the critical workload in time. The Copilot finds the first binding or unresolved recovery condition and points to the next justified action.

## 30-second pitch

Systemic Resilience Copilot is an AI-assisted decision-support tool for banking ICT recoverability. Apertus converts a normal-language recovery scenario into structured evidence, while deterministic rules preserve UNKNOWN and identify the first binding or unresolved recovery condition. In the main demo, a backup exists and is independent, but the same workload recovers in 95 minutes against a 60-minute tolerance. The tool identifies the execution problem, explains it, applies the narrow fix, reruns the chain, and only then opens the systemic shared-demand question.

# Canonical 2:30–2:45 demo

## 0:00–0:15 — Problem

### Show
Open the production homepage. Keep the main hero and 95 min vs 60 min visible.

### Say
“Banks can know that a backup exists and still not know whether the critical workload can actually recover in time. The harder question is: which recovery assumption fails first, and what should we do next?”

### Do not show
- research tables;
- R2 manuscript material;
- long S1–S11 explanation;
- provider rankings.

## 0:15–0:30 — Product

### Show
Point to the visible flow:

`Scenario → Apertus → Rules → Decision → Why / Fix → Systemic lens`

### Say
“Systemic Resilience Copilot combines Apertus with a transparent rule layer. Apertus handles the messy language; deterministic rules control the recovery decision so missing evidence stays UNKNOWN instead of becoming a guess.”

## 0:30–1:05 — Live Apertus extraction

### Do
Click **Run AI-assisted demo** or **Structure with Apertus & analyse**.

Let the extraction animation run.

### Show
The validated facts:
- critical workload;
- 60-minute recovery target;
- independent recovery route;
- execution tested;
- observed recovery = 95 minutes.

Also briefly show **KNOWN → UNKNOWN → NEEDED NEXT**.

### Say
“Apertus reads the normal-language scenario and structures only stated facts. The host validates the schema. Here we know the workload, target, path and test result. Shared-demand and capacity evidence are still unknown.”

## 1:05–1:25 — Decision

### Show
The large result:

**Recovery is too slow**

**95 min > 60 min**

**S5 RED · B2**

### Say
“The backup is independent, but the same workload misses the tolerance. So the first binding weakness is execution, not capacity. The correct next action is to repair and retest execution.”

Do not linger on technical rule IDs. They remain available under the trace if a judge wants them.

## 1:25–1:45 — Apertus challenge / explanation

### Do
Click **Why? Ask Apertus**.

### Show
The live Apertus review, challenge, missing evidence and validated references.

### Say
“Apertus now challenges and explains the already-fixed decision. It can surface missing evidence, but it cannot override the deterministic recovery state.”

## 1:45–2:05 — Apply the fix

### Do
Click **Apply the fix**.

### Show
The animation:
- repair execution;
- retest workload;
- rerun rules.

Then show:

**95 min → 45 min**

**S5 RED → S6 UNKNOWN**

### Say
“After repairing execution, the tool does not declare the system resilient. It reruns the chain. Execution now passes, so simultaneous recovery demand becomes the next unresolved question.”

## 2:05–2:28 — Systemic lens

### Do
Click **Open systemic lens**.

### Show
Synthetic supporting case:
- Aurora Bank;
- Meridian Bank;
- Harbor Bank;
- shared ResilienceGrid recovery fabric;
- 3 simultaneous claimants;
- assured capacity / rights = UNKNOWN;
- result = **S7 UNKNOWN**.

### Say
“This is where the systemic dimension enters. Three institutions may need the same recovery resource, but shared exposure does not prove a capacity shortage. The justified action is to measure assured capacity and obtain entitlement evidence — not to invent a B3 conclusion.”

## 2:28–2:40 — Evidence discipline

### Show
The public-evidence boundary / evidence-at-a-glance block.

### Say
“The public-safe demo is reproducible, but it is not treated as equivalent to confidential supervisory information. Where evidence stops, inference stops.”

## 2:40–2:45 — Close

### Say
“Systemic Resilience Copilot turns messy resilience evidence into a traceable next decision — without a black-box risk score and without pretending that UNKNOWN is certainty.”

# What makes Apertus substantive

Show this through the product rather than explaining it abstractly.

Apertus is used **before** the rule decision to:
- parse normal-language recovery scenarios;
- extract explicit recovery facts;
- preserve absent facts as UNKNOWN.

Apertus is used **after** the rule decision to:
- challenge the interpretation;
- explain the result;
- surface missing evidence.

The deterministic layer remains authoritative for the ordered recovery state and action.

# What not to show in the main video

Do not spend time on:
- full R2 research history;
- publication plans;
- DORA literature discussion;
- all synthetic cases A/B/C separately;
- every S1–S11 stage;
- rule IDs unless needed for credibility;
- repository file structure;
- detailed provider architecture;
- claims about event probability, provider danger or a proven European capacity shortage.

# Judge questions — one-line answers

**Why AI?**  
Real resilience evidence starts as messy language. Apertus converts it into a constrained evidence problem and later challenges/explains the fixed decision.

**Why not a dashboard?**  
A dashboard shows information; this product performs an ordered evidence-to-decision sequence and blocks downstream conclusions when an upstream prerequisite fails.

**Why not just DORA?**  
The product does not replace registers or oversight. It operationalises the next question: which recovery condition binds first, and which action is evidence-eligible now?

**Where is the systemic part?**  
Only after independent, executable recovery passes do we move to correlated demand, assured capacity, entitlements and downstream consequences.

**What happens when evidence is missing?**  
The state remains UNKNOWN and the output becomes an evidence request or test — not an invented conclusion.

# Submission description

**Systemic Resilience Copilot** is an AI-assisted decision-support prototype for banking ICT recoverability. Apertus structures normal-language recovery scenarios into validated evidence, while a transparent deterministic sequence identifies the first binding or unresolved recovery condition and the narrowest justified next action. The main demo shows why backup existence is not enough: a synthetic workload recovers in 95 minutes against a 60-minute tolerance, producing an execution failure. After the execution fix, the tool reruns the chain and exposes the next unresolved shared-demand question rather than declaring full resilience. Apertus then challenges and explains the result, while missing evidence remains UNKNOWN. The product is a traceable evidence-to-decision workflow, not a provider ranking, probability model or black-box score.

# Recording rule

Record one continuous path only:

**Run demo → Apertus extraction → S5 RED → Ask Apertus → Apply fix → S6 UNKNOWN → Systemic lens → S7 UNKNOWN → close.**

If any live Apertus call fails during recording, do not hide it with a false claim. Retry the recording after the live endpoint is stable.
