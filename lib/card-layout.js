const art = require('./card-art');

const titles = {
  quimica: 'SEDUC PA — Professor de Química',
  prf: 'PRF — Agente Administrativo',
  endemias: 'Agente de Combate às Endemias',
  sefin: 'SEFIN/RO — Material Geral'
};

function repairRadiologia(html) {
  const start = html.indexOf('<section class="area" id="area-radiologia">');
  const end = html.indexOf('<section class="area" id="area-enfermagem">', start);
  if (start < 0 || end < 0) return html;
  let section = html.slice(start, end);
  // Two premature closing divs put the PDFs and quiz outside their hidden area.
  const broken = /(onclick="continueFromLast\('radiologia'\)"[^>]*>[^<]*<\/button>\s*<\/div>)\s*<\/div>\s*<\/div>(\s*<div class="list-box">)/;
  if (broken.test(section)) {
    section = section.replace(broken, '$1$2');
    // Keep all six resources in the same scrolling PDF list.
    section = section.replace(/<\/a><\/div>(\s*<a class="pdf-item" href="https:\/\/arq\.pciconcursos\.com\.br\/provas\/34920978\/)/, '</a>$1');
    section = section.replace(/<\/section>\s*$/, '</div>\n</section>\n');
  }
  return html.slice(0, start) + section + html.slice(end);
}

function applyCardLayout(html) {
  for (const [key,title] of Object.entries(titles)) {
    const pattern = new RegExp('<article\\b[^>]*onclick="openGate\\(\'' + key + '\'\\)"[^>]*>[\\s\\S]*?<\\/article>');
    html = html.replace(pattern, `<article class="card jr-repaired-card" data-jr-art="${key}">
      <img src="${art[key]}" alt="${title}" width="640" height="960" decoding="async" loading="lazy">
      <div class="card-body"><button class="card-btn" type="button" onclick="openGate('${key}')" aria-label="Acessar ${title}">Acessar</button></div>
    </article>`);
  }
  // The small chemistry heading uses the same valid embedded artwork.
  html = html.replace(/<img\b[^>]*alt="Professor de Química"[^>]*>/,
    `<img src="${art.quimica}" alt="Professor de Química" width="84" height="84" decoding="async">`);
  const css = `<style id="jr-card-layout-v1">
    .cards .jr-repaired-card{position:relative;overflow:hidden;background:#050609;min-width:0}
    .cards .jr-repaired-card img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;transform:none!important}
    .cards .jr-repaired-card .card-body{left:14px;right:14px;bottom:14px}
    .cards .jr-repaired-card .card-btn{padding:12px 14px;text-transform:uppercase}
    .cards .jr-repaired-card:focus-within{outline:2px solid #f87171;outline-offset:3px}\n    @media(max-width:720px){.cards .jr-repaired-card{min-height:480px!important}}
    #area-radiologia .continue-wrap{grid-column:1/-1}
    #area-radiologia #radiologia-quiz-box{grid-column:1/-1}
  </style>`;
  html = html.replace('</head>', css + '</head>');
  return repairEnfermagem(repairRadiologia(repairChemistryResources(html)));
}

function repairEnfermagem(html) {
  const start = html.indexOf('<section class="area" id="area-enfermagem">');
  const end = html.indexOf('</section>', start);
  if (start < 0 || end < 0) return html;
  const section = html.slice(start, end).replace(
    /(onclick="continueFromLast\('enfermagem'\)"[^>]*>[^<]*<\/button>\s*<\/div>)\s*<\/div>\s*<\/div>(\s*<div class="list-box">)/,
    '$1$2'
  );
  return html.slice(0, start) + section + html.slice(end);
}

function repairChemistryResources(html) {
  const start = html.indexOf('<section class="area" id="area-quimica">');
  const end = html.indexOf('</section>', start);
  if (start < 0 || end < 0) return html;
  // PCI serves documents through the verified exam page, not /slug/file.pdf.
  const section = html.slice(start, end).replace(
    /href="(https:\/\/www\.pciconcursos\.com\.br\/provas\/download\/[^/"\s]+)\/[^"\s]+\.pdf"/g,
    'href="$1"'
  ).replace(/PCI Concursos • prova FGV/g, 'PCI Concursos • abrir página da prova e selecionar o PDF')
    .replace(/<small>PCI Concursos<\/small>/g, '<small>PCI Concursos • abrir página da prova e selecionar o gabarito</small>');
  return html.slice(0, start) + section + html.slice(end);
}

module.exports = { applyCardLayout, repairRadiologia, repairEnfermagem, repairChemistryResources };
