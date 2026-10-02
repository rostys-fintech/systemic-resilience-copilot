# Systemic Resilience Copilot — Audio Render Manifest V3

**Status:** BLOCKED AT PROVIDER CREDIT GATE — SCRIPT / SSML READY

## Final V3 render authority

Render from:
- `video/VOICEOVER_MASTER.md`
- `video/VOICEOVER_SSML.txt`

These files now contain the synchronized final spoken wording for the judge-first V3 film.

## Locked voice configuration

- Provider: HeyGen speech synthesis
- Voice: Sebastian
- Voice ID: `2da5a319054c4dc5803e852d574ccbf8`
- Locale: `en-US`
- Input: SSML
- Requested speed: `0.72`
- Target style: calm, confident, technical, non-theatrical

## Render attempt — 2026-10-02

A full V3 speech render was attempted using the synchronized final SSML.

Provider response:
- HTTP/status class: `402 insufficient_credit`
- Free voice-generation allowance remaining: **23 seconds**
- Estimated time required for this render: **130 seconds**
- Request is not retryable without additional allowance / plan renewal.

No partial final narration was generated because splitting the master into fragments would consume the remaining allowance while still leaving the film incomplete and could introduce voice/prosody inconsistency between sections.

## Legacy render

The earlier HeyGen render used an older script/SSML and lasted **146.286 seconds (2:26.3)**. It remains archive/fallback material only and must not override the V3 synchronized script.

Legacy configuration:
- HeyGen speech synthesis
- Voice: Sebastian
- Voice ID: `2da5a319054c4dc5803e852d574ccbf8`
- Locale: `en-US`
- Output: WAV

## Mandatory listening check after unblock

When the V3 master can be rendered, verify:
- `Apertus` pronunciation;
- `sixty-minute tolerance`;
- `ninety-five minutes`;
- `S five red, B two`;
- `AI explains. Rules decide.`;
- `forty-five minutes`;
- `S six UNKNOWN`;
- `S seven UNKNOWN`;
- `not proof of a shortage`;
- `When the evidence stops, the inference stops.`

## Timing rule

Do not time-stretch the final narration.

After the provider gate is cleared:
1. render the full synchronized SSML as one master take;
2. measure the actual duration / waveform;
3. preserve the wording;
4. retime visuals and captions only as needed;
5. update this manifest with the exact final duration and audio URL/file;
6. proceed to the seven-clip edit assembly.

## Unblock condition

One of the following must happen before the V3 voice stage can pass:
- HeyGen voice allowance renews;
- the HeyGen plan is upgraded / additional generation allowance becomes available;
- another high-quality TTS provider is explicitly connected and approved for the same locked script and voice direction.
