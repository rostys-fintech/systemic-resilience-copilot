# Novelty and scope

Systemic Resilience Copilot is **not** a replacement for DORA registers, third-party oversight, concentration monitoring, exit planning, or generic resilience testing.

Those are part of the baseline. The product contribution is narrower and operational:

1. **Start from a critical workload, not a provider score.**
2. **Separate provider exposure from recoverability.** A shared provider does not by itself prove a shared failure.
3. **Test failure-domain-specific recovery.** The relevant question is whether the recovery path is actually outside the failure domain and can run the same workload.
4. **Test executability, not backup existence.** A backup that exists but cannot recover inside tolerance is still a binding weakness.
5. **Stop at the first RED or UNKNOWN.** The tool does not jump downstream to capacity or systemic conclusions when an earlier prerequisite is unresolved.
6. **Only assess shared-demand / capacity questions after recovery-path and execution checks pass.**
7. **Match the action to the evidenced state.** The output can be a repair, an evidence request, a test, or no new intervention.
8. **Keep technical disruption separate from financial consequence.** Severe ICT disruption is not automatically severe financial disruption.

## What the product does not claim

- no systemic-event probability;
- no provider-danger score;
- no claim that provider diversity alone equals resilience;
- no claim that shared provider exposure equals shared failure;
- no claim that capacity is short unless demand and assured capacity evidence justify it;
- no claim that the current public-safe demo represents a realised systemic banking crisis.

## Why Apertus is useful

Apertus handles the language-heavy parts that are difficult to encode as static UI rules alone:

- structure a normal-language recovery scenario into a constrained schema;
- preserve missing facts as `UNKNOWN`;
- challenge and explain an already-fixed deterministic decision;
- surface what evidence is still missing.

The deterministic recovery rules remain authoritative. Apertus cannot overwrite the state sequence or convert missing evidence into certainty.

## Product thesis

> The value is not another risk dashboard. It is a traceable decision sequence that identifies which recoverability condition binds first, why, and what is actually justified next.
