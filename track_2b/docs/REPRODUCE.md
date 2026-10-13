# Running the prototype

Required: Docker; a separately operated Apertus v1.5 8B inference service exposing an OpenAI-compatible `/v1/chat/completions` endpoint. The model itself is not embedded in this image.

```bash
export LLM_NAME="swiss-ai/Apertus-v1.5-8B"
export LLM_BASE_URL="http://host.docker.internal:8000/v1"
export LLM_API_KEY="replace-with-endpoint-token"
make run
```

Open `http://localhost:18765`. Test the canonical synthetic scenario (impact tolerance 60 min; observed recovery 95 min) and confirm deterministic S5 RED/B2/REPAIR_EXECUTION, then fix to 45 min and inspect unresolved downstream evidence.

The `LLM_NAME` value must match the model identifier accepted by your self-hosted endpoint. For PublicAI, the provider-specific identifier may be `swiss-ai/apertus-v1.5-8b`. See https://platform.publicai.co/docs.

The Docker application is a self-hostable wrapper around the existing source. It does not assert that an on-prem GPU service was deployed, nor that the model inference tests were performed in this environment. Inspect the `/api/apertus/status` endpoint: it must say `mode: live`. Do not evaluate the prototype in mock mode.

The public Vercel deployment uses a separate hosted inference configuration; it is not claimed to satisfy Swiss data-residency requirements.
