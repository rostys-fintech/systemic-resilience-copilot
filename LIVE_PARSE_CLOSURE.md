# Systemic Resilience Copilot — Live Parse Closure

Date: 2026-10-02

## Status

**PASS — LIVE APERTUS PROOF B CLOSED.**

## What changed

The production parse path now uses a narrow host-side explicit-fact reconciliation step after Apertus extraction and before deterministic rules.

The reconciliation layer may only restore facts literally stated in the submitted scenario. It does not infer provider failure, systemic risk, probability, capacity shortage, recovery adequacy or any downstream state.

For the canonical synthetic Northstar wording it can recover explicit statements such as:
- named retail-payments workload;
- 60-minute tolerance;
- recovery route outside the primary failure domain;
- same-workload support;
- tested recovery;
- observed 95-minute recovery.

Missing shared-demand and capacity evidence remains `UNKNOWN`.

## Automated production proof

GitHub Actions workflow: `validate-public-safe-demo`

Run: `37000909044`

Code / smoke-gate commit: `14ad08d19127934124dd2865b61ae9eb3cbb3a7b`

Production smoke endpoint:
`https://systemic-resilience-copilot.vercel.app/api/apertus/smoke`

Observed production result on the first smoke attempt:

```json
{
  "ok": true,
  "mode": "live",
  "model": "swiss-ai/Apertus-8B-Instruct-2509:publicai",
  "checks": {
    "critical_workload": "retail payments processing service",
    "impact_tolerance_minutes": 60,
    "failure_domain_known": "YES",
    "recovery_route_outside_failure_domain": "YES",
    "same_workload_supported": "YES",
    "execution_tested": "YES",
    "observed_recovery_minutes": 95,
    "simultaneous_demand_evidence_state": "UNKNOWN",
    "capacity_state": "UNKNOWN"
  },
  "deterministic_expected": {
    "stage": "S5",
    "state": "RED",
    "binding": "B2",
    "action": "REPAIR_EXECUTION"
  },
  "parse_latency_ms": 4321,
  "secret_exposed": false
}
```

Workflow conclusion: **SUCCESS**.

Log closure line:
`PASS: production live Apertus parse -> 60/95 -> S5 RED/B2`

## Architecture integrity

- Apertus still performs the language-heavy extraction.
- Host validation can repair only explicit textual omissions.
- Deterministic rules remain authoritative.
- `UNKNOWN` remains `UNKNOWN` when evidence is absent.
- Shared recovery exposure is still not converted into a B3 shortage claim without measured demand / assured-capacity evidence.
- No deployment secret is exposed by the smoke endpoint.

## Gate result

The only blocker recorded in `FINAL_RELEASE_GATE.md` is now closed.
