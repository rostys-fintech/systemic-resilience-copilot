import { MODEL_DEFAULT } from "../../lib/apertus-contract.js";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ok:false,error:"Method not allowed"});
  const token = String(process.env.HF_TOKEN || "").trim();
  const mock = process.env.APERTUS_MOCK === "1";
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  return res.status(200).json({
    configured: Boolean(token) || mock,
    mode: mock ? "mock" : token ? "live" : "unconfigured",
    model: process.env.APERTUS_MODEL || MODEL_DEFAULT,
    secret_exposed: false
  });
}
