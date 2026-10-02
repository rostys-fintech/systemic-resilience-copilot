export const PARSE_SYSTEM_PROMPT = `You are Apertus inside a banking operational-resilience prototype. Your job is information extraction only, not risk scoring and not decision-making.
Extract ONLY facts explicitly stated in the supplied scenario. If a fact is absent or ambiguous, return UNKNOWN or null. Never infer a provider failure, systemic risk, probability, causal effect, capacity shortage, or recovery adequacy.

FIELD RUBRIC — follow literally:
- critical_workload: the named banking workload/service whose recovery is being assessed. If the scenario says the bank relies on a named service such as "retail payments processing service", that explicit phrase is the critical workload; do not require the words "critical workload".
- ict_service: the named ICT/service layer supporting that workload. If the only explicitly named service is the same phrase used for the recovered workload, it may be repeated here rather than set to UNKNOWN.
- impact_tolerance_minutes: explicit maximum recovery/impact tolerance in minutes.
- failure_domain_known: YES when the scenario explicitly states that the relevant/primary failure domain is identified or explicitly locates the recovery route relative to that failure domain (for example "the recovery route is outside the primary failure domain"). NO only when the scenario explicitly says the failure domain is not known. Otherwise UNKNOWN.
- recovery_route_outside_failure_domain: YES only when the scenario explicitly says the recovery route is outside/independent of the relevant failure domain; NO only when explicitly inside/shared; otherwise UNKNOWN.
- same_workload_supported: YES only when the scenario explicitly says the recovery route supports/runs the same workload; NO only when explicitly not; otherwise UNKNOWN.
- execution_tested: YES only when the scenario explicitly says recovery was tested; NO only when explicitly untested; otherwise UNKNOWN.
- observed_recovery_minutes: explicit observed/tested recovery duration.
- simultaneous_demand_evidence_state: KNOWN only when simultaneous/correlated recovery demand is explicitly established/measured; UNKNOWN when absent or explicitly not established.
- capacity_state: use SUFFICIENT, SHORTFALL or ENTITLEMENT_BLOCK only when explicitly established; otherwise UNKNOWN.

Before returning, self-check every field against the scenario. A non-UNKNOWN value must be supportable by an explicit phrase in the scenario.

Return JSON only with exactly these keys:
critical_workload: string|null
ict_service: string|null
impact_tolerance_minutes: number|null
failure_domain_known: "YES"|"NO"|"UNKNOWN"
recovery_route_outside_failure_domain: "YES"|"NO"|"UNKNOWN"
same_workload_supported: "YES"|"NO"|"UNKNOWN"
execution_tested: "YES"|"NO"|"UNKNOWN"
observed_recovery_minutes: number|null
simultaneous_demand_evidence_state: "KNOWN"|"UNKNOWN"
capacity_state: "SUFFICIENT"|"SHORTFALL"|"ENTITLEMENT_BLOCK"|"UNKNOWN"
source_facts: array of short strings copied or tightly paraphrased from the scenario that support the extracted non-UNKNOWN fields
unknown_fields: array of field names that remain unknown.`;

const TRI = new Set(["YES","NO","UNKNOWN"]);
const DEMAND = new Set(["KNOWN","UNKNOWN"]);
const CAPACITY = new Set(["SUFFICIENT","SHORTFALL","ENTITLEMENT_BLOCK","UNKNOWN"]);
const FIELD_NAMES = ["critical_workload","ict_service","impact_tolerance_minutes","failure_domain_known","recovery_route_outside_failure_domain","same_workload_supported","execution_tested","observed_recovery_minutes","simultaneous_demand_evidence_state","capacity_state"];

function textOrNull(v, max=180){
  if(v===null||v===undefined||v==='') return null;
  return String(v).replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max)||null;
}
function enumOr(v,set,fallback='UNKNOWN'){
  const x=String(v??'').toUpperCase();
  return set.has(x)?x:fallback;
}
function numOrNull(v){
  if(v===null||v===undefined||v==='') return null;
  const n=Number(v);
  return Number.isFinite(n)&&n>0&&n<=10080?Math.round(n*10)/10:null;
}
function shortList(v,max=10){return (Array.isArray(v)?v:[]).slice(0,max).map(x=>String(x).replace(/[\u0000-\u001f]/g,' ').trim().slice(0,240)).filter(Boolean)}
function fillMissing(out,key,value){
  if(value===null||value===undefined||value==='') return;
  if(out[key]===null||out[key]===undefined||out[key]==='UNKNOWN') out[key]=value;
}
function addFact(facts,value){
  const x=String(value||'').trim().slice(0,240);
  if(x&&!facts.includes(x)) facts.push(x);
}

