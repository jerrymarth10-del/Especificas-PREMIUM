const art = require('./card-art');

const titles = {
  quimica: 'SEDUC PA — Professor de Química',
  prf: 'PRF — Agente Administrativo'
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

function applySesauSemusaLabels(html) {
  const sharedCards = {
    enfermagem: 'Enfermagem',
    tecnico: 'Técnico em Enfermagem',
    radiologia: 'Técnico em Radiologia',
    laboratorio: 'Técnico em Laboratório',
    fisioterapia: 'Fisioterapia',
    farmaceutico: 'Farmácia',
    nutricao: 'Nutrição',
    biomedicina: 'Biomedicina',
    odontologia: 'Odontologia',
    clinico: 'Medicina / Clínico Geral',
    endemias: 'Agente de Combate às Endemias'
  };

  for (const [key, title] of Object.entries(sharedCards)) {
    const gate = "openGate('" + key + "')";
    const gatePos = html.indexOf(gate);
    if (gatePos < 0) continue;

    const cardStart = html.lastIndexOf('<article', gatePos);
    const cardEndPos = html.indexOf('</article>', gatePos);
    if (cardStart < 0 || cardEndPos < 0) continue;

    const cardEnd = cardEndPos + '</article>'.length;
    let card = html.slice(cardStart, cardEnd);

    const jointTag = '<span class="tag">SESAU + SEMUSA • Saúde</span>';
    if (/<span class="tag">[\s\S]*?<\/span>/.test(card)) {
      card = card.replace(/<span class="tag">[\s\S]*?<\/span>/, jointTag);
    } else if (/<h3>/.test(card)) {
      card = card.replace(/<h3>/, jointTag + '<h3>');
    }

    if (/<h3>[\s\S]*?<\/h3>/.test(card)) {
      card = card.replace(/<h3>[\s\S]*?<\/h3>/, '<h3>' + title + ' • SESAU + SEMUSA</h3>');
    }

    const description =
      'Preparatório para ' + title + ' nos concursos da SESAU/RO e SEMUSA Porto Velho, com videoaulas, PDFs, questões, provas anteriores e revisão direcionada.';
    if (/<p>[\s\S]*?<\/p>/.test(card)) {
      card = card.replace(/<p>[\s\S]*?<\/p>/, '<p>' + description + '</p>');
    }

    html = html.slice(0, cardStart) + card + html.slice(cardEnd);
  }

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    '<title>Específicas Premium • SESAU + SEMUSA</title>'
  );
  html = html.replace(
    /(<h1\b[^>]*>)[\s\S]*?(Específicas\s+Premium)[\s\S]*?(<\/h1>)/i,
    '$1Preparatório SESAU + SEMUSA • Específicas Premium$3'
  );

  return html;
}

function applyCardLayout(html) {
  const newCardCopy = {
    quimica: {
      tag: 'SEDUC PA • Professor de Química',
      description: 'Bloco específico para Professor de Química, com conteúdo organizado, videoaulas, PDFs, provas da FGV e revisão direcionada para a área.'
    },
    prf: {
      tag: 'PRF • Área Administrativa',
      description: 'Preparatório para Agente Administrativo da PRF, com base completa, matérias específicas, videoaulas, PDFs, questões comentadas e revisão.'
    },
    endemias: {
      tag: 'Vilhena/RO • IBGP',
      description: 'Preparação organizada para o Processo Seletivo de Vilhena/RO, com legislação, conhecimentos específicos, videoaulas, provas da banca IBGP e revisão por questões.'
    },
    sefin: {
      tag: 'SEFIN/RO • Material Geral',
      description: 'Base geral para preparação da SEFIN/RO, reunindo Finanças Públicas, Orçamento, Contabilidade Pública, Direito Tributário, provas oficiais e questões da FGV.'
    }
  };
  for (const [key,title] of Object.entries(titles)) {
    const pattern = new RegExp('<article\\b[^>]*onclick="openGate\\(\'' + key + '\'\\)"[^>]*>[\\s\\S]*?<\\/article>');
    const copy = newCardCopy[key];
    const body = copy
      ? `<div class="card-shade"></div><div class="card-body"><span class="tag">${copy.tag}</span><h3>${title}</h3><p>${copy.description}</p><button class="card-btn" type="button" onclick="openGate('${key}')" aria-label="Acessar ${title}">Acessar</button></div>`
      : `<div class="card-body"><button class="card-btn" type="button" onclick="openGate('${key}')" aria-label="Acessar ${title}">Acessar</button></div>`;
    html = html.replace(pattern, `<article class="card jr-repaired-card" data-jr-art="${key}">
      <img src="${art[key]}" alt="${title}" width="640" height="960" decoding="async" loading="lazy">
      ${body}
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
  return applySesauSemusaLabels(repairEnfermagem(repairRadiologia(repairChemistryResources(html))));
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
