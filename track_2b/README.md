# Track 2B — Own Project: Systemic Resilience Copilot

An Apertus-backed prototype for testing evidence about bank ICT recovery. Apertus extracts explicit scenario facts and challenges explanations; deterministic rules decide the first unresolved or failed recovery state. Public-safe synthetic examples only.

- App source: repository root `app-v10.*`, `lib/`, `api/`
- [Technical report](./technical_report.md)
- [Docker reproducibility](./docs/REPRODUCE.md)
- [Public evidence boundary](../PUBLIC_EVIDENCE_BOUNDARY.md)
- [Live demo](https://systemic-resilience-copilot.vercel.app/)
- [Demo video](https://youtu.be/9lMyxkpghBc) — **check that hosted video is <=120 seconds before final submission**

Run from the **repository root** with `make run` after configuring an Apertus v1.5 8B OpenAI-compatible endpoint. The deployment configuration supports an on-prem model endpoint; the public Vercel instance is a convenience demonstration and is not represented as Swiss-resident hosting.

No external dataset is included; demo cases are synthetic. Code: Apache-2.0. Documentation: CC BY 4.0.
