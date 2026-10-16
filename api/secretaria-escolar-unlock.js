const {verifyManualPassword,createCookie}=require('../lib/secretaria-escolar-access');
const attempts=new Map();
module.exports=function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false});}
  const origin=String(req.headers.origin||'');
  const host=String(req.headers.host||'');
  if(origin){try{if(new URL(origin).host!==host)return res.status(403).json({ok:false});}catch{return res.status(403).json({ok:false})}}
  if(Number(req.headers['content-length']||0)>2048)return res.status(413).json({ok:false});
  const ip=String(req.headers['x-forwarded-for']||req.headers['x-real-ip']||'unknown').split(',')[0].slice(0,64);
  const now=Date.now();
  for(const [k,v] of attempts){if(v.until<=now)attempts.delete(k)}
  const state=attempts.get(ip)||{count:0,until:now+15*60*1000};
  if(state.count>=8)return res.status(429).json({ok:false});
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    const candidate=String(body.password||'');
    if(candidate.length<1||candidate.length>256)return res.status(400).json({ok:false});
    if(!verifyManualPassword(candidate)){
      state.count++;attempts.set(ip,state);
      return res.status(401).json({ok:false});
    }
    attempts.delete(ip);
    createCookie(res);
    return res.status(200).json({ok:true});
  }catch(error){
    if(String(error.message||'').includes('sem configuração'))return res.status(503).json({ok:false});
    return res.status(400).json({ok:false});
  }
};
