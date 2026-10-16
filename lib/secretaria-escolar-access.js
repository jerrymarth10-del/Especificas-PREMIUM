const crypto = require('node:crypto');
const COOKIE_NAME='jr_secretaria_escolar_manual';
const TTL_SECONDS=60*60*24*30;
function secrets(){
  const password=String(process.env.JR_SECRETARIA_ESCOLAR_PASSWORD||'');
  const key=String(process.env.JR_SECRETARIA_ESCOLAR_COOKIE_SECRET||'');
  if(password.length<12 || key.length<32)throw new Error('Liberação manual Secretaria Escolar sem configuração segura.');
  return {password,key};
}
function equals(a,b){
  const x=Buffer.from(String(a)),y=Buffer.from(String(b));
  if(!x.length||x.length!==y.length)return false;
  return crypto.timingSafeEqual(x,y);
}
function parseCookie(req,name){
  const raw=String(req?.headers?.cookie||'');
  const part=raw.split(';').map(p=>p.trim()).find(p=>p.startsWith(name+'='));
  if(!part)return '';
  try{return decodeURIComponent(part.slice(name.length+1))}catch{return ''}
}
function sign(raw,key){return crypto.createHmac('sha256',key).update('jr-secretaria-escolar-v1:'+raw).digest('base64url')}
function hasManualSecretariaEscolar(req){
  try{
    const {key}=secrets();
    const raw=parseCookie(req,COOKIE_NAME);
    const match=/^(\d{13})\.([A-Za-z0-9_-]{43})$/.exec(raw);
    if(!match)return false;
    const exp=Number(match[1]);if(!Number.isSafeInteger(exp)||exp<=Date.now()||exp>Date.now()+TTL_SECONDS*1000)return false;
    return equals(match[2],sign(match[1],key));
  }catch{return false}
}
function createCookie(res){
  const {key}=secrets();
  const exp=String(Date.now()+TTL_SECONDS*1000);
  const value=exp+'.'+sign(exp,key);
  res.setHeader('Set-Cookie',COOKIE_NAME+'='+encodeURIComponent(value)+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age='+TTL_SECONDS);
}
function verifyManualPassword(candidate){
  const {password}=secrets();
  return equals(candidate,password);
}
const attempts=new Map();
function handleManualUnlock(req,res){
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
}

module.exports={hasManualSecretariaEscolar,verifyManualPassword,createCookie,handleManualUnlock};
