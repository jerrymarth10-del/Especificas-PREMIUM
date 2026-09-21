const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function lesson(area,item){
  return '<button class="lesson-item" type="button" data-area="'+area+'" data-embed="'+esc(item[2])+'" data-title="'+esc(item[0])+'" data-note="'+esc(item[1])+'" data-yt="'+esc(item[3])+'"><span class="lesson-mark">▶</span><span class="lesson-text"><strong>'+esc(item[0])+'</strong><small>'+esc(item[1])+'</small></span><span class="lesson-open lesson-status">Livre</span></button>';
}
function resource(mark,title,note,url){
  return '<a class="pdf-item" href="'+esc(url)+'" target="_blank" rel="noopener"><span class="pdf-mark">'+esc(mark)+'</span><span class="lesson-text"><strong>'+esc(title)+'</strong><small>'+esc(note)+'</small></span><span class="lesson-open">Visualizar</span></a>';
}
function card(opts){
  return '<article class="card jr-standard-card jr-card-'+opts.id+'" onclick="openGate(\''+opts.id+'\')" role="button" tabindex="0" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGate(\''+opts.id+'\')}" aria-label="Acessar '+esc(opts.title)+'">'+
    '<div class="jr-card-visual" aria-hidden="true"><span class="jr-card-icon">'+esc(opts.icon)+'</span><span class="jr-card-lines"></span></div>'+
    '<div class="card-shade"></div><div class="card-body"><span class="tag">'+esc(opts.tag)+'</span><h3>'+esc(opts.title)+'</h3><p>'+esc(opts.description)+'</p><button class="card-btn" type="button" tabindex="-1">Acessar</button></div></article>';
}
function area(opts){
  const lessons=opts.lessons.map(x=>lesson(opts.id,x)).join('');
  const resources=opts.resources.map(x=>resource(...x)).join('');
  const support=opts.support.map(x=>resource(...x)).join('');
  return '<section class="area" id="area-'+opts.id+'"><div class="area-top"><div class="area-head"><div class="jr-area-icon jr-area-icon-'+opts.id+'" aria-hidden="true">'+esc(opts.icon)+'</div><div><span class="mini-tag">'+esc(opts.tag)+'</span><h2>'+esc(opts.title)+'</h2><p>'+esc(opts.description)+'</p></div></div></div><div class="area-content"><div class="area-grid"><div class="player-box"><div class="box-head"><strong>Videoaula atual</strong><span>Player integrado</span></div><div class="video-wrap"><iframe id="player-'+opts.id+'" src="'+opts.lessons[0][2]+'" title="'+esc(opts.title)+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="player-meta"><strong id="title-'+opts.id+'">'+esc(opts.lessons[0][0])+'</strong><small id="note-'+opts.id+'">'+esc(opts.lessons[0][1])+'</small><a id="link-'+opts.id+'" href="'+opts.lessons[0][3]+'" target="_blank" rel="noopener">Ver no YouTube</a></div></div><div class="list-box"><div class="box-head"><strong>Aulas da área</strong><span>'+opts.lessons.length+' aulas</span></div><div class="scroll-list">'+lessons+'</div></div><div class="list-box"><div class="box-head"><strong>PDFs, edital, provas e gabaritos</strong><span>'+opts.resources.length+' itens</span></div><div class="scroll-list">'+resources+'</div></div><div class="list-box"><div class="box-head"><strong>Playlists e treino complementar</strong><span>'+opts.support.length+' itens</span></div><div class="scroll-list">'+support+'</div></div></div></div></section>';
}

