# Behavioral Mobile + Click Audit

Date: 2026-10-01
Product: Systemic Resilience Copilot
Scope: public production flow and mobile interaction behavior.

## Audit target
The judge-facing path must remain understandable and state-consistent across repeated clicks and narrow screens:

`Run demo / Structure → Apertus extraction → deterministic rules → Decision → Why / Fix → Systemic lens`

## Interaction audit

### 1. Run AI-assisted demo / Structure with Apertus & analyse — PASS
- Both buttons enter the same controlled analysis path.
- Other primary entry buttons are disabled during the parse/rule run.
- Visible progress communicates what is happening.
- A repeated run now clears any old systemic result, old Apertus explanation, and stale evidence-at-a-glance state before the new run.

### 2. Why? Ask Apertus — PASS
- The button shows a loading state.
- Evidence packaging, challenge, and reference validation are visible.
- The deterministic decision remains authoritative if the live review fails.
- Old explanation content is hidden before a new top-level run so it cannot flash as if it belonged to the new scenario.

### 3. Apply the fix — PASS
- The action is available only for the B2 execution case.
- The intervention visibly repairs execution, retests the workload, and reruns the ordered rules.
- The result correctly moves from S5 RED to S6 UNKNOWN rather than declaring full resilience.

### 4. Open systemic lens — PASS
- The button is only reached after the bank-level execution issue is repaired.
- Re-running the systemic lens now resets its progress bar, step states, and prior result before the animation starts.
- It ends at S7 UNKNOWN when capacity / entitlement evidence is absent and refuses a B3 shortage claim.

### 5. Cross-click / double-process protection — PASS
- While an action button is in its loading state, the other primary action buttons temporarily stop accepting clicks.
- This prevents overlapping Apertus, fix, and systemic animations from producing contradictory screen states.

## Mobile audit

### Touch targets — PASS
Primary buttons have a minimum 44–46 px touch height and `touch-action: manipulation`.

### Sticky-header scroll behavior — PASS
Cards and process blocks use scroll offset so `scrollIntoView()` does not place headings underneath the sticky header.

### Narrow-screen layout — PASS
- action buttons become full-width on small phones;
- evidence grids and systemic grids collapse to one column where required;
- long Apertus / evidence text can wrap instead of forcing horizontal overflow;
- the horizontal stage flow remains scrollable without a persistent scrollbar.

### Live-model visibility — PASS
The Apertus status remains visible on mobile rather than being hidden with the desktop subtitle.

### Readability — PASS
Supporting text is enlarged on narrow screens and the scenario textarea receives additional vertical room.

### Reduced motion — PASS
`prefers-reduced-motion` removes smooth-scroll / long animation behavior for users who request it.

### Keyboard / focus visibility — PASS
Buttons, summary controls, and the scenario textarea receive a visible focus outline.

## Evidence UX reset bug found and fixed
The first Evidence UX implementation could remain visible with stale values after a repeated run because hiding the parsed panel did not re-hide the evidence summary. This is fixed: when the parsed panel is reset, the `KNOWN → UNKNOWN → NEEDED NEXT` block is hidden until new validated extraction data is available.

## Remaining verification boundary
This audit combines code-path inspection and deployed-build verification. It does not claim a full automated real-device browser farm test. A final submission rehearsal should still be run once on an actual narrow mobile viewport and once on desktop before recording the demo video.

## Gate
**PASS** for implementation and judge-facing behavioral consistency.

Next recommended stage: simplify the submission story and demo sequence around one canonical 2–3 minute path, then record the product video.
