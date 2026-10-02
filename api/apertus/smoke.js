const SCENARIO="Northstar Bank relies on a retail payments processing service. The impact tolerance is 60 minutes. The recovery route is outside the primary failure domain, supports the same workload, and has been tested. Observed recovery takes 95 minutes. Simultaneous recovery demand and shared recovery capacity are not established.";

export default async function handler(req,res){
  if(req.method!=="GET") return res.status(405).json({ok:false,error:"Method not allowed"});
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  try{
    const host=String(req.headers["x-forwarded-host"]||req.headers.host||process.env.VERCEL_URL||"").split(",")[0].trim();
    if(!host) return res.status(500).json({ok:false,error:"Host unavailable"});
    const proto=/localhost|127\.0\.0\.1/.test(host)?"http":"https";
    const r=await fetch(`${proto}://${host}/api/apertus/parse`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({text:SCENARIO,release_class:"SYNTHETIC"})
    });
    const j=await r.json();
    const p=j?.parsed||{};
    const upstream=p.critical_workload&&p.impact_tolerance_minutes===60&&p.failure_domain_known==="YES"&&p.recovery_route_outside_failure_domain==="YES"&&p.same_workload_supported==="YES"&&p.execution_tested==="YES"&&p.observed_recovery_minutes===95;
    const decision=upstream&&Number(p.observed_recovery_minutes)>Number(p.impact_tolerance_minutes)?{stage:"S5",state:"RED",binding:"B2",action:"REPAIR_EXECUTION"}:null;
    const unknowns=p.simultaneous_demand_evidence_state==="UNKNOWN"&&p.capacity_state==="UNKNOWN";
    const pass=Boolean(r.ok&&j.ok&&j.mode==="live"&&upstream&&unknowns&&decision);
    return res.status(pass?200:503).json({
      ok:pass,
      mode:j?.mode||"unknown",
      model:j?.model||null,
      checks:{
        critical_workload:p.critical_workload||null,
        impact_tolerance_minutes:p.impact_tolerance_minutes??null,
        failure_domain_known:p.failure_domain_known||null,
        recovery_route_outside_failure_domain:p.recovery_route_outside_failure_domain||null,
        same_workload_supported:p.same_workload_supported||null,
        execution_tested:p.execution_tested||null,
        observed_recovery_minutes:p.observed_recovery_minutes??null,
        simultaneous_demand_evidence_state:p.simultaneous_demand_evidence_state||null,
        capacity_state:p.capacity_state||null
      },
      deterministic_expected:decision,
      parse_latency_ms:j?.latency_ms??null,
      secret_exposed:false
    });
  }catch(e){
    return res.status(500).json({ok:false,error:String(e?.message||e).slice(0,500),secret_exposed:false});
  }
}
