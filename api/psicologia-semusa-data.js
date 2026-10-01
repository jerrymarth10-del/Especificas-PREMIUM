const LESSONS = [
  ['Saúde como fenômeno biopsicossocial','Psicologia e modelo biopsicossocial • conceito de saúde multideterminado','lpD0-Qb9qeM'],
  ['Avaliação psicológica e psicodiagnóstico','Avaliação como base da intervenção • conceitos, técnicas e diagnóstico','CtabP9zF6Qs'],
  ['Desenvolvimento psicológico na adolescência','Concepções teóricas do desenvolvimento psicológico','IKZeE2mogLQ'],
  ['Teorias da personalidade','Freud, Klein, Erikson, Jung, Adler, Horney, Fromm e Rogers','E-fpd5nd6-I'],
  ['Freud • id, ego e superego','Estrutura da personalidade e mecanismos de defesa','MZxykE_YihI'],
  ['Carl Rogers e abordagem humanista','Abordagem centrada na pessoa e Psicologia Humanista','irIU4QsboAA'],
  ['Behaviorismo e perspectivas atuais','Estímulo-resposta, comportamento e aprendizagem','0Olme3CYIrU'],
  ['George Kelly e teoria cognitiva','Construtos pessoais e perspectiva cognitiva','QWWpERos2Yg'],
  ['Processo grupal • Kurt Lewin','Teoria de campo, dinâmica e processos grupais','SjFgWCut_yI'],
  ['Entrevista psicológica','Entrevista clínica e psicológica para concursos','qgZTjf05rso'],
  ['Psicologia social e influências sociais','Psicologia social, contexto e determinantes do comportamento','q-S3LHunU4s'],
  ['Determinantes sociais e ambientais da saúde','Condições sociais, econômicas, culturais e ambientais','2JJNDeUkVtI'],
  ['Psicologia da Saúde','Promoção, prevenção e atuação do psicólogo na saúde','F3iybjdMlCs'],
  ['Psicologia, prevenção e IST/HIV/AIDS','Atuação profissional, prevenção e aconselhamento nos serviços','hR7FCqnbqO8'],
  ['Princípios de Psicopatologia','Conceitos centrais de psicopatologia','BWLAY-BgTek'],
  ['Transtornos psicóticos e esquizofrenia','Características e revisão de transtornos psicóticos','JinQt3S13sg'],
  ['Depressão e transtornos depressivos','Psicopatologia dos transtornos depressivos','mTni16Xs_cU'],
  ['Transtornos de ansiedade','Características, tipos, sintomas e tratamento','HJAUBm7cu9w'],
  ['Alcoolismo e dependência do álcool','Dependência do álcool e fatores associados','4jLSbk3mYVM'],
  ['Testes psicológicos e SATEPSI','Uso de testes, critérios técnicos e consulta ao sistema do CFP','bmXDb0MASK8'],
  ['Código de Ética do Psicólogo','Código de Ética Profissional da Psicóloga e do Psicólogo','1MVmB5iFdms'],
  ['Constituição Federal • arts. 196 a 200','Saúde na Constituição e base constitucional do SUS','bnHmW4zN6n8'],
  ['Lei nº 8.080/1990','Organização, princípios e conceitos fundamentais do SUS','pT-Vz2sxdDc'],
  ['Lei nº 8.142/1990','Participação social e transferências intergovernamentais','Ri9Gn-Uf-p8'],
  ['PNAB • Atenção Primária • ESF','Política Nacional de Atenção Básica e Estratégia Saúde da Família','BfP3qtjKiGw'],
  ['Vigilância em Saúde','Vigilância epidemiológica, sanitária, ambiental e do trabalhador','V9cpuEW6zEs'],
  ['Sistemas de Informação em Saúde','Informação para gestão, vigilância e epidemiologia no SUS','OqWsAlCEfUE'],
  ['Epidemiologia • conceitos e estudos','Conceitos epidemiológicos e tipos de estudos cobrados em provas','-SB43jzq-as']
];

