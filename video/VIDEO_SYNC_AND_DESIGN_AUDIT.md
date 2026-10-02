# Systemic Resilience Copilot — Video Sync & Design Audit

Date: 2026-10-02  
Status: **PASS AFTER CORRECTIONS**

## Scope audited

Cross-checked:
- `app-v10.html`
- `app-v10.js`
- `video/VOICEOVER_MASTER.md`
- `video/VOICEOVER_CAPTIONS_V2.srt`
- `video/EDIT_TIMING_MAP_V2.csv`
- `video/SCREEN_CAPTURE_SHOTLIST.md`
- `video/FINAL_YOUTUBE_PRODUCTION_BIBLE.md`
- `video/YOUTUBE_UPLOAD_PACKAGE.md`

## Problems found

### 1. Captions were not verbatim with narration
Examples:
- the earlier captions removed words from the Product scene;
- the decision captions omitted the spoken contrast against a broad downstream conclusion;
- the close captions omitted part of the previous spoken wording.

**Fix:** captions were rebuilt to follow the final voice master verbatim.

### 2. Voice terminology drifted from the final UI
Earlier script used phrases such as:
- `alternate route is independent` while the input/UI describes the route as outside the primary failure domain and renders `Independent`;
- `verify entitlements` while the live product asks for entitlement / priority evidence;
- Scene 6 showed `S6 UNKNOWN` but the voice did not explicitly name it.

**Fix:** the final voice now says the exact proof concepts the judge sees: outside primary failure domain, S5 RED/B2, 45 min, S6 UNKNOWN, S7 UNKNOWN, and entitlement evidence.

### 3. Pacing metadata was internally inconsistent
The old voice file said 135–145 wpm while the 2:24 scene windows implied a materially slower average editorial pace.

**Fix:** production is now locked to ~120–130 wpm average with deliberate slower proof beats. Visual timing follows the final audio waveform rather than forcing speech speed.

### 4. Overlay specification contradicted itself
The production bible said `maximum five overlays` but listed six.

**Fix:** exactly five major overlays are now allowed. The Apertus extraction scene relies on the live UI rather than another redundant large overlay.

### 5. Transitions were under-specified
The earlier plan described clean editing but did not lock which transition belongs between each exact scene.

**Fix:** only three transition classes remain:
- clean cut;
- match cut on click;
- short dissolve only at opening/closing.

No preset transition packs, wipes, whip pans, glitch, typewriter or whoosh effects.

### 6. Caption / overlay collision risk
Earlier documents defined both systems independently but did not define safe zones when both appeared simultaneously.

**Fix:** major overlays occupy the upper safe zone; captions remain bottom-center and move upward only if the product proof occupies the lower third. At least 80 px vertical separation is required.

### 7. Systemic scene was too compressed
The prior timeline ended Scene 7 at 2:13 while asking the viewer to read the systemic result and refused shortage conclusion.

**Fix:** Scene 7 now runs to **2:15**; the closing scene is intentionally shorter and simpler.

## Final text / UI lock

The film must visibly and verbally agree on:

| Concept | Locked wording/state |
|---|---|
| Target/tolerance | 60 min |
| Observed recovery | 95 min |
| Recovery route | outside primary failure domain / Independent |
| Execution evidence | Tested |
| First binding state | S5 RED · B2 |
| First action | repair execution and retest |
| After fix | 45 min |
| Next state | S6 UNKNOWN |
| Next bank-level request | establish simultaneous-demand evidence |
| Systemic upstream | S4 PASS / S5 PASS |
| Simultaneous claimants | 3 |
| Capacity / rights | UNKNOWN |
| Systemic result | S7 UNKNOWN |
| Systemic next action | measure capacity + obtain entitlement evidence |
| Refused conclusion | shared recovery resource is not proof of a shortage |

## Final design lock

### Palette
Use only the final product language:
- warm sand / stone;
- dark navy;
- bone / muted bronze;
- status red / green / amber only for semantic state.

No unrelated purple/blue AI gradient treatment.

### Motion
- one visual focal point at a time;
- 3–6% push max;
- no browser zoom animation;
- no more than one editorial motion idea per scene;
- cursor remains secondary to the proof.

### Major overlays
1. Backup exists ≠ executable recovery
2. 95 min > 60 min → S5 RED · B2
3. AI explains. Rules decide.
4. 95 → 45 → S6 UNKNOWN
5. Shared recovery resource ≠ proven shortage

### Close
`Systemic Resilience Copilot`  
`Evidence → Decision → Action`

## Authority order

If two old files disagree, use this order:

1. `VOICEOVER_MASTER.md`
2. `VOICEOVER_CAPTIONS_V2.srt`
3. `EDIT_TIMING_MAP_V2.csv`
4. `SCREEN_CAPTURE_SHOTLIST.md`
5. `FINAL_YOUTUBE_PRODUCTION_BIBLE.md`
6. live product behavior

Older V1 timing/audio/release artifacts are archive material and must not override the V3 judge-first package.

## Result

**PASS.** The script, captions, scene windows, key visible proof states, overlay system, transition grammar, color language and capture direction now describe one coherent 2:24 final film.

Remaining external production work: render/generate the final V3 narration, capture the seven final product clips, assemble the edit, then perform frame-level QC against the real audio waveform.