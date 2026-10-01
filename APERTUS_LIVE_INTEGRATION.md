# Apertus live integration — v7

## What is now wired

The browser `Why?` step can call a server-side Apertus adapter. The model receives only the current synthetic/public-safe scenario, the deterministic decision record and the exact evidence objects shown in the UI.

The deterministic engine remains authoritative. Apertus cannot change the stage, state, B-state or allowed action. Its output is limited to:

- a plain-language explanation;
- a counter-evidence / missing-prerequisite challenge;
- missing evidence;
- rejected shortcut claims;
- references to supplied evidence/rule IDs.

The host validates model-returned evidence IDs and rule IDs before the UI receives them.

## Run live

```bash
export HF_TOKEN="hf_..."
python server.py
```

Open `http://127.0.0.1:8000`.

When the server confirms a live token, the button becomes **Why? Ask Apertus**. If the model endpoint is unavailable, the deterministic explanation remains usable and no fake AI output is shown.

## Provider configuration

Default model:

`swiss-ai/Apertus-8B-Instruct-2509:publicai`

Default OpenAI-compatible router:

`https://router.huggingface.co/v1/chat/completions`

The token remains server-side and is never serialized into the browser bundle.

## QA without a real token

```bash
APERTUS_MOCK=1 python server.py
```

Mock mode exists only for integration testing. It is explicitly reported as `mock` by `/api/apertus/status` and is never presented as a live Apertus call.

## Remaining external dependency

A genuine live-model smoke test requires a valid Hugging Face Inference Providers token/credits or another compatible Apertus endpoint. The code path is wired; do not claim a live provider call until that credentialed smoke test passes.