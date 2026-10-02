import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { reconcileExplicitFacts, validateParsedScenario } from "../lib/scenario-parser.js";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.resolve(__dirname,"..");
const must=["app-v10.html","app-v10.css","app-v10.js","api/apertus/status.js","api/apertus/parse.js","api/apertus/explain.js","api/apertus/smoke.js","lib/apertus-contract.js","lib/scenario-parser.js","vercel.json","PUBLIC_SAFE_MANIFEST.md"];
for(const f of must){if(!fs.existsSync(path.join(ROOT,f))) throw new Error(`missing ${f}`)}
execFileSync(process.execPath,["--check",path.join(ROOT,"app-v10.js")],{stdio:"pipe"});
execFileSync(process.execPath,["--check",path.join(ROOT,"api/apertus/parse.js")],{stdio:"pipe"});
execFileSync(process.execPath,["--check",path.join(ROOT,"api/apertus/smoke.js")],{stdio:"pipe"});
const html=fs.readFileSync(path.join(ROOT,"app-v10.html"),"utf8");
const js=fs.readFileSync(path.join(ROOT,"app-v10.js"),"utf8");
for(const s of ["/api/apertus/status","/api/apertus/parse","/api/apertus/explain"]){if(!js.includes(s)) throw new Error(`app missing ${s}`)}
for(const s of ["Scenario","Apertus","Rules","Decision","Why / Fix"]){if(!html.includes(s)) throw new Error(`flow missing ${s}`)}
if(/HF_TOKEN\s*=\s*hf_[A-Za-z0-9]/.test(fs.readFileSync(path.join(ROOT,".env.example"),"utf8"))) throw new Error("real token in env example");

const canonical="Northstar Bank relies on a retail payments processing service. The impact tolerance is 60 minutes. The recovery route is outside the primary failure domain, supports the same workload, and has been tested. Observed recovery takes 95 minutes. Simultaneous recovery demand and shared recovery capacity are not established.";
const deliberatelyIncomplete=validateParsedScenario({critical_workload:null,ict_service:null,impact_tolerance_minutes:60,failure_domain_known:"UNKNOWN",recovery_route_outside_failure_domain:"YES",same_workload_supported:"YES",execution_tested:"YES",observed_recovery_minutes:95,simultaneous_demand_evidence_state:"UNKNOWN",capacity_state:"UNKNOWN",source_facts:[],unknown_fields:["critical_workload","ict_service","failure_domain_known"]});
const reconciled=reconcileExplicitFacts(canonical,deliberatelyIncomplete);
if(!reconciled.critical_workload||reconciled.failure_domain_known!=="YES"||reconciled.impact_tolerance_minutes!==60||reconciled.observed_recovery_minutes!==95||reconciled.unknown_fields.includes("critical_workload")||reconciled.unknown_fields.includes("failure_domain_known")) throw new Error("explicit-fact reconciliation failed");

const port="18765";
const p=spawn(process.execPath,[path.join(ROOT,"scripts/mock-server.mjs")],{env:{...process.env,PORT:port},stdio:["ignore","pipe","pipe"]});
try{
  for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${port}/api/apertus/status`);if(r.ok)break}catch{} await new Promise(r=>setTimeout(r,100));}
  const st=await (await fetch(`http://127.0.0.1:${port}/api/apertus/status`)).json();
  if(st.mode!=="mock"||st.secret_exposed!==false) throw new Error("bad status");
  const scenarioText="Northstar Bank relies on retail payments. The impact tolerance is 60 minutes. The independent recovery route was tested and recovery took 95 minutes.";
  const parsed=await (await fetch(`http://127.0.0.1:${port}/api/apertus/parse`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:scenarioText,release_class:"SYNTHETIC"})})).json();
  if(!parsed.ok||parsed.parsed.observed_recovery_minutes!==95||parsed.parsed.impact_tolerance_minutes!==60) throw new Error("mock parse contract failed");
  const payload={scenario:{scenario_id:"qa",release_class:"SYNTHETIC",critical_workload:{workload_name:"Payments"}},decision:{stage:"S5",state:"RED",binding:"B2",rule:"R-S5-02",action:"REPAIR_EXECUTION"},evidence:[{evidence_id:"EV-B-03",evidence_class:"SCENARIO",claim_supported:"95 min vs 60 min"}]};
  const out=await (await fetch(`http://127.0.0.1:${port}/api/apertus/explain`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})).json();
  if(!out.ok||out.review.used_rule_ids[0]!=="R-S5-02"||!out.review.used_evidence_ids.includes("EV-B-03")) throw new Error("mock review contract failed");
  console.log("PASS: syntax / UI flow / explicit-fact reconciliation / parse contract / deterministic handoff / explanation contract / secret boundary");
} finally { p.kill("SIGTERM"); }
