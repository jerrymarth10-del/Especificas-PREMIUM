const art = require('./secretaria-escolar-art.json');
const { lessons, exams, questions } = require('./secretaria-escolar-conteudo.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildSecretariaEscolar(authorized = false) {
  const card = `<article class="card jr-se-card jr-approved-art-card" data-jr-card="secretariaescolar"><img src="${art}" alt="SEMED • Porto Velho — Agente de Secretaria Escolar" width="640" height="960" loading="lazy" decoding="async"><div class="card-body"><span class="tag">SEMED • Porto Velho</span><h3>Agente de Secretaria Escolar</h3><button class="card-btn" type="button" onclick="openGate('secretariaescolar')">Acessar</button></div></article>`;
  const groups = [...new Set(lessons.map(x => x.group))];
  const list = groups.map(group => `<div class="jr-se-head"><strong>${esc(group)}</strong></div>` + lessons.map((item, index) => item.group !== group ? '' : `<button type="button" class="jr-se-lesson" data-video="${esc(item.video)}"><span class="jr-se-play">▶</span><span><b>${String(index + 1).padStart(2,'0')} • ${esc(item.title)}</b><small>${esc(item.source)} • ${esc(item.duration)}</small></span><span class="jr-se-status">Assistir</span></button>`).join('')).join('');
  const examList = exams.map(item => `<div class="jr-se-exam"><b>${esc(item.title)} • ${esc(item.board)}</b><a class="jr-se-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>PROVA • Abrir no PCI</b><small>Selecione ${esc(item.examFile)}</small></a><a class="jr-se-resource" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><b>GABARITO${item.answerFile.includes('preliminar') ? ' • Preliminar' : ''} • Abrir no PCI</b><small>Selecione ${esc(item.answerFile)}</small></a></div>`).join('');
  const practice = `<div class="jr-se-box"><div class="jr-se-head"><strong>Simulado de revisão • 12 questões comentadas</strong></div><p class="jr-se-note">Questões autorais de treinamento, não oficiais da IBGP. Responda antes de consultar o comentário.</p><form id="jr-se-quiz">${questions.map((q,i)=>`<fieldset style="margin:14px 0;border:1px solid #334155;border-radius:10px;padding:12px"><legend>${i+1}. ${esc(q.prompt)}</legend>${q.options.map((o,j)=>`<label style="display:block;padding:8px;cursor:pointer"><input type="radio" name="se-q-${i}" value="${j}" required> ${esc(o)}</label>`).join('')}<details><summary>Ver resposta comentada</summary><p>${esc(q.options[q.answer])}. ${esc(q.explanation)}</p></details></fieldset>`).join('')}<div class="jr-se-actions"><button type="submit">Corrigir simulado</button><button type="reset">Refazer</button></div><p id="jr-se-quiz-result" role="status"></p></form></div>`;
  const content = `<div class="jr-se-grid"><div class="jr-se-box"><div class="jr-se-head"><strong>Videoaulas</strong><span>${lessons.length} aulas • ${groups.length} módulos</span></div><div class="jr-se-player"><iframe id="jr-se-player" title="Videoaulas de Agente de Secretaria Escolar" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="jr-se-current"><b id="jr-se-title"></b><small id="jr-se-note"></small><a id="jr-se-youtube" target="_blank" rel="noopener noreferrer">Abrir aula no YouTube ↗</a></div><div class="jr-se-progress"><div><strong>Seu progresso</strong><span id="jr-se-progress-text"></span></div><div class="jr-se-track"><i id="jr-se-progress-fill"></i></div></div><div class="jr-se-actions"><button type="button" id="jr-se-done">Marcar como estudada</button><button type="button" id="jr-se-continue">Continuar de onde parei</button></div><div class="jr-se-list">${list}</div>${practice}</div><aside class="jr-se-side"><div class="jr-se-box"><div class="jr-se-head"><strong>Provas anteriores • IBGP</strong><span>${exams.length} provas com gabaritos</span></div><p class="jr-se-note">Provas de Secretário Escolar da IBGP para treinar conteúdos relacionados. No PCI, conclua a verificação de segurança e selecione o arquivo indicado. A legislação local de cada município pode diferir do edital de Porto Velho.</p>${examList}</div><div class="jr-se-box"><div class="jr-se-head"><strong>Materiais complementares</strong><span>Legislação</span></div><a class="jr-se-resource" href="https://www.portovelho.ro.gov.br/arquivos?folder=98858" target="_blank" rel="noopener noreferrer"><b>Edital e retificações • SEMED Porto Velho</b><small>Edital 24/2026 e retificação 27/2026 — cargo 343.</small></a><a class="jr-se-resource" href="https://www.planalto.gov.br/ccivil_03/leis/l9394.htm" target="_blank" rel="noopener noreferrer"><b>LDB • texto oficial</b><small>Lei de Diretrizes e Bases da Educação Nacional.</small></a><a class="jr-se-resource" href="https://proedu.rnp.br/bitstream/handle/123456789/762/02_disciplinas_form_pedagogica_caderno_06_gestao_em_educacao_escolar.pdf?sequence=1&amp;isAllowed=y" target="_blank" rel="noopener noreferrer"><b>PDF • Gestão em Educação Escolar</b><small>Luíz Fernandes Dourado • MEC/UFMT • repositório ProEdu/RNP. Leitura complementar.</small></a><a class="jr-se-resource" href="https://proedu.rnp.br/bitstream/handle/123456789/799/07_disciplinas_ft_se_caderno_13_tecnicas_redacao_arquivo.pdf?sequence=1&amp;isAllowed=y" target="_blank" rel="noopener noreferrer"><b>PDF • Técnicas de Redação e Arquivo</b><small>Rosineide Magalhães de Sousa • MEC/UFMT • repositório ProEdu/RNP. Documentação escolar e arquivos.</small></a><a class="jr-se-resource" href="https://www.planalto.gov.br/ccivil_03/leis/l8069.htm" target="_blank" rel="noopener noreferrer"><b>Legislação oficial • ECA</b><small>Lei nº 8.069/1990 — Estatuto da Criança e do Adolescente (fonte oficial).</small></a></div><div class="jr-se-box"><div class="jr-se-head"><strong>Roteiro de estudo</strong></div><p class="jr-se-note">Estude organização de documentos e rotinas escolares; depois revise LDB, ECA e PPP. Aulas organizadas por documentação escolar, arquivologia, relações interpessoais, legislação, gestão pedagógica, materiais, desenvolvimento humano e educação ambiental. Complemente o estudo do Plano Municipal de Educação e dos sistemas locais de gestão escolar pelos documentos oficiais; esta seleção não substitui a leitura integral do edital. Consulte o edital e suas retificações.</p><p class="jr-se-note">Aulas públicas de diferentes autores, identificadas em cada aula; disponibilidade e duração dependem do YouTube. Confira as versões atuais das leis ao revisar aulas anteriores. As matérias gerais podem ser estudadas no Projeto 1, conforme seu acesso.</p></div></aside></div>`;
  const area = !authorized ? '' : `<section class="area jr-se-area" id="area-secretariaescolar" data-jr-authorized="${authorized ? 'true' : 'false'}"><div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMED • Porto Velho • AGENTE DE SECRETARIA ESCOLAR</span><h2>Agente de Secretaria Escolar</h2><p>Escrituração escolar, arquivologia, LDB, ECA e projeto político-pedagógico. 44 videoaulas e simulado comentado para o cargo 343 do edital 24/2026 — SEMED Porto Velho, banca IBGP.</p></div></div></div>${content}</section>`;
  const css = buildPsicologiaSemusa().css.replaceAll('jr-pss','jr-se') + '.jr-se-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-se-actions button{border:1px solid #2563eb;background:#172554;color:#fff;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}#jr-se-youtube{display:inline-block;color:#93c5fd;margin-top:8px;font-size:12px}.jr-se-lesson:focus-visible,.jr-se-actions button:focus-visible{outline:2px solid #93c5fd;outline-offset:2px}@media(max-width:560px){.jr-se-actions{display:grid}.jr-se-actions button{width:100%}}';
  const script = `<script id="jr-secretariaescolar-script-v1">(${secretariaEscolarClient.toString()})(${JSON.stringify(authorized)});<\/script>`;
  return { card, area, css, script };
}

