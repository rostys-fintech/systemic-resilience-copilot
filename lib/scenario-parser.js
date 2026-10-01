export const PARSE_SYSTEM_PROMPT = `You are Apertus inside a banking operational-resilience prototype. Your job is information extraction only, not risk scoring and not decision-making.
Extract ONLY facts explicitly stated in the supplied scenario. If a fact is absent or ambiguous, return UNKNOWN or null. Never infer a provider failure, systemic risk, probability, causal effect, capacity shortage, or recovery adequacy.
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
source_facts: array of short strings copied or tightly paraphrased from the scenario
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
