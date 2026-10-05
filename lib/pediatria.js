const art = require('./pediatria-art');
const lessons = require('./pediatria-aulas.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');

const ibgpExams = [
  {
    title:'Médico Clínico • IBGP',
    note:'Treino de banca IBGP para Medicina',
    prova:'https://arq.pciconcursos.com.br/provas/22752325/49175f80b134/3_ibgp_medico_clinico.pdf',
    gabarito:'https://arq.pciconcursos.com.br/provas/22752325/0b594ee55738/gab_preliminar.pdf'
  },
  {
    title:'Médico • IBGP',
    note:'Treino de banca IBGP para Medicina',
    prova:'https://arq.pciconcursos.com.br/provas/22753469/f6808c01b414/6_ibgp_medico.pdf',
    gabarito:'https://arq.pciconcursos.com.br/provas/22753469/074f078c0a55/gab_preliminar.pdf'
  },
  {
    title:'Residência Médica • Acesso Direto • IBGP',
    note:'Prova oficial IBGP com bloco de Pediatria',
    prova:'https://arquivos1.ibgpconcursos.com.br/site/anexos/362/1.%20ACESSO%20DIRETO%20-%20V1.pdf'
  }
];

const pediatricExams = [
  {
    title:'Médico Pediatra • Rolim de Moura/RO • 2025',
    note:'IBADE • treino específico do cargo • PCI Concursos',
    prova:'https://arq.pciconcursos.com.br/provas/34771699/9ffb976079c/medico_pediatra.pdf',
    gabarito:'https://arq.pciconcursos.com.br/provas/34771699/41350a67068/gabarito.pdf',
    pci:'https://www.pciconcursos.com.br/provas/download/medico-pediatra-prefeitura-rolim-de-moura-ro-ibade-2025'
  },
  {
    title:'Médico Pediatra • CISCOPAR • 2023',
    note:'CONSULPAM • treino específico do cargo • PCI Concursos',
    prova:'https://arq.pciconcursos.com.br/provas/30736944/5c18630adb9/medico_pediatra.pdf',
    gabarito:'https://arq.pciconcursos.com.br/provas/30736944/70ee3713667/gabarito.pdf',
    pci:'https://www.pciconcursos.com.br/provas/download/medico-pediatra-ciscopar-consulpam-2023'
  },
  {
    title:'Médico Pediatra • SESA/ES • 2013',
    note:'CESPE • conhecimentos específicos • PCI Concursos',
    prova:'https://arq.pciconcursos.com.br/provas/19096871/55d244a3ccb/medico_pediatra.pdf',
    gabarito:'https://arq.pciconcursos.com.br/provas/19096871/8456e97c231/gabaritos_conhec_espec.pdf',
    pci:'https://www.pciconcursos.com.br/provas/download/medico-pediatra-sesa-es-cespe-2013'
  }
];