const EXAMS = [
  {
    title:'2019 • Psicólogo Clínico • Andrelândia/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/psicologo-clinico-prefeitura-andrelandia-mg-ibgp-2019/psicologo-clinico.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/psicologo-clinico-prefeitura-andrelandia-mg-ibgp-2019/gabarito.pdf'
  },
  {
    title:'2018 • Psicólogo • Santa Luzia/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-santa-luzia-mg-ibgp-2018/psiclogo.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-santa-luzia-mg-ibgp-2018/gabaritos.pdf'
  },
  {
    title:'2018 • Téc. Superior de Saúde – Psicólogo • Itabira/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/tecnico-superior-de-saude-psicologo-prefeitura-itabira-mg-ibgp-2018/tecnico-superior-de-saude-psicologo.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/tecnico-superior-de-saude-psicologo-prefeitura-itabira-mg-ibgp-2018/gabarito.pdf'
  },
  {
    title:'2017 • Psicólogo • Andradas/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-andradas-mg-ibgp-2017/psicologo.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-andradas-mg-ibgp-2017/gabarito.pdf'
  },
  {
    title:'2016 • Psicólogo • CISSUL/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/psicologo-cissul-mg-ibgp-2016/psicologo.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/psicologo-cissul-mg-ibgp-2016/gabarito.pdf'
  },
  {
    title:'2015 • Psicólogo • Lagoa Santa/MG',
    prova:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-lagoa-santa-mg-ibgp-2015/8-ibgp-psicologo.pdf',
    gabarito:'https://www.pciconcursos.com.br/provas/download/psicologo-prefeitura-lagoa-santa-mg-ibgp-2015/gab-preliminar.pdf'
  }
];

function esc(value){
  return String(value).replace(/[&<>"']/g,function(ch){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];
  });
}

function lessonMarkup(){
  return LESSONS.map(function(item,index){
    return '<button type="button" class="jr-pss-lesson'+(index===0?' active':'')+'" data-video="'+esc(item[2])+'" data-index="'+index+'">' +
      '<span class="jr-pss-play">▶</span><span><b>'+(index+1).toString().padStart(2,'0')+' • '+esc(item[0])+'</b><small>'+esc(item[1])+'</small></span>' +
      '<span class="jr-pss-status" id="jr-pss-status-'+index+'">Livre</span></button>';
  }).join('');
}

function examMarkup(){
  return EXAMS.map(function(item){
    return '<div class="jr-pss-exam"><b>'+esc(item.title)+'</b><div>' +
      '<a href="'+esc(item.prova)+'" target="_blank" rel="noopener">PROVA</a>' +
      '<a href="'+esc(item.gabarito)+'" target="_blank" rel="noopener">GABARITO</a>' +
      '</div></div>';
  }).join('');
}