function secretariaEscolarClient(authorized) {
  areaConfig.secretariaescolar = {title:'Agente de Secretaria Escolar • SEMED Porto Velho', password:'ACESSO_AUTENTICADO_PELO_SERVIDOR', sectionId:'area-secretariaescolar', storageKey:'jr_especifica_secretariaescolar'};
  function show() {
    if (!document.getElementById('area-secretariaescolar')) return;
    if (typeof window.closeGate === 'function') window.closeGate();
    if (typeof window.showArea === 'function') window.showArea('secretariaescolar');
  }
  window.jrAbrirSecretariaEscolar = function() {
    const paid=Array.isArray(window.__JR_PURCHASED_AREAS) && window.__JR_PURCHASED_AREAS.includes('secretariaescolar');
    if (authorized || paid) { show(); return; }
    if (String(location.hash||'').startsWith('#jr_area_ticket=')) return;
    if (document.getElementById('jr-se-manual-modal')) return;
    const backdrop=document.createElement('div'); backdrop.id='jr-se-manual-modal';backdrop.setAttribute('role','dialog');backdrop.setAttribute('aria-modal','true');
    backdrop.style.cssText='position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.86);display:grid;place-items:center;padding:20px;font-family:system-ui';
    const form=document.createElement('form');form.style.cssText='max-width:400px;width:100%;padding:25px;background:#102b39;color:white;border:1px solid #2a7580;border-radius:18px;display:grid;gap:14px';
    const h=document.createElement('h3');h.textContent='Acessar Secretaria Escolar';h.style.margin='0';
    const label=document.createElement('label');label.textContent='Senha de liberação manual';
    const input=document.createElement('input');input.type='password';input.required=true;input.autocomplete='current-password';input.style.cssText='padding:13px;border:1px solid #92b6be;border-radius:9px;width:100%';label.appendChild(input);
    const message=document.createElement('p');message.setAttribute('role','status');message.style.cssText='font-size:13px;color:#ffbbb2;margin:0';
    const submit=document.createElement('button');submit.type='submit';submit.textContent='Liberar acesso';submit.style.cssText='padding:13px;border:0;border-radius:9px;background:#60dec8;color:#062a3b;font-weight:bold;cursor:pointer';
    const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancelar';cancel.style.cssText='padding:8px;background:transparent;color:#fff;border:0;cursor:pointer';
    cancel.onclick=()=>backdrop.remove();form.append(h,label,message,submit,cancel);backdrop.append(form);document.body.append(backdrop);input.focus();
    form.addEventListener('submit', async event=>{
      event.preventDefault();submit.disabled=true;message.textContent='';
      try {
        const response=await fetch('/api/access?manual=secretariaescolar',{method:'POST',cache:'no-store',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:input.value})});
        if (!response.ok) {message.textContent=response.status===401?'Senha não conferida. Verifique com o responsável.':'Liberação indisponível. Entre em contato com o responsável.';return;}
        const data=await response.json();if(!data.ok)throw new Error('Acesso não liberado');
        location.assign('/?area=secretariaescolar');
      } catch (error) {message.textContent='Falha de comunicação. Tente novamente.';}
      finally {submit.disabled=false;input.value='';}
    });
  };
  const originalGate=window.openGate;
  window.openGate=function(area){if(area==='secretariaescolar')return window.jrAbrirSecretariaEscolar();return originalGate&&originalGate(area);};
  function init() {
    const root = document.getElementById('area-secretariaescolar');
    if (!root) return;
    const quiz=document.getElementById('jr-se-quiz');
    if(quiz){
      const answers=[0,1,2,1,0,0,1,2,0,1,0,2];
      quiz.addEventListener('submit',function(event){event.preventDefault();const data=new FormData(quiz);const score=answers.filter((answer,i)=>data.get('se-q-'+i)===String(answer)).length;document.getElementById('jr-se-quiz-result').textContent='Resultado: '+score+' de '+answers.length+' acertos. Consulte os comentários para revisar.';});
      quiz.addEventListener('reset',function(){document.getElementById('jr-se-quiz-result').textContent='';quiz.querySelectorAll('details').forEach(d=>d.open=false);});
    }
    const buttons = Array.from(root.querySelectorAll('.jr-se-lesson'));
    const ids = buttons.map(b => b.dataset.video);
    const player = document.getElementById('jr-se-player');
    const doneButton = document.getElementById('jr-se-done');
    const key = 'jr_secretariaescolar_progress_v1';
    let state = {done:[],current:ids[0]};
    try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(id => ids.includes(id)))] : []; if (ids.includes(saved.current)) state.current = saved.current; } catch(e) {}
    function save() { try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {} }
    function paint() {
      buttons.forEach(b => { const done=state.done.includes(b.dataset.video); b.classList.toggle('done',done); b.classList.toggle('active',b.dataset.video===state.current); b.querySelector('.jr-se-status').textContent=done?'Estudada':'Assistir'; });
      document.getElementById('jr-se-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-se-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id, autoplay) {
      const button=buttons.find(b=>b.dataset.video===id); if(!button)return;
      state.current=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-se-title').textContent=button.querySelector('b').textContent;
      document.getElementById('jr-se-note').textContent=button.querySelector('small').textContent;
      document.getElementById('jr-se-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>open(b.dataset.video,true)));
    doneButton.addEventListener('click',()=>{ const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint(); });
    document.getElementById('jr-se-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
    if(authorized && new URLSearchParams(location.search).get('area')==='secretariaescolar')show();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertSecretariaEscolar(html, authorized = false) {
  if (html.includes('id="area-secretariaescolar"')) return html;
  const bundle=buildSecretariaEscolar(authorized);
  const anchor=html.indexOf("openGate('psicologiasemusa')");
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<end)throw new Error('Referência de Psicologia SEMED não encontrada para Agente de Secretaria Escolar');
  html=html.slice(0,footer)+bundle.area+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>',`<style id="jr-secretariaescolar-style">${bundle.css}</style></head>`).replace('</body>',bundle.script+'</body>');
}
module.exports={buildSecretariaEscolar,insertSecretariaEscolar};
