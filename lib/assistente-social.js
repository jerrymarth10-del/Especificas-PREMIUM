const art = require('./assistente-social-art.json');
const { buildPsicologiaSemusa } = require('../api/psicologia-semusa-data');

// Copy the source catalog without renaming the subjects of its lessons/resources.
function buildAssistenteSocial(html) {
  const start = html.indexOf('<section class="area" id="area-acsfiscal">');
  const end = html.indexOf('</section>', start);
  if (start < 0 || end < start) throw new Error('Bloco original de Fiscal Sanitário não encontrado');
  const source = html.slice(start, end);
  const lessons = [...source.matchAll(/<button\b[^>]*class="lesson-item"[^>]*>[\s\S]*?<\/button>/g)].map(match => {
    const markup = match[0];
    const attribute = name => (markup.match(new RegExp(name + '="([^"]*)"')) || [])[1] || '';
    const video = attribute('data-embed').match(/\/embed\/([\w-]+)/);
    if (!video) throw new Error('Videoaula sem identificador válido');
    return { video: video[1], title: attribute('data-title'), note: attribute('data-note') };
  });
  const resources = [...source.matchAll(/<a\b[^>]*class="pdf-item"[^>]*>[\s\S]*?<\/a>/g)].map(match => {
    const markup = match[0];
    return {
      href: (markup.match(/href="([^"]*)"/) || [])[1],
      title: (markup.match(/<strong>([\s\S]*?)<\/strong>/) || [])[1] || 'Material',
      note: (markup.match(/<small>([\s\S]*?)<\/small>/) || [])[1] || '',
      type: (markup.match(/class="pdf-mark">([^<]*)</) || [])[1] || 'PDF'
    };
  });
  if (!lessons.length || !resources.length) throw new Error('Conteúdo original incompleto');
  const template = buildPsicologiaSemusa();
  const card = `<article class="card jr-as-card jr-approved-art-card" data-jr-card="assistente-social">
    <img class="jr-as-card-art" src="${art}" alt="SEMUSA e SESAU — Assistente Social" width="1024" height="1536" loading="lazy" decoding="async">
    <div class="card-shade"></div><div class="card-body"><span class="tag">SEMUSA + SESAU</span><h3>Assistente Social</h3>
    <p>Videoaulas, PDFs e materiais organizados para estudo.</p>
    <button class="card-btn" type="button" onclick="openGate('assistentesocial')" aria-label="Acessar Assistente Social SEMUSA e SESAU">Acessar</button></div></article>`;
  const lessonMarkup = lessons.map((item, index) => `<button type="button" class="jr-as-lesson${index === 0 ? ' active' : ''}" data-video="${item.video}" data-index="${index}"><span class="jr-as-play">▶</span><span><b>${String(index + 1).padStart(2, '0')} • ${item.title}</b><small>${item.note}</small></span><span class="jr-as-status" id="jr-as-status-${index}">Livre</span></button>`).join('');
  const resourceMarkup = items => items.map(item => `<a class="jr-as-resource" href="${item.href}" target="_blank" rel="noopener"><b>${item.type} • ${item.title}</b><small>${item.note}</small></a>`).join('');
  const exams = resources.filter(item => /PROVA|GAB/.test(item.type));
  const pdfs = resources.filter(item => !/PROVA|GAB/.test(item.type));
  const first = lessons[0];
  const area = `<section class="area jr-as-area" id="area-assistente-social">
    <div class="area-top"><div class="area-head"><div><span class="mini-tag">SEMUSA + SESAU • Assistente Social</span><h2>Assistente Social • SEMUSA e SESAU</h2><p>Videoaulas e materiais de apoio organizados por tema.</p></div></div></div>
    <div class="jr-as-grid"><div class="jr-as-box jr-as-lessons-box">
      <div class="jr-as-head"><strong>Videoaulas</strong><span>${lessons.length} aulas</span></div>
      <div class="jr-as-player"><iframe id="jr-as-player" src="https://www.youtube.com/embed/${first.video}" title="Videoaulas — Assistente Social" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
      <div class="jr-as-current"><b id="jr-as-title">01 • ${first.title}</b><small id="jr-as-note">${first.note}</small></div>
      <div class="jr-as-progress"><div><strong>Seu progresso</strong><span id="jr-as-progress-text">0 de ${lessons.length} estudadas</span></div><div class="jr-as-track"><i id="jr-as-progress-fill"></i></div></div>
      <div class="jr-as-list">${lessonMarkup}</div>
    </div><div class="jr-as-side">
      ${exams.length ? `<div class="jr-as-box"><div class="jr-as-head"><strong>Provas e gabaritos</strong><span>${exams.length} arquivos</span></div>${resourceMarkup(exams)}</div>` : ''}
      <div class="jr-as-box"><div class="jr-as-head"><strong>PDFs e questões</strong><span>${pdfs.length} materiais</span></div>${resourceMarkup(pdfs)}</div>
    </div></div></section>`;
  const css = template.css.replaceAll('jr-pss', 'jr-as') + '.jr-as-resource{border-color:rgba(16,185,129,.3);background:rgba(6,78,59,.18)}';
  const script = template.script
    .replaceAll('jr-psicologia-semusa-script-v2', 'jr-assistente-social-script-v1')
    .replaceAll('area-psicologia-semusa', 'area-assistente-social')
    .replaceAll('psicologiasemusa', 'assistentesocial')
    .replaceAll('areaConfig.psicologia', 'areaConfig.acsfiscal')
    .replaceAll('Psicologia • SEMUSA Porto Velho • IBGP', 'Assistente Social • SEMUSA e SESAU')
    .replaceAll('jr_especifica_psicologia_semusa', 'jr_especifica_assistente_social')
    .replaceAll('jr-pss', 'jr-as');
  return { card, area, css, script, lessonCount: lessons.length, resourceCount: resources.length };
}

function insertAssistenteSocial(html) {
  if (html.includes('id="area-assistente-social"')) return html;
  const bundle = buildAssistenteSocial(html);
  const sourceCard = html.indexOf("openGate('acsfiscal')");
  const cardEnd = html.indexOf('</article>', sourceCard);
  const footer = html.indexOf('<footer class="footer">');
  if (sourceCard < 0 || cardEnd < 0 || footer < 0) throw new Error('Catálogo sem ponto de inserção');
  html = html.slice(0, footer) + bundle.area + html.slice(footer);
  html = html.slice(0, cardEnd + 10) + bundle.card + html.slice(cardEnd + 10);
  return html.replace('</head>', `<style id="jr-assistente-social-style">${bundle.css}</style></head>`)
    .replace('</body>', bundle.script + '</body>');
}

module.exports = { buildAssistenteSocial, insertAssistenteSocial };
