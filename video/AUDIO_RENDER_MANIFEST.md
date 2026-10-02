# Systemic Resilience Copilot — Audio Render Manifest V3

**Status:** CLEAN DESCRIPT V3 MASTER — OBJECTIVE SYNC PASS / HUMAN LISTENING QC STILL REQUIRED

## Final V3 render authority

Source wording:
- `video/VOICEOVER_MASTER.md`
- `video/VOICEOVER_SSML.txt`
- `video/DESCRIPT_V3_VOICE_BRIEF.md`

## Selected clean master

- Provider: **Descript**
- Project: `Systemic Resilience Copilot — V3 Narration Clean Take`
- Composition: `V3 Clean Narration`
- Composition ID: `1fb8d622-3ecf-4e29-92f4-b6c5dbe936d1`
- Voice: **Buster**
- Voice description: calm, middle-aged American male / narrative
- Media type: Audio only
- Generation type: **fresh TTS generation**
- Time-stretch: **NO**
- Spoken wording: **verbatim**
- Share URL: `https://share.descript.com/view/xzWSjUMMA0i`
- Project URL: `https://web.descript.com/790812ba-d730-44ad-9631-3fd378179fd9/1fb8d`

The previous Descript candidate that was later slowed by playback-speed adjustment is rejected for final use. The selected master is the fresh, non-time-stretched take.

## Timing authority

Descript project metadata and exported transcript timing do not report exactly the same endpoint. For edit synchronization, the **exported SRT word timing is the working authority** because it maps the actual spoken text cue by cue.

- final spoken cue begins: `00:02:05.670`
- final spoken cue ends: **`00:02:08.310`**
- working narration timeline for edit: **128.31 s (2:08.31)**

`video/VOICEOVER_CAPTIONS_V2.srt` has been rebuilt directly from the Descript-exported transcript timing.
`video/EDIT_TIMING_MAP_V2.csv` has been retimed to the same 2:08.3 working timeline.

## Objective QC completed

PASS:
- script transcript remains verbatim;
- all required proof phrases are present in the generated transcript;
- `S five red, B two` appears as its own clear transcript phrase;
- `S six UNKNOWN` is present;
- `S seven UNKNOWN` is present;
- `AI explains. Rules decide.` is separated into two short spoken beats;
- 95-minute, 60-minute and 45-minute proof values are all present;
- no music, avatar or visual layer is attached to the narration master;
- fresh generation used; no final audio time-stretch.

## Human listening gate still required

The connected Descript agent cannot actually hear the rendered voice, so these cannot be truthfully certified by automation alone:
- whether `Apertus` sounds like `uh-PER-tus`;
- whether the S/B state codes sound natural rather than run together;
- whether the voice is sufficiently natural / non-robotic;
- clipping, subtle volume issues or prosody quality.

Listen especially around these approximate exported-transcript times:
- Apertus: ~10.5 s and ~35.6 s
- 95 minutes: ~32.3 s
- S5 RED / B2: ~54.5 s
- AI explains / Rules decide: ~76.3–79.2 s
- 45 minutes: ~83.7 s
- S6 UNKNOWN: ~90.8–95.6 s
- S7 UNKNOWN: ~111.0–113.3 s
- no-shortage line: ~117.8–121.0 s
- final line: ~125.7–128.3 s

## Current production decision

Use this clean Descript take as the current **V3 timing master candidate**. Do not return to the slowed 0.7x candidate and do not use the superseded HeyGen 146.286-second audio.

If human listening finds a pronunciation or prosody defect, repair only the smallest affected phrase/section rather than rebuilding the whole product film.

## Next production stage

Capture / assemble the seven visual proof clips against the retimed 2:08.3 map, then run frame-level sync and muted-view QC before final YouTube export.