function buildPsicologiaSemusa(){
  const first=LESSONS[0];
  const card =
    '<article class="card jr-pss-card" onclick="openGate(\'psicologiasemusa\')" role="button" tabindex="0" ' +
    'onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGate(\'psicologiasemusa\')}" aria-label="Acessar Psicologia SEMUSA Porto Velho">' +
      '<div class="card-shade"></div><div class="card-body">' +
      '<span class="tag">🧠 SEMUSA Porto Velho • IBGP</span>' +
      '<h3>Psicologia • SEMUSA Porto Velho</h3>' +
      '<p>Trilha exclusiva do edital: Psicologia da Saúde, avaliação psicológica, psicopatologia, ética, SUS e provas da banca IBGP.</p>' +
      '<button class="card-btn" type="button" tabindex="-1">Acessar</button>' +
      '</div></article>';

  const area =
    '<section class="area jr-pss-area" id="area-psicologia-semusa">' +
      '<div class="area-top"><div class="area-head"><div>' +
        '<span class="mini-tag">🧠 SEMUSA Porto Velho • Psicologia • IBGP</span>' +
        '<h2>Psicologia • SEMUSA Porto Velho • IBGP</h2>' +
        '<p>Trilha separada e direcionada ao Edital nº 25/2026, sem foco psicopedagógico: conteúdos específicos de Psicologia, SUS, legislação em saúde e provas anteriores da banca IBGP.</p>' +
      '</div></div></div>' +

      '<div class="jr-pss-edital">' +
        '<span>Saúde multideterminada</span><span>Avaliação psicológica</span><span>Infância e adolescência</span>' +
        '<span>Processos grupais</span><span>Teorias da personalidade</span><span>Psicopatologia</span>' +
        '<span>Testes e entrevista</span><span>IST / HIV / AIDS</span><span>Ética profissional</span>' +
        '<span>SUS</span><span>APS / PNAB / ESF</span><span>Vigilância e Epidemiologia</span>' +
      '</div>' +

      '<div class="jr-pss-grid">' +
        '<div class="jr-pss-box jr-pss-lessons-box">' +
          '<div class="jr-pss-head"><strong>Videoaulas focadas no edital</strong><span>'+LESSONS.length+' aulas</span></div>' +
          '<div class="jr-pss-player"><iframe id="jr-pss-player" src="https://www.youtube.com/embed/'+esc(first[2])+'" title="Psicologia SEMUSA Porto Velho" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>' +
          '<div class="jr-pss-current"><b id="jr-pss-title">01 • '+esc(first[0])+'</b><small id="jr-pss-note">'+esc(first[1])+'</small></div>' +
          '<div class="jr-pss-progress"><div><strong>Seu progresso</strong><span id="jr-pss-progress-text">0 de '+LESSONS.length+' estudadas</span></div><div class="jr-pss-track"><i id="jr-pss-progress-fill"></i></div></div>' +
          '<div class="jr-pss-list">'+lessonMarkup()+'</div>' +
        '</div>' +

        '<div class="jr-pss-side">' +
          '<div class="jr-pss-box">' +
            '<div class="jr-pss-head"><strong>Provas anteriores • Psicologia • IBGP</strong><span>'+EXAMS.length+' provas + gabaritos</span></div>' +
            '<p class="jr-pss-note">Cadernos da banca IBGP organizados para treinar o estilo de cobrança, com prova e gabarito.</p>' +
            '<div class="jr-pss-exams">'+examMarkup()+'</div>' +
          '</div>' +

          '<div class="jr-pss-box">' +
            '<div class="jr-pss-head"><strong>PDFs e questões</strong><span>apoio</span></div>' +
            '<a class="jr-pss-resource" href="/pdfs/250-questoes-comentadas-psicologo-2026.pdf" target="_blank" rel="noopener"><b>PDF • 250 questões comentadas – Psicólogo 2026</b><small>Treino complementar de Psicologia</small></a>' +
            '<a class="jr-pss-resource" href="/pdfs/250-questoes-comentadas-psicologo-2026-gabarito.pdf" target="_blank" rel="noopener"><b>Gabarito • 250 questões comentadas</b><small>Arquivo de respostas do material</small></a>' +
            '<a class="jr-pss-resource" href="https://www.pciconcursos.com.br/simulados/saude-publica/sus" target="_blank" rel="noopener"><b>Questões • SUS / Saúde Pública</b><small>Treino complementar de legislação e saúde pública</small></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

  const css =
    '.jr-pss-card .tag{background:rgba(37,99,235,.18)!important;border-color:rgba(96,165,250,.34)!important;color:#dbeafe!important}' +
    '.jr-pss-area{--pss-blue:#2563eb;--pss-sky:#60a5fa}.jr-pss-edital{display:flex;flex-wrap:wrap;gap:7px;margin:2px 0 18px}.jr-pss-edital span{padding:7px 10px;border-radius:999px;background:rgba(37,99,235,.12);border:1px solid rgba(96,165,250,.22);font-size:11px;font-weight:800;color:#dbeafe}' +
    '.jr-pss-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);gap:15px}.jr-pss-side{display:grid;gap:15px;align-content:start}.jr-pss-box{border:1px solid rgba(148,163,184,.18);border-radius:18px;background:rgba(2,6,23,.34);padding:14px;min-width:0}.jr-pss-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}.jr-pss-head strong{font-size:14px}.jr-pss-head span{font-size:10px;font-weight:900;color:#93c5fd}' +
    '.jr-pss-player{position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000}.jr-pss-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.jr-pss-current{padding:10px 2px 8px}.jr-pss-current b,.jr-pss-current small{display:block}.jr-pss-current b{font-size:13px}.jr-pss-current small{margin-top:4px;color:#94a3b8;font-size:11px;line-height:1.4}' +
    '.jr-pss-progress{padding:8px 0 12px}.jr-pss-progress>div:first-child{display:flex;justify-content:space-between;gap:10px;font-size:10px;color:#cbd5e1}.jr-pss-track{height:7px;border-radius:999px;background:rgba(148,163,184,.16);overflow:hidden;margin-top:6px}.jr-pss-track i{display:block;width:0;height:100%;background:linear-gradient(90deg,#2563eb,#60a5fa);transition:width .2s ease}' +
    '.jr-pss-list{display:grid;gap:7px;max-height:590px;overflow:auto;padding-right:2px}.jr-pss-lesson{appearance:none;display:grid;grid-template-columns:24px minmax(0,1fr) auto;align-items:center;gap:8px;text-align:left;width:100%;padding:10px;border-radius:12px;border:1px solid rgba(148,163,184,.18);background:rgba(15,23,42,.72);color:#f8fafc;cursor:pointer}.jr-pss-lesson b,.jr-pss-lesson small{display:block}.jr-pss-lesson b{font-size:11px;line-height:1.35}.jr-pss-lesson small{font-size:9px;line-height:1.4;color:#94a3b8;margin-top:3px}.jr-pss-play{color:#60a5fa;font-size:11px}.jr-pss-status{font-size:9px;font-weight:900;color:#94a3b8}.jr-pss-lesson.active{border-color:rgba(96,165,250,.62);background:rgba(37,99,235,.18)}.jr-pss-lesson.done .jr-pss-status{color:#86efac}.jr-pss-lesson.done .jr-pss-status:before{content:"✓ "}' +
    '.jr-pss-note{font-size:11px;line-height:1.45;color:#94a3b8;margin:0 0 8px}.jr-pss-exam{padding:11px 0;border-top:1px solid rgba(148,163,184,.14)}.jr-pss-exam:first-child{border-top:0}.jr-pss-exam>b{display:block;font-size:11px;line-height:1.4;margin-bottom:7px}.jr-pss-exam div{display:flex;gap:7px;flex-wrap:wrap}.jr-pss-exam a{display:inline-flex;text-decoration:none;padding:7px 9px;border-radius:9px;background:#2563eb;color:#fff;font-size:10px;font-weight:900}.jr-pss-exam a+a{background:#0f766e}' +
    '.jr-pss-resource{display:block;text-decoration:none;color:#f8fafc;padding:11px;border-radius:12px;border:1px solid rgba(148,163,184,.16);background:rgba(15,23,42,.62);margin-top:8px}.jr-pss-resource b,.jr-pss-resource small{display:block}.jr-pss-resource b{font-size:11px;line-height:1.35}.jr-pss-resource small{font-size:9px;color:#94a3b8;margin-top:4px;line-height:1.35}' +
    '@media(max-width:820px){.jr-pss-grid{grid-template-columns:1fr}.jr-pss-box{padding:12px}.jr-pss-list{max-height:none}.jr-pss-head{align-items:flex-start}.jr-pss-lesson{grid-template-columns:22px minmax(0,1fr) auto}}';

  const script =
    '<script id="jr-psicologia-semusa-script-v2">(function(){' +
      'try{if(typeof areaConfig!=="undefined"&&areaConfig.psicologia&&!areaConfig.psicologiasemusa){areaConfig.psicologiasemusa=Object.assign({},areaConfig.psicologia,{title:"Psicologia • SEMUSA Porto Velho • IBGP",sectionId:"area-psicologia-semusa",storageKey:"jr_especifica_psicologia_semusa"});}}catch(e){}' +
      'function init(){' +
        'var root=document.getElementById("area-psicologia-semusa");if(!root)return;' +
        'var player=document.getElementById("jr-pss-player"),title=document.getElementById("jr-pss-title"),note=document.getElementById("jr-pss-note"),fill=document.getElementById("jr-pss-progress-fill"),pt=document.getElementById("jr-pss-progress-text");' +
        'var key="jr_psicologiasemusa_progress_v1",state={done:[],current:""};try{var saved=JSON.parse(localStorage.getItem(key)||"{}");if(Array.isArray(saved.done))state.done=saved.done;if(saved.current)state.current=saved.current}catch(e){}' +
        'var buttons=[].slice.call(root.querySelectorAll(".jr-pss-lesson"));' +
        'function save(){try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}}' +
        'function paint(){buttons.forEach(function(btn){var id=btn.getAttribute("data-video");var done=state.done.indexOf(id)>=0;btn.classList.toggle("done",done);var s=btn.querySelector(".jr-pss-status");if(s)s.textContent=done?"Estudada":"Livre"});var count=state.done.length;if(pt)pt.textContent=count+" de "+buttons.length+" estudadas";if(fill)fill.style.width=(buttons.length?Math.round(count*100/buttons.length):0)+"%"}' +
        'function open(btn,auto){var id=btn.getAttribute("data-video");if(!id||!player)return;var b=btn.querySelector("b"),sm=btn.querySelector("small");player.src="https://www.youtube.com/embed/"+encodeURIComponent(id)+(auto?"?autoplay=1":"");if(title)title.textContent=b?b.textContent:"";if(note)note.textContent=sm?sm.textContent:"";buttons.forEach(function(x){x.classList.remove("active")});btn.classList.add("active");state.current=id;if(state.done.indexOf(id)<0)state.done.push(id);save();paint();}' +
        'buttons.forEach(function(btn){btn.addEventListener("click",function(){open(btn,true);try{player.scrollIntoView({behavior:"smooth",block:"center"})}catch(e){}})});' +
        'paint();if(state.current){var current=buttons.find(function(btn){return btn.getAttribute("data-video")===state.current});if(current)open(current,false);}' +
      '}' +
      'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();' +
    '})();</script>';

  return {card,area,css,script};
}

module.exports={buildPsicologiaSemusa};
