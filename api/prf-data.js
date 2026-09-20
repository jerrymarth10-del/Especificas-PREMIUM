const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const study = [
  ['PLAYLIST','Português do Zero • curso completo','Mario Tossan • sequência completa do básico ao avançado','https://www.youtube.com/embed/videoseries?list=PLbuo_BUvjP3Mds367iGHTGjGRz5VIfMmc'],
  ['PLAYLIST','Raciocínio Lógico-Matemático • curso completo','Mario Tossan • sequência completa','https://www.youtube.com/embed/videoseries?list=PLbuo_BUvjP3OPP-j3TMw8WHueTo_vCEvk'],
  ['PLAYLIST','Direito Constitucional • curso completo','Mario Tossan • sequência completa','https://www.youtube.com/embed/videoseries?list=PLbuo_BUvjP3MoVF_vLWPc0Qwqs6k9zSVm'],
  ['PLAYLIST','Direito Administrativo • curso completo','Mario Tossan • sequência completa','https://www.youtube.com/embed/videoseries?list=PLbuo_BUvjP3OVaTrxBPzKSBMvSpY6HDUF'],
  ['ÉTICA','Ética e Conduta Pública do zero','Nova Concursos • preparação PRF','https://www.youtube.com/embed/8oEMlwwJ8k4'],
  ['ADM','Noções de Administração','Nova Concursos • preparação PRF','https://www.youtube.com/embed/5sAF5f-OLf0'],
  ['ARQ','Arquivologia • gabaritando a disciplina','Nova Concursos • preparação PRF','https://www.youtube.com/embed/BhXydweWN40'],
  ['INFO','Informática do Zero','Nova Concursos • preparação PRF Administrativo','https://www.youtube.com/embed/0ugd4yxKmks'],
  ['PRF','Legislação específica da PRF','Nova Concursos • foco na legislação institucional','https://www.youtube.com/embed/GlZMzl04vEA'],
  ['REVISÃO','Intensivo de conhecimentos específicos','Nova Concursos • revisão integrada','https://www.youtube.com/embed/8AcmUaL-18U']
];

const questions = [
  ['PORT','Português na prática • Aula 1','Questões e aplicação','https://www.youtube.com/embed/bMvWUjBoAQo'],
  ['RLM','Raciocínio Lógico • questões comentadas','PRF Administrativo','https://www.youtube.com/embed/Gyk31CDmpF4'],
  ['CONST','Direito Constitucional • bateria de questões','PRF 2026','https://www.youtube.com/embed/bRJWEmRuz7w'],
  ['ADM','Atos Administrativos • questões','Revisão direcionada','https://www.youtube.com/embed/ZOeUW_jNutg'],
  ['ÉTICA','Ética e Conduta Pública • questões','PRF 2026','https://www.youtube.com/embed/hg72keqpZBc'],
  ['ARQ','Arquivologia • questões comentadas','PRF Administrativo','https://www.youtube.com/embed/ItQd2zo_Z10'],
  ['INFO','Informática • armadilhas em questões','PRF Administrativo','https://www.youtube.com/embed/d20WhVuMQtg'],
  ['INFO','Informática • questões','PRF Administrativo','https://www.youtube.com/embed/W1HXQWdhHM8']
];

const shorts = [
  ['SHORT','O que estudar para PRF Administrativo','Nova Concursos • revisão rápida','https://www.youtube.com/embed/EjEOTBszTpc'],
  ['SHORT','PRF Administrativo • nível médio','Nova Concursos • revisão rápida','https://www.youtube.com/embed/xmBAWnITsLM'],
  ['SHORT','Quando pode sair o edital?','Nova Concursos • atualização rápida','https://www.youtube.com/embed/0STPmr126eI']
];

function lesson(item){
  return '<div class="lesson-item prf-lesson" role="button" tabindex="0" data-embed="'+esc(item[3])+'" data-title="'+esc(item[1])+'" data-sub="'+esc(item[2])+'" onclick="prfPlayElement(this)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();prfPlayElement(this)}">'+
    '<span class="lesson-mark">'+esc(item[0])+'</span><span class="lesson-text"><strong>'+esc(item[1])+'</strong><small>'+esc(item[2])+'</small></span><span class="lesson-open">Assistir</span></div>';
}

