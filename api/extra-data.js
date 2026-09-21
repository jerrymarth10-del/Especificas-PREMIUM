const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function lesson(area,item){
  return '<button class="lesson-item" type="button" data-area="'+area+'" data-embed="'+esc(item[2])+'" data-title="'+esc(item[0])+'" data-note="'+esc(item[1])+'" data-yt="'+esc(item[3])+'"><span class="lesson-mark">▶</span><span class="lesson-text"><strong>'+esc(item[0])+'</strong><small>'+esc(item[1])+'</small></span><span class="lesson-open lesson-status">Livre</span></button>';
}
function resource(mark,title,note,url){
  return '<a class="pdf-item" href="'+esc(url)+'" target="_blank" rel="noopener"><span class="pdf-mark">'+esc(mark)+'</span><span class="lesson-text"><strong>'+esc(title)+'</strong><small>'+esc(note)+'</small></span><span class="lesson-open">Visualizar</span></a>';
}
function card(id,img,alt){
  return '<article class="card jr-art-card" aria-label="'+esc(alt)+'"><button class="jr-art-button" type="button" onclick="openGate(\''+id+'\')" aria-label="Acessar '+esc(alt)+'"><img src="'+img+'" alt="'+esc(alt)+'" width="180" height="270" decoding="async" loading="eager"><span class="jr-art-hit" aria-hidden="true"></span></button></article>';
}
function area(opts){
  const lessons=opts.lessons.map(x=>lesson(opts.id,x)).join('');
  const resources=opts.resources.map(x=>resource(...x)).join('');
  const support=opts.support.map(x=>resource(...x)).join('');
  return '<section class="area" id="area-'+opts.id+'"><div class="area-top"><div class="area-head"><img src="'+opts.img+'" alt="'+esc(opts.title)+'"><div><span class="mini-tag">'+esc(opts.tag)+'</span><h2>'+esc(opts.title)+'</h2><p>'+esc(opts.description)+'</p></div></div></div><div class="area-content"><div class="area-grid"><div class="player-box"><div class="box-head"><strong>Videoaula atual</strong><span>Player integrado</span></div><div class="video-wrap"><iframe id="player-'+opts.id+'" src="'+opts.lessons[0][2]+'" title="'+esc(opts.title)+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="player-meta"><strong id="title-'+opts.id+'">'+esc(opts.lessons[0][0])+'</strong><small id="note-'+opts.id+'">'+esc(opts.lessons[0][1])+'</small><a id="link-'+opts.id+'" href="'+opts.lessons[0][3]+'" target="_blank" rel="noopener">Ver no YouTube</a></div></div><div class="list-box"><div class="box-head"><strong>Aulas da área</strong><span>'+opts.lessons.length+' aulas</span></div><div class="scroll-list">'+lessons+'</div></div><div class="list-box"><div class="box-head"><strong>PDFs, edital, provas e gabaritos</strong><span>'+opts.resources.length+' itens</span></div><div class="scroll-list">'+resources+'</div></div><div class="list-box"><div class="box-head"><strong>Playlists e treino complementar</strong><span>'+opts.support.length+' itens</span></div><div class="scroll-list">'+support+'</div></div></div></div></section>';
}

