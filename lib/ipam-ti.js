const art = require('./ipam-ti-art.json');
const { lessons, exams } = require('./ipam-ti-conteudo.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildIpamTi(authorized = false) {
  const card = `<article class="card jr-ipamti-card jr-approved-art-card" data-jr-card="ipamti"><img src="${art}" alt="IPAM • Porto Velho — TI • IPAM" width="640" height="960" loading="lazy" decoding="async"><div class="card-body"><span class="tag">IPAM • Porto Velho</span><h3>TI • IPAM</h3><button class="card-btn" type="button" onclick="openGate('ipamti')">Acessar</button></div></article>`;
  const groups = [...new Set(lessons.map(x => x.group))];
  const list = groups.map(group => `<div class="jr-ipamti-head"><strong>${esc(group)}</strong></div>` + lessons.map((item, index) => item.group !== group ? '' : `<button type="button" class="jr-ipamti-lesson" data-video="${esc(item.video)}"><span class="jr-ipamti-play">▶</span><span><b>${String(index + 1).padStart(2,'0')} • ${esc(item.title)}</b><small>${esc(item.source)}</small></span><span class="jr-ipamti-status">Assistir</span></button>`).join('')).join('');
  const examList = exams.map(item => `<div class="jr-ipamti-exam"><b>${esc(item.title)} • ${esc(item.board)}</b><a class="jr-ipamti-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>PROVA • Abrir no PCI</b><small>Selecione ${esc(item.examFile)}</small></a><a class="jr-ipamti-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>GABARITO${item.answerFile.includes('preliminar') ? ' • Preliminar' : ''} • Abrir no PCI</b><small>Selecione ${esc(item.answerFile)}</small></a></div>`).join('');
  const content = `<div class="jr-ipamti-grid"><div class="jr-ipamti-box"><div class="jr-ipamti-head"><strong>Videoaulas</strong><span>${lessons.length} aulas • ${groups.length} módulos</span></div><div class="jr-ipamti-player"><iframe id="jr-ipamti-player" title="Videoaulas de TI • IPAM" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="jr-ipamti-current"><b id="jr-ipamti-title"></b><small id="jr-ipamti-note"></small><a id="jr-ipamti-youtube" target="_blank" rel="noopener noreferrer">Abrir aula no YouTube ↗</a></div><div class="jr-ipamti-progress"><div><strong>Seu progresso</strong><span id="jr-ipamti-progress-text"></span></div><div class="jr-ipamti-track"><i id="jr-ipamti-progress-fill"></i></div></div><div class="jr-ipamti-actions"><button type="button" id="jr-ipamti-done">Marcar como estudada</button><button type="button" id="jr-ipamti-continue">Continuar de onde parei</button></div><div class="jr-ipamti-list">${list}</div></div><aside class="jr-ipamti-side"><div class="jr-ipamti-box"><div class="jr-ipamti-head"><strong>Provas anteriores • IBADE</strong><span>${exams.length} provas com gabaritos</span></div><p class="jr-ipamti-note">Provas de TI aplicadas pelo IBADE em outros concursos. No PCI, conclua a verificação e selecione o arquivo indicado. Os gabaritos do PRODEST disponíveis no PCI são preliminares.</p>${examList}</div><div class="jr-ipamti-box"><div class="jr-ipamti-head"><strong>Materiais de apoio</strong></div><a class="jr-ipamti-resource" href="https://portal.ibade.selecao.site/edital/ver/130" target="_blank" rel="noopener noreferrer"><b>Edital oficial • IPAM / IBADE</b><small>Consulte o programa de A13 — Tecnologia da Informação e as retificações.</small></a><a class="jr-ipamti-resource" href="https://sesau-certo.vercel.app/informatica-criptografia-e-backup.pdf" target="_blank" rel="noopener noreferrer"><b>PDF • Criptografia e backup</b><small>Material do acervo da plataforma.</small></a><a class="jr-ipamti-resource" href="https://sesau-certo.vercel.app/informatica-malware-e-ataques.pdf" target="_blank" rel="noopener noreferrer"><b>PDF • Malware e ataques</b><small>Material do acervo da plataforma.</small></a><a class="jr-ipamti-resource" href="https://www.youtube.com/playlist?list=PLKaxXxugagVs-r531AbIPB5Gw83AKbHj6" target="_blank" rel="noopener noreferrer"><b>Playlist • Segurança da informação para TI</b><small>Arnaldo Junior • aprofundamento por tema.</small></a></div><div class="jr-ipamti-box"><div class="jr-ipamti-head"><strong>Roteiro de estudo</strong></div><p class="jr-ipamti-note">Comece pela revisão IBADE e pela base de segurança. Avance para redes, Linux, banco de dados, engenharia de software, COBIT 2019 e ITIL 4. Resolva as provas e confira o gabarito correspondente.</p><p class="jr-ipamti-note">As aulas IBADE são de informática básica; as aulas específicas de TI são complementares por assunto. Esta seleção não cobre integralmente o edital: aprofunde SQL, DevOps, APIs, nuvem, segurança avançada e contratações de TI conforme o programa oficial. Português e matérias gerais ficam no Projeto 1.</p><p class="jr-ipamti-note">Aulas públicas dos autores identificados em cada item, reproduzidas pelo YouTube. Se o player estiver indisponível, use “Abrir aula no YouTube”.</p></div></aside></div>`;
  const area = `<section class="area jr-ipamti-area" id="area-ipamti" data-jr-authorized="${authorized ? 'true' : 'false'}"><div class="area-top"><div class="area-head"><div><span class="mini-tag">IPAM • Porto Velho • IBADE</span><h2>TI • IPAM</h2><p>Tecnologia da Informação • Analista Autárquico (A13). Aulas por assunto, revisão da banca IBADE e provas anteriores com gabaritos.</p></div></div></div>${content}</section>`;
  const css = buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-ipamti') + '.jr-ipamti-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-ipamti-actions button{border:1px solid #2563eb;background:#172554;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}#jr-ipamti-youtube{display:inline-block;color:#93c5fd;margin-top:8px;font-size:12px}.jr-ipamti-lesson:focus-visible,.jr-ipamti-actions button:focus-visible{outline:2px solid #93c5fd;outline-offset:2px}@media(max-width:560px){.jr-ipamti-actions{display:grid}.jr-ipamti-actions button{width:100%}}';

  const cardLayoutCss = '.jr-ipamti-card{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;overflow:hidden!important;height:auto!important;min-height:0!important;padding:0!important}. jr-ipamti-card img{order:0!important}'.replace('. jr-ipamti-card', '.jr-ipamti-card') + '.jr-ipamti-card>img{display:block!important;order:0!important;position:static!important;width:100%!important;height:auto!important;aspect-ratio:2/3!important;object-fit:cover!important;margin:0!important;flex:none!important}.jr-ipamti-card>.card-body{display:flex!important;flex-direction:column!important;order:1!important;position:static!important;flex:1!important;width:100%!important;padding:14px 12px!important;gap:9px!important;justify-content:flex-end!important;text-align:center!important;box-sizing:border-box!important}.jr-ipamti-card>.card-body .card-btn{display:block!important;width:100%!important;position:static!important;margin:4px 0 0!important;min-height:48px!important;cursor:pointer!important}.jr-ipamti-card>.card-body h3{margin:0!important;line-height:1.25!important}.jr-ipamti-card>.card-body .tag{margin:0!important}';
  const script = `<script id="jr-ipamti-script-v1">(${ipamTiClient.toString()})();<\/script>`;
  return { card, area, css: css + cardLayoutCss + '#area-ipamti .jr-ipamti-exam>a{display:flex!important;flex-direction:column!important;align-items:flex-start!important;width:100%!important;box-sizing:border-box;gap:5px!important;margin-top:10px!important;white-space:normal!important}#area-ipamti .jr-ipamti-exam>a small{overflow-wrap:anywhere;line-height:1.5}#area-ipamti .jr-ipamti-exam>b{display:block;line-height:1.5}#area-ipamti .jr-ipamti-grid>*{min-width:0}', script };
}

function ipamTiClient() {
  // Purchased tickets open automatically; legacy/WhatsApp users enter with the block password.
  areaConfig.ipamti = {title:'TI • IPAM • Porto Velho',password:'IPAMTI2026',sectionId:'area-ipamti',storageKey:'jr_especifica_ipamti'};
  function init() {
    const root = document.getElementById('area-ipamti');
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll('.jr-ipamti-lesson'));
    const ids = buttons.map(b => b.dataset.video);
    const player = document.getElementById('jr-ipamti-player');
    const doneButton = document.getElementById('jr-ipamti-done');
    const key = 'jr_ipamti_progress_v1';
    let state = {done:[],current:ids[0]};
    try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(id => ids.includes(id)))] : []; if (ids.includes(saved.current)) state.current = saved.current; } catch(e) {}
    function save() { try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {} }
    function paint() {
      buttons.forEach(b => { const done=state.done.includes(b.dataset.video); b.classList.toggle('done',done); b.classList.toggle('active',b.dataset.video===state.current); b.querySelector('.jr-ipamti-status').textContent=done?'Estudada':'Assistir'; });
      document.getElementById('jr-ipamti-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-ipamti-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id, autoplay) {
      const button=buttons.find(b=>b.dataset.video===id); if(!button)return;
      state.current=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-ipamti-title').textContent=button.querySelector('b').textContent;
      document.getElementById('jr-ipamti-note').textContent=button.querySelector('small').textContent;
      document.getElementById('jr-ipamti-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>open(b.dataset.video,true)));
    doneButton.addEventListener('click',()=>{ const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint(); });
    document.getElementById('jr-ipamti-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertIpamTi(html, authorized = false) {
  if (html.includes('id="area-ipamti"')) return html;
  const bundle=buildIpamTi(authorized);
  const anchor=html.indexOf("openGate('administrativo')");
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<end)throw new Error('Referência do Administrativo não encontrada para TI IPAM');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-ipamti-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}
module.exports={buildIpamTi,insertIpamTi};
