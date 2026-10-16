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
module.exports={hasManualSecretariaEscolar,verifyManualPassword,createCookie};
