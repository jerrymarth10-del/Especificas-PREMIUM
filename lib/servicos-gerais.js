const art = require('./servicos-gerais-art');
const lessons = require('./servicos-gerais-aulas.json');

const exams = [
  {
    title: 'Câmara de Perdizes/MG • 2019',
    note: 'IBGP • Auxiliar de Serviços Gerais • nível fundamental',
    pci: 'https://www.pciconcursos.com.br/provas/download/auxiliar-de-servicos-gerais-camara-de-perdizes-mg-ibgp-2019',
    extra: 'https://www.qconcursos.com/questoes-de-concursos/provas/ibgp-2019-camara-de-perdizes-mg-auxiliar-de-servicos-gerais'
  },
  {
    title: 'Prefeitura de Andradas/MG • 2017',
    note: 'IBGP • Auxiliar de Limpeza Pública • prova + gabarito',
    pci: 'https://www.pciconcursos.com.br/provas/download/auxiliar-de-limpeza-publica-prefeitura-andradas-mg-ibgp-2017',
    extra: 'https://www.estudegratis.com.br/provas/ibgp-2017-prefeitura-de-andradas-mg-auxiliar-de-pedreiro-e-auxiliar-de-limpeza-publica'
  },
  {
    title: 'Prefeitura de Andradas/MG • 2017',
    note: 'IBGP • Auxiliar de Serviço Educacional • prova + gabarito',
    pci: 'https://www.pciconcursos.com.br/provas/download/auxiliar-de-servico-educacional-prefeitura-andradas-mg-ibgp-2017'
  }
];

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildServicosGerais(){
  const groups=[...new Set(lessons.map(x=>x.group))];
  const list=groups.map(group => '<div class="jr-sg-group"><strong>'+esc(group)+'</strong></div>'+
    lessons.map((item,index)=>item.group!==group?'':'<button type="button" class="jr-sg-lesson'+(index===0?' active':'')+'" data-id="'+esc(item.id)+'" data-url="'+esc(item.url)+'"><span class="jr-sg-play">▶</span><span><b>'+String(index+1).padStart(2,'0')+' • '+esc(item.title)+'</b><small>'+esc(item.author)+' • '+esc(item.duration)+'</small></span><span class="jr-sg-status">Estudar</span></button>').join('')
  ).join('');

  const examHtml=exams.map(x=>'<article class="jr-sg-exam"><span>PROVA ANTERIOR • IBGP</span><h4>'+esc(x.title)+'</h4><p>'+esc(x.note)+'</p><div><a href="'+esc(x.pci)+'" target="_blank" rel="noopener">Prova + gabarito • PCI</a>'+(x.extra?'<a href="'+esc(x.extra)+'" target="_blank" rel="noopener">Fonte alternativa</a>':'')+'</div></article>').join('');

  const card='<article class="card jr-sg-card jr-approved-art-card" data-jr-card="servicosgerais"><img src="'+art+'" alt="SEMUSA e SESAU — Serviços Gerais" width="480" height="720" loading="lazy" decoding="async"><div class="card-body"><button class="card-btn" type="button" onclick="openGate(\'servicosgerais\')" aria-label="Acessar Serviços Gerais — SEMUSA e SESAU">Acessar</button></div></article>';

  const area='<section class="area jr-sg-area" id="area-servicosgerais">'+
    '<div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA • SESAU</span><h2>Serviços Gerais</h2><p>30 aulas e questões comentadas focadas em limpeza, desinfecção, resíduos, materiais e organização do trabalho, mais provas anteriores da banca IBGP.</p></div></div></div>'+
    '<div class="jr-sg-grid"><div class="jr-sg-box">'+
      '<div class="jr-sg-title"><strong>Aulas e questões comentadas</strong><span>30 aulas selecionadas</span></div>'+
      '<div class="jr-sg-feature"><span class="mini-tag">AULA SELECIONADA</span><h3 id="jr-sg-title"></h3><p id="jr-sg-note"></p><div class="jr-sg-actions"><a id="jr-sg-open" class="jr-sg-primary" target="_blank" rel="noopener">Abrir aula gratuita</a><button id="jr-sg-done" type="button">Marcar como estudada</button></div><small>As aulas selecionadas são gratuitas e abrem na fonte em nova aba.</small></div>'+
      '<div class="jr-sg-progress"><div><b id="jr-sg-progress-text">0 de 30 estudadas</b><button id="jr-sg-continue" type="button">Continuar</button></div><span><i id="jr-sg-progress-fill"></i></span></div>'+
      '<div class="jr-sg-list">'+list+'</div>'+
    '</div><aside class="jr-sg-side"><div class="jr-sg-title"><strong>Provas anteriores</strong><span>Banca IBGP</span></div>'+examHtml+
      '<div class="jr-sg-tip"><b>Treino direcionado</b><p>Comece pelas provas de Auxiliar de Serviços Gerais e Limpeza. Use o gabarito após finalizar cada prova.</p></div>'+
    '</aside></div></section>';

  const css=`
#especificas .jr-sg-card{position:relative;overflow:hidden;background:#050505}
#especificas .jr-sg-card img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.jr-sg-area{--sg:#ef4444;--sg2:#991b1b}
.jr-sg-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.75fr);gap:18px;align-items:start}
.jr-sg-box,.jr-sg-side{background:rgba(8,15,28,.78);border:1px solid rgba(148,163,184,.18);border-radius:22px;padding:18px;box-shadow:0 18px 46px rgba(0,0,0,.18)}
.jr-sg-title{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}
.jr-sg-title strong{font-size:17px}.jr-sg-title span{font-size:12px;color:#94a3b8;font-weight:800}
.jr-sg-feature{border-radius:18px;padding:18px;background:linear-gradient(135deg,rgba(153,27,27,.28),rgba(15,23,42,.82));border:1px solid rgba(239,68,68,.24);margin-bottom:14px}
.jr-sg-feature h3{font-size:19px;margin:8px 0 4px}.jr-sg-feature p{margin:0 0 12px;color:#cbd5e1}.jr-sg-feature small{display:block;margin-top:10px;color:#94a3b8}
.jr-sg-actions{display:flex;gap:10px;flex-wrap:wrap}.jr-sg-actions a,.jr-sg-actions button,.jr-sg-progress button{border:0;border-radius:12px;padding:11px 14px;font-weight:900;cursor:pointer;text-decoration:none}
.jr-sg-primary{background:linear-gradient(135deg,#ef4444,#991b1b);color:#fff!important}.jr-sg-actions button,.jr-sg-progress button{background:#172033;color:#e2e8f0}
.jr-sg-progress{margin:14px 0}.jr-sg-progress>div{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}.jr-sg-progress>span{display:block;height:8px;border-radius:999px;background:#172033;overflow:hidden}.jr-sg-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ef4444,#f97316);border-radius:inherit;transition:width .2s ease}
.jr-sg-list{display:grid;gap:8px}.jr-sg-group{padding:12px 4px 5px;color:#fca5a5;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
.jr-sg-lesson{width:100%;display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;text-align:left;background:#0c1424;border:1px solid rgba(148,163,184,.14);color:#e5e7eb;border-radius:14px;padding:11px;cursor:pointer}
.jr-sg-lesson:hover,.jr-sg-lesson.active{border-color:rgba(239,68,68,.5);background:#131a2b}.jr-sg-lesson.done{border-color:rgba(34,197,94,.35)}
.jr-sg-play{width:30px;height:30px;border-radius:999px;background:rgba(239,68,68,.16);display:grid;place-items:center;color:#fca5a5}.jr-sg-lesson b{display:block;font-size:13px}.jr-sg-lesson small{display:block;color:#94a3b8;margin-top:2px}.jr-sg-status{font-size:11px;font-weight:900;color:#fca5a5}.jr-sg-lesson.done .jr-sg-status{color:#86efac}
.jr-sg-side{display:grid;gap:12px}.jr-sg-side .jr-sg-title{margin-bottom:0}.jr-sg-exam{padding:14px;border-radius:16px;background:#0c1424;border:1px solid rgba(148,163,184,.14)}.jr-sg-exam>span{font-size:10px;color:#fca5a5;font-weight:900;letter-spacing:.07em}.jr-sg-exam h4{margin:6px 0 4px;font-size:15px}.jr-sg-exam p{margin:0;color:#94a3b8;font-size:12px;line-height:1.4}.jr-sg-exam div{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.jr-sg-exam a{font-size:11px;font-weight:900;text-decoration:none;color:#fff;background:#7f1d1d;padding:8px 10px;border-radius:10px}.jr-sg-tip{padding:14px;border-radius:16px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.16)}.jr-sg-tip p{margin:5px 0 0;color:#cbd5e1;font-size:12px;line-height:1.45}
@media(max-width:860px){.jr-sg-grid{grid-template-columns:1fr}.jr-sg-side{order:2}}
@media(max-width:560px){.jr-sg-box,.jr-sg-side{padding:12px;border-radius:17px}.jr-sg-lesson{grid-template-columns:30px minmax(0,1fr);padding:10px}.jr-sg-status{grid-column:2}.jr-sg-title{align-items:flex-start}.jr-sg-actions{display:grid}.jr-sg-actions a,.jr-sg-actions button{width:100%;text-align:center}}
`;

  const script='<script id="jr-servicos-gerais-script-v1">('+servicosGeraisClient.toString()+')();<\/script>';
  return {card,area,css,script};
}

