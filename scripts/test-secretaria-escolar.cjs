const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),p1=root+'/sesau-certo',p2=root+'/Especificas-PREMIUM';
process.env.JR_SESSION_SECRET='isolated-test-only-secret-not-production';delete process.env.VERCEL_ENV;
const auth=require(p1+'/api/_auth');const {HEALTH_AREAS}=require(p1+'/api/_entitlement');
let entitlement=true,product='semusa-pvh-2026',checks=0;
const ok=(v,m)=>{assert.ok(v,m);checks++};
async function invoke(file,req){const res={headers:{},statusCode:200,setHeader(k,v){this.headers[k.toLowerCase()]=v},status(n){this.statusCode=n;return this},json(v){this.body=v;return this},send(v){this.body=v;return this},end(v){this.body=v;return this}};await require(file)({headers:{},query:{},...req},res);return res}
const originalFetch=global.fetch;
global.fetch=async(url,opts={})=>{let data=JSON.parse(opts.body||'{}');
 if(String(url).endsWith('/api/verify-area-ticket')){let r=await invoke(p1+'/api/verify-area-ticket.js',{method:'POST',body:data});return {ok:r.statusCode===200,json:async()=>r.body}}
 if(String(url).endsWith('/index.html'))return {ok:true,text:async()=>fs.readFileSync(p1+'/index.html','utf8')};
 if(data.mode==='entitlement')return {ok:true,json:async()=>({ok:true,entitled:entitlement,area:data.area,product:data.product})};
 if(data.token==='confirmed-test')return {ok:true,json:async()=>({ok:true,email:'test@example.invalid',product,area:'secretariaescolar',paymentId:'mock-only'})};
 throw Error('Unexpected request: '+url);
};
(async()=>{
 for(product of ['semusa-pvh-2026','sesau-ro-completo']){
  const entry=await invoke(p1+'/api/purchase-entry.js',{method:'POST',body:{token:'confirmed-test'}});ok(entry.statusCode===303&&entry.headers.location==='/api/study-entry','Verified purchase enters Project 1');
  const session=entry.headers['set-cookie'].split(';')[0];
  const study=await invoke(p1+'/api/study-entry.js',{method:'GET',headers:{cookie:session}});ok(study.body.includes('area=secretariaescolar')&&study.body.includes('/#disciplinas'),'Project 1 offers general and purchased area');
  const redirect=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area:'farmaceutico'},headers:{cookie:session}});ok(redirect.headers.location.includes('?area=secretariaescolar#jr_area_ticket='),'Only purchased area is issued, even on other card');
  const ticket=decodeURIComponent(redirect.headers.location.split('#jr_area_ticket=')[1]);
  const claim=await invoke(p2+'/api/claim-area.js',{method:'POST',body:{ticket}});ok(claim.body.ok&&claim.body.area==='secretariaescolar','Project 2 accepts signed purchased area');
  const cookie=claim.headers['set-cookie'].split(';')[0];
  const access=await invoke(p2+'/api/access.js',{method:'GET',query:{area:'secretariaescolar'},headers:{cookie}});ok(access.body.allowed,'Paid access confirmed');
  const other=await invoke(p2+'/api/access.js',{method:'GET',query:{area:'farmaceutico'},headers:{cookie:'jr_area_access_farmaceutico='+encodeURIComponent(ticket)}});ok(!other.body.allowed,'Cookie substitution cannot open another area');
  const bad=await invoke(p2+'/api/claim-area.js',{method:'POST',body:{ticket:ticket+'x'}});ok(bad.statusCode===401,'Tampered ticket rejected');
  entitlement=false;ok(!(await invoke(p2+'/api/access.js',{method:'GET',query:{area:'secretariaescolar'},headers:{cookie}})).body.allowed,'Revoked access rejected');entitlement=true;
 }
 const legacy=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area:'secretariaescolar'}});ok(legacy.statusCode===302&&legacy.headers.location==='https://especificas-premium.vercel.app/?area=secretariaescolar','Manual sale opens password route without purchase');
 ok(!(await invoke(p2+'/api/access.js',{method:'GET',query:{area:'secretariaescolar'}})).body.allowed,'No automatic grant without payment');
 const bundle=require(p2+'/lib/secretaria-escolar').buildSecretariaEscolar();ok(!bundle.area,'Manual content is not delivered before unlock');
 process.env.JR_SECRETARIA_ESCOLAR_PASSWORD='test-only-manual-password';process.env.JR_SECRETARIA_ESCOLAR_COOKIE_SECRET='test-only-signing-key-abcdefghijklmnopqrstuvwxyz';
 const denied=await invoke(p2+'/api/access.js',{method:'POST',query:{manual:'secretariaescolar'},body:{password:'wrong'}});ok(denied.statusCode===401,'Wrong manual password denied');
 const unlocked=await invoke(p2+'/api/access.js',{method:'POST',query:{manual:'secretariaescolar'},body:{password:process.env.JR_SECRETARIA_ESCOLAR_PASSWORD}});ok(unlocked.statusCode===200,'Manual password accepted');
 ok(require(p2+'/lib/secretaria-escolar-access').hasManualSecretariaEscolar({headers:{cookie:unlocked.headers['set-cookie'].split(';')[0]}}),'Manual signed cookie accepted');

 for(const area of HEALTH_AREAS){const token=auth.createToken('test@example.invalid',3600,area,'semusa-pvh-2026');const out=await invoke(p1+'/api/area-entry.js',{method:'GET',query:{area},headers:{cookie:'jr_session='+token}});ok(out.headers.location.includes('?area='+(area==='psicologia'?'psicologiasemusa':area)+'#jr_area_ticket='),'Existing paid route preserved: '+area)}
 for(const [repo,file] of [[p1,'api/inject-quimica.js'],[p2,'api/inject.js']]){const out=await invoke(repo+'/'+file,{method:'GET'});ok(out.statusCode===200,'Full page renders');ok((out.body.match(/data-jr-card="secretariaescolar"/g)||[]).length===1,'Exactly one new card');for(const m of out.body.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!m[2].trim()||/type=["']application\//.test(m[1]))continue;new vm.Script(m[2])}fs.writeFileSync(repo===p1?'/tmp/secretaria-project1.html':'/tmp/secretaria-page.html',out.body)}
 for(const repo of ['SEMUSA-SESAU-APP','apostilas-jiparana']){const html=fs.readFileSync(root+'/'+repo+'/index.html','utf8');ok((html.match(/name="area" value="secretariaescolar"/g)||[]).length===1,'One checkout option');ok((html.match(/data-jr-pick-area="secretariaescolar"/g)||[]).length===1,'One base64 landing card');for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!m[2].trim()||/type=["']application\//.test(m[1]))continue;new vm.Script(m[2])}}
 console.log(JSON.stringify({passed:checks,paidAreas:HEALTH_AREAS.size,products:2,mode:'isolated simulated payment; no real charges or email'}));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>global.fetch=originalFetch);
