const art = require('./secretaria-escolar-art.json');
const { lessons, exams, links } = require('./secretaria-escolar-conteudo.json');
const { buildCuidadorSocial } = require('./cuidador-social');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function buildSecretariaEscolar(authorized = false) {
  const card = '<article class="card jr-se-card jr-approved-art-card" data-jr-card="secretariaescolar"><img src="' + art + '" alt="SEMED Porto Velho — Agente de Secretaria Escolar" width="640" height="960" loading="lazy" decoding="async"><div class="card-body"><span class="tag">SEMED • Porto Velho</span><h3>Agente de Secretaria Escolar</h3><button class="card-btn" type="button" onclick="jrAbrirSecretariaEscolar()">Acessar</button></div></article>';
  const groups = [...new Set(lessons.map(item => item.group))];
  const list = groups.map(group => '<div class="jr-se-head"><strong>' + esc(group) + '</strong></div>' +
    lessons.map((item,index)=>item.group!==group ? '' : '<button type="button" class="jr-se-lesson" data-video="' + esc(item.video) + '"><span class="jr-se-play">▶</span><span><b>' + String(index+1).padStart(2,'0') + ' • ' + esc(item.title) + '</b><small>' + esc(item.source) + '</small></span><span class="jr-se-status">Assistir</span></button>').join('')
  ).join('');
  const examList = exams.map(item => '<div class="jr-se-exam"><b>' + esc(item.title) + ' • ' + esc(item.board) + '</b><a class="jr-se-resource" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer"><b>PROVA • Abrir no PCI</b><small>Arquivo: ' + esc(item.examFile) + '</small></a><a class="jr-se-resource" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer"><b>GABARITO • Abrir no PCI</b><small>Arquivo: ' + esc(item.answerFile) + '</small></a></div>').join('');
  const laws = links.map(item=>'<a class="jr-se-resource" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer"><b>' + esc(item.title) + '</b></a>').join('');
  const content = '<div class="jr-se-grid"><div class="jr-se-box"><div class="jr-se-head"><strong>Videoaulas por assunto</strong><span>' + lessons.length + ' aulas • ' + groups.length + ' módulos</span></div><div class="jr-se-player"><iframe id="jr-se-player" title="Videoaulas de Agente de Secretaria Escolar" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="jr-se-current"><b id="jr-se-title"></b><small id="jr-se-note"></small><a id="jr-se-youtube" target="_blank" rel="noopener noreferrer">Abrir a aula no YouTube ↗</a></div><div class="jr-se-progress"><div><strong>Seu progresso</strong><span id="jr-se-progress-text"></span></div><div class="jr-se-track"><i id="jr-se-progress-fill"></i></div></div><div class="jr-se-actions"><button type="button" id="jr-se-done">Marcar como estudada</button><button type="button" id="jr-se-continue">Continuar de onde parei</button></div><div class="jr-se-list">' + list + '</div></div><aside class="jr-se-side"><div class="jr-se-box"><div class="jr-se-head"><strong>Provas anteriores IBGP</strong><span>2 provas com gabaritos</span></div><p class="jr-se-note">No PCI, escolha o arquivo da prova e o gabarito indicados. Não são provas da SEMED Porto Velho.</p>' + examList + '</div><div class="jr-se-box"><div class="jr-se-head"><strong>Legislação oficial</strong></div>' + laws + '</div><div class="jr-se-box"><div class="jr-se-head"><strong>Roteiro de estudo</strong></div><p class="jr-se-note">Arquivo escolar, protocolo, escrituração, atendimento e legislação educacional. Estude também o Plano Municipal de Educação e as normas municipais do edital, que não estão cobertos integralmente por estas aulas.</p><p class="jr-se-note">Aulas públicas de autores diversos. Duração e disponibilidade dependem do YouTube. Português e conhecimentos gerais ficam no Projeto 1.</p></div></aside></div>';
  const area = authorized ? '<section class="area jr-se-area" id="area-secretariaescolar"><div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMED • PORTO VELHO • IBGP • CARGO 343</span><h2>Agente de Secretaria Escolar</h2><p>Videoaulas organizadas, provas anteriores e legislação para o concurso.</p></div></div></div>' + content + '</section>' : '';
  const css = buildCuidadorSocial().css.replaceAll('jr-cs','jr-se').replaceAll('cuidadorsocial','secretariaescolar') +
    '#especificas .jr-se-card{position:relative;overflow:hidden;aspect-ratio:2/3;background:#061f30}' +
    '#especificas .jr-se-card img{display:block;width:100%;height:100%;object-fit:contain!important;object-position:center;transform:none!important}' +
    '.jr-se-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.jr-se-actions button{border:1px solid #5ed5c6;background:#0b3448;color:white;border-radius:10px;padding:10px;cursor:pointer;font:inherit;font-size:12px}' +
    '#jr-se-youtube{display:inline-block;color:#87f1db;margin-top:8px;font-size:12px}.jr-se-lesson:focus-visible,.jr-se-actions button:focus-visible{outline:2px solid #87f1db;outline-offset:2px}' +
    '@media(max-width:560px){.jr-se-actions{display:grid}.jr-se-actions button{width:100%}}';
  const script = '<script id="jr-secretaria-escolar-script-v1">(' + secretariaEscolarClient.toString() + ')(' + JSON.stringify(authorized) + ');<\/script>';
  return { card,area,css,script };
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
  function init() {
    const root=document.getElementById('area-secretariaescolar');
    if (!root) return;
    const buttons=Array.from(root.querySelectorAll('.jr-se-lesson'));
    if(!buttons.length)return;
    const ids=buttons.map(b=>b.dataset.video);
    const player=document.getElementById('jr-se-player');
    const doneButton=document.getElementById('jr-se-done');
    const key='jr_secretaria_escolar_progress_v1';
    let state={done:[],current:ids[0]};
    try{const saved=JSON.parse(localStorage.getItem(key)||'{}');state.done=Array.isArray(saved.done)?[...new Set(saved.done.filter(id=>ids.includes(id)))]:[];if(ids.includes(saved.current))state.current=saved.current;}catch(error){}
    function save(){try{localStorage.setItem(key,JSON.stringify(state))}catch(error){}}
    function paint(){
      buttons.forEach(b=>{const done=state.done.includes(b.dataset.video);b.classList.toggle('done',done);b.classList.toggle('active',b.dataset.video===state.current);b.querySelector('.jr-se-status').textContent=done?'Estudada':'Assistir';});
      document.getElementById('jr-se-progress-text').textContent=state.done.length+' de '+ids.length+' estudadas';
      document.getElementById('jr-se-progress-fill').style.width=(state.done.length/ids.length*100)+'%';
      doneButton.textContent=state.done.includes(state.current)?'Desmarcar aula estudada':'Marcar como estudada';
    }
    function open(id,autoplay){
      const b=buttons.find(x=>x.dataset.video===id);if(!b)return;state.current=id;
      if(root.classList.contains('active'))player.src='https://www.youtube.com/embed/'+id+(autoplay?'?autoplay=1':'');
      document.getElementById('jr-se-title').textContent=b.querySelector('b').textContent;
      document.getElementById('jr-se-note').textContent=b.querySelector('small').textContent;
      document.getElementById('jr-se-youtube').href='https://www.youtube.com/watch?v='+id;
      save();paint();
    }
    buttons.forEach(b=>b.addEventListener('click',()=>open(b.dataset.video,true)));
    doneButton.addEventListener('click',()=>{const id=state.current;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):state.done.concat(id);save();paint();});
    document.getElementById('jr-se-continue').addEventListener('click',()=>{open(state.current,false);player.scrollIntoView({behavior:'smooth',block:'center'});});
    new MutationObserver(()=>{if(root.classList.contains('active')){if(!player.getAttribute('src'))open(state.current,false);}else player.removeAttribute('src');}).observe(root,{attributes:true,attributeFilter:['class']});
    open(state.current,false);
    if(authorized && new URLSearchParams(location.search).get('area')==='secretariaescolar')show();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}

function insertSecretariaEscolar(html,authorized=false) {
  if(html.includes('data-jr-card="secretariaescolar"'))return html;
  const bundle=buildSecretariaEscolar(authorized);
  const anchor=html.indexOf('data-jr-card="cuidadorsocial"');
  const end=html.indexOf('</article>',anchor);
  const footer=html.indexOf('<footer class="footer">');
  if(anchor<0||end<0||footer<end)throw new Error('Card Cuidador Social ou rodapé não encontrado para Secretaria Escolar');
  html=html.slice(0,footer)+(bundle.area||'')+html.slice(footer);
  html=html.slice(0,end+10)+bundle.card+html.slice(end+10);
  return html.replace('</head>','<style id="jr-secretaria-escolar-style">'+bundle.css+'</style></head>')
    .replace('</body>',bundle.script+'</body>');
}
module.exports={buildSecretariaEscolar,insertSecretariaEscolar};