function servicosGeraisClient(){
  areaConfig.servicosgerais={title:'Serviços Gerais • SEMUSA e SESAU',password:'SERVICOS2026',sectionId:'area-servicosgerais',storageKey:'jr_especifica_servicosgerais'};
  function init(){
    var root=document.getElementById('area-servicosgerais'); if(!root)return;
    var buttons=Array.from(root.querySelectorAll('.jr-sg-lesson')); if(!buttons.length)return;
    var ids=buttons.map(function(b){return b.dataset.id});
    var key='jr_servicos_gerais_progress_v1';
    var state={done:[],current:ids[0]};
    try{var saved=JSON.parse(localStorage.getItem(key)||'{}');state.done=Array.isArray(saved.done)?saved.done.filter(function(id){return ids.indexOf(id)>=0}):[];if(ids.indexOf(saved.current)>=0)state.current=saved.current}catch(e){}
    function save(){try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}}
    function select(id,scroll){
      var b=buttons.find(function(x){return x.dataset.id===id});if(!b)return;
      state.current=id;
      buttons.forEach(function(x){x.classList.toggle('active',x.dataset.id===id)});
      document.getElementById('jr-sg-title').textContent=b.querySelector('b').textContent;
      document.getElementById('jr-sg-note').textContent=b.querySelector('small').textContent;
      document.getElementById('jr-sg-open').href=b.dataset.url;
      save();paint();
      if(scroll)document.querySelector('.jr-sg-feature').scrollIntoView({behavior:'smooth',block:'center'});
    }
    function paint(){
      buttons.forEach(function(b){var done=state.done.indexOf(b.dataset.id)>=0;b.classList.toggle('done',done);b.querySelector('.jr-sg-status').textContent=done?'Estudada':'Estudar'});
      document.getElementById('jr-sg-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-sg-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      document.getElementById('jr-sg-done').textContent=state.done.indexOf(state.current)>=0?'Desmarcar como estudada':'Marcar como estudada';
    }
    buttons.forEach(function(b){b.addEventListener('click',function(){select(b.dataset.id,true)})});
    document.getElementById('jr-sg-done').addEventListener('click',function(){var id=state.current;state.done=state.done.indexOf(id)>=0?state.done.filter(function(x){return x!==id}):state.done.concat(id);save();paint()});
    document.getElementById('jr-sg-continue').addEventListener('click',function(){select(state.current,true)});
    select(state.current,false);
  }
  function boot(){init();try{if(new URLSearchParams(location.search).get('area')==='servicosgerais')setTimeout(function(){if(typeof openGate==='function')openGate('servicosgerais');},250);}catch(e){}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
}

function insertServicosGerais(html){
  if(html.includes('id="area-servicosgerais"'))return html;
  var bundle=buildServicosGerais();
  var anchor=html.indexOf('data-jr-card="motorista"');
  if(anchor<0)anchor=html.indexOf('data-jr-card="assistente-social"');
  var end=html.indexOf('</article>',anchor);
  var footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<0)throw new Error('Catálogo sem ponto de inserção para Serviços Gerais');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>','<style id="jr-servicos-gerais-style">'+bundle.css+'</style></head>').replace('</body>',bundle.script+'</body>');
}

module.exports={insertServicosGerais,buildServicosGerais};
