import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mockReview, validateInput, MODEL_DEFAULT } from "../lib/apertus-contract.js";
import { mockParsedScenario, validateParseInput } from "../lib/scenario-parser.js";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.resolve(__dirname,"..");
const port=Number(process.env.PORT||18765);
const send=(res,status,obj)=>{const b=Buffer.from(JSON.stringify(obj));res.writeHead(status,{"Content-Type":"application/json","Content-Length":b.length,"Cache-Control":"no-store"});res.end(b)};
const readBody=(req,cb)=>{let s="";req.on("data",d=>s+=d);req.on("end",()=>cb(s))};
const server=http.createServer((req,res)=>{
  if(req.url==="/api/apertus/status"&&req.method==="GET") return send(res,200,{configured:true,mode:"mock",model:MODEL_DEFAULT,secret_exposed:false});
  if(req.url==="/api/apertus/parse"&&req.method==="POST"){
    readBody(req,s=>{try{validateParseInput(JSON.parse(s));send(res,200,{ok:true,mode:"mock",model:MODEL_DEFAULT,latency_ms:8,parsed:mockParsedScenario()})}catch(e){send(res,400,{ok:false,error:e.message})}});return;
  }
  if(req.url==="/api/apertus/explain"&&req.method==="POST"){
    readBody(req,s=>{try{const p=validateInput(JSON.parse(s));send(res,200,{ok:true,mode:"mock",model:MODEL_DEFAULT,latency_ms:8,review:mockReview(p)})}catch(e){send(res,400,{ok:false,error:e.message})}});return;
  }
  const rel=req.url==="/"?"app-v10.html":req.url.replace(/^\//,"");
  const f=path.join(ROOT,rel);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end("Not found")}
  const type=rel.endsWith(".html")?"text/html; charset=utf-8":rel.endsWith(".css")?"text/css; charset=utf-8":rel.endsWith(".js")?"text/javascript; charset=utf-8":"application/octet-stream";
  res.writeHead(200,{"Content-Type":type});fs.createReadStream(f).pipe(res);
});
server.listen(port,"127.0.0.1",()=>console.log(`mock server http://127.0.0.1:${port}`));
