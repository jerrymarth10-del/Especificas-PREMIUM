// Run with: node scripts/check-catalog.cjs (no credentials or external requests).
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
async function render(cookie='') {
 let body='';const res={statusCode:200,setHeader(){},end(v){body=v}};
 await require(root+'/api/inject')({headers:{cookie},query:{}},res);
 assert.equal(res.statusCode,200,body.slice(0,200));
 return body;
}
(async()=>{
 const html=await render();
 const cards=Array.from(html.matchAll(/<article\b[^>]*class="[^"]*\bcard\b[^>]*>[\s\S]*?<\/article>/g),m=>m[0]);
 assert.equal(cards.length,30,'Unexpected catalog size');
 const keys=cards.map(c=>c.match(/data-jr-card="([^"]+)"/)?.[1]);
 assert.equal(new Set(keys).size,30,'Missing/duplicate card identifiers');
 for(const card of cards){assert.match(card,/<img\b[^>]*src="data:image\/(jpeg|png|svg\+xml);base64,/,'Card missing embedded artwork');assert.equal((card.match(/class="card-btn"/g)||[]).length,1,'Card must have exactly one access button');}
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!/application\/ld\+json/.test(m[1]))new vm.Script(m[2]);}
 assert.ok(!html.includes("key==='penal'"),'Police artwork must not be forcibly replaced');
 assert.match(cards[keys.indexOf('pedagogia')],/Professor SEMED — Séries Iniciais/);
 assert.match(html,/storageKey: "jr_especifica_pedagogia"/);
 assert.equal((html.match(/class="lesson-item"[^>]*data-area="pedagogia"/g)||[]).length,45,'Existing lessons changed');
 assert.match(html,/id="jr-pedagogia-ibgp"/);
 assert.equal(require(root+'/lib/pedagogia-ibgp').exams.length,3);
 assert.ok(!html.includes('id="area-secretariaescolar"'),'Anonymous response exposes protected content');
 // Exercise real manual-cookie verification using isolated, synthetic test secrets.
 process.env.JR_SECRETARIA_ESCOLAR_PASSWORD='test-only-password';
 process.env.JR_SECRETARIA_ESCOLAR_COOKIE_SECRET='test-only-secret-32-characters-long';
 let cookie='';require(root+'/lib/secretaria-escolar-access').createCookie({setHeader(k,v){if(k.toLowerCase()==='set-cookie')cookie=String(v).split(';')[0]}});
 const authorized=await render(cookie);
 assert.match(authorized,/id="area-secretariaescolar"/,'Valid manual session should retain protected area');
 console.log(JSON.stringify({ok:true,cards:cards.length,embeddedArt:true,scripts:'valid',originalTeacherLessons:45,ibgpExams:3,secretariaAnonymous:'protected',secretariaManual:'available'}));
})().catch(e=>{console.error('CATALOG_CHECK_FAILED:',e.message);process.exitCode=1});
