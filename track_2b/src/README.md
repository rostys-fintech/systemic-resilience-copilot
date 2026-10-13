# Implementation source

Canonical implementation resides at the repository root to preserve the existing public Vercel demo:
- `../../app-v10.html`, `../../app-v10.css`, `../../app-v10.js` — UI
- `../../api/apertus/` — API handlers
- `../../lib/` — schemas and deterministic validation contracts
- `../../scripts/production-server.mjs` — Docker HTTP host

The Dockerfile copies the whole repository. Avoid duplicate code copies that diverge.