function buildExtra(){
  const endImg='/api/card-endemias?v=20260921-1';
  const sefinImg='/api/card-sefin?v=20260921-1';
  const endLessons=[
    ['Agente de Combate às Endemias • visão geral','Introdução ao cargo e estratégia de estudo','https://www.youtube.com/embed/QaPnT9PCf7A','https://www.youtube.com/watch?v=QaPnT9PCf7A'],
    ['O que cai na prova de Agente de Endemias','Mapa dos assuntos mais cobrados','https://www.youtube.com/embed/Lpeszi_CIVA','https://www.youtube.com/watch?v=Lpeszi_CIVA'],
    ['Lei 11.350/2006 • atribuições do ACE','Lei atualizada aplicada ao cargo','https://www.youtube.com/embed/ti-NQ3tn46g','https://www.youtube.com/watch?v=ti-NQ3tn46g'],
    ['Simulado ACE • questões específicas','Treino de conhecimentos específicos','https://www.youtube.com/embed/MNH9MmB3rys','https://www.youtube.com/watch?v=MNH9MmB3rys'],
    ['Agente de Endemias • simulado e revisão','Revisão final por questões','https://www.youtube.com/embed/_rrFOBdC0EA','https://www.youtube.com/watch?v=_rrFOBdC0EA'],
    ['Conhecimentos Específicos • ACE','Aula direcionada para concurso','https://www.youtube.com/embed/jl4ZaH4PCWc','https://www.youtube.com/watch?v=jl4ZaH4PCWc']
  ];
  const endResources=[
    ['EDITAL','Edital oficial Vilhena/RO • 02/2026','IBGP • ACS e Agente de Combate às Endemias','https://novo.ibgpconcursos.com.br/rest/concurso/download/edital/23962/?file=site/anexos/749/00+-+EDITAL+N%EF%BF%BD+02-2026+PSP_VILHENA-RO.pdf'],
    ['PROVA','ACE • Andradas/MG • IBGP 2017','PCI Concursos • prova e gabarito para visualização','https://www.pciconcursos.com.br/provas/download/agente-de-combate-a-endemias-prefeitura-andradas-mg-ibgp-2017'],
    ['PROVA','ACE • Lagoa Santa/MG • IBGP 2015','PCI Concursos • prova da mesma banca','https://www.pciconcursos.com.br/provas/download/agente-de-combate-as-endemias-prefeitura-lagoa-santa-mg-ibgp-2015'],
    ['BANCA','Banco de provas IBGP','PCI Concursos • outras provas da organizadora','https://www.pciconcursos.com.br/provas/ibgp'],
    ['PROVAS','Banco de provas • Agente de Endemias','PCI Concursos • provas de vários anos e bancas','https://www.pciconcursos.com.br/provas/agente-de-combate-as-endemias']
  ];
  const endSupport=[
    ['PLAY','Playlist completa • Agente de Combate às Endemias','Curso em sequência no YouTube','https://www.youtube.com/playlist?list=PLN3dXL6Ew5sVfOOBnlWU83V9dOpDAfZOQ'],
    ['PLAY','ACS + Agente de Endemias','Playlist complementar de saúde e legislação','https://www.youtube.com/playlist?list=PLbj48mFxzZs6_LGWn6DBPgySTJp1YwTdk'],
    ['OFICIAL','Página do processo seletivo • IBGP','Acompanhar publicações, retificações e comunicados','https://novo.ibgpconcursos.com.br/concurso.jsp?cod=749']
  ];
  const sefinLessons=[
    ['Finanças Públicas para concursos','Teoria simplificada e questões','https://www.youtube.com/embed/T6y3TOr9i_4','https://www.youtube.com/watch?v=T6y3TOr9i_4'],
    ['Contabilidade Pública em questões','Revisão para área fiscal','https://www.youtube.com/embed/nB0DDOOC9YM','https://www.youtube.com/watch?v=nB0DDOOC9YM'],
    ['Contabilidade Pública • questões','Treino direcionado para concursos','https://www.youtube.com/embed/KFhrc96zpyk','https://www.youtube.com/watch?v=KFhrc96zpyk'],
    ['Super revisão Contabilidade Pública • FGV','Questões da banca FGV','https://www.youtube.com/embed/vUnlxS_mTTg','https://www.youtube.com/watch?v=vUnlxS_mTTg'],
    ['Direito Tributário • questões FGV','Treino específico da banca','https://www.youtube.com/embed/gctbR32Hoco','https://www.youtube.com/watch?v=gctbR32Hoco'],
    ['Direito Tributário do zero • questões','Base tributária para área fiscal','https://www.youtube.com/embed/NI6XZZ65rlo','https://www.youtube.com/watch?v=NI6XZZ65rlo']
  ];
  const sefinResources=[
    ['EDITAL','Edital oficial SEFIN/RO • 2017','FGV • Auditor Fiscal, Técnico Tributário e Contador','https://rondonia.ro.gov.br/wp-content/uploads/2017/10/Edital-n.-242-Abertura-Concurso-Publico-SEFIN-RO..pdf'],
    ['FGV','Página oficial SEFIN/RO • FGV','Provas objetivas e gabaritos oficiais do concurso','https://conhecimento.fgv.br/concursos/sefin-ro'],
    ['PROVAS','Banco de provas SEFIN/RO','PCI Concursos • Auditor, Técnico e Contador','https://www.pciconcursos.com.br/provas/sefin-ro'],
    ['PROVA','Técnico Tributário • SEFIN/RO • FGV 2018','PCI Concursos • prova e gabarito definitivo','https://www.pciconcursos.com.br/provas/download/tecnico-tributario-sefin-ro-fgv-2018'],
    ['FGV','Provas fiscais da FGV','PCI Concursos • treino complementar da banca','https://www.pciconcursos.com.br/provas/fgv-sefaz']
  ];
  const sefinSupport=[
    ['PLAY','Finanças e Orçamento Público','Playlist completa de teoria e questões','https://www.youtube.com/playlist?list=PLfKSN2uryaFd4zqRblOnPLYnnzxyucSMi'],
    ['PLAY','Questões de Contabilidade','Playlist de Contabilidade Pública e área fiscal','https://www.youtube.com/playlist?list=PL3lGQF-iYzoq9rwcnxvB4Dan14ecL8X6-'],
    ['PLAY','Concursos Públicos • Finanças/Contabilidade','Playlist complementar','https://www.youtube.com/playlist?list=PLrQC3RUXPZvmakDGEQa5s9stptWuOvbU3']
  ];
  const end={id:'endemias',img:endImg,tag:'Vilhena/RO • IBGP',title:'Agente de Combate às Endemias',description:'Preparação organizada para o Processo Seletivo de Vilhena/RO, com legislação, conhecimentos específicos, videoaulas, provas da banca IBGP e revisão por questões.',lessons:endLessons,resources:endResources,support:endSupport};
  const sefin={id:'sefin',img:sefinImg,tag:'SEFIN/RO • Material Geral',title:'SEFIN/RO • Material Geral',description:'Base geral para preparação da SEFIN/RO, reunindo Finanças Públicas, Orçamento, Contabilidade Pública, Direito Tributário, provas oficiais e questões da FGV.',lessons:sefinLessons,resources:sefinResources,support:sefinSupport};
  const css='.jr-art-card{min-height:355px!important;padding:0!important;overflow:hidden!important;background:#07090e!important}.jr-art-button{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important;padding:0!important;margin:0!important;background:transparent!important;cursor:pointer!important}.jr-art-button>img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}.jr-art-card .jr-art-hit{position:absolute;inset:0;background:linear-gradient(180deg,transparent 68%,rgba(0,0,0,.12));pointer-events:none}#area-endemias .area-head img,#area-sefin .area-head img{width:84px!important;height:84px!important;max-width:84px!important;aspect-ratio:1/1!important;object-fit:cover!important;border-radius:22px!important}#area-endemias .list-box,#area-sefin .list-box{align-self:start;max-height:620px;overflow:hidden;display:flex;flex-direction:column;min-height:0}#area-endemias .scroll-list,#area-sefin .scroll-list{max-height:562px!important;overflow-y:auto!important;overflow-x:hidden!important}@media(max-width:720px){.jr-art-card{min-height:430px!important}#area-endemias .list-box,#area-sefin .list-box{grid-column:1/-1!important;max-height:none!important}#area-endemias .scroll-list,#area-sefin .scroll-list{max-height:520px!important}}';
  return {cards:card('endemias',endImg,'Agente de Combate às Endemias')+card('sefin',sefinImg,'SEFIN/RO Material Geral'),areas:area(end)+area(sefin),css};
}
module.exports={buildExtra};