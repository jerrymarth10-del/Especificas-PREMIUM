module.exports = async function handler(req, res) {
  try {
    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'especificas-premium.vercel.app';
    const sourceUrl = 'https://' + productionHost + '/index.html';
    const response = await fetch(sourceUrl, { headers: { 'user-agent': 'JR-Apostilas-Injector/1.0' } });

    if (!response.ok) {
      res.statusCode = 502;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('Não foi possível carregar o conteúdo original.');
      return;
    }

    let html = await response.text();

    const chemSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#08131f"/>
            <stop offset="0.55" stop-color="#0d2b33"/>
            <stop offset="1" stop-color="#123b2d"/>
          </linearGradient>
          <radialGradient id="r" cx="50%" cy="40%" r="60%">
            <stop offset="0" stop-color="#38bdf8" stop-opacity=".45"/>
            <stop offset="1" stop-color="#38bdf8" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <rect width="1200" height="900" fill="url(#r)"/>
        <g fill="none" stroke="#dff8ff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
          <path d="M470 220h260"/>
          <path d="M545 220v180L390 655c-28 46 5 105 59 105h302c54 0 87-59 59-105L655 400V220"/>
          <path d="M454 585h292"/>
          <circle cx="520" cy="535" r="18"/>
          <circle cx="650" cy="625" r="22"/>
          <circle cx="585" cy="675" r="14"/>
        </g>
        <g fill="#86efac" opacity=".95">
          <circle cx="335" cy="270" r="14"/>
          <circle cx="825" cy="290" r="12"/>
          <circle cx="870" cy="460" r="16"/>
        </g>
        <g stroke="#86efac" stroke-width="8" opacity=".9">
          <line x1="335" y1="270" x2="405" y2="330"/>
          <line x1="825" y1="290" x2="770" y2="355"/>
          <line x1="870" y1="460" x2="790" y2="500"/>
        </g>
        <text x="600" y="840" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff">QUÍMICA</text>
      </svg>`;
    const chemImg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(chemSvg);

    if (!html.includes("openGate('quimica')")) {
      const newCard = `
<article class="card" onclick="openGate('quimica')">
  <img src="${chemImg}" alt="Professor de Química - SEDUC PA">
  <div class="card-shade"></div>
  <div class="card-body">
    <span class="tag">⚗️ SEDUC PA</span>
    <h3>Professor de Química</h3>
    <p>Bloco específico para Professor de Química da SEDUC PA, preparado para receber aulas, revisões e PDFs conforme o edital.</p>
    <button class="card-btn" type="button">Acessar</button>
  </div>
</article>`;

      const clinCardStart = html.indexOf('<article class="card" onclick="openGate(\'clinico\')">');
      if (clinCardStart >= 0) {
        const clinCardEnd = html.indexOf('</article>', clinCardStart);
        if (clinCardEnd >= 0) {
          const insertAt = clinCardEnd + '</article>'.length;
          html = html.slice(0, insertAt) + '\n' + newCard + html.slice(insertAt);
        }
      }
    }

    if (!html.includes('id="area-quimica"')) {
      const chemistryArea = `
<section class="area" id="area-quimica">
  <div class="area-top">
    <div class="area-head">
      <img src="${chemImg}" alt="Professor de Química - SEDUC PA">
      <div>
        <span class="mini-tag">SEDUC PA • Professor</span>
        <h2>Professor de Química</h2>
        <p>Área específica preparada para organizar videoaulas, revisões, questões e materiais em PDF de Química conforme o conteúdo programático do edital.</p>
      </div>
    </div>
  </div>
  <div class="area-grid">
    <div class="player-box">
      <div class="box-head"><strong>Planejamento da área</strong><span>Em montagem</span></div>
      <div style="padding:28px;min-height:280px;display:grid;align-content:center;gap:12px">
        <span class="mini-tag" style="width:max-content">Professor de Química • SEDUC PA</span>
        <h3 style="font-size:26px;line-height:1.1">Bloco pronto para receber as aulas</h3>
        <p style="color:var(--muted);line-height:1.7;max-width:680px">Os links das videoaulas e os PDFs serão adicionados aqui e organizados por assunto conforme o edital.</p>
      </div>
    </div>
    <div class="list-box">
      <div class="box-head"><strong>Aulas da área</strong><span>0 aulas</span></div>
      <div class="scroll-list">
        <div class="lesson-item" style="cursor:default">
          <span class="lesson-mark">⚗️</span>
          <span class="lesson-text"><strong>Conteúdo em preparação</strong><small>Aguardando os links das aulas e os materiais em PDF.</small></span>
          <span class="lesson-open">Em breve</span>
        </div>
      </div>
    </div>
  </div>
</section>`;

      const mainClose = html.indexOf('</main>');
      if (mainClose >= 0) {
        html = html.slice(0, mainClose) + chemistryArea + '\n' + html.slice(mainClose);
      } else {
        html = html.replace('</body>', chemistryArea + '\n</body>');
      }
    }

    if (!html.includes('quimica: { title: "Professor de Química • SEDUC PA"')) {
      const cfgStart = html.indexOf('const areaConfig = {');
      if (cfgStart >= 0) {
        const cfgEnd = html.indexOf('};', cfgStart);
        if (cfgEnd >= 0) {
          const entry = '  quimica: { title: "Professor de Química • SEDUC PA", password: "QUIMICA2026", sectionId: "area-quimica", storageKey: "jr_especifica_quimica" },\n';
          html = html.slice(0, cfgEnd) + entry + html.slice(cfgEnd);
        }
      }
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.setHeader('cache-control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Erro ao montar a página: ' + (error && error.message ? error.message : 'erro desconhecido'));
  }
};