function buildExtra(){
  const endImg='/api/card-endemias?v=20260921-1';
  const sefinImg='/api/card-sefin?v=20260921-1';
  const endLessons=[
    ['Aula 01 • Concurso ACE: visão geral para iniciantes','Panorama do cargo e estratégia inicial de preparação','https://www.youtube.com/embed/QaPnT9PCf7A','https://www.youtube.com/watch?v=QaPnT9PCf7A'],
    ['Aula 02 • O que mais cai na prova de Agente de Endemias','Assuntos recorrentes e direcionamento de estudo','https://www.youtube.com/embed/Lpeszi_CIVA','https://www.youtube.com/watch?v=Lpeszi_CIVA'],
    ['Aula 03 • Lei 11.350/2006: atribuições do ACE','Atribuições legais do Agente de Combate às Endemias','https://www.youtube.com/embed/ti-NQ3tn46g','https://www.youtube.com/watch?v=ti-NQ3tn46g'],
    ['Aula 04 • Lei 11.350/2006: resumo ACS e ACE','Revisão da legislação específica','https://www.youtube.com/embed/I6JjR27o5aM','https://www.youtube.com/watch?v=I6JjR27o5aM'],
    ['Aula 05 • Lei 11.350/2006: aula 1','Lei dos Agentes Comunitários de Saúde e de Combate às Endemias','https://www.youtube.com/embed/cQCjUsDJu-k','https://www.youtube.com/watch?v=cQCjUsDJu-k'],
    ['Aula 06 • Lei 11.350/2006: revisão complementar','Reforço da lei aplicada a ACS e ACE','https://www.youtube.com/embed/RW0BsUISsBY','https://www.youtube.com/watch?v=RW0BsUISsBY'],
    ['Aula 07 • Lei 8.080/1990: aula completa','Organização, princípios e funcionamento do SUS','https://www.youtube.com/embed/pT-Vz2sxdDc','https://www.youtube.com/watch?v=pT-Vz2sxdDc'],
    ['Aula 08 • Lei 8.080/1990 para concursos','Pontos cobrados em provas de saúde','https://www.youtube.com/embed/TdlgCMJ3jHg','https://www.youtube.com/watch?v=TdlgCMJ3jHg'],
    ['Aula 09 • Lei 8.080/1990: resumão','Revisão direcionada para concursos','https://www.youtube.com/embed/eG-V0Iy-9UQ','https://www.youtube.com/watch?v=eG-V0Iy-9UQ'],
    ['Aula 10 • Lei 8.080/1990: questões','Treino da Lei Orgânica da Saúde','https://www.youtube.com/embed/YutClkOwk9Q','https://www.youtube.com/watch?v=YutClkOwk9Q'],
    ['Aula 11 • Lei 8.142/1990: teoria e questões','Controle social e financiamento do SUS','https://www.youtube.com/embed/qefeAQTJaSs','https://www.youtube.com/watch?v=qefeAQTJaSs'],
    ['Aula 12 • Lei 8.142/1990: o que cai','Revisão focada em concurso público','https://www.youtube.com/embed/cWmRsZ8tv84','https://www.youtube.com/watch?v=cWmRsZ8tv84'],
    ['Aula 13 • Lei 8.142/1990 na prova','Reforço com foco em concursos de saúde','https://www.youtube.com/embed/bR6fvRKZrKQ','https://www.youtube.com/watch?v=bR6fvRKZrKQ'],
    ['Aula 14 • Decreto 7.508/2011: organização do SUS','Regiões de Saúde, RENAME, RENASES e COAP','https://www.youtube.com/embed/n8kjt0nMJH8','https://www.youtube.com/watch?v=n8kjt0nMJH8'],
    ['Aula 15 • Decreto 7.508/2011 para concursos','Regulamentação da Lei 8.080/1990','https://www.youtube.com/embed/Ml2_0-TtvDw','https://www.youtube.com/watch?v=Ml2_0-TtvDw'],
    ['Aula 16 • Decreto 7.508/2011: revisão','Pontos mais relevantes para prova','https://www.youtube.com/embed/Z90C3SUQ6oE','https://www.youtube.com/watch?v=Z90C3SUQ6oE'],
    ['Aula 17 • Constituição Federal: arts. 196 a 200','Direito à saúde e estrutura constitucional do SUS','https://www.youtube.com/embed/aMVlNgW0P_4','https://www.youtube.com/watch?v=aMVlNgW0P_4'],
    ['Aula 18 • Constituição Federal 196–200: resumo','Revisão de saúde na Constituição Federal','https://www.youtube.com/embed/Aok-Kc6oZb8','https://www.youtube.com/watch?v=Aok-Kc6oZb8'],
    ['Aula 19 • PNAB: Política Nacional de Atenção Básica','Princípios e organização da Atenção Básica','https://www.youtube.com/embed/G_lxoI3OiI0','https://www.youtube.com/watch?v=G_lxoI3OiI0'],
    ['Aula 20 • PNAB: Portaria 2.436/2017 • Aula 1','Política Nacional de Atenção Básica para concursos','https://www.youtube.com/embed/xN2pr1lmxs0','https://www.youtube.com/watch?v=xN2pr1lmxs0'],
    ['Aula 21 • Vigilância em Saúde','Conceitos essenciais e aplicações','https://www.youtube.com/embed/YI6kU4PEjqg','https://www.youtube.com/watch?v=YI6kU4PEjqg'],
    ['Aula 22 • Vigilância Ambiental em Saúde','Conteúdo direcionado a ACS e ACE','https://www.youtube.com/embed/ZgiahvSEluU','https://www.youtube.com/watch?v=ZgiahvSEluU'],
    ['Aula 23 • Vigilância em Saúde • Parte 2','Reforço dos conceitos de vigilância','https://www.youtube.com/embed/HcKEBU2Nxr0','https://www.youtube.com/watch?v=HcKEBU2Nxr0'],
    ['Aula 24 • Vigilância em Saúde por questões','Treino do conteúdo para provas','https://www.youtube.com/embed/NLNSTBHQXBk','https://www.youtube.com/watch?v=NLNSTBHQXBk'],
    ['Aula 25 • Aedes aegypti para prova de ACE','Vetor, ciclo e controle','https://www.youtube.com/embed/aiBdmiiNb-4','https://www.youtube.com/watch?v=aiBdmiiNb-4'],
    ['Aula 26 • Arboviroses: Dengue para ACS e ACE','Transmissão, prevenção e controle','https://www.youtube.com/embed/T12qFsUJXo8','https://www.youtube.com/watch?v=T12qFsUJXo8'],
    ['Aula 27 • Dengue: resumo para concursos','Revisão dos principais pontos cobrados','https://www.youtube.com/embed/Be8bcbztj-8','https://www.youtube.com/watch?v=Be8bcbztj-8'],
    ['Aula 28 • Dengue, Zika e Chikungunya: diferenças','Diagnóstico diferencial e características','https://www.youtube.com/embed/zSE311nP96A','https://www.youtube.com/watch?v=zSE311nP96A'],
    ['Aula 29 • Dengue, Zika e Chikungunya: questões','Diagnóstico diferencial e prática','https://www.youtube.com/embed/mel_Y-Ts4yQ','https://www.youtube.com/watch?v=mel_Y-Ts4yQ'],
    ['Aula 30 • Febre Amarela: ciclos, vetores e sintomas','Conteúdo de vigilância e endemias','https://www.youtube.com/embed/nwVi-QU9nrI','https://www.youtube.com/watch?v=nwVi-QU9nrI'],
    ['Aula 31 • Febre Amarela: revisão completa','Sintomas, diagnóstico, tratamento e controle','https://www.youtube.com/embed/C7LahJphwJo','https://www.youtube.com/watch?v=C7LahJphwJo'],
    ['Aula 32 • Febre Amarela e Leishmaniose','Revisão conjunta de doenças endêmicas','https://www.youtube.com/embed/eQX2mSizsAY','https://www.youtube.com/watch?v=eQX2mSizsAY'],
    ['Aula 33 • Leishmaniose','Transmissão, prevenção e controle','https://www.youtube.com/embed/p4oCeaFFS-I','https://www.youtube.com/watch?v=p4oCeaFFS-I'],
    ['Aula 34 • Doença de Chagas para ACS e ACE','Vetor, transmissão e controle','https://www.youtube.com/embed/kxOaSypF_qI','https://www.youtube.com/watch?v=kxOaSypF_qI'],
    ['Aula 35 • Malária: questões recentes','Treino de conhecimentos específicos','https://www.youtube.com/embed/8prE7OPYUz4','https://www.youtube.com/watch?v=8prE7OPYUz4'],
    ['Aula 36 • Malária: controle do vetor','Conteúdo aplicado ao trabalho do ACE','https://www.youtube.com/embed/UEugWck8rns','https://www.youtube.com/watch?v=UEugWck8rns'],
    ['Aula 37 • Febre Maculosa em foco','Aspectos de vigilância, transmissão e prevenção','https://www.youtube.com/embed/Mfe8h16iiBM','https://www.youtube.com/watch?v=Mfe8h16iiBM'],
    ['Aula 38 • Febre Maculosa: atualização e prevenção','Conteúdo complementar de vigilância','https://www.youtube.com/embed/4E1iYue6aak','https://www.youtube.com/watch?v=4E1iYue6aak'],
    ['Aula 39 • Doenças endêmicas: revisão integrada','Revisão de doenças cobradas para ACE','https://www.youtube.com/embed/yduDX-vLDoc','https://www.youtube.com/watch?v=yduDX-vLDoc'],
    ['Aula 40 • Quem é o ACE e suas atribuições','Função profissional e atividades do agente','https://www.youtube.com/embed/QhF9RqGJCXQ','https://www.youtube.com/watch?v=QhF9RqGJCXQ'],
    ['Aula 41 • Tratamento focal: cálculo e aplicação','Rotina prática do Agente de Combate às Endemias','https://www.youtube.com/embed/Z1YNBqRhFCE','https://www.youtube.com/watch?v=Z1YNBqRhFCE'],
    ['Aula 42 • Endemia, epidemia, surto e pandemia','Conceitos epidemiológicos básicos','https://www.youtube.com/embed/j8UABb1yV9k','https://www.youtube.com/watch?v=j8UABb1yV9k'],
    ['Aula 43 • Ações do Agente de Combate às Endemias','Atividades e rotina de campo','https://www.youtube.com/embed/R_avymOP1z0','https://www.youtube.com/watch?v=R_avymOP1z0'],
    ['Aula 44 • Sistema de informação utilizado pelo ACE','Registro e acompanhamento das ações','https://www.youtube.com/embed/r_AL_9IQTuw','https://www.youtube.com/watch?v=r_AL_9IQTuw'],
    ['Aula 45 • Finalidade dos sistemas de informação do ACE','Uso das informações no trabalho de vigilância','https://www.youtube.com/embed/fNV8p0sO9Eo','https://www.youtube.com/watch?v=fNV8p0sO9Eo'],
    ['Aula 46 • Conhecimentos específicos • ACE','Questões e conteúdo aplicado ao cargo','https://www.youtube.com/embed/jl4ZaH4PCWc','https://www.youtube.com/watch?v=jl4ZaH4PCWc'],
    ['Aula 47 • Interpretação de textos para concursos','Compreensão e interpretação textual','https://www.youtube.com/embed/zP7vf2eFdF4','https://www.youtube.com/watch?v=zP7vf2eFdF4'],
    ['Aula 48 • Classes de palavras','Morfologia para concursos','https://www.youtube.com/embed/RWUUGavYVJw','https://www.youtube.com/watch?v=RWUUGavYVJw'],
    ['Aula 49 • Concordância verbal','Regras e aplicação em questões','https://www.youtube.com/embed/S1nYHMew1UY','https://www.youtube.com/watch?v=S1nYHMew1UY'],
    ['Aula 50 • Regência verbal','Regência aplicada a concursos','https://www.youtube.com/embed/oziOOkwah2E','https://www.youtube.com/watch?v=oziOOkwah2E'],
    ['Aula 51 • Crase para concursos','Regras, casos e resolução de questões','https://www.youtube.com/embed/BA7OQ4wZWr0','https://www.youtube.com/watch?v=BA7OQ4wZWr0'],
    ['Aula 52 • Crase em questões FGV','Treino complementar de língua portuguesa','https://www.youtube.com/embed/NvG0ScFHg0c','https://www.youtube.com/watch?v=NvG0ScFHg0c'],
    ['Aula 53 • Crase: revisão para concursos','Reforço de emprego do acento grave','https://www.youtube.com/embed/mtBHgZFHs84','https://www.youtube.com/watch?v=mtBHgZFHs84'],
    ['Aula 54 • Coesão e coerência textual','Mecanismos de construção do texto','https://www.youtube.com/embed/lsVWqWtuusI','https://www.youtube.com/watch?v=lsVWqWtuusI'],
    ['Aula 55 • Simulado e revisão • Agente de Endemias','Revisão final por questões e dicas','https://www.youtube.com/embed/_rrFOBdC0EA','https://www.youtube.com/watch?v=_rrFOBdC0EA']
  ];
  const endResources=[
    ['EDITAL','Edital oficial Vilhena/RO • 02/2026','IBGP • ACS e Agente de Combate às Endemias','https://novo.ibgpconcursos.com.br/rest/concurso/download/edital/23962/?file=site/anexos/749/00+-+EDITAL+N%EF%BF%BD+02-2026+PSP_VILHENA-RO.pdf'],
    ['PROVA','ACE • Andradas/MG • IBGP 2017','PCI Concursos • prova e gabarito da mesma banca','https://www.pciconcursos.com.br/provas/download/agente-de-combate-a-endemias-prefeitura-andradas-mg-ibgp-2017'],
    ['PROVA','ACE • Lagoa Santa/MG • IBGP 2015','PCI Concursos • prova e gabarito da mesma banca','https://www.pciconcursos.com.br/provas/download/agente-de-combate-as-endemias-prefeitura-lagoa-santa-mg-ibgp-2015'],
    ['PROVA','Agente Comunitário de Saúde • Andradas/MG • IBGP 2017','Treino da mesma banca e área de saúde pública','https://www.pciconcursos.com.br/provas/download/agente-comunitario-de-saude-prefeitura-andradas-mg-ibgp-2017'],
    ['PROVA','Técnico em Enfermagem • Dores do Indaiá/MG • IBGP 2021','Treino complementar da banca IBGP • área da saúde','https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-dores-do-indaia-mg-ibgp-2021'],
    ['PROVA','Técnico em Enfermagem • São João del-Rei/MG • IBGP 2021','Treino complementar da banca IBGP • área da saúde','https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-sao-joao-del-rei-mg-ibgp-2021'],
    ['BANCA','Banco de provas IBGP','PCI Concursos • outras provas da organizadora','https://www.pciconcursos.com.br/provas/ibgp'],
    ['PROVAS','Banco completo • Agente de Endemias','PCI Concursos • provas de vários anos e bancas','https://www.pciconcursos.com.br/provas/agente-de-combate-as-endemias'],
    ['LEI','Lei Federal 11.350/2006','Base legal nacional dos ACS e ACE','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11350.htm'],
    ['SUS','Lei Federal 8.080/1990','Lei Orgânica da Saúde','https://www.planalto.gov.br/ccivil_03/leis/l8080.htm'],
    ['SUS','Lei Federal 8.142/1990','Participação da comunidade e transferências no SUS','https://www.planalto.gov.br/ccivil_03/leis/l8142.htm']
  ];
  const endSupport=[
    ['PLAY','Playlist completa • Agente de Combate às Endemias','Curso em sequência no YouTube','https://www.youtube.com/playlist?list=PLN3dXL6Ew5sVfOOBnlWU83V9dOpDAfZOQ'],
    ['PLAY','ACS + Agente de Endemias','Playlist complementar de saúde e legislação','https://www.youtube.com/playlist?list=PLbj48mFxzZs6_LGWn6DBPgySTJp1YwTdk'],
    ['OFICIAL','Página do processo seletivo • IBGP','Acompanhar publicações, retificações e comunicados','https://novo.ibgpconcursos.com.br/concurso.jsp?cod=749'],
    ['TREINO','Questões e provas • Agente de Endemias','Banco de treino do PCI Concursos','https://www.pciconcursos.com.br/provas/agente-de-combate-as-endemias']
  ];
  const sefinLessons=[
    ['Aula 01 • Finanças Públicas para concursos','Teoria simplificada e questões','https://www.youtube.com/embed/T6y3TOr9i_4','https://www.youtube.com/watch?v=T6y3TOr9i_4'],
    ['Aula 02 • Contabilidade Pública em questões','Revisão para área fiscal','https://www.youtube.com/embed/nB0DDOOC9YM','https://www.youtube.com/watch?v=nB0DDOOC9YM'],
    ['Aula 03 • Contabilidade Pública: princípios em questões','Treino de princípios contábeis','https://www.youtube.com/embed/KFhrc96zpyk','https://www.youtube.com/watch?v=KFhrc96zpyk'],
    ['Aula 04 • Contabilidade Pública FGV: super revisão','Questões da banca FGV','https://www.youtube.com/embed/vUnlxS_mTTg','https://www.youtube.com/watch?v=vUnlxS_mTTg'],
    ['Aula 05 • Direito Tributário: questões FGV','Treino específico da banca','https://www.youtube.com/embed/gctbR32Hoco','https://www.youtube.com/watch?v=gctbR32Hoco'],
    ['Aula 06 • Direito Tributário do zero • Aula 1','Base tributária em questões','https://www.youtube.com/embed/NI6XZZ65rlo','https://www.youtube.com/watch?v=NI6XZZ65rlo'],
    ['Aula 07 • Português FGV: questões mais frequentes','Perfil de cobrança da banca','https://www.youtube.com/embed/-koO0gvEnV4','https://www.youtube.com/watch?v=-koO0gvEnV4'],
    ['Aula 08 • Interpretação de textos','Compreensão textual para concursos','https://www.youtube.com/embed/zP7vf2eFdF4','https://www.youtube.com/watch?v=zP7vf2eFdF4'],
    ['Aula 09 • Classes de palavras','Morfologia e análise gramatical','https://www.youtube.com/embed/RWUUGavYVJw','https://www.youtube.com/watch?v=RWUUGavYVJw'],
    ['Aula 10 • Concordância verbal','Regras e questões','https://www.youtube.com/embed/S1nYHMew1UY','https://www.youtube.com/watch?v=S1nYHMew1UY'],
    ['Aula 11 • Regência verbal','Regência para concursos','https://www.youtube.com/embed/oziOOkwah2E','https://www.youtube.com/watch?v=oziOOkwah2E'],
    ['Aula 12 • Crase para concursos','Regras e casos de uso','https://www.youtube.com/embed/BA7OQ4wZWr0','https://www.youtube.com/watch?v=BA7OQ4wZWr0'],
    ['Aula 13 • Crase em questões FGV','Treino específico da banca','https://www.youtube.com/embed/NvG0ScFHg0c','https://www.youtube.com/watch?v=NvG0ScFHg0c'],
    ['Aula 14 • Crase: revisão','Reforço para concursos','https://www.youtube.com/embed/mtBHgZFHs84','https://www.youtube.com/watch?v=mtBHgZFHs84'],
    ['Aula 15 • Coesão e coerência','Estrutura e sentido textual','https://www.youtube.com/embed/lsVWqWtuusI','https://www.youtube.com/watch?v=lsVWqWtuusI'],
    ['Aula 16 • Raciocínio Lógico FGV','Questões e técnicas de resolução','https://www.youtube.com/embed/Py2B0mj4gQ0','https://www.youtube.com/watch?v=Py2B0mj4gQ0'],
    ['Aula 17 • RLM FGV: tópicos mais cobrados','Revisão direcionada à banca','https://www.youtube.com/embed/C5fc3Hv-BLM','https://www.youtube.com/watch?v=C5fc3Hv-BLM'],
    ['Aula 18 • Informática FGV: Word','Questões e recursos cobrados pela FGV','https://www.youtube.com/embed/yNsPUlPuKho','https://www.youtube.com/watch?v=yNsPUlPuKho'],
    ['Aula 19 • Informática FGV: Excel','Questões e recursos cobrados pela FGV','https://www.youtube.com/embed/6265qaaZ8N0','https://www.youtube.com/watch?v=6265qaaZ8N0'],
    ['Aula 20 • História de Rondônia: revisão','Conteúdo regional para concursos','https://www.youtube.com/embed/DDyupZ6YD_Q','https://www.youtube.com/watch?v=DDyupZ6YD_Q'],
    ['Aula 21 • História e Geografia de Rondônia • Aula 1','Formação histórica e aspectos regionais','https://www.youtube.com/embed/tL9mc9JBz0g','https://www.youtube.com/watch?v=tL9mc9JBz0g'],
    ['Aula 22 • Direito Constitucional FGV: o que mais cai','Revisão direcionada à banca','https://www.youtube.com/embed/Nk7avFfAmGo','https://www.youtube.com/watch?v=Nk7avFfAmGo'],
    ['Aula 23 • Direito Constitucional: questões FGV','Treino de prova','https://www.youtube.com/embed/t2V_d44nuOw','https://www.youtube.com/watch?v=t2V_d44nuOw'],
    ['Aula 24 • Direito Administrativo FGV: questões','Treino da banca FGV','https://www.youtube.com/embed/Fr2qxCMfVIc','https://www.youtube.com/watch?v=Fr2qxCMfVIc'],
    ['Aula 25 • Direito Administrativo: questões FGV II','Reforço por questões','https://www.youtube.com/embed/iKpmnnyCGsM','https://www.youtube.com/watch?v=iKpmnnyCGsM'],
    ['Aula 26 • Direito Administrativo: questões FGV III','Treino complementar','https://www.youtube.com/embed/p6iudv5oaUU','https://www.youtube.com/watch?v=p6iudv5oaUU'],
    ['Aula 27 • Princípios da Administração Pública • LIMPE','Princípios constitucionais administrativos','https://www.youtube.com/embed/YDu8Ftky404','https://www.youtube.com/watch?v=YDu8Ftky404'],
    ['Aula 28 • Administração Pública: aula completa','Organização e fundamentos','https://www.youtube.com/embed/FCHp8KUKmvc','https://www.youtube.com/watch?v=FCHp8KUKmvc'],
    ['Aula 29 • Organização Administrativa','Administração direta e indireta','https://www.youtube.com/embed/zNugeuWHdhw','https://www.youtube.com/watch?v=zNugeuWHdhw'],
    ['Aula 30 • Administração Direta e Indireta','Estrutura administrativa','https://www.youtube.com/embed/z3aVIXW2R-E','https://www.youtube.com/watch?v=z3aVIXW2R-E'],
    ['Aula 31 • Organização da Administração Pública','Revisão da estrutura estatal','https://www.youtube.com/embed/8xfBvhEzQHQ','https://www.youtube.com/watch?v=8xfBvhEzQHQ'],
    ['Aula 32 • Responsabilidade Civil do Estado','Direito Administrativo para concursos','https://www.youtube.com/embed/ursUO0v9SJE','https://www.youtube.com/watch?v=ursUO0v9SJE'],
    ['Aula 33 • Direito Civil FGV: 30 questões','Treino de Direito Civil','https://www.youtube.com/embed/z3mlG0w275U','https://www.youtube.com/watch?v=z3mlG0w275U'],
    ['Aula 34 • Direito Civil: questões FGV','Revisão direcionada à banca','https://www.youtube.com/embed/-ZIFpNJxx2E','https://www.youtube.com/watch?v=-ZIFpNJxx2E'],
    ['Aula 35 • Direito Empresarial: empresário individual','Teoria e questões','https://www.youtube.com/embed/zqnpv9mEhLA','https://www.youtube.com/watch?v=zqnpv9mEhLA'],
    ['Aula 36 • Direito Empresarial FGV','Conteúdo descomplicado para prova','https://www.youtube.com/embed/VnB1jueadSA','https://www.youtube.com/watch?v=VnB1jueadSA'],
    ['Aula 37 • Direito Empresarial: questões FGV','Treino complementar','https://www.youtube.com/embed/0FO2R4wPRD8','https://www.youtube.com/watch?v=0FO2R4wPRD8'],
    ['Aula 38 • Contabilidade Geral: conceitos básicos','Base para área fiscal','https://www.youtube.com/embed/3CXlFD--KVA','https://www.youtube.com/watch?v=3CXlFD--KVA'],
    ['Aula 39 • Contabilidade Geral: resumo completo','Revisão dos principais tópicos','https://www.youtube.com/embed/ELwxw7stViI','https://www.youtube.com/watch?v=ELwxw7stViI'],
    ['Aula 40 • Contabilidade Geral: questões FGV','Treino direcionado à banca','https://www.youtube.com/embed/pY61hV6W2Io','https://www.youtube.com/watch?v=pY61hV6W2Io'],
    ['Aula 41 • Patrimônio Líquido e Dividendos','Contabilidade Geral aplicada','https://www.youtube.com/embed/9fCG3H5dFDs','https://www.youtube.com/watch?v=9fCG3H5dFDs'],
    ['Aula 42 • Balanço Patrimonial e DRE • FGV','Demonstrações contábeis em questões','https://www.youtube.com/embed/9KMxaZ9bD20','https://www.youtube.com/watch?v=9KMxaZ9bD20'],
    ['Aula 43 • Contabilidade de Custos: custeio por absorção','Tema histórico do edital fiscal','https://www.youtube.com/embed/ccg0Ri3-EXk','https://www.youtube.com/watch?v=ccg0Ri3-EXk'],
    ['Aula 44 • AFO: ciclo orçamentário','Administração Financeira e Orçamentária','https://www.youtube.com/embed/8SPblpsfXi8','https://www.youtube.com/watch?v=8SPblpsfXi8'],
    ['Aula 45 • AFO: PPA, LDO e LOA','Instrumentos de planejamento e orçamento','https://www.youtube.com/embed/GNrF2ujNAE0','https://www.youtube.com/watch?v=GNrF2ujNAE0'],
    ['Aula 46 • Matemática Financeira para concursos','Fundamentos e resolução de questões','https://www.youtube.com/embed/AJ48NOcG5xQ','https://www.youtube.com/watch?v=AJ48NOcG5xQ'],
    ['Aula 47 • Juros simples e compostos','Matemática Financeira aplicada','https://www.youtube.com/embed/F6AgEka2e4E','https://www.youtube.com/watch?v=F6AgEka2e4E'],
    ['Aula 48 • Juros simples para concursos','Revisão e questões','https://www.youtube.com/embed/f0x4evaJhNU','https://www.youtube.com/watch?v=f0x4evaJhNU'],
    ['Aula 49 • Economia: estruturas de mercado','Microeconomia para concursos','https://www.youtube.com/embed/yMeaMYCLGiI','https://www.youtube.com/watch?v=yMeaMYCLGiI'],
    ['Aula 50 • Microeconomia • Aula 1','Fundamentos de economia','https://www.youtube.com/embed/ieOPKVxD23Y','https://www.youtube.com/watch?v=ieOPKVxD23Y'],
    ['Aula 51 • Auditoria FGV • Intensivo Aula 1','Fundamentos e perfil da banca','https://www.youtube.com/embed/Tx9Xs8M-wzg','https://www.youtube.com/watch?v=Tx9Xs8M-wzg'],
    ['Aula 52 • Auditoria FGV • Intensivo Aula 6','Continuação e questões','https://www.youtube.com/embed/iZTvJDDFlkA','https://www.youtube.com/watch?v=iZTvJDDFlkA']
  ];
  const sefinResources=[
    ['EDITAL','Edital oficial SEFIN/RO • 2017','FGV • Auditor Fiscal, Técnico Tributário e Contador','https://rondonia.ro.gov.br/wp-content/uploads/2017/10/Edital-n.-242-Abertura-Concurso-Publico-SEFIN-RO..pdf'],
    ['FGV','Página oficial SEFIN/RO • FGV','Provas objetivas e gabaritos oficiais do concurso','https://conhecimento.fgv.br/concursos/sefin-ro'],
    ['PROVA','Técnico Tributário • SEFIN/RO • FGV 2018','PCI Concursos • prova e gabarito','https://www.pciconcursos.com.br/provas/download/tecnico-tributario-sefin-ro-fgv-2018'],
    ['PROVA','Auditor Fiscal de Tributos Estaduais • SEFIN/RO • FGV 2018','PCI Concursos • prova e gabarito','https://www.pciconcursos.com.br/provas/download/auditor-fiscal-de-tributos-estaduais-sefin-ro-fgv-2018'],
    ['PROVA','Auditor Federal de Finanças e Controle • CGU • FGV 2022','Treino fiscal/financeiro da mesma banca','https://www.pciconcursos.com.br/provas/download/auditor-federal-de-financas-e-controle-cgu-fgv-2022'],
    ['PROVA','Auditor da Receita Estadual • SEAD/AP • FGV 2010','Treino fiscal da mesma banca','https://www.pciconcursos.com.br/provas/download/auditor-da-receita-estadual-sead-ap-fgv-2010'],
    ['PROVA','Fiscal da Receita Estadual • SEAD/AP • FGV 2010','Treino tributário/fiscal da mesma banca','https://www.pciconcursos.com.br/provas/download/fiscal-da-receita-estadual-sead-ap-fgv-2010'],
    ['PROVA','Auditor Fiscal de Tributos • SEFIN/RO • FJP 2006','Histórico específico da SEFIN/RO','https://www.pciconcursos.com.br/provas/download/auditor-fiscal-de-tributos-sefin-ro-fjp-2006'],
    ['PROVA','Contador • SEFIN/SUPEL-RO • FUNCAB 2014','Histórico de prova ligada à SEFIN/RO','https://www.pciconcursos.com.br/provas/download/contador-sefin-e-supel-ro-funcab-2014'],
    ['PROVAS','Banco de provas SEFIN/RO','PCI Concursos • provas históricas do órgão','https://www.pciconcursos.com.br/provas/sefin-ro'],
    ['FGV','Provas fiscais da FGV','PCI Concursos • treino complementar da banca','https://www.pciconcursos.com.br/provas/fgv-sefaz'],
    ['QUESTÕES','Direito Tributário • FGV','QConcursos • banco de questões da banca','https://www.qconcursos.com/questoes-de-concursos/questoes?discipline_ids%5B%5D=18&examining_board_ids%5B%5D=63'],
    ['QUESTÕES','Contabilidade Pública • FGV','QConcursos • banco de questões da banca','https://www.qconcursos.com/questoes-de-concursos/questoes?discipline_ids%5B%5D=36&examining_board_ids%5B%5D=63']
  ];
  const sefinSupport=[
    ['PLAY','Finanças e Orçamento Público','Playlist completa de teoria e questões','https://www.youtube.com/playlist?list=PLfKSN2uryaFd4zqRblOnPLYnnzxyucSMi'],
    ['PLAY','Questões de Contabilidade','Playlist de Contabilidade Pública e área fiscal','https://www.youtube.com/playlist?list=PL3lGQF-iYzoq9rwcnxvB4Dan14ecL8X6-'],
    ['PLAY','Concursos Públicos • Finanças/Contabilidade','Playlist complementar','https://www.youtube.com/playlist?list=PLrQC3RUXPZvmakDGEQa5s9stptWuOvbU3'],
    ['FGV','Provas oficiais do último concurso SEFIN/RO','Página oficial com cadernos e gabaritos','https://conhecimento.fgv.br/concursos/sefin-ro']
  ];
  const end={id:'endemias',icon:'🦟',tag:'Vilhena/RO • IBGP',title:'Agente de Combate às Endemias',description:'Preparação organizada para o Processo Seletivo de Vilhena/RO, com legislação, conhecimentos específicos, videoaulas, provas da banca IBGP e revisão por questões.',lessons:endLessons,resources:endResources,support:endSupport};
  const sefin={id:'sefin',icon:'📊',tag:'SEFIN/RO • Material Geral',title:'SEFIN/RO • Material Geral',description:'Base geral para preparação da SEFIN/RO, reunindo Finanças Públicas, Orçamento, Contabilidade Pública, Direito Tributário, provas oficiais e questões da FGV.',lessons:sefinLessons,resources:sefinResources,support:sefinSupport};
  const css='.jr-standard-card{min-height:355px!important;position:relative!important;overflow:hidden!important;background:#08111b!important}.jr-standard-card .jr-card-visual{position:absolute;inset:0;background:radial-gradient(circle at 72% 18%,rgba(239,68,68,.30),transparent 28%),linear-gradient(145deg,#111827 0%,#090d14 52%,#25070a 100%)}.jr-standard-card .jr-card-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 0 58%,rgba(239,68,68,.12) 58% 60%,transparent 60% 100%)}.jr-standard-card .jr-card-icon{position:absolute;right:18px;top:20px;font-size:56px;filter:drop-shadow(0 10px 18px rgba(0,0,0,.45));opacity:.94}.jr-standard-card .jr-card-lines{position:absolute;left:18px;right:18px;top:105px;height:80px;border-top:1px solid rgba(248,113,113,.22);border-bottom:1px solid rgba(248,113,113,.12);background:repeating-linear-gradient(180deg,transparent 0 17px,rgba(248,113,113,.07) 17px 18px)}.jr-standard-card .card-shade{background:linear-gradient(180deg,rgba(3,7,12,.04) 0%,rgba(3,7,12,.26) 48%,rgba(2,6,10,.96) 100%)!important}.jr-card-endemias .jr-card-visual{background:radial-gradient(circle at 75% 16%,rgba(239,68,68,.30),transparent 30%),linear-gradient(145deg,#07141a,#0d1721 48%,#2a080b)}.jr-card-sefin .jr-card-visual{background:radial-gradient(circle at 78% 16%,rgba(245,158,11,.20),transparent 30%),linear-gradient(145deg,#101827,#0a0e16 52%,#2a0808)}.jr-area-icon{width:84px;height:84px;flex:0 0 84px;border-radius:22px;display:grid;place-items:center;font-size:38px;border:1px solid rgba(255,255,255,.12);box-shadow:0 12px 26px rgba(0,0,0,.24);background:linear-gradient(145deg,#111827,#21070a)}.jr-area-icon-endemias{background:linear-gradient(145deg,#08202a,#2b070b)}.jr-area-icon-sefin{background:linear-gradient(145deg,#111827,#2a0c08)}#area-endemias .list-box,#area-sefin .list-box{align-self:start;max-height:620px;overflow:hidden;display:flex;flex-direction:column;min-height:0}#area-endemias .scroll-list,#area-sefin .scroll-list{max-height:562px!important;overflow-y:auto!important;overflow-x:hidden!important}@media(max-width:720px){.jr-standard-card{min-height:430px!important}.jr-standard-card .jr-card-icon{font-size:50px}.jr-area-icon{width:72px;height:72px;flex-basis:72px;font-size:32px}#area-endemias .list-box,#area-sefin .list-box{grid-column:1/-1!important;max-height:none!important}#area-endemias .scroll-list,#area-sefin .scroll-list{max-height:520px!important}}'
  return {cards:card(end)+card(sefin),areas:area(end)+area(sefin),css};
}
module.exports={buildExtra};