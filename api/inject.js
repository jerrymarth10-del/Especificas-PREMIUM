const { gunzipSync } = require('zlib');

const PAYLOAD = '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';

module.exports = async function handler(req, res) {
  try {
    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'especificas-premium.vercel.app';
    const sourceUrl = 'https://' + productionHost + '/index.html';
    const response = await fetch(sourceUrl, { headers: { 'user-agent': 'JR-Apostilas-Quimica/2.1' } });
    if (!response.ok) {
      res.statusCode = 502;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('Não foi possível carregar o conteúdo original.');
      return;
    }

    let html = await response.text();
    const { css: chemistryCss, card: chemistryCard, area: chemistryArea } =
      JSON.parse(gunzipSync(Buffer.from(PAYLOAD, 'base64')).toString('utf8'));

    let chemistryCardImage = '';
    try {
      const cardAssetResponse = await fetch('https://' + productionHost + '/quimica-card.b64?card=v5', {
        headers: { 'user-agent': 'JR-Apostilas-Quimica-Card/5.0' }
      });
      if (cardAssetResponse.ok) {
        chemistryCardImage = (await cardAssetResponse.text()).trim();
      }
    } catch (e) {}

    const chemistryCardFinal = chemistryCardImage
      ? chemistryCard.replace(
          /<img src="[^"]*" alt="Seduc PA Professor de Química">/,
          '<img src="data:image/jpeg;base64,' + chemistryCardImage + '" alt="Seduc PA Professor de Química" width="320" height="480" decoding="async" loading="lazy">'
        )
      : chemistryCard;

    // Mantém o bloco de Química no mesmo padrão visual/estrutural dos demais:
    // player + aulas na primeira linha; PDFs/provas + questões online na linha seguinte.
    const chemistryPdfItems = [
      ['PDF','Edital oficial SEDUC PA 2026','FGV • edital usado como referência para a trilha','https://conhecimento.fgv.br/sites/default/files/concursos/edital-no-001-de-28.08.2026-doe-no-36.749-de-31.08.2026-abertura-seduc.pdf'],
      ['PROVA','FGV 2026 • Professor de Química • SEDUC-SP','Prova oficial recente da banca','https://conhecimento.fgv.br/sites/default/files/concursos/professor-de-ensino-fundamental-e-ensino-medio-quimica-cns205-tipo-1.pdf'],
      ['GAB','Gabarito definitivo • SEDUC-SP 2026','Gabarito oficial da prova','https://conhecimento.fgv.br/sites/default/files/concursos/gabarito-defintivo-seduc-sp-educacao-basica.pdf'],
      ['PROVA','FGV • Professor de Química • SEEC-RN','Caderno oficial com questões objetivas e discursivas','https://conhecimento.fgv.br/sites/default/files/concursos/professor-de-quimicacns116-tipo-1.pdf'],
      ['GAB','Gabarito definitivo • SEEC-RN','Gabarito oficial para correção','https://conhecimento.fgv.br/sites/default/files/concursos/gabarito_definitivo_seadrn_v3.pdf'],
      ['PROVA','FGV • Professor de Química • SEE-PE','Prova anterior da banca','https://conhecimento.fgv.br/sites/default/files/concursos/seepe/201602_%28Magisterio%29_Professor_de_Quimica_%28ED02-NS003%29_Tipo_1.pdf'],
      ['PROVA','2025 • SEEC-RN • Professor de Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-seec-rn-fgv-2025/professor-de-quimica.pdf'],
      ['GAB','Gabarito • 2025 • SEEC-RN','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-seec-rn-fgv-2025/gabarito-oficial.pdf'],
      ['PROVA','2023 • SME São Paulo • Professor de Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-de-ensino-fundamental-ii-e-medio-quimica-sme-prefeitura-sao-paulo-sp-fgv-2023/professor-de-ensino-fundamental-ii-e-medio-quimica.pdf'],
      ['GAB','Gabarito • 2023 • SME São Paulo','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-de-ensino-fundamental-ii-e-medio-quimica-sme-prefeitura-sao-paulo-sp-fgv-2023/gabarito-oficial.pdf'],
      ['PROVA','2023 • SEDUC-TO • Professor Regente – Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-da-educacao-basica-professor-regente-quimica-seduc-to-fgv-2023/professor-da-educacao-basica-professor-regente-quimica.pdf'],
      ['GAB','Gabarito • 2023 • SEDUC-TO','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-da-educacao-basica-professor-regente-quimica-seduc-to-fgv-2023/gabaritos-preliminares.pdf'],
      ['PROVA','2021 • Paulínia-SP • PEB II – Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-educacao-basica-ii-quimica-prefeitura-paulinia-sp-fgv-2021/professor-educacao-basica-ii-quimica.pdf'],
      ['GAB','Gabarito • 2021 • Paulínia-SP','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-educacao-basica-ii-quimica-prefeitura-paulinia-sp-fgv-2021/gabarito-preliminar.pdf'],
      ['PROVA','2016 • SME São Paulo • Professor de Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-sme-prefeitura-sao-paulo-sp-fgv-2016/prof-quimica-tipo-1.pdf'],
      ['GAB','Gabarito • 2016 • SME São Paulo','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-sme-prefeitura-sao-paulo-sp-fgv-2016/gab-preliminar-todos-cargos.pdf'],
      ['PROVA','2016 • SEE-PE • Professor de Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-see-pe-fgv-2016/prof-quimica-tipo-1.pdf'],
      ['GAB','Gabarito • 2016 • SEE-PE','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-see-pe-fgv-2016/gab-preliminar-todos-cargos.pdf'],
      ['PROVA','2014 • SEDUC-AM • Professor de Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-seduc-am-fgv-2014/nivel-superior-completo-professor-20-e-40h-quimica-tipo01.pdf'],
      ['GAB','Gabarito • 2014 • SEDUC-AM','PCI Concursos','https://www.pciconcursos.com.br/provas/download/professor-de-quimica-seduc-am-fgv-2014/gabarito-definitivo-superior-retificado.pdf'],
      ['PROVA','2013 • SEE-SP • PEB II – Química','PCI Concursos • prova FGV','https://www.pciconcursos.com.br/provas/download/peb-ii-quimica-see-sp-fgv-2013/nsce13-000-quimica-tipo-01.pdf'],
      ['GAB','Gabarito • 2013 • SEE-SP','PCI Concursos','https://www.pciconcursos.com.br/provas/download/peb-ii-quimica-see-sp-fgv-2013/pebsp13-gabarito-definitivo-todos.pdf']
    ];

    const chemistryOnlineItems = [
      ['Q','WQD Questões','Filtre por Química, banca, nível, ano e assunto','https://wqd.com.br/#!/home'],
      ['FGV','QConcursos • Química FGV comentada','Filtro de Química + FGV com comentários quando disponíveis','https://www.qconcursos.com/questoes-de-concursos/questoes?discipline_ids%5B%5D=208&examining_board_ids%5B%5D=63&has_professor_commentaries=true'],
      ['TEC','Tec Concursos • Química','Banco de questões por assunto','https://www.tecconcursos.com.br/materias/quimica-e-engenharia-quimica'],
      ['PCI','PCI Concursos • Provas FGV','Índice para localizar outras provas da banca','https://www.pciconcursos.com.br/provas/fgv'],
      ['PDF','UNICAMP • Provas de Química','Página pública com provas, gabaritos e materiais','https://sites.google.com/unicamp.br/torneio-virtual-de-quimica/provas'],
      ['▶','Playlist • Questões de Química FGV','Questões por assunto para treino rápido','https://www.youtube.com/playlist?list=PLfBm2NSi7-cjGdbLl8xA4lH_JRfe6vG2p']
    ];

    const makeResourceItem = (item) =>
      '<a class="pdf-item" href="' + item[3] + '" target="_blank" rel="noopener">' +
      '<span class="pdf-mark">' + item[0] + '</span>' +
      '<span class="lesson-text"><strong>' + item[1] + '</strong><small>' + item[2] + '</small></span>' +
      '<span class="lesson-open">Abrir</span></a>';

    const chemistryPdfBox =
      '<div class="list-box chem-pdfs-box">' +
      '<div class="box-head"><strong>PDFs e provas anteriores</strong><span>' + chemistryPdfItems.length + ' materiais • FGV e PCI</span></div>' +
      '<div class="scroll-list">' + chemistryPdfItems.map(makeResourceItem).join('') + '</div></div>';

    const chemistryOnlineBox =
      '<div class="list-box chem-tools-box">' +
      '<div class="box-head"><strong>Questões e apoio online</strong><span>WQD • FGV • bancos de questões</span></div>' +
      '<div class="scroll-list">' + chemistryOnlineItems.map(makeResourceItem).join('') + '</div></div>';

    let chemistryAreaFinal = chemistryArea;

    if (chemistryCardImage) {
      chemistryAreaFinal = chemistryAreaFinal.replace(
        /<img src="[^"]*" alt="Professor de Química">/,
        '<img src="data:image/jpeg;base64,' + chemistryCardImage + '" alt="Professor de Química">'
      );
    }

    // Remove os elementos extras que deixavam a área diferente dos outros blocos.
    chemistryAreaFinal = chemistryAreaFinal.replace(/<div class="chem-coverage">[\s\S]*?<\/div>/, '');

    // Mantém player + aulas intactos e substitui somente a parte inferior bagunçada.
    const supportStart = chemistryAreaFinal.indexOf('<div class="list-box chem-support-box">');
    if (supportStart >= 0) {
      chemistryAreaFinal =
        chemistryAreaFinal.slice(0, supportStart) +
        chemistryPdfBox + chemistryOnlineBox +
        '</div></section>';
    }

    const chemistryCssFinal = chemistryCss + `
#area-quimica .area-head img{width:84px!important;height:84px!important;max-width:84px!important;aspect-ratio:1/1!important;object-fit:cover!important;border-radius:22px!important}
#area-quimica .chem-coverage,#area-quimica .chem-next-box{display:none!important}
#area-quimica .chem-lessons-box,#area-quimica .chem-pdfs-box,#area-quimica .chem-tools-box{align-self:start;max-height:620px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
#area-quimica .chem-lessons-box .scroll-list,#area-quimica .chem-pdfs-box .scroll-list,#area-quimica .chem-tools-box .scroll-list{max-height:562px!important;overflow-y:auto!important;overflow-x:hidden!important}
#area-quimica .chem-pdfs-box{grid-column:1/2}
#area-quimica .chem-tools-box{grid-column:2/3}
#area-quimica .chem-pdfs-box .pdf-mark{background:rgba(239,68,68,.13);border-color:rgba(248,113,113,.22);color:#fee2e2}
#area-quimica .chem-tools-box .pdf-mark{background:rgba(56,189,248,.13);border-color:rgba(56,189,248,.22);color:#dff7ff}
@media(max-width:720px){
  #area-quimica .area-head img{width:84px!important;height:84px!important;max-width:84px!important}
  #area-quimica .chem-lessons-box,#area-quimica .chem-pdfs-box,#area-quimica .chem-tools-box{grid-column:1/-1!important;max-height:none!important}
  #area-quimica .chem-lessons-box .scroll-list,#area-quimica .chem-pdfs-box .scroll-list,#area-quimica .chem-tools-box .scroll-list{max-height:520px!important}
}
`;

    if (!html.includes('#area-quimica .chem-coverage')) {
      html = html.replace('</style>', '\n' + chemistryCssFinal + '\n</style>');
    }

    if (!html.includes("openGate('quimica')")) {
      const clinCardStart = html.indexOf("<article class=\"card\" onclick=\"openGate('clinico')\">");
      if (clinCardStart < 0) throw new Error('Card Clínico Geral não encontrado');
      const clinCardEnd = html.indexOf('</article>', clinCardStart);
      if (clinCardEnd < 0) throw new Error('Fim do card Clínico Geral não encontrado');
      const insertAt = clinCardEnd + '</article>'.length;
      html = html.slice(0, insertAt) + '\n\n' + chemistryCardFinal + html.slice(insertAt);
    }

    if (!html.includes('id="area-quimica"')) {
      const footerAt = html.indexOf('<footer class="footer">');
      if (footerAt < 0) throw new Error('Rodapé não encontrado para inserir Química');
      html = html.slice(0, footerAt) + '\n' + chemistryAreaFinal + '\n' + html.slice(footerAt);
    }

    if (!html.includes('quimica: { title: "Seduc PA • Professor de Química"')) {
      const cfgStart = html.indexOf('const areaConfig = {');
      if (cfgStart < 0) throw new Error('Configuração das áreas não encontrada');
      const cfgEnd = html.indexOf('};', cfgStart);
      if (cfgEnd < 0) throw new Error('Fim da configuração das áreas não encontrado');
      const entry = '  quimica: { title: "Seduc PA • Professor de Química", password: "QUIMICA2026", sectionId: "area-quimica", storageKey: "jr_especifica_quimica" },\n';
      html = html.slice(0, cfgEnd) + entry + html.slice(cfgEnd);
    }


    // JR: adiciona provas anteriores de Fisioterapia sem duplicar itens.
    if (!html.includes('jr-fisio-provas-v1')) {
      const fisioStart = html.indexOf('id="area-fisioterapia"');
      const fisioEnd = fisioStart >= 0 ? html.indexOf('<section class="area"', fisioStart + 40) : -1;
      if (fisioStart >= 0) {
        const end = fisioEnd >= 0 ? fisioEnd : html.indexOf('<footer class="footer">', fisioStart);
        let fisio = html.slice(fisioStart, end);
        const provas = '<a id="jr-fisio-provas-v1" class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/fisioterapeuta-prefeitura-porto-velho-ro-consulplan-2012" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Fisioterapeuta • Porto Velho/RO</strong><small>CONSULPLAN • 2012 • visualizar prova e gabarito no PCI Concursos</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-de-nivel-superior-fisioterapeuta-prefeitura-leopoldina-mg-idecan-2016" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Fisioterapeuta • IDECAN</strong><small>Prefeitura de Leopoldina/MG • 2016 • visualizar prova e gabarito no PCI Concursos</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/fisioterapeuta-prefeitura-astolfo-dutra-mg-idecan-2015" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Fisioterapeuta • IDECAN</strong><small>Prefeitura de Astolfo Dutra/MG • 2015 • visualizar prova e gabarito</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/fisioterapeuta-prefeitura-cacoal-ro-funcab-2013" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Fisioterapeuta • Cacoal/RO</strong><small>FUNCAB • 2013 • prova de Rondônia para treino complementar</small></span><span class="lesson-open">Visualizar</span></a>';
        const closeList = '</a></div>\n    </div>\n  </div>\n</section>';
        if (fisio.includes(closeList)) {
          fisio = fisio.replace(closeList, '</a>' + provas + '</div>\n    </div>\n  </div>\n</section>');
          fisio = fisio.replace('<div class="box-head"><strong>PDFs</strong><span>2 arquivo(s)</span></div>', '<div class="box-head"><strong>PDFs e provas anteriores</strong><span>7 itens</span></div>');
          html = html.slice(0, fisioStart) + fisio + html.slice(end);
        }
      }
    }


    // JR: adiciona provas anteriores de Técnico em Enfermagem sem duplicar itens.
    if (!html.includes('jr-tecnico-provas-v1')) {
      const tecnicoStart = html.indexOf('id="area-tecnico"');
      const tecnicoEnd = tecnicoStart >= 0 ? html.indexOf('<section class="area"', tecnicoStart + 40) : -1;
      if (tecnicoStart >= 0) {
        const end = tecnicoEnd >= 0 ? tecnicoEnd : html.indexOf('<footer class="footer">', tecnicoStart);
        let tecnico = html.slice(tecnicoStart, end);
        const provas =
          '<a id="jr-tecnico-provas-v1" class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-dores-do-indaia-mg-ibgp-2021" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Técnico em Enfermagem • IBGP</strong><small>Prefeitura de Dores do Indaiá/MG • 2021 • visualizar prova e gabarito no PCI Concursos</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-sao-joao-del-rei-mg-ibgp-2021" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Técnico em Enfermagem • IBGP</strong><small>Prefeitura de São João del-Rei/MG • 2021 • foco de treino para banca da SEMUSA</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-sao-geraldo-mg-idecan-2010" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Técnico em Enfermagem • IDECAN</strong><small>Prefeitura de São Geraldo/MG • 2010 • treino direcionado ao estilo IDECAN</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-saude-do-trabalhador-ebserh-hupaa-ufal-idecan-2014" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Técnico em Enfermagem • IDECAN</strong><small>EBSERH/HUPAA-UFAL • 2014 • prova e gabarito para visualização</small></span><span class="lesson-open">Visualizar</span></a>' +
          '<a class="pdf-item" href="https://www.pciconcursos.com.br/provas/download/tecnico-em-enfermagem-prefeitura-rolim-de-moura-ro-frcv-2010" target="_blank" rel="noopener">' +
          '<span class="pdf-mark">PROVA</span><span class="lesson-text"><strong>Prova anterior • Técnico em Enfermagem • Rondônia</strong><small>Prefeitura de Rolim de Moura/RO • 2010 • treino complementar regional</small></span><span class="lesson-open">Visualizar</span></a>';
        const closeList = '\n</div>\n    </div>\n  </div>\n</section>';
        if (tecnico.includes(closeList)) {
          tecnico = tecnico.replace(closeList, '\n' + provas + closeList);
          tecnico = tecnico.replace('<div class="box-head"><strong>PDFs</strong><span>2 arquivo(s)</span></div>', '<div class="box-head"><strong>PDFs e provas anteriores</strong><span>9 itens</span></div>');
          html = html.slice(0, tecnicoStart) + tecnico + html.slice(end);
        }
      }
    }

    if (!html.includes('id="jr-install-close-v2"')) {
      const closeInstallScript = '<script id="jr-install-close-v2">(function(){var k="jr_install_closed";function f(){var a=[].slice.call(document.querySelectorAll("body *")).find(function(e){var t=(e.innerText||"").trim();if(!/instalar/i.test(t)||t.length>120)return false;var s=getComputedStyle(e);return s.position==="fixed"||s.position==="sticky"});if(!a)return;try{if(localStorage.getItem(k)==="1"){a.style.display="none";return}}catch(e){}if(a.querySelector(".jr-install-x"))return;var x=document.createElement("button");x.type="button";x.className="jr-install-x";x.textContent="×";x.setAttribute("aria-label","Fechar");x.style.cssText="position:absolute;top:6px;right:6px;width:28px;height:28px;border:0;border-radius:50%;background:rgba(0,0,0,.65);color:#fff;font-size:22px;line-height:26px;z-index:99999;padding:0";x.onclick=function(ev){ev.preventDefault();ev.stopPropagation();try{localStorage.setItem(k,"1")}catch(e){}a.style.display="none"};a.appendChild(x)}setTimeout(f,500);setTimeout(f,1500)})();<\/script>';
      html = html.replace('</body>', closeInstallScript + '</body>');
    }

    if (!html.includes('id="jr-direct-area"')) {
      html = html.replace('</body>', '<script id="jr-direct-area">window.addEventListener("load",function(){try{var a=new URLSearchParams(window.location.search).get("area");if(a==="quimica"&&typeof openGate==="function"){setTimeout(function(){openGate("quimica");},250);}}catch(e){}});<\/script></body>');
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.setHeader('cache-control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Erro ao montar a página: ' + (error && error.message ? error.message : 'erro desconhecido'));
  }
};
