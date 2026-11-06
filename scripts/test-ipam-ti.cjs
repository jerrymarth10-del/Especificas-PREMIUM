const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const {buildIpamTi,insertIpamTi} = require('../lib/ipam-ti');
const {lessons,exams} = require('../lib/ipam-ti-conteudo.json');
const b=buildIpamTi();
const base='<html><head></head><body><div class="cards"><article class="card"><button onclick="openGate(\'administrativo\')">Acessar</button></article></div><footer class="footer"></footer></body></html>';
const html=insertIpamTi(base);
assert.equal(insertIpamTi(html),html,'Duplicate injection');
assert.match(html,/<\/article><article[^>]+data-jr-card="ipamti"/,'TI must follow Administrative');
assert.equal((html.match(/id="area-ipamti"/g)||[]).length,1);
assert.equal(new Set(lessons.map(x=>x.video)).size,lessons.length,'Duplicate videos');
for(const l of lessons)assert.match(l.video,/^[\w-]{11}$/);
assert.equal(exams.length,3);
for(const e of exams){assert.equal(e.board,'IBADE');assert.equal(new URL(e.url).hostname,'www.pciconcursos.com.br');assert.ok(e.examFile.endsWith('.pdf')&&e.answerFile.endsWith('.pdf'));}
// Exercise the original gate against the new configuration without browser credentials.
const ctx={areaConfig:{},document:{readyState:'loading',addEventListener(){}},setTimeout(){}};
vm.createContext(ctx);vm.runInContext(b.script.replace(/^<script[^>]*>/,'').replace(/<\/script>$/,''),ctx);
const elements={};const el=id=>elements[id]||(elements[id]={classList:{add(){},remove(){}},style:{},value:'',addEventListener(){},focus(){}});
ctx.document.getElementById=el;
const source=fs.readFileSync(require.resolve('../index.html'),'utf8');
const gateFunctions=source.slice(source.indexOf('let currentArea = null;'),source.indexOf('function showArea(areaId)'));
vm.runInContext(gateFunctions,ctx);
let opened=null;ctx.showArea=id=>{opened=id};
vm.runInContext("openGate('ipamti');areaPassword.value='invalid-test';submitGate()",ctx);
assert.equal(opened,null);assert.equal(el('gateError').style.display,'block');
vm.runInContext("areaPassword.value=areaConfig.ipamti.password;submitGate()",ctx);
assert.equal(opened,'ipamti');
// Paid access must only accept a verified ticket for the requested area.
async function invoke(area,cookie){const res={statusCode:200,setHeader(){},status(n){this.statusCode=n;return this},json(v){this.body=v;return this}};await require('../api/access')({method:'GET',headers:{cookie},query:{area}},res);return res;}
(async()=>{
 assert.equal((await invoke('ipamti','')).body.allowed,false);
 const original=global.fetch;
 try{
  global.fetch=async()=>({ok:true,json:async()=>({ok:true,area:'ipamti'})});
  assert.equal((await invoke('ipamti','jr_area_access_ipamti=synthetic-test-ticket')).body.allowed,true);
  global.fetch=async()=>({ok:true,json:async()=>({ok:true,area:'enfermagem'})});
  assert.equal((await invoke('ipamti','jr_area_access_ipamti=synthetic-test-ticket')).body.allowed,false);
 }finally{global.fetch=original;}
 console.log('PASS: TI IPAM — card, injection, unique videos, PCI pairs, manual gate and ticket isolation');
})().catch(e=>{console.error(e);process.exitCode=1});
