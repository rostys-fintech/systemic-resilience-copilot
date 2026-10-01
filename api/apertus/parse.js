import { API_BASE_DEFAULT, MODEL_DEFAULT, extractJson } from "../../lib/apertus-contract.js";
import { PARSE_SYSTEM_PROMPT, mockParsedScenario, validateParseInput, validateParsedScenario } from "../../lib/scenario-parser.js";

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({ok:false,error:"Method not allowed"});
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  try{
    const input=validateParseInput(typeof req.body==="string"?JSON.parse(req.body):req.body);
    if(process.env.APERTUS_MOCK==="1") return res.status(200).json({ok:true,mode:"mock",model:process.env.APERTUS_MODEL||MODEL_DEFAULT,parsed:mockParsedScenario(),latency_ms:8});
    const token=String(process.env.HF_TOKEN||"").trim();
    if(!token) return res.status(503).json({ok:false,error:"HF_TOKEN is not configured"});
    const base=String(process.env.APERTUS_API_BASE||API_BASE_DEFAULT).replace(/\/$/,"");
    const model=process.env.APERTUS_MODEL||MODEL_DEFAULT;
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),Number(process.env.APERTUS_TIMEOUT||60)*1000);
    const started=Date.now();
    let r;
    try{
      r=await fetch(`${base}/chat/completions`,{
        method:"POST",
        headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          model,
          messages:[
            {role:"system",content:PARSE_SYSTEM_PROMPT},
            {role:"user",content:`Extract the structured recovery facts from this ${input.release_class} scenario. Missing facts must stay UNKNOWN.\n\n${input.text}`}
          ],
          temperature:0,
          max_tokens:700
        }),
        signal:controller.signal
      });
    }finally{clearTimeout(timeout)}
    const rawText=await r.text();
    if(!r.ok) return res.status(502).json({ok:false,error:`Apertus provider HTTP ${r.status}: ${rawText.slice(0,400)}`});
    const raw=JSON.parse(rawText);
    const content=raw?.choices?.[0]?.message?.content;
    const parsed=validateParsedScenario(extractJson(content));
    return res.status(200).json({ok:true,mode:"live",model,latency_ms:Date.now()-started,parsed});
  }catch(e){
    const msg=e?.name==="AbortError"?"Apertus provider timeout":String(e?.message||e);
    return res.status(400).json({ok:false,error:msg.slice(0,600)});
  }
}
