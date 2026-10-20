const art = require('./cuidador-social-art.json');
const { lessons, exams } = require('./cuidador-social-conteudo.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildCuidadorSocial(authorized = false) {
  const card = `<article class="card jr-cs-card jr-approved-art-card" data-jr-card="cuidadorsocial"><img src="${art}" alt="SEMUSA • Porto Velho — Cuidador Social" width="640" height="960" loading="lazy" decoding="async"><div class="card-body"><span class="tag">SEMUSA • Porto Velho</span><h3>Cuidador Social</h3><button class="card-btn" type="button" onclick="openGate('cuidadorsocial')">Acessar</button></div></article>`;
  const groups = [...new Set(lessons.map(x => x.group))];
  const list = groups.map(group => `<div class="jr-cs-head"><strong>${esc(group)}</strong></div>` + lessons.map((item, index) => item.group !== group ? '' : `<button type="button" class="jr-cs-lesson" data-video="${esc(item.video)}"><span class="jr-cs-play">▶</span><span><b>${String(index + 1).padStart(2,'0')} • ${esc(item.title)}</b><small>${esc(item.source)}</small></span><span class="jr-cs-status">Assistir</span></button>`).join('')).join('');
  const examList = exams.map(item => `<div class="jr-cs-exam"><b>${esc(item.title)} • ${esc(item.board)}</b><a class="jr-cs-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>PROVA • Abrir no PCI</b><small>Selecione ${esc(item.examFile)}</small></a><a class="jr-cs-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>GABARITO${item.answerFile.includes('preliminar') ? ' • Preliminar' : ''} • Abrir no PCI</b><small>Selecione ${esc(item.answerFile)}</small></a></div>`).join('');
  const content = `<div class="jr-cs-grid"><div class="jr-cs-box"><div class="jr-cs-head"><strong>Videoaulas</strong><span>${lessons.length} aulas • ${groups.length} módulos</span></div><div class="jr-cs-player"><iframe id="jr-cs-player" title="Videoaulas de Cuidador Social" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="jr-cs-current"><b id="jr-cs-title"></b><small id="jr-cs-note"></small><a id="jr-cs-youtube" target="_blank" rel="noopener noreferrer">Abrir aula no YouTube ↗</a></div><div class="jr-cs-progress"><div><strong>Seu progresso</strong><span id="jr-cs-progress-text"></span></div><div class="jr-cs-track"><i id="jr-cs-progress-fill"></i></div></div><div class="jr-cs-actions"><button type="button" id="jr-cs-done">Marcar como estudada</button><button type="button" id="jr-cs-continue">Continuar de onde parei</button></div><div class="jr-cs-list">${list}</div></div><aside class="jr-cs-side"><div class="jr-cs-box"><div class="jr-cs-head"><strong>Provas anteriores • outras bancas</strong><span>${exams.length} provas com gabaritos</span></div><p class="jr-cs-note">Provas de Cuidador Social de outras bancas, com gabarito. Não foram localizadas provas da banca IBGP para este cargo. No PCI, selecione os arquivos informados na página.</p>${examList}</div><div class="jr-cs-box"><div class="jr-cs-head"><strong>Materiais complementares</strong><span>Legislação</span></div><a class="jr-cs-resource" href="https://www.planalto.gov.br/ccivil_03/leis/l8069.htm" target="_blank" rel="noopener noreferrer"><b>Legislação oficial • ECA</b><small>Lei nº 8.069/1990 — Estatuto da Criança e do Adolescente (fonte oficial).</small></a></div><div class="jr-cs-box"><div class="jr-cs-head"><strong>Roteiro de estudo</strong></div><p class="jr-cs-note">Comece pelo Estatuto da Criança e do Adolescente (ECA), prossiga para SUAS e LOAS e revise direitos da pessoa idosa. Use as provas de outras bancas para praticar.</p><p class="jr-cs-note">Aulas públicas de diferentes autores, identificadas em cada aula; disponibilidade e duração dependem do YouTube. Português e demais matérias gerais estão no Projeto 1.</p></div></aside></div>`;
  const area = `<section class="area jr-cs-area" id="area-cuidadorsocial" data-jr-authorized="${authorized ? 'true' : 'false'}"><div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA • Porto Velho • CUIDADOR SOCIAL</span><h2>Cuidador Social</h2><p>ECA, SUAS, LOAS, direitos da pessoa idosa e atendimento de pessoas em vulnerabilidade social; aulas organizadas por assunto.</p></div></div></div>${content}</section>`;
  const css = buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-cs') + '.jr-cs-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-cs-actions button{border:1px solid #2563eb;background:#172554;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}#jr-cs-youtube{display:inline-block;color:#93c5fd;margin-top:8px;font-size:12px}.jr-cs-lesson:focus-visible,.jr-cs-actions button:focus-visible{outline:2px solid #93c5fd;outline-offset:2px}@media(max-width:560px){.jr-cs-actions{display:grid}.jr-cs-actions button{width:100%}}';

  const cardLayoutCss = '.jr-cs-card{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;overflow:hidden!important;height:auto!important;min-height:0!important;padding:0!important}. jr-cs-card img{order:0!important}'.replace('. jr-cs-card', '.jr-cs-card') + '.jr-cs-card>img{display:block!important;order:0!important;position:static!important;width:100%!important;height:auto!important;aspect-ratio:2/3!important;object-fit:cover!important;margin:0!important;flex:none!important}.jr-cs-card>.card-body{display:flex!important;flex-direction:column!important;order:1!important;position:static!important;flex:1!important;width:100%!important;padding:14px 12px!important;gap:9px!important;justify-content:flex-end!important;text-align:center!important;box-sizing:border-box!important}.jr-cs-card>.card-body .card-btn{display:block!important;width:100%!important;position:static!important;margin:4px 0 0!important;min-height:48px!important;cursor:pointer!important}.jr-cs-card>.card-body h3{margin:0!important;line-height:1.25!important}.jr-cs-card>.card-body .tag{margin:0!important}';
  const script = `<script id="jr-cuidadorsocial-script-v1">(${cuidadorSocialClient.toString()})();<\/script>`;
  return { card, area, css: css + cardLayoutCss, script };
}

function cuidadorSocialClient() {
  // Purchased tickets open automatically; legacy/WhatsApp users enter with the block password.
  areaConfig.cuidadorsocial = {title:'Cuidador Social • SEMUSA • Porto Velho',password:'CUIDADOR2026',sectionId:'area-cuidadorsocial',storageKey:'jr_especifica_cuidadorsocial'};
  function init() {
    const root = document.getElementById('area-cuidadorsocial');
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll('.jr-cs-lesson'));
    const ids = buttons.map(b => b.dataset.video);
    const player = document.getElementById('jr-cs-player');
    const doneButton = document.getElementById('jr-cs-done');
    const key = 'jr_cuidadorsocial_progress_v1';
    let state = {done:[],current:ids[0]};
    try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(id => ids.includes(id)))] : []; if (ids.includes(saved.current)) state.current = saved.current; } catch(e) {}
    function save() { try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {} }
    function paint() {
      buttons.forEach(b => { const done=state.done.includes(b.dataset.video); b.classList.toggle('done',done); b.classList.toggle('active',b.dataset.video===state.current); b.querySelector('.jr-cs-status').textContent=done?'Estudada':'Assistir'; });
      document.getElementById('jr-cs-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-cs-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id, autoplay) {
      const button=buttons.find(b=>b.dataset.video===id); if(!button)return;
      state.current=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-cs-title').textContent=button.querySelector('b').textContent;
      document.getElementById('jr-cs-note').textContent=button.querySelector('small').textContent;
      document.getElementById('jr-cs-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>open(b.dataset.video,true)));
    doneButton.addEventListener('click',()=>{ const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint(); });
    document.getElementById('jr-cs-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertCuidadorSocial(html, authorized = false) {
  if (html.includes('id="area-cuidadorsocial"')) return html;
  const bundle=buildCuidadorSocial(authorized);
  const anchor=html.indexOf("openGate('psicologiasemusa')");
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<end)throw new Error('Referência de Psicologia SEMUSA não encontrada para Cuidador Social');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-cuidadorsocial-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}
module.exports={buildCuidadorSocial,insertCuidadorSocial};
