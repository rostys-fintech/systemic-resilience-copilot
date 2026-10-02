# Systemic Resilience Copilot — Descript V3 Voice Brief

**Purpose:** replace the blocked HeyGen render with a full-length final narration generated in Descript.

## Authority

Use the synchronized final wording from:
- `video/VOICEOVER_MASTER.md`
- `video/VOICEOVER_SSML.txt`

Do not use the superseded 2:26.3 HeyGen audio.

## Voice direction

Target voice:
- male;
- calm, confident, natural;
- medium-low pitch;
- international / neutral English;
- founder or product-lead tone;
- no trailer cadence;
- no exaggerated enthusiasm;
- no radio-announcer compression.

Target pace:
- approximately 120–130 words/min average;
- slower around proof states;
- preserve deliberate pauses after the key decision lines.

## Pronunciation lock

Must be clearly pronounced:
- Apertus → `uh-PER-tus`
- `sixty-minute tolerance`
- `ninety-five minutes`
- `S five red, B two`
- `AI explains. Rules decide.`
- `forty-five minutes`
- `S six UNKNOWN`
- `S seven UNKNOWN`
- `not proof of a shortage`
- `When the evidence stops, the inference stops.`

## Spoken script

Most resilience plans can tell you a backup exists. They cannot tell you whether the critical workload will actually recover in time.

This is Systemic Resilience Copilot. Apertus turns a normal-language recovery scenario into structured evidence. Deterministic rules then identify the first binding or unresolved condition justified by that evidence.

In this synthetic case, Northstar Bank has a sixty-minute tolerance. The recovery route is outside the primary failure domain, supports the same workload, and has been tested. But observed recovery takes ninety-five minutes. Apertus extracts only the facts that are explicitly stated, and the host validates them before the rules run. Missing downstream evidence remains UNKNOWN.

Now the decision is simple and traceable. Recovery independence passes, but execution fails. Ninety-five minutes is longer than sixty, so the first binding state is S five red, B two. The next action is specific: repair execution and retest. We do not jump to a downstream capacity conclusion.

Now Apertus challenges and explains the already-fixed decision. It shows why the conclusion follows and what evidence is still missing, but it cannot override the deterministic state. AI explains. Rules decide.

We apply only that narrow fix and rerun the same workload. Recovery now completes in forty-five minutes. S five passes, but the product does not declare full resilience. The next unresolved state becomes visible: S six UNKNOWN — establish simultaneous-demand evidence.

Only then do we open the systemic lens. Three synthetic institutions may need the same recovery fabric. S four and S five pass, but assured capacity, priority and coordination remain UNKNOWN. The result is S seven UNKNOWN. Next: measure capacity and obtain entitlement evidence. A shared recovery resource is not proof of a shortage.

Evidence becomes a decision, and the decision becomes an action. When the evidence stops, the inference stops.

## Pause map

Keep short natural pauses after:
- `recover in time`;
- `ninety-five minutes`;
- `S five red, B two`;
- `AI explains. Rules decide.`;
- `S six UNKNOWN`;
- `S seven UNKNOWN`;
- `not proof of a shortage`;
- final sentence.

Avoid inserting long pauses elsewhere.

## Audio cleanup

If available in Descript:
- Studio Sound: light/moderate only;
- remove obvious clicks/noise;
- keep breaths natural;
- do not over-compress;
- do not add background music to the narration master.

## Export

Preferred master:
- WAV;
- 48 kHz;
- mono or stereo both acceptable, mono preferred for narration;
- no music;
- no loudness clipping;
- filename: `SRC_V3_NARRATION_MASTER.wav`.

If WAV export is unavailable, use the highest-quality MP3 available and preserve the same filename stem.

## Acceptance gate

PASS only if:
1. full script is present with no missing sentence;
2. no paraphrasing by the TTS engine;
3. Apertus / S5 / B2 / S6 / S7 pronunciation is clear;
4. voice sounds natural and calm;
5. no audible cuts between paragraphs;
6. final duration is recorded exactly;
7. the final edit is retimed to the actual waveform rather than time-stretching this narration.

## Next step after render

Measure exact duration, update `video/AUDIO_RENDER_MANIFEST.md`, then align `VOICEOVER_CAPTIONS_V2.srt` and `EDIT_TIMING_MAP_V2.csv` to the real narration waveform before final video assembly.