const art = require('./motorista-art.json');
const lessons = require('./motorista-aulas.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');

const apostilas = [
  {
    title: 'Motorista • Categoria D • Veículos Leves',
    note: 'SEMUSA / SESAU 2026 • 414 páginas',
    href: 'https://jr-apostilas-materiais.floot.app/_cdn/static/6e2624ca-37f9-4eea-9cf8-2a88b5d778d9-motorista-categoria-d-veiculos-leves-semusa-sesau-2026.pdf'
  },
  {
    title: 'Motorista • Veículos Pesados',
    note: 'SEMUSA / SESAU 2026 • 477 páginas',
    href: 'https://jr-apostilas-materiais.floot.app/_cdn/static/abfa26fa-ebbf-4890-978e-6af68e7b7723-motorista-veiculos-pesados-semusa-sesau-2026.pdf'
  }
];

const exams = [
  {
    title: 'Câmara de Perdizes/MG • 2019',
    note: 'IBGP • Motorista • 35 questões',
    prova: 'https://arquivos.qconcursos.com/prova/arquivo_prova/71307/ibgp-2019-camara-de-perdizes-mg-motorista-prova.pdf',
    gabarito: 'https://eticaconcursos.com.br/provas/arquivos/gabarito/ibgp-2019-camara-de-perdizes-mg-motorista-gabarito.pdf',
    label: 'Gabarito • PDF direto',
    pci: 'https://www.pciconcursos.com.br/provas/download/motorista-camara-de-perdizes-mg-ibgp-2019'
  },
  {
    title: 'Prefeitura de Andradas/MG • 2017',
    note: 'IBGP • Motorista • 25 questões',
    prova: 'https://www.estudegratis.com.br/images/provas/42200-ibgp-2017-prefeitura-de-andradas-mg-motorista-prova.pdf',
    gabarito: 'https://www.estudegratis.com.br/images/provas/42200-ibgp-2017-prefeitura-de-andradas-mg-motorista-gabarito.pdf',
    label: 'Gabarito • PDF direto',
    pci: 'https://www.pciconcursos.com.br/provas/download/motorista-prefeitura-andradas-mg-ibgp-2017'
  },
  {
    title: 'Prefeitura de Brazópolis/MG • 2016',
    note: 'IBGP • Motorista D • prova + gabarito pós-recurso no PCI',
    pci: 'https://www.pciconcursos.com.br/provas/download/motorista-d-prefeitura-brazopolis-mg-ibgp-2016'
  }
]
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildMotorista() {
  const groups = [...new Set(lessons.map(item => item.group))];
  const list = groups.map(group => `<div class="jr-mot-head"><strong>${escapeHtml(group)}</strong></div>` + lessons.map((item, index) => item.group !== group ? '' : `<button type="button" class="jr-mot-lesson${index === 0 ? ' active' : ''}" data-video="${item.video}"><span class="jr-mot-play">▶</span><span><b>${String(index + 1).padStart(2,'0')} • ${escapeHtml(item.title)}</b><small>${escapeHtml(item.author)} • ${escapeHtml(item.duration)}</small></span><span class="jr-mot-status">Assistir</span></button>`).join('')).join('');
  const card = `<article class="card jr-mot-card jr-approved-art-card" data-jr-card="motorista"><img src="${art}" alt="SEMUSA Porto Velho — Motorista" width="1024" height="1536" loading="lazy" decoding="async"><div class="card-body"><button class="card-btn" type="button" onclick="openGate('motorista')" aria-label="Acessar Motorista — SEMUSA Porto Velho">Acessar</button></div></article>`;
  const area = `<section class="area jr-mot-area" id="area-motorista">
    <div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA • Porto Velho</span><h2>Motorista</h2><p>Apostilas SEMUSA / SESAU 2026, 30 aulas organizadas por assunto e provas anteriores da banca IBGP, com acesso direto aos PDFs e referência no PCI Concursos.</p></div></div></div>
    <div class="jr-mot-grid"><div class="jr-mot-box"><div class="jr-mot-head"><strong>Videoaulas</strong><span>30 aulas • 6 módulos</span></div>
    <div class="jr-mot-player"><iframe id="jr-mot-player" title="Videoaulas — Motorista" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="jr-mot-current"><b id="jr-mot-title"></b><small id="jr-mot-note"></small><a id="jr-mot-youtube" target="_blank" rel="noopener">Abrir aula no YouTube ↗</a></div>
    <div class="jr-mot-progress"><div><strong>Seu progresso</strong><span id="jr-mot-progress-text">0 de 30 estudadas</span></div><div class="jr-mot-track"><i id="jr-mot-progress-fill"></i></div></div>
    <div class="jr-mot-actions"><button type="button" id="jr-mot-done">Marcar como estudada</button><button type="button" id="jr-mot-continue">Continuar de onde parei</button></div>
    <div class="jr-mot-list">${list}</div></div>
    <aside class="jr-mot-side">
    <div class="jr-mot-box jr-mot-apostilas"><div class="jr-mot-head"><strong>Apostilas • SEMUSA / SESAU 2026</strong><span>${apostilas.length} PDFs</span></div>
    ${apostilas.map(item => `<a class="jr-mot-resource jr-mot-apostila" href="${item.href}" target="_blank" rel="noopener"><b>APOSTILA • PDF DIRETO</b><small>${escapeHtml(item.title)}<br>${escapeHtml(item.note)}</small></a>`).join('')}
    <p class="jr-mot-note">Materiais organizados para o bloco de Motorista. Toque em um PDF para abrir em uma nova aba.</p></div>
    <div class="jr-mot-box"><div class="jr-mot-head"><strong>Provas e gabaritos • IBGP</strong><span>${exams.length} referências</span></div>
    ${exams.map(exam => `<div class="jr-mot-exam"><b>${exam.title}</b><p class="jr-mot-note">${exam.note}</p>${exam.prova ? `<a class="jr-mot-resource" href="${exam.prova}" target="_blank" rel="noopener"><b>PROVA • PDF direto</b><small>${exam.title}</small></a>` : ''}${exam.gabarito ? `<a class="jr-mot-resource" href="${exam.gabarito}" target="_blank" rel="noopener"><b>GABARITO • PDF direto</b><small>${exam.label}</small></a>` : ''}<a class="jr-mot-resource jr-mot-pci" href="${exam.pci}" target="_blank" rel="noopener"><b>PCI CONCURSOS • Prova + gabarito</b><small>Fonte oficial catalogada no PCI Concursos</small></a></div>`).join('')}
    <p class="jr-mot-note">Provas de outros municípios para praticar o estilo da IBGP. Confira a legislação vigente ao revisar questões antigas.</p></div>
    <div class="jr-mot-box"><div class="jr-mot-head"><strong>Como estudar</strong></div><p class="jr-mot-note">Comece por trânsito, direção defensiva e mecânica. Depois revise primeiros socorros, Português e Matemática e resolva as provas.</p><p class="jr-mot-note">Aulas públicas de professores no YouTube, selecionadas como apoio. Consulte o edital da SEMUSA para conferir os conteúdos exigidos para seu cargo.</p></div></aside></div></section>`;
  const css = buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-mot') + `
    .cards .jr-mot-card{position:relative;overflow:hidden;background:#050505;aspect-ratio:2/3}
    .cards .jr-mot-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain!important;transform:none!important}
    .cards .jr-mot-card .card-body{left:14px;right:14px;bottom:14px}
    .jr-mot-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-mot-actions button{border:1px solid #166534;background:#14532d;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}
    #jr-mot-youtube{display:inline-block;color:#6ee7b7;margin-top:8px;font-size:12px}
    .jr-mot-resource{border-color:rgba(16,185,129,.3);background:rgba(6,78,59,.18)}.jr-mot-apostila{border-color:rgba(239,35,60,.45);background:linear-gradient(135deg,rgba(127,29,29,.34),rgba(69,10,10,.22))}.jr-mot-apostila b{color:#fecaca}.jr-mot-pci{border-color:rgba(59,130,246,.35);background:rgba(30,64,175,.16)}
    .jr-mot-lesson:focus-visible,.jr-mot-actions button:focus-visible{outline:2px solid #6ee7b7;outline-offset:2px}
  `;
  const script = `<script id="jr-motorista-script-v1">(${motoristaClient.toString()})();</script>`;
  return { card, area, css, script };
}

function motoristaClient() {
  areaConfig.motorista = {title:'Motorista • SEMUSA Porto Velho',password:'MOTORISTA1998',sectionId:'area-motorista',storageKey:'jr_especifica_motorista'};
  function init() {
    const root = document.getElementById('area-motorista');
    const buttons = Array.from(root.querySelectorAll('.jr-mot-lesson'));
    const ids = buttons.map(b => b.dataset.video);
    const player = document.getElementById('jr-mot-player');
    const doneButton = document.getElementById('jr-mot-done');
    const key = 'jr_motorista_progress_v1';
    let state = {done:[],current:ids[0]};
    try { const saved=JSON.parse(localStorage.getItem(key)||'{}'); state.done=Array.isArray(saved.done)?[...new Set(saved.done.filter(id=>ids.includes(id)))]:[]; if(ids.includes(saved.current))state.current=saved.current; } catch(e) {}
    function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}}
    function paint(){
      buttons.forEach(b=>{const done=state.done.includes(b.dataset.video);b.classList.toggle('done',done);b.classList.toggle('active',b.dataset.video===state.current);b.querySelector('.jr-mot-status').textContent=done?'Estudada':'Assistir';});
      document.getElementById('jr-mot-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-mot-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id,autoplay){
      const b=buttons.find(b=>b.dataset.video===id);if(!b)return;
      state.current=id;player.dataset.video=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-mot-title').textContent=b.querySelector('b').textContent;
      document.getElementById('jr-mot-note').textContent=b.querySelector('small').textContent;
      document.getElementById('jr-mot-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>{open(b.dataset.video,true);player.scrollIntoView({behavior:'smooth',block:'center'});}));
    doneButton.addEventListener('click',()=>{const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint();});
    document.getElementById('jr-mot-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertMotorista(html) {
  if (html.includes('id="area-motorista"')) return html;
  const bundle=buildMotorista();
  const anchor=html.indexOf('data-jr-card="assistente-social"');
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<0)throw new Error('Catálogo sem ponto de inserção para Motorista');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-motorista-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}
module.exports={insertMotorista,buildMotorista};
