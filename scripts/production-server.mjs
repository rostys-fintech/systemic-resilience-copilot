import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import parseHandler from "../api/apertus/parse.js";
import explainHandler from "../api/apertus/explain.js";
import statusHandler from "../api/apertus/status.js";
import smokeHandler from "../api/apertus/smoke.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT || 18765);
const HOST = process.env.HOST || "0.0.0.0";

// Compatibility with the official Hack Apertus Docker runtime configuration.
if (process.env.LLM_BASE_URL) process.env.APERTUS_API_BASE = process.env.LLM_BASE_URL;
if (process.env.LLM_NAME) process.env.APERTUS_MODEL = process.env.LLM_NAME;
if (!process.env.APERTUS_MODEL) process.env.APERTUS_MODEL = "swiss-ai/Apertus-v1.5-8B";
if (!process.env.HF_TOKEN && process.env.LLM_API_KEY) process.env.HF_TOKEN = process.env.LLM_API_KEY;
// Local inference servers may accept a placeholder bearer key.
if (!process.env.HF_TOKEN && process.env.LLM_BASE_URL) process.env.HF_TOKEN = "local-inference";

const HANDLERS = {
  "/api/apertus/parse": parseHandler,
  "/api/apertus/explain": explainHandler,
  "/api/apertus/status": statusHandler,
  "/api/apertus/smoke": smokeHandler,
};
const TYPES = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".ico":"image/x-icon"};
function json(res,status,payload) {
  res.statusCode=status;
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  res.end(JSON.stringify(payload));
}
function wrap(res) {
  res.status = function(code){ this.statusCode=code; return this; };
  res.json = function(payload){ json(this,this.statusCode||200,payload); return this; };
  return res;
}
async function collectJSON(req) {
  const chunks=[]; let size=0;
  for await (const chunk of req) {
    size+=chunk.length;
    if(size>131072) throw new Error("Request body too large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")||"{}");
}
const server=http.createServer(async (req,rawRes)=>{
  const res=wrap(rawRes);
  res.setHeader("X-Content-Type-Options","nosniff");
  try {
    const pathname=new URL(req.url||"/","http://localhost").pathname;
    const handler=HANDLERS[pathname];
    if (handler) {
      if(req.method==="POST") req.body=await collectJSON(req);
      await handler(req,res);
      return;
    }
    if(req.method!=="GET"&&req.method!=="HEAD") return json(res,405,{error:"Method not allowed"});
    const rel=decodeURIComponent(pathname==="/"?"/app-v10.html":pathname).replace(/^\/+/, "");
    const ext=path.extname(rel).toLowerCase();
    const filename=path.resolve(ROOT,rel);
    if(!filename.startsWith(ROOT+path.sep)||!TYPES[ext]||!fs.existsSync(filename)||!fs.statSync(filename).isFile()) return json(res,404,{error:"Not found"});
    res.setHeader("Content-Type",TYPES[ext]);
    if(req.method==="HEAD") return res.end();
    fs.createReadStream(filename).on("error",()=>res.destroy()).pipe(res);
  } catch(e) {
    if(!res.headersSent) json(res,400,{ok:false,error:String(e.message||e).slice(0,300)});
    else res.end();
  }
});
server.listen(PORT,HOST,()=>console.log("Systemic Resilience Copilot listening on "+HOST+":"+PORT));
