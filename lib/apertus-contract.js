const ID_RE = /^[A-Za-z0-9_.:-]{1,80}$/;

export const MODEL_DEFAULT = "swiss-ai/Apertus-8B-Instruct-2509:publicai";
export const API_BASE_DEFAULT = "https://router.huggingface.co/v1";

export const SYSTEM_PROMPT = `You are Apertus inside a banking operational-resilience decision-support prototype.
You are NOT the decision engine. The deterministic decision supplied by the host is authoritative.
Use only the supplied synthetic/public-safe scenario, supplied evidence objects, and supplied rule/decision fields.
Do not invent evidence, probability, causal effectiveness, provider danger rankings, or systemic conclusions.
UNKNOWN must remain UNKNOWN.
Return JSON only with exactly these keys:
explanation: string (2 short sentences, plain language)
challenge: string (1 short sentence testing the conclusion against counter-evidence or missing prerequisites)
missing_evidence: array of short strings
rejected_claims: array of short strings
used_evidence_ids: array containing only supplied evidence IDs
used_rule_ids: array containing only supplied rule IDs`;

export function validateInput(payload) {
  if (!payload || typeof payload !== "object") throw new Error("Invalid JSON body");
  const scenario = payload.scenario || {};
  if (scenario.release_class === "RESTRICTED") throw new Error("Restricted scenario blocked");
  const evidence = Array.isArray(payload.evidence) ? payload.evidence : [];
  if (evidence.length > 30) throw new Error("Evidence bundle too large");
  return { scenario, decision: payload.decision || {}, evidence };
}

export function extractJson(text) {
  let t = String(text || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try { return JSON.parse(t); } catch (_) {}
  const a=t.indexOf("{"), b=t.lastIndexOf("}");
  if (a >= 0 && b > a) return JSON.parse(t.slice(a,b+1));
  throw new Error("Apertus output was not valid JSON");
}

export function validateReview(review, payload) {
  if (!review || typeof review !== "object" || Array.isArray(review)) throw new Error("Model output is not an object");
  const allowedEvidence = new Set((payload.evidence || []).map(x=>String(x?.evidence_id||"")).filter(Boolean));
  const d = payload.decision || {};
  const allowedRules = new Set([d.rule, d.rule_id].map(x=>String(x||"")).filter(Boolean));
  const ev = (Array.isArray(review.used_evidence_ids) ? review.used_evidence_ids : [])
    .map(String).filter(x=>ID_RE.test(x) && allowedEvidence.has(x));
  const rules = (Array.isArray(review.used_rule_ids) ? review.used_rule_ids : [])
    .map(String).filter(x=>ID_RE.test(x) && allowedRules.has(x));
  const shortList=(v,max=6)=>(Array.isArray(v)?v:[]).slice(0,max).map(x=>String(x).slice(0,300));
  return {
    explanation: String(review.explanation || "").slice(0,1200),
    challenge: String(review.challenge || "").slice(0,700),
    missing_evidence: shortList(review.missing_evidence),
    rejected_claims: shortList(review.rejected_claims),
    used_evidence_ids: [...new Set(ev)],
    used_rule_ids: [...new Set(rules)]
  };
}

export function mockReview(payload) {
  return validateReview({
    explanation: "The supplied recovery test exceeds the stated tolerance, so execution is the first evidenced weakness. Repair execution and retest before drawing downstream capacity conclusions.",
    challenge: "The conclusion would change if a valid same-workload test demonstrated recovery within tolerance.",
    missing_evidence: ["Simultaneous-demand evidence remains unresolved downstream."],
    rejected_claims: ["Backup exists, therefore recovery is sufficient."],
    used_evidence_ids: (payload.evidence || []).map(e=>e.evidence_id).filter(Boolean).slice(0,3),
    used_rule_ids: [payload.decision?.rule || payload.decision?.rule_id].filter(Boolean)
  }, payload);
}
