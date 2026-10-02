# Systemic Resilience Copilot — Audio Render Manifest V3

**Status:** DESCRIPT V3 MASTER RENDERED — LISTENING QC REQUIRED

## Final V3 render authority

Source wording:
- `video/VOICEOVER_MASTER.md`
- `video/VOICEOVER_SSML.txt`
- `video/DESCRIPT_V3_VOICE_BRIEF.md`

These files contain the synchronized final spoken wording for the judge-first V3 film.

## Final rendered master

- Provider: **Descript**
- Project: `Systemic Resilience Copilot — V3 Narration Master`
- Composition: `V3 Narration Master`
- Composition ID: `b8161e59-438f-4d63-a70e-c4c6f834afb5`
- Voice selected by Agent Underlord: **Buster**
- Voice description: American male, calm / narrative
- Media type: Audio
- Exact composition duration: **117.2 seconds (1:57.2)**
- Share URL: `https://share.descript.com/view/uMv7g1skyNK`
- Descript project: `https://web.descript.com/9f5a2ab3-eb50-4bcd-b9da-21bcbcc97836/b8161`

The master was generated as one continuous audio-only composition with no music, avatar, stock footage or visual layer.

## Important generation notes

Agent Underlord reported:
- the script was kept word-for-word in one continuous composition;
- estimated delivery pace is roughly **127 words/min**, inside the intended 120–130 wpm editorial target;
- no extra manual pronunciation respelling was applied;
- no additional proof-state pauses or manual emphasis were added beyond the natural TTS delivery;
- the generated voice was not auditioned against alternate voices before selection.

Therefore the render is usable as a complete master candidate, but it is **not yet release-locked until listening QC passes**.

## Mandatory listening QC

Listen specifically for:
- `Apertus` → should sound like `uh-PER-tus`;
- `sixty-minute tolerance`;
- `ninety-five minutes`;
- `S five red, B two`;
- `AI explains. Rules decide.`;
- `forty-five minutes`;
- `S six UNKNOWN`;
- `S seven UNKNOWN`;
- `not proof of a shortage`;
- `When the evidence stops, the inference stops.`

Also judge:
- whether the voice sounds natural rather than robotic;
- whether the pace is calm enough for product proof;
- whether any paragraph transition sounds cut or abrupt;
- whether the proof states need slightly longer pauses.

## Timing decision

The real V3 narration duration is now **117.2 s**. This is substantially shorter than the earlier 2:24 editorial map.

Do **not** time-stretch the narration.

After listening QC:
1. keep this master if pronunciation and tone pass;
2. if one phrase fails, regenerate only that phrase/section in the same voice and repair cleanly in Descript;
3. rebuild `EDIT_TIMING_MAP_V2.csv` around the actual 117.2 s waveform;
4. retime `VOICEOVER_CAPTIONS_V2.srt` to the real narration;
5. assemble the seven product clips around this audio;
6. run frame-level visual and claim QC before YouTube export.

## Superseded audio

The earlier HeyGen 146.286-second master is archive/fallback material only and must not override this V3 script or the Descript render.