export function validateParseInput(body){
  if(!body||typeof body!=="object") throw new Error("Invalid JSON body");
  const release=String(body.release_class||"SYNTHETIC").toUpperCase();
  if(!["PUBLIC","DERIVED_SAFE","SYNTHETIC"].includes(release)) throw new Error("Restricted input blocked");
  const text=String(body.text||"").trim();
  if(text.length<20) throw new Error("Scenario text is too short");
  if(text.length>5000) throw new Error("Scenario text is too long");
  return {text,release_class:release};
}

export function validateParsedScenario(raw){
  if(!raw||typeof raw!=="object"||Array.isArray(raw)) throw new Error("Apertus parse output is not an object");
  const out={
    critical_workload:textOrNull(raw.critical_workload),
    ict_service:textOrNull(raw.ict_service),
    impact_tolerance_minutes:numOrNull(raw.impact_tolerance_minutes),
    failure_domain_known:enumOr(raw.failure_domain_known,TRI),
    recovery_route_outside_failure_domain:enumOr(raw.recovery_route_outside_failure_domain,TRI),
    same_workload_supported:enumOr(raw.same_workload_supported,TRI),
    execution_tested:enumOr(raw.execution_tested,TRI),
    observed_recovery_minutes:numOrNull(raw.observed_recovery_minutes),
    simultaneous_demand_evidence_state:enumOr(raw.simultaneous_demand_evidence_state,DEMAND),
    capacity_state:enumOr(raw.capacity_state,CAPACITY),
    source_facts:shortList(raw.source_facts),
    unknown_fields:shortList(raw.unknown_fields).filter(x=>FIELD_NAMES.includes(x))
  };
  const requiredUnknown=[];
  for(const k of FIELD_NAMES){if(out[k]===null||out[k]===undefined||out[k]==='UNKNOWN') requiredUnknown.push(k)}
  out.unknown_fields=[...new Set([...out.unknown_fields,...requiredUnknown])];
  return out;
}

// Narrow host-side reconciliation for facts stated literally in the scenario.
// It may repair an AI omission, but it may not infer a risk state or invent evidence.
export function reconcileExplicitFacts(text, parsed){
  const t=String(text||'');
  const out={...validateParsedScenario(parsed),source_facts:[...validateParsedScenario(parsed).source_facts]};
  const facts=out.source_facts;

  const workload=t.match(/\brelies on (?:an?|the)\s+([^.]{3,140}?(?:service|workload|system|application|platform|process))\b/i);
  if(workload){
    const name=workload[1].trim();
    fillMissing(out,'critical_workload',name);
    fillMissing(out,'ict_service',name);
    addFact(facts,workload[0]);
  }

  const tolerance=t.match(/\b(?:impact|recovery)\s+tolerance\s+(?:is|of)\s+(\d+(?:\.\d+)?)\s*minutes?\b/i);
  if(tolerance){fillMissing(out,'impact_tolerance_minutes',Number(tolerance[1]));addFact(facts,tolerance[0]);}

  const outside=t.match(/\brecovery route\b[^.]{0,160}\b(?:outside|independent of)\b[^.]{0,120}\bfailure domain\b[^.]*\.?/i);
  if(outside){
    fillMissing(out,'recovery_route_outside_failure_domain','YES');
    fillMissing(out,'failure_domain_known','YES');
    addFact(facts,outside[0]);
  }

  const same=t.match(/\bsupports?\s+the\s+same\s+workload\b/i);
  if(same){fillMissing(out,'same_workload_supported','YES');addFact(facts,same[0]);}

  const tested=t.match(/\b(?:has been|was|is)\s+tested\b/i);
  if(tested){fillMissing(out,'execution_tested','YES');addFact(facts,tested[0]);}

  const recovery=t.match(/\bobserved recovery\s+(?:takes|took|is|was)\s+(\d+(?:\.\d+)?)\s*minutes?\b/i);
  if(recovery){fillMissing(out,'observed_recovery_minutes',Number(recovery[1]));addFact(facts,recovery[0]);}

  if(/\bsimultaneous recovery demand\b[^.]{0,140}\b(?:not established|unknown|not known)\b/i.test(t)) out.simultaneous_demand_evidence_state='UNKNOWN';
  if(/\b(?:shared recovery )?capacity\b[^.]{0,140}\b(?:not established|unknown|not known)\b/i.test(t)) out.capacity_state='UNKNOWN';

  return validateParsedScenario({...out,source_facts:facts,unknown_fields:[]});
}

export function mockParsedScenario(){
  return validateParsedScenario({
    critical_workload:"Retail payments processing",
    ict_service:"Payments processing service",
    impact_tolerance_minutes:60,
    failure_domain_known:"YES",
    recovery_route_outside_failure_domain:"YES",
    same_workload_supported:"YES",
    execution_tested:"YES",
    observed_recovery_minutes:95,
    simultaneous_demand_evidence_state:"UNKNOWN",
    capacity_state:"UNKNOWN",
    source_facts:["The service must recover within 60 minutes.","The recovery route is independent and tested.","Observed recovery takes 95 minutes."],
    unknown_fields:["simultaneous_demand_evidence_state","capacity_state"]
  });
}
