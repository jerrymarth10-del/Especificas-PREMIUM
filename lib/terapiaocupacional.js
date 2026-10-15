const art = require('./terapiaocupacional-art.json');
const { lessons, exams } = require('./terapiaocupacional-conteudo.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildTerapiaOcupacional(authorized = false) {
  const card = `<article class="card jr-to-card jr-approved-art-card" data-jr-card="terapiaocupacional"><img src="${art}" alt="SEMUSA + SESAU — Terapia Ocupacional" width="640" height="960" loading="lazy" decoding="async"><div class="card-body"><span class="tag">SEMUSA + SESAU</span><h3>Terapia Ocupacional</h3><button class="card-btn" type="button" onclick="openGate('terapiaocupacional')">Acessar</button></div></article>`;
  const groups = [...new Set(lessons.map(x => x.group))];
  const list = groups.map(group => `<div class="jr-to-head"><strong>${esc(group)}</strong></div>` + lessons.map((item, index) => item.group !== group ? '' : `<button type="button" class="jr-to-lesson" data-video="${esc(item.video)}"><span class="jr-to-play">▶</span><span><b>${String(index + 1).padStart(2,'0')} • ${esc(item.title)}</b><small>${esc(item.source)}</small></span><span class="jr-to-status">Assistir</span></button>`).join('')).join('');
  const examList = exams.map(item => `<div class="jr-to-exam"><b>${esc(item.title)}</b><a class="jr-to-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>PROVA IBGP • Abrir no PCI</b><small>Selecione ${esc(item.examFile)}</small></a><a class="jr-to-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>GABARITO IBGP${item.answerFile.includes('preliminar') ? ' • Preliminar' : ''} • Abrir no PCI</b><small>Selecione ${esc(item.answerFile)}</small></a></div>`).join('');
  const content = `<div class="jr-to-grid"><div class="jr-to-box"><div class="jr-to-head"><strong>Videoaulas</strong><span>${lessons.length} aulas • ${groups.length} módulos</span></div><div class="jr-to-player"><iframe id="jr-to-player" title="Videoaulas de Terapia Ocupacional" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="jr-to-current"><b id="jr-to-title"></b><small id="jr-to-note"></small><a id="jr-to-youtube" target="_blank" rel="noopener noreferrer">Abrir aula no YouTube ↗</a></div><div class="jr-to-progress"><div><strong>Seu progresso</strong><span id="jr-to-progress-text"></span></div><div class="jr-to-track"><i id="jr-to-progress-fill"></i></div></div><div class="jr-to-actions"><button type="button" id="jr-to-done">Marcar como estudada</button><button type="button" id="jr-to-continue">Continuar de onde parei</button></div><div class="jr-to-list">${list}</div></div><aside class="jr-to-side"><div class="jr-to-box"><div class="jr-to-head"><strong>Provas anteriores • IBGP</strong><span>${exams.length} provas com gabaritos</span></div><p class="jr-to-note">Provas específicas de Terapeuta Ocupacional. No PCI, conclua a verificação solicitada e selecione o arquivo indicado. Prova e gabarito estão na mesma página.</p>${examList}</div><div class="jr-to-box"><div class="jr-to-head"><strong>Materiais complementares</strong><span>SUS</span></div><a class="jr-to-resource" href="/1000%20quest%C3%B5es.pdf" target="_blank" rel="noopener noreferrer"><b>1.000 questões de Saúde Pública</b><small>Material geral de SUS já disponível na plataforma; não é prova de Terapia Ocupacional da IBGP.</small></a></div><div class="jr-to-box"><div class="jr-to-head"><strong>Roteiro de estudo</strong></div><p class="jr-to-note">Comece pelos fundamentos e avaliação. Avance para atuação no SUS, reabilitação, tecnologia assistiva, saúde mental, infância, envelhecimento e contexto hospitalar. Finalize cada ciclo com questões e provas anteriores.</p><p class="jr-to-note">Curadoria de aulas públicas de diferentes autores, identificados em cada aula. Os conteúdos específicos são complementados pelas matérias gerais no Projeto 1.</p></div></aside></div>`;
  const area = `<section class="area jr-to-area" id="area-terapiaocupacional" data-jr-authorized="${authorized ? 'true' : 'false'}"><div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA + SESAU • TERAPIA OCUPACIONAL</span><h2>Terapia Ocupacional</h2><p>Fundamentos, avaliação, atuação no SUS, reabilitação e ciclos de vida, com aulas organizadas e provas anteriores da IBGP.</p></div></div></div>${content}</section>`;
  const css = buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-to') + '.jr-to-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-to-actions button{border:1px solid #2563eb;background:#172554;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}#jr-to-youtube{display:inline-block;color:#93c5fd;margin-top:8px;font-size:12px}.jr-to-lesson:focus-visible,.jr-to-actions button:focus-visible{outline:2px solid #93c5fd;outline-offset:2px}@media(max-width:560px){.jr-to-actions{display:grid}.jr-to-actions button{width:100%}}';
  const script = `<script id="jr-terapiaocupacional-script-v1">(${terapiaOcupacionalClient.toString()})();<\/script>`;
  return { card, area, css, script };
}

function terapiaOcupacionalClient() {
  // Purchased tickets open automatically; legacy/WhatsApp users enter with the block password.
  areaConfig.terapiaocupacional = {title:'Terapia Ocupacional • SEMUSA + SESAU',password:'TERAPIA2026',sectionId:'area-terapiaocupacional',storageKey:'jr_especifica_terapiaocupacional'};
  function init() {
    const root = document.getElementById('area-terapiaocupacional');
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll('.jr-to-lesson'));
    const ids = buttons.map(b => b.dataset.video);
    const player = document.getElementById('jr-to-player');
    const doneButton = document.getElementById('jr-to-done');
    const key = 'jr_terapiaocupacional_progress_v1';
    let state = {done:[],current:ids[0]};
    try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(id => ids.includes(id)))] : []; if (ids.includes(saved.current)) state.current = saved.current; } catch(e) {}
    function save() { try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {} }
    function paint() {
      buttons.forEach(b => { const done=state.done.includes(b.dataset.video); b.classList.toggle('done',done); b.classList.toggle('active',b.dataset.video===state.current); b.querySelector('.jr-to-status').textContent=done?'Estudada':'Assistir'; });
      document.getElementById('jr-to-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-to-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id, autoplay) {
      const button=buttons.find(b=>b.dataset.video===id); if(!button)return;
      state.current=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-to-title').textContent=button.querySelector('b').textContent;
      document.getElementById('jr-to-note').textContent=button.querySelector('small').textContent;
      document.getElementById('jr-to-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>open(b.dataset.video,true)));
    doneButton.addEventListener('click',()=>{ const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint(); });
    document.getElementById('jr-to-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertTerapiaOcupacional(html, authorized = false) {
  if (html.includes('id="area-terapiaocupacional"')) return html;
  const bundle=buildTerapiaOcupacional(authorized);
  const anchor=html.indexOf("openGate('psicologiasemusa')");
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<end)throw new Error('Referência de Psicologia SEMUSA não encontrada para Terapia Ocupacional');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-terapiaocupacional-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}
module.exports={buildTerapiaOcupacional,insertTerapiaOcupacional};
