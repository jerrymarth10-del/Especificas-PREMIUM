// Integration check. Run from a workspace containing the three repositories.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const p1 = path.join(root, 'sesau-certo');
const p2 = path.join(root, 'Especificas-PREMIUM');
process.env.JR_SESSION_SECRET = 'isolated-test-secret-not-used-in-production';
delete process.env.VERCEL_ENV;
const auth = require(p1 + '/api/_auth');
const { HEALTH_AREAS } = require(p1 + '/api/_entitlement');
const { lessons, exams } = require(p2 + '/lib/terapiaocupacional-conteudo.json');
const originalFetch = global.fetch;
let entitlement = true;
let checks = 0;
async function invoke(file, req) {
  const res = {headers:{},statusCode:200,setHeader(k,v){this.headers[k.toLowerCase()]=v;},status(n){this.statusCode=n;return this;},json(v){this.body=v;return this;},send(v){this.body=v;return this;},end(v){this.body=v;return this;}};
  await require(file)(Object.assign({headers:{},query:{}},req),res);return res;
}
function ok(condition,message){assert.ok(condition,message);checks++;}
global.fetch = async (url, options={}) => {
  const data=JSON.parse(options.body || '{}');
  if(String(url).endsWith('/api/verify-area-ticket')){
    const r=await invoke(p1+'/api/verify-area-ticket.js',{method:'POST',body:data});
    return {ok:r.statusCode===200,json:async()=>r.body};
  }
  if(String(url).includes('vendiro.com.br') && data.mode==='entitlement')return {ok:true,json:async()=>({ok:true,entitled:entitlement,area:data.area,product:data.product})};
  if(String(url).includes('vendiro.com.br') && data.token==='confirmed-test-purchase')return {ok:true,json:async()=>({ok:true,email:'test@example.invalid',product:'semusa-pvh-2026',area:'terapiaocupacional',paymentId:'test-only'})};
  throw Error('Unexpected external request in isolated test: '+url);
};
(async()=>{
  const entry=await invoke(p1+'/api/purchase-entry.js',{method:'POST',body:{token:'confirmed-test-purchase'}});
  ok(entry.statusCode===303 && entry.headers.location==='/api/study-entry','Purchase entry opens both study spaces');
  const sessionCookie=entry.headers['set-cookie'].split(';')[0];
  const study=await invoke(p1+'/api/study-entry.js',{method:'GET',headers:{cookie:sessionCookie}});
  ok(study.body.includes('area=terapiaocupacional')&&study.body.includes('/#disciplinas'),'General and specific access both available');
  const redirected=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area:'farmaceutico'},headers:{cookie:sessionCookie}});
  ok(redirected.statusCode===302&&redirected.headers.location.includes('?area=terapiaocupacional#'),'Purchased area overrides a different card');
  const ticket=decodeURIComponent(redirected.headers.location.split('#jr_area_ticket=')[1]);
  const claim=await invoke(p2+'/api/claim-area.js',{method:'POST',body:{ticket}});
  ok(claim.body.ok&&claim.body.area==='terapiaocupacional','Signed ticket claimed');
  ok(/HttpOnly; Secure; SameSite=Lax/.test(claim.headers['set-cookie']),'Access cookie security attributes');
  const cookie=claim.headers['set-cookie'].split(';')[0];
  const access=await invoke(p2+'/api/access.js',{method:'GET',query:{area:'terapiaocupacional'},headers:{cookie}});
  ok(access.body.allowed,'Correct area authorized');
  const other=await invoke(p2+'/api/access.js',{method:'GET',query:{area:'farmaceutico'},headers:{cookie}});
  ok(other.body.allowed===false,'Purchase does not grant Pharmacy');
  const spoof=await invoke(p2+'/api/access.js',{method:'GET',query:{area:'farmaceutico'},headers:{cookie:'jr_area_access_farmaceutico='+encodeURIComponent(ticket)}});
  ok(spoof.body.allowed===false,'Renaming a cookie cannot change entitlement');
  const anon=await invoke(p2+'/api/inject.js',{method:'GET'});
  const paid=await invoke(p2+'/api/inject.js',{method:'GET',headers:{cookie}});
  fs.writeFileSync('/tmp/to-catalog-paid.html',paid.body);
  ok(anon.statusCode===200&&paid.statusCode===200,'Both catalog renders succeed');
  ok(anon.body.includes('data-jr-card="terapiaocupacional"'),'Card visible without purchase');
  const areaOf=html=>html.match(/<section class="area jr-to-area"[\s\S]*?<\/section>/)[0];
  ok(!areaOf(anon.body).includes('data-video='),'Anonymous response contains no protected lessons');
  ok((areaOf(paid.body).match(/data-video=/g)||[]).length===lessons.length,'All lessons in authorized area');
  ok((areaOf(paid.body).match(/PROVA IBGP/g)||[]).length===exams.length,'All IBGP exams render');
  ok((areaOf(paid.body).match(/GABARITO IBGP/g)||[]).length===exams.length,'All IBGP answer keys render');
  for(const item of lessons)ok(/^[\w-]{11}$/.test(item.video)&&item.source&&item.group,'Video identifier, source and group');
  ok(new Set(lessons.map(x=>x.video)).size===lessons.length,'No duplicate lessons');
  for(const item of exams)ok(item.url.startsWith('https://www.pciconcursos.com.br/provas/download/')&&item.files.includes(item.answerFile)&&item.files.includes(item.examFile),'Exam and answer source files verified');
  for(const html of [anon.body,paid.body])for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(/type=["']application\//.test(m[1])||!m[2].trim())continue;new vm.Script(m[2]);}
  checks++;
  const tampered=await invoke(p2+'/api/claim-area.js',{method:'POST',body:{ticket:ticket+'x'}});
  ok(tampered.statusCode===401,'Modified signature rejected');
  const expired=auth.createAreaTicket('terapiaocupacional',-1,'test@example.invalid','semusa-pvh-2026');
  ok((await invoke(p2+'/api/claim-area.js',{method:'POST',body:{ticket:expired}})).statusCode===401,'Expired ticket rejected');
  entitlement=false;
  ok((await invoke(p2+'/api/access.js',{method:'GET',query:{area:'terapiaocupacional'},headers:{cookie}})).body.allowed===false,'Revoked entitlement rejected');
  ok(!areaOf((await invoke(p2+'/api/inject.js',{method:'GET',headers:{cookie}})).body).includes('data-video='),'Revoked entitlement hides protected lessons');
  entitlement=true;
  for(const area of HEALTH_AREAS){
    const token=auth.createToken('test@example.invalid',3600,area,'semusa-pvh-2026');
    const r=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area},headers:{cookie:'jr_session='+token}});
    const expected=area==='psicologia'?'psicologiasemusa':area;
    ok(r.statusCode===302&&r.headers.location.includes('?area='+expected+'#jr_area_ticket='),'Existing paid area preserved: '+area);
  }
  const legacy=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area:'farmaceutico'}});
  ok(legacy.statusCode===302&&legacy.headers.location==='https://especificas-premium.vercel.app/?area=farmaceutico','Legacy redirect preserved');
  const landing=fs.readFileSync(path.join(root,'SEMUSA-SESAU-APP/index.html'),'utf8');
  ok((landing.match(/name="area" value="terapiaocupacional"/g)||[]).length===1,'Landing has exactly one new option');
  const proxy=require(path.join(root,'SEMUSA-SESAU-APP/api/checkout.js'));
  global.fetch=async(url,opts)=>{const body=JSON.parse(opts.body);ok(body.area==='terapiaocupacional'&&body.variant==='','Checkout forwards canonical slug');return {status:200,json:async()=>({area:body.area})};};
  await invoke(path.join(root,'SEMUSA-SESAU-APP/api/checkout.js'),{method:'POST',body:{area:'terapiaocupacional',variant:''}});
  console.log(JSON.stringify({passed:checks,lessons:lessons.length,exams:exams.length,healthAreas:HEALTH_AREAS.size,mode:'isolated mocks; no real payment or email'}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{global.fetch=originalFetch;});