const materials = [
  {title:'Específicas Medicina / Saúde Pública',note:'PDF já utilizado no bloco de Medicina',url:'especificas-medicine.pdf'},
  {title:'1.000 questões de Saúde / SUS',note:'Material de apoio já existente na plataforma',url:'1000 questões.pdf'},
  {title:'Questões do SUS',note:'Simulado de Saúde Pública no PCI Concursos',url:'https://www.pciconcursos.com.br/simulados/saude-publica/sus'},
  {title:'Lei nº 8.080/1990',note:'Lei Orgânica da Saúde • texto oficial',url:'https://www.planalto.gov.br/ccivil_03/leis/l8080.htm'},
  {title:'Lei nº 8.142/1990',note:'Participação social e transferências no SUS • texto oficial',url:'https://www.planalto.gov.br/ccivil_03/leis/l8142.htm'},
  {title:'ECA • Lei nº 8.069/1990',note:'Direitos da criança e do adolescente • texto oficial',url:'https://www.planalto.gov.br/ccivil_03/leis/l8069.htm'},
  {title:'PNAISC • Política Nacional de Atenção Integral à Saúde da Criança',note:'Ministério da Saúde • orientações para implementação • PDF oficial',url:'https://bvsms.saude.gov.br/bvs/publicacoes/politica_nacional_atencao_integral_saude_crianca_orientacoes_implementacao.pdf'},
  {title:'Saúde da Criança • Crescimento e Desenvolvimento',note:'Ministério da Saúde • material oficial de Atenção Básica',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/publicacoes/saude-da-crianca-crescimento-e-desenvolvimento-ministerio-da-saude-secretaria-de-atencao-a-saude-departamento-de-atencao/view'},
  {title:'Saúde da Criança • Aleitamento e Alimentação Complementar',note:'Ministério da Saúde • material oficial para atenção à criança',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/publicacoes/saude-da-crianca-aleitamento-materno-e-alimentacao-complementar/view'},
  {title:'Caderneta da Criança',note:'Ministério da Saúde • crescimento, desenvolvimento, vacinação e acompanhamento integral',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/caderneta/caderneta'}
];

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function resource(exam, extraClass='') {
  return `<div class="jr-ped-exam ${extraClass}"><b>${esc(exam.title)}</b><p class="jr-ped-note">${esc(exam.note)}</p>
    <a class="jr-ped-resource" href="${esc(exam.prova)}" target="_blank" rel="noopener"><b>PROVA • Abrir PDF</b><small>Arquivo direto</small></a>
    ${exam.gabarito ? `<a class="jr-ped-resource" href="${esc(exam.gabarito)}" target="_blank" rel="noopener"><b>GABARITO • Abrir PDF</b><small>Arquivo direto</small></a>` : ''}
    ${exam.pci ? `<a class="jr-ped-resource jr-ped-pci" href="${esc(exam.pci)}" target="_blank" rel="noopener"><b>PCI CONCURSOS • Conferir fonte</b><small>Página da prova e gabarito</small></a>` : ''}
  </div>`;
}

function buildPediatria(){
  const groups=[...new Set(lessons.map(x=>x.group))];
  const list=groups.map(group =>
    `<div class="jr-ped-head"><strong>${esc(group)}</strong></div>`+
    lessons.map((item,index)=>item.group!==group?'':`<button type="button" class="jr-ped-lesson${index===0?' active':''}" data-video="${esc(item.video)}"><span class="jr-ped-play">▶</span><span><b>${String(index+1).padStart(2,'0')} • ${esc(item.title)}</b><small>${esc(item.source)}</small></span><span class="jr-ped-status">Assistir</span></button>`).join('')
  ).join('');

  const materialHtml=materials.map(item=>`<a class="jr-ped-resource jr-ped-material" href="${esc(item.url)}" target="_blank" rel="noopener"><b>${esc(item.title)}</b><small>${esc(item.note)}</small></a>`).join('');

  const card=`<article class="card jr-ped-card jr-approved-art-card" data-jr-card="pediatria"><img src="${art}" alt="SEMUSA e SESAU — Médico Pediatra" width="240" height="360" loading="lazy" decoding="async"><div class="card-body"><button class="card-btn" type="button" onclick="openGate('pediatria')" aria-label="Acessar Médico Pediatra — SEMUSA e SESAU">Acessar</button></div></article>`;

  const area=`<section class="area jr-ped-area" id="area-pediatria">
    <div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA • SESAU • BANCA IBGP</span><h2>Médico Pediatra</h2><p>30 aulas organizadas com base no conteúdo de Pediatria, reaproveitando o núcleo útil de Medicina e acrescentando puericultura, crescimento e desenvolvimento, neonatologia, imunização, doenças respiratórias, urgências pediátricas, SUS e questões.</p></div></div></div>
    <div class="jr-ped-grid">
      <div class="jr-ped-box">
        <div class="jr-ped-head"><strong>Videoaulas</strong><span>30 aulas • 6 módulos</span></div>
        <div class="jr-ped-player"><iframe id="jr-ped-player" title="Videoaulas — Médico Pediatra" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
        <div class="jr-ped-current"><b id="jr-ped-title"></b><small id="jr-ped-note"></small><a id="jr-ped-youtube" target="_blank" rel="noopener">Abrir aula no YouTube ↗</a></div>
        <div class="jr-ped-progress"><div><strong>Seu progresso</strong><span id="jr-ped-progress-text">0 de 30 estudadas</span></div><div class="jr-ped-track"><i id="jr-ped-progress-fill"></i></div></div>
        <div class="jr-ped-actions"><button type="button" id="jr-ped-done">Marcar como estudada</button><button type="button" id="jr-ped-continue">Continuar de onde parei</button></div>
        <div class="jr-ped-list">${list}</div>
      </div>
      <aside class="jr-ped-side">
        <div class="jr-ped-box"><div class="jr-ped-head"><strong>Treino de banca • IBGP</strong><span>Medicina + Pediatria</span></div>
          ${ibgpExams.map(x=>resource(x,'jr-ped-ibgp')).join('')}
          <p class="jr-ped-note">Estas provas são identificadas como treino de banca IBGP. A prova de residência contém Pediatria; as provas médicas ajudam a treinar o estilo da organizadora.</p>
        </div>
        <div class="jr-ped-box"><div class="jr-ped-head"><strong>Provas específicas • Pediatria</strong><span>PCI Concursos</span></div>
          ${pediatricExams.map(x=>resource(x,'jr-ped-specific')).join('')}
          <p class="jr-ped-note">As provas acima são específicas de Médico Pediatra. Quando a banca não é IBGP, isso fica indicado claramente.</p>
        </div>
        <div class="jr-ped-box"><div class="jr-ped-head"><strong>PDFs e legislação</strong><span>SUS • Saúde • ECA</span></div>${materialHtml}</div>
        <div class="jr-ped-box"><div class="jr-ped-head"><strong>Roteiro de estudo</strong></div><p class="jr-ped-note">Priorize puericultura, crescimento e desenvolvimento, vacinação, neonatologia, asma/bronquiolite/pneumonia, diarreia e desidratação, sepse, convulsão febril, meningites, urgências e SUS. Finalize cada ciclo resolvendo provas.</p></div>
      </aside>
    </div>
  </section>`;

  const css=buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-ped')+`
    .cards .jr-ped-card{position:relative;overflow:hidden;background:#050505;aspect-ratio:2/3}
    .cards .jr-ped-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain!important;object-position:center;transform:none!important}
    .cards .jr-ped-card .card-body{left:14px;right:14px;bottom:14px}
    .jr-ped-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
    .jr-ped-actions button{border:1px solid #166534;background:#14532d;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}
    #jr-ped-youtube{display:inline-block;color:#6ee7b7;margin-top:8px;font-size:12px}
    .jr-ped-resource{display:block;margin:8px 0;padding:11px 12px;border:1px solid rgba(16,185,129,.3);border-radius:12px;background:rgba(6,78,59,.18);text-decoration:none}
    .jr-ped-resource b,.jr-ped-resource small{display:block}.jr-ped-resource small{color:#a7b7c4;margin-top:4px;font-size:11px}
    .jr-ped-pci{border-color:rgba(59,130,246,.35);background:rgba(30,64,175,.16)}
    .jr-ped-exam{padding:12px 0;border-bottom:1px solid rgba(148,163,184,.12)}.jr-ped-exam:last-child{border-bottom:0}
    .jr-ped-box+.jr-ped-box{margin-top:14px}
    .jr-ped-note{color:#94a3b8;font-size:12px;line-height:1.5;margin:6px 0 10px}
    .jr-ped-lesson:focus-visible,.jr-ped-actions button:focus-visible,.jr-ped-resource:focus-visible{outline:2px solid #6ee7b7;outline-offset:2px}
    @media(max-width:820px){.jr-ped-grid{grid-template-columns:1fr!important}.jr-ped-side{order:2}}
    @media(max-width:560px){.jr-ped-actions{display:grid}.jr-ped-actions button{width:100%}.jr-ped-box{border-radius:16px}}
  `;
  const script=`<script id="jr-pediatria-script-v1">(${pediatriaClient.toString()})();<\/script>`;
  return {card,area,css,script};
}

function pediatriaClient(){
  areaConfig.pediatria={title:'Médico Pediatra • SEMUSA e SESAU',password:'PEDIATRIA1998',sectionId:'area-pediatria',storageKey:'jr_especifica_pediatria'};
  function init(){
    const root=document.getElementById('area-pediatria'); if(!root)return;
    const buttons=Array.from(root.querySelectorAll('.jr-ped-lesson')); if(!buttons.length)return;
    const ids=buttons.map(b=>b.dataset.video);
    const player=document.getElementById('jr-ped-player');
    const doneButton=document.getElementById('jr-ped-done');
    const key='jr_pediatria_progress_v1';
    let state={done:[],current:ids[0]};
    try{const saved=JSON.parse(localStorage.getItem(key)||'{}');state.done=Array.isArray(saved.done)?[...new Set(saved.done.filter(id=>ids.includes(id)))]:[];if(ids.includes(saved.current))state.current=saved.current;}catch(e){}
    function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}}
    function paint(){
      buttons.forEach(b=>{const done=state.done.includes(b.dataset.video);b.classList.toggle('done',done);b.classList.toggle('active',b.dataset.video===state.current);b.querySelector('.jr-ped-status').textContent=done?'Estudada':'Assistir';});
      document.getElementById('jr-ped-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-ped-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id,autoplay){
      const b=buttons.find(x=>x.dataset.video===id);if(!b)return;
      state.current=id;player.dataset.video=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-ped-title').textContent=b.querySelector('b').textContent;
      document.getElementById('jr-ped-note').textContent=b.querySelector('small').textContent;
      document.getElementById('jr-ped-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>{open(b.dataset.video,true);player.scrollIntoView({behavior:'smooth',block:'center'});}));
    doneButton.addEventListener('click',()=>{const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint();});
    document.getElementById('jr-ped-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertPediatria(html){
  if(html.includes('id="area-pediatria"'))return html;
  const bundle=buildPediatria();
  let anchor=html.indexOf('data-jr-card="servicosgerais"');
  if(anchor<0)anchor=html.indexOf('data-jr-card="motorista"');
  if(anchor<0)anchor=html.indexOf('data-jr-card="assistente-social"');
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<0)throw new Error('Catálogo sem ponto de inserção para Médico Pediatra');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-pediatria-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}

module.exports={insertPediatria,buildPediatria};
