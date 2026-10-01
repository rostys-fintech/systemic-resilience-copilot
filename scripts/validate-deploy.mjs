import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.resolve(__dirname,"..");
const must=["index.html","api/apertus/status.js","api/apertus/explain.js","lib/apertus-contract.js","vercel.json","PUBLIC_SAFE_MANIFEST.md"];
for(const f of must){if(!fs.existsSync(path.join(ROOT,f))) throw new Error(`missing ${f}`)}
const html=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
for(const s of ["/api/apertus/status","/api/apertus/explain","Why? Ask Apertus"]){if(!html.includes(s)) throw new Error(`index missing ${s}`)}
if(/HF_TOKEN\s*=\s*hf_[A-Za-z0-9]/.test(fs.readFileSync(path.join(ROOT,".env.example"),"utf8"))) throw new Error("real token in env example");
const port="18765";
const p=spawn(process.execPath,[path.join(ROOT,"scripts/mock-server.mjs")],{env:{...process.env,PORT:port},stdio:["ignore","pipe","pipe"]});
try{
  for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${port}/api/apertus/status`);if(r.ok)break}catch{} await new Promise(r=>setTimeout(r,100));}
  const st=await (await fetch(`http://127.0.0.1:${port}/api/apertus/status`)).json();
  if(st.mode!=="mock"||st.secret_exposed!==false) throw new Error("bad status");
  const payload={scenario:{scenario_id:"qa",release_class:"SYNTHETIC",critical_workload:{workload_name:"Payments"}},decision:{stage:"S5",state:"RED",binding:"B2",rule:"R-S5-02",action:"REPAIR_EXECUTION"},evidence:[{evidence_id:"EV-B-03",evidence_class:"SCENARIO",claim_supported:"95 min vs 60 min"}]};
  const out=await (await fetch(`http://127.0.0.1:${port}/api/apertus/explain`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})).json();
  if(!out.ok||out.review.used_rule_ids[0]!=="R-S5-02"||!out.review.used_evidence_ids.includes("EV-B-03")) throw new Error("mock contract failed");
  console.log("PASS: deploy files / same-origin API contract / secret boundary / reference validation");
} finally { p.kill("SIGTERM"); }
