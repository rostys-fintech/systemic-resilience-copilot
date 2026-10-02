# Post-Redesign Regression Audit

Date: 2026-10-02
Project: **Systemic Resilience Copilot**
Scope: presentation redesign regression only. Scientific logic remains frozen.

## Result

**PASS**

The redesigned production build preserves the canonical recovery flow and public-safe guardrails.

## Automated regression gate added

New CI gate:

- `scripts/post-redesign-regression.mjs`
- included in `npm run validate`

It checks:

1. the redesigned stylesheet is actually wired into `app-v10.html`;
2. all required live controls still exist (`startBtn`, `parseBtn`, `whyBtn`, `fixBtn`, `systemicBtn`, etc.);
3. the deterministic canonical path is unchanged:
   - `95 min > 60 min`
   - `S5 RED`
   - `B2`
   - `REPAIR_EXECUTION`;
4. the narrow fix remains `45 min` and exposes `S6 UNKNOWN` rather than declaring resilience;
5. the systemic screen still ends at `S7 UNKNOWN` with `MEASURE_CAPACITY` / evidence-first logic;
6. live Apertus parse and explanation endpoints remain wired;
7. fallback mode remains safe if live Apertus is unavailable;
8. rerunning the demo clears stale systemic output, stale AI explanation, and stale evidence summaries;
9. mobile / responsive breakpoints remain present;
10. reduced-motion capture safety remains present;
11. there are no duplicate DOM IDs introduced by the redesign.

## Production verification

GitHub Actions run: `37013746510`

- `validate` job: **SUCCESS**
- `production-smoke` job: **SUCCESS**

The production smoke gate again verified the canonical live Apertus parse and deterministic handoff:

- critical workload present;
- recovery target = `60`;
- failure domain known = `YES`;
- recovery route outside failure domain = `YES`;
- same workload supported = `YES`;
- execution tested = `YES`;
- observed recovery = `95`;
- simultaneous-demand evidence = `UNKNOWN`;
- capacity = `UNKNOWN`;
- deterministic expected stage = `S5`;
- state = `RED`;
- binding = `B2`;
- action = `REPAIR_EXECUTION`;
- secret exposure = `false`.

Vercel deployment for commit `d9974edf28631a2dfcd92581e8c3e1a16fd3f6c7`: **SUCCESS**.

## Regression findings

### PASS — Visual layer

The redesign is isolated to HTML/CSS presentation and supporting UI behavior. The decision engine remains in the existing deterministic evaluator.

### PASS — Re-run hygiene

`evidence-boundary.js` resets the systemic card/result, systemic progress, Apertus explanation box, and evidence summaries when a new demo run starts. This prevents stale output from a previous run appearing as fresh evidence.

### PASS — Fallback behavior

If live Apertus parsing fails, the locked public-safe synthetic fixture is used and visibly labeled as fallback. The deterministic decision remains authoritative.

### PASS — Responsive behavior

Desktop screenshot polish, tablet/mobile collapse rules, touch-target behavior, sticky-flow fallback, and reduced-motion support remain active after the redesign.

## Remaining manual check

One real-browser visual rehearsal is still useful before the final Devpost screenshots/video are refreshed: desktop at 100% zoom plus one narrow mobile viewport. This is a presentation check, not a logic blocker.

## Final regression decision

**POST-REDESIGN REGRESSION GATE = PASS**

No science, live-Apertus, deterministic-rule, fallback, rerun-state, deployment, or CI blocker remains from the redesign.