function buildPrf(cardImage){
  const img = cardImage ? 'data:image/jpeg;base64,'+cardImage : '';
  const card = '<article class="card prf-card" onclick="openGate(\'prf\')" aria-label="Acessar PRF Agente Administrativo">'+
    '<img src="'+img+'" alt="PRF Agente Administrativo" width="320" height="480" decoding="async" loading="lazy">'+
    '<div class="card-shade"></div><div class="card-body"><span class="tag">🚔 PRF • Área Administrativa</span><h3>Agente Administrativo</h3>'+
    '<p>Trilha completa pré-edital com aulas, revisões, questões comentadas e materiais em PDF.</p><button class="card-btn" type="button">Acessar</button></div></article>';

  const area = '<section class="area" id="area-prf"><div class="area-top"><div class="area-head">'+
    '<img src="'+img+'" alt="PRF Agente Administrativo"><div><span class="mini-tag">PRF • Agente Administrativo</span><h2>Área Administrativa da PRF</h2>'+
    '<p>Trilha baseada no último edital oficial do cargo, com reforços pré-edital 2026. Estude na ordem: base completa, matérias específicas, questões e revisão.</p></div></div></div>'+
    '<div class="area-grid"><div class="player-box prf-player-box"><div class="box-head"><strong id="prf-player-title">Português do Zero • curso completo</strong><span>Player integrado</span></div>'+
    '<div class="prf-video"><iframe id="prf-player" src="https://www.youtube.com/embed/videoseries?list=PLbuo_BUvjP3Mds367iGHTGjGRz5VIfMmc" title="Aulas PRF Agente Administrativo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'+
    '<div class="prf-now"><strong id="prf-now-title">Português do Zero • curso completo</strong><small id="prf-now-sub">Mario Tossan • sequência completa do básico ao avançado</small></div></div>'+
    '<div class="list-box prf-lessons-box"><div class="box-head"><strong>Trilha completa de aulas</strong><span>'+study.length+' módulos • 2 canais</span></div><div class="scroll-list">'+study.map(lesson).join('')+'</div></div>'+
    '<div class="list-box prf-pdfs-box"><div class="box-head"><strong>PDFs e materiais</strong><span>Material completo</span></div><div class="scroll-list">'+
    '<a class="pdf-item" href="https://area-de-menbros-da-prf.vercel.app/" target="_blank" rel="noopener"><span class="pdf-mark">PDF</span><span class="lesson-text"><strong>Material completo PRF</strong><small>Área de PDFs e materiais de apoio</small></span><span class="lesson-open">Abrir</span></a>'+
    '<div class="prf-reference"><strong>Referência da trilha</strong><small>Conteúdo organizado pelo último edital oficial de Agente Administrativo da PRF (2014), complementado com aulas públicas de preparação 2025/2026.</small></div>'+
    '</div></div>'+
    '<div class="list-box prf-questions-box"><div class="box-head"><strong>Questões comentadas e revisão</strong><span>Questões + Shorts</span></div><div class="scroll-list">'+questions.map(lesson).join('')+
    '<div class="prf-section-label">Revisão rápida • Shorts</div>'+shorts.map(lesson).join('')+'</div></div></div></section>';

  const css = `
#area-prf .area-head img{width:84px!important;height:84px!important;max-width:84px!important;aspect-ratio:1/1!important;object-fit:cover!important;border-radius:22px!important}
#area-prf .prf-video{position:relative;aspect-ratio:16/9;background:#05070b}
#area-prf .prf-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
#area-prf .prf-now{padding:16px 18px;display:grid;gap:4px}
#area-prf .prf-now small,#area-prf .prf-reference small{color:var(--muted);line-height:1.5}
#area-prf .prf-lessons-box,#area-prf .prf-pdfs-box,#area-prf .prf-questions-box{align-self:start;max-height:620px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
#area-prf .prf-lessons-box .scroll-list,#area-prf .prf-pdfs-box .scroll-list,#area-prf .prf-questions-box .scroll-list{max-height:562px!important;overflow-y:auto!important;overflow-x:hidden!important}
#area-prf .prf-pdfs-box{grid-column:1/2}
#area-prf .prf-questions-box{grid-column:2/3}
#area-prf .prf-lesson{cursor:pointer}
#area-prf .prf-section-label{padding:12px 14px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#facc15;border-top:1px solid rgba(255,255,255,.08)}
#area-prf .prf-reference{padding:16px;display:grid;gap:6px;border-top:1px solid rgba(255,255,255,.08)}
#area-prf .prf-pdfs-box .pdf-mark{background:rgba(250,204,21,.14);border-color:rgba(250,204,21,.3);color:#fde68a}
@media(max-width:720px){
 #area-prf .area-head img{width:84px!important;height:84px!important;max-width:84px!important}
 #area-prf .prf-lessons-box,#area-prf .prf-pdfs-box,#area-prf .prf-questions-box{grid-column:1/-1!important;max-height:none!important}
 #area-prf .prf-lessons-box .scroll-list,#area-prf .prf-pdfs-box .scroll-list,#area-prf .prf-questions-box .scroll-list{max-height:520px!important}
}`;

  const script = '<script id="jr-prf-player-v1">(function(){window.prfPlayElement=function(el){var f=document.getElementById("prf-player");if(!f||!el)return;f.src=el.dataset.embed;var t=document.getElementById("prf-player-title"),n=document.getElementById("prf-now-title"),s=document.getElementById("prf-now-sub");if(t)t.textContent=el.dataset.title||"Aula PRF";if(n)n.textContent=el.dataset.title||"Aula PRF";if(s)s.textContent=el.dataset.sub||"";var box=document.querySelector("#area-prf .player-box");if(box)box.scrollIntoView({behavior:"smooth",block:"start"})};window.addEventListener("load",function(){try{var a=new URLSearchParams(location.search).get("area");if(a==="prf"&&typeof openGate==="function")setTimeout(function(){openGate("prf")},300)}catch(e){}})})();<\/script>';
  return {card,area,css,script};
}
module.exports={buildPrf};
