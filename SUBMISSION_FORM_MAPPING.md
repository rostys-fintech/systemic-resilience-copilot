# Hack Apertus — Devpost Submission Form Mapping

Date checked: **2026-10-02**
Project: **Systemic Resilience Copilot**
Track: **2B — Apertus Adoption: Own Project**

This mapping now reflects the **live Devpost form visible in the project dashboard**, not an assumed future form.

## Current Devpost progress

- Manage team — complete
- Project overview — complete
- Project details — current step
- Additional info — not yet inspected
- Submit — not yet inspected

Deadline shown in Devpost: **16 Oct 2026, 12:00 PM GMT+2**.

---

# 1. PROJECT OVERVIEW

## Project name
Devpost limit shown: **60 characters**.

**Systemic Resilience Copilot**

## Elevator pitch
Devpost limit shown: **200 characters**.

**Apertus structures messy recovery evidence while transparent rules identify the first binding condition and the next justified action.**

## Thumbnail
Devpost accepts **JPG, PNG or GIF**, max **5 MB**, best results **3:2 ratio**.

Use the final project thumbnail only after the current UI/media refresh is frozen.

---

# 2. PROJECT DETAILS

## About the project
Devpost requests a Markdown project story covering what inspired the project, what was learned, how it was built, and challenges faced.

Paste this:

```markdown
## Inspiration

A backup on paper is not the same as executable recovery. Banking resilience reviews can contain provider lists, backup plans and controls without answering the operational question that matters most: **can the same critical workload actually recover inside its tolerance, and what should be fixed or evidenced next?**

## What it does

Systemic Resilience Copilot turns a normal-language recovery scenario into a transparent evidence-to-decision workflow:

**Scenario → Apertus → validated evidence → deterministic rules → decision → Apertus explanation → fix → systemic lens**

Apertus extracts explicit recovery facts and preserves missing information as `UNKNOWN`. Deterministic rules then identify the first binding or unresolved recovery condition and set the next justified action.

In the main synthetic demo, recovery takes **95 minutes** against a **60-minute** tolerance. Recovery independence passes, but execution does not, so the workflow stops at **S5 RED / B2** and recommends **REPAIR_EXECUTION**. After a verified fix reduces recovery to **45 minutes**, S5 passes and the workflow exposes the next unresolved state instead of declaring full resilience.

The systemic lens then tests a shared-recovery case with three synthetic institutions. Because assured capacity, priority and coordination evidence are not established, the product stops at **S7 UNKNOWN**. Shared recovery exposure is not treated as proof of a capacity shortage.

## How we built it

- Apertus 8B for natural-language scenario parsing and post-decision challenge/explanation
- constrained JSON schema and host-side validation
- deterministic JavaScript decision rules
- public-safe synthetic demo cases
- HTML/CSS/JavaScript interface with light and dark themes
- Vercel deployment
- GitHub Actions validation and production smoke tests
- server-side secret handling for live model calls

The architecture deliberately separates AI reasoning from the final state transition. **AI explains; rules decide.**

## Challenges

The hardest challenge was making the AI useful without turning it into a hidden decision-maker. Model extraction can vary, so the host validates the schema and only reconciles facts that are explicitly present in the scenario. Missing evidence remains `UNKNOWN`; the system does not infer adequacy, probability, provider danger or systemic failure from incomplete inputs.

A second challenge was the systemic step. Shared exposure is easy to over-interpret, so the product only asks capacity questions after upstream recovery independence and execution have passed.

## Accomplishments

- live public browser prototype
- live Apertus before and after the deterministic decision
- canonical **95 > 60 → S5 RED/B2 → 45 → S6 UNKNOWN → S7 UNKNOWN** flow
- explicit first-RED / first-UNKNOWN stopping logic
- evidence boundary that refuses unsupported downstream conclusions
- public GitHub repository, technical report and automated production smoke checks

## What we learned

For high-stakes resilience workflows, an LLM is more useful as a constrained evidence assistant than as a black-box risk scorer. It can structure messy language, challenge an interpretation and make missing evidence visible while transparent rules retain control of the actual decision state.

## What's next

The next step is to integrate richer private or supervisory evidence sources, add configurable institution-specific rule packs and test the workflow with domain experts. The current adapter can also be pointed to another compatible Apertus endpoint for more sovereign deployment setups.

## Hackathon build boundary

The public **Systemic Resilience Copilot** implementation was built for Hack Apertus. It is informed by earlier research on banking ICT recoverability, but unpublished manuscript text, private workbooks, confidential bank data and reviewer-sensitive material are not included in the public repository.
```

## Built with
Devpost allows up to **25 tags**.

Use these tags:

- Apertus
- JavaScript
- HTML5
- CSS3
- Vercel
- Hugging Face
- GitHub
- GitHub Actions
- AI
- LLM
- FinTech
- Banking
- Operational Resilience

## “Try it out” links

Add these as separate links:

1. **Live demo**  
   https://systemic-resilience-copilot.vercel.app/

2. **GitHub repository**  
   https://github.com/rostys-fintech/systemic-resilience-copilot

3. **Technical report**  
   https://github.com/rostys-fintech/systemic-resilience-copilot/blob/main/TECHNICAL_REPORT.md

## Image gallery
Devpost accepts **JPG, PNG or GIF**, max **5 MB each**, best results **3:2 ratio**, up to **15 images**.

Final recommended set: **3 images only**.

1. Hero / main case — `95 min > 60 min`, clear product identity.
2. Decision view — `S5 RED · B2`, `REPAIR_EXECUTION`, AI/rules separation.
3. Systemic lens — three synthetic institutions, `S7 UNKNOWN`, no unsupported shortage claim.

Do **not** use the older promo concepts if they no longer match the final live UI.

## Video demo link
The live Devpost field accepts a **YouTube or Vimeo URL**.

Current final video file exists, but a public YouTube/Vimeo URL is still required if we want to populate this field.

Do not claim the reconstructed video is a continuous live browser recording.

---

# 3. ADDITIONAL INFO

Not yet inspected in the live form. Do not invent answers before opening this step.

Likely reusable material is already prepared in `SUBMISSION_PACKAGE.md` for:

- purposeful use of Apertus
- technical rigour
- value / cost / scalability
- sovereign deployability
- implementation feasibility
- dataset answer
- licensing
- pre-existing vs hackathon-built boundary

---

# 4. DATASET

If Devpost asks for a dataset:

**Not applicable — the prototype uses synthetic/public-safe scenarios and does not depend on a submitted external dataset.**

---

# 5. DO NOT CLAIM

- shared provider exposure proves shared failure
- shared recovery exposure proves a capacity shortage
- provider diversity proves independent recoverability
- event probabilities or provider-danger scores
- public evidence is equivalent to confidential supervisory evidence
- an external dataset was used when none is submitted
- the demo video is a continuous live browser recording if it is not

---

# Immediate Devpost action

On the current **Project details** page:

1. paste the Markdown story above into **About the project**;
2. add the **Built with** tags;
3. add the three **Try it out** links;
4. leave media until the final 3:2 gallery set and public video URL are ready;
5. click **Save & continue**;
6. inspect **Additional info** before entering anything there.

## Current status

**PROJECT DETAILS COPY + LINKS = READY.**

Remaining external items before final submit:

- final 3:2 Devpost media set;
- public YouTube/Vimeo link if using the video field;
- exact Additional info fields;
- final irreversible Submit review.
