const art = require('./card-art');
const acsArt = require('./acs-art.json');
const assistenteSocialArt = require('./assistente-social-art.json');

const dedicatedArt = Object.freeze({
  acsfiscal: acsArt,
  assistentesocial: assistenteSocialArt
});

function buildFallbackCardArt(title, tag) {
  const esc = (v) => String(v || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const cleanTitle = esc(title || 'Preparatório');
  const cleanTag = esc(tag || 'Específicas Premium');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#171923"/>
        <stop offset=".55" stop-color="#0b1020"/>
        <stop offset="1" stop-color="#25080b"/>
      </linearGradient>
      <radialGradient id="r" cx=".78" cy=".18" r=".55">
        <stop offset="0" stop-color="#ef4444" stop-opacity=".42"/>
        <stop offset="1" stop-color="#ef4444" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="640" height="960" fill="url(#g)"/>
    <rect width="640" height="960" fill="url(#r)"/>
    <circle cx="320" cy="334" r="150" fill="#ef4444" fill-opacity=".10" stroke="#ef4444" stroke-opacity=".45" stroke-width="3"/>
    <path d="M255 355h130M320 290v130" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity=".92"/>
    <text x="320" y="590" text-anchor="middle" fill="#fca5a5" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="700">${cleanTag}</text>
    <foreignObject x="70" y="625" width="500" height="190">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;color:white;font-size:42px;line-height:1.08;font-weight:900;text-align:center;display:flex;align-items:center;justify-content:center;height:190px;">${cleanTitle}</div>
    </foreignObject>
    <text x="320" y="885" text-anchor="middle" fill="#ffffff" fill-opacity=".72" font-family="Arial,Helvetica,sans-serif" font-size="21" font-weight="700">ESPECÍFICAS PREMIUM</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}


const JR_CATALOG_CARDS = {
  radiologia:{tag:'SESAU + SEMUSA',title:'Técnico em Radiologia'},
  enfermagem:{tag:'SESAU + SEMUSA',title:'Enfermagem'},
  tecnico:{tag:'SESAU + SEMUSA',title:'Técnico em Enfermagem'},
  fisioterapia:{tag:'SESAU + SEMUSA',title:'Fisioterapia'},
  farmaceutico:{tag:'SESAU + SEMUSA',title:'Farmácia'},
  laboratorio:{tag:'SESAU + SEMUSA',title:'Técnico de Laboratório'},
  jiparana:{tag:'Ji-Paraná • Consulplan',title:'Ji-Paraná • Consulplan'},
  nutricao:{tag:'SESAU + SEMUSA',title:'Nutrição'},
  biomedicina:{tag:'SESAU + SEMUSA',title:'Biomedicina'},
  vigilante:{tag:'Candeias do Jamari • IBGP',title:'Agente de Segurança e Vigilância'},
  odontologia:{tag:'SESAU + SEMUSA',title:'Odontologia'},
  pedagogia:{tag:'Ji-Paraná • Consulplan',title:'Pedagogia'},
  supervisao:{tag:'Ji-Paraná • Consulplan',title:'Supervisão Escolar'},
  psicologia:{tag:'SESAU',title:'Psicologia • SESAU'},
  psicologiasemusa:{tag:'SEMUSA • Porto Velho',title:'Psicologia • SEMUSA'},
  acsfiscal:{tag:'SEMUSA • Porto Velho',title:'Agente Comunitário de Saúde (ACS)'},
  assistentesocial:{tag:'SESAU + SEMUSA',title:'Assistente Social'},
  endemias:{tag:'SESAU + SEMUSA',title:'Agente de Endemias'},
  administrativo:{tag:'SESAU + SEMUSA',title:'Área Administrativa'},
  clinico:{tag:'SESAU + SEMUSA',title:'Médico Clínico Geral'},
  motorista:{tag:'SEMUSA • Porto Velho',title:'Motorista'},
  servicosgerais:{tag:'SESAU + SEMUSA',title:'Serviços Gerais'},
  pediatria:{tag:'SESAU + SEMUSA',title:'Médico Pediatra'},
  quimica:{tag:'SEDUC PA',title:'Professor de Química'},
  prf:{tag:'PRF',title:'Agente Administrativo'},
  penal:{tag:'Polícia Penal RO',title:'Polícia Penal'},
  sefin:{tag:'Material Geral',title:'SEFIN/RO'},
  educacaofisica:{tag:'SEDUC',title:'Educação Física'}
};

function normalizeCatalogCards(html) {
  for (const [key, meta] of Object.entries(JR_CATALOG_CARDS)) {
    const gate = "openGate('" + key + "')";
    const gatePos = html.indexOf(gate);
    const footerPos = html.indexOf('<footer class="footer">');
    if (gatePos < 0 || (footerPos >= 0 && gatePos > footerPos)) continue;

    const cardStart = html.lastIndexOf('<article', gatePos);
    const cardEndPos = html.indexOf('</article>', gatePos);
    if (cardStart < 0 || cardEndPos < 0) continue;

    const cardEnd = cardEndPos + '</article>'.length;
    const card = html.slice(cardStart, cardEnd);
    if (!/class="[^"]*\bcard\b/.test(card)) continue;

    const imgMatch = card.match(/<img\b[^>]*src="([^"]+)"[^>]*>/i);
    const src = dedicatedArt[key] || (imgMatch && imgMatch[1]) || art[key] || buildFallbackCardArt(meta.title, meta.tag);
    const safeTitle = String(meta.title).replace(/"/g, '&quot;');
    const safeTag = String(meta.tag).replace(/"/g, '&quot;');
    const replacement =
      '<article class="card jr-catalog-card" data-jr-card="' + key + '">' +
        '<img class="jr-catalog-art" src="' + src + '" alt="' + safeTag + ' — ' + safeTitle + '" loading="lazy" decoding="async">' +
        '<div class="card-shade"></div>' +
        '<div class="card-body">' +
          '<span class="tag">' + safeTag + '</span>' +
          '<h3>' + safeTitle + '</h3>' +
          '<button class="card-btn" type="button" onclick="openGate(\'' + key + '\')" aria-label="Acessar ' + safeTitle + '">Acessar</button>' +
        '</div>' +
      '</article>';

    html = html.slice(0, cardStart) + replacement + html.slice(cardEnd);
  }

  if (!html.includes('id="jr-catalog-standard-v2"')) {
    const css = `<style id="jr-catalog-standard-v2">
      .cards{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))!important;gap:18px!important;align-items:stretch!important}
      .cards .jr-catalog-card{position:relative!important;overflow:hidden!important;isolation:isolate!important;aspect-ratio:2/3!important;min-height:0!important;height:auto!important;background:#07090d!important;border:1px solid rgba(239,68,68,.38)!important;border-radius:22px!important;box-shadow:0 16px 40px rgba(0,0,0,.26)!important}
      .cards .jr-catalog-card .jr-catalog-art{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;transform:none!important;display:block!important}
      .cards .jr-catalog-card .card-shade{position:absolute!important;inset:0!important;background:linear-gradient(180deg,rgba(0,0,0,.03) 42%,rgba(0,0,0,.86) 100%)!important;z-index:1!important;pointer-events:none!important}
      .cards .jr-catalog-card .card-body{position:absolute!important;left:12px!important;right:12px!important;bottom:12px!important;z-index:2!important;min-height:116px!important;padding:12px!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:15px!important;background:rgba(10,13,20,.76)!important;backdrop-filter:blur(8px)!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;gap:6px!important}
      .cards .jr-catalog-card .tag{display:block!important;margin:0!important;color:#fca5a5!important;font-size:10px!important;line-height:1.1!important;font-weight:900!important;letter-spacing:.07em!important;text-transform:uppercase!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
      .cards .jr-catalog-card h3{display:flex!important;align-items:flex-end!important;margin:0!important;min-height:40px!important;color:#fff!important;font-size:18px!important;line-height:1.08!important;font-weight:900!important;letter-spacing:-.02em!important;text-wrap:balance!important}
      .cards .jr-catalog-card p{display:none!important}
      .cards .jr-catalog-card .card-btn{position:static!important;inset:auto!important;width:100%!important;height:44px!important;margin:4px 0 0!important;padding:0 14px!important;border:0!important;border-radius:12px!important;background:linear-gradient(180deg,#ef4444,#dc2626)!important;color:#fff!important;font-size:14px!important;line-height:44px!important;font-weight:900!important;text-align:center!important;text-transform:none!important;cursor:pointer!important;box-shadow:0 7px 18px rgba(220,38,38,.28)!important}
      .cards .jr-catalog-card .card-btn:hover{filter:brightness(1.06)!important;transform:translateY(-1px)!important}
      .cards .jr-catalog-card .card-btn:focus-visible{outline:2px solid #fff!important;outline-offset:2px!important}
      @media(max-width:760px){
        .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
        .cards .jr-catalog-card{border-radius:17px!important}
        .cards .jr-catalog-card .card-body{left:8px!important;right:8px!important;bottom:8px!important;min-height:104px!important;padding:10px!important;border-radius:13px!important}
        .cards .jr-catalog-card .tag{font-size:9px!important}
        .cards .jr-catalog-card h3{font-size:15px!important;min-height:34px!important}
        .cards .jr-catalog-card .card-btn{height:40px!important;line-height:40px!important;font-size:13px!important}
      }
      @media(max-width:420px){
        .cards{grid-template-columns:1fr!important}
        .cards .jr-catalog-card{max-width:360px!important;width:100%!important;margin-inline:auto!important}
        .cards .jr-catalog-card h3{font-size:18px!important}
      }
    </style>`;
    html = html.replace('</head>', css + '</head>');
  }
  return html;
}

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
  return applyCatalogNormalization(normalizeCatalogCards(applySesauSemusaLabels(repairEnfermagem(repairRadiologia(repairChemistryResources(html))))));
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


function applyCatalogNormalization(html) {
  // JR_ACS_PRESENTATION_V2: ACS é a área principal; Fiscal Sanitário permanece complementar.
  html = html
    .replace(/Agente de Saúde e Fiscal Sanitário/g, 'Agente Comunitário de Saúde (ACS)')
    .replace('<span class="mini-tag">Bloco integrado • Senha ACS2026</span>', '<span class="mini-tag">SEMUSA Porto Velho • ACS • Senha ACS2026</span>')
    .replace('<h2>Agente de Saúde e Fiscal Sanitário</h2>', '<h2>Agente Comunitário de Saúde (ACS)</h2>')
    .replace('Área específica premium com duas trilhas no mesmo bloco: primeiro Fiscal Sanitário e depois Agente Comunitário de Saúde. O player interno mantém a organização da plataforma e salva o seu progresso neste navegador.', 'Preparatório de Agente Comunitário de Saúde (ACS), com legislação, atribuições, visita domiciliar, vacinação, educação em saúde, Lei 11.350/06, simulados e questões. O conteúdo de Fiscal Sanitário permanece disponível como material complementar.')
    .replace('Fiscal primeiro • ACS depois', 'ACS primeiro • Fiscal Sanitário complementar')
    .replace('title="Agente de Saúde e Fiscal Sanitário"', 'title="Agente Comunitário de Saúde (ACS)"')
    .replace(/<h2>Agente de Saúde(?: e Fiscal Sanitário)?<\/h2>/g, '<h2>Agente Comunitário de Saúde (ACS)</h2>')
    .replace(/Fiscal primeiro\s*•\s*ACS depois/g, 'ACS primeiro • Fiscal Sanitário complementar');
  const css = `<style id="jr-catalog-uniform-v3">
    .cards{
      display:grid!important;
      grid-template-columns:repeat(auto-fit,minmax(185px,1fr))!important;
      gap:18px!important;
      align-items:stretch!important;
    }
    .cards .card{
      position:relative!important;
      display:flex!important;
      flex-direction:column!important;
      min-width:0!important;
      min-height:0!important;
      height:auto!important;
      aspect-ratio:auto!important;
      overflow:hidden!important;
      border-radius:18px!important;
      border:1px solid rgba(239,68,68,.28)!important;
      background:#0a0f1c!important;
      box-shadow:0 12px 28px rgba(0,0,0,.22)!important;
      transform:none!important;
    }
    .cards .card:hover{transform:translateY(-2px)!important}
    .cards .card>.card-shade{display:none!important}
    .cards .card.jr-catalog-card>img,
    .cards .card.jr-catalog-card .jr-as-card-art{
      position:relative!important;
      inset:auto!important;
      display:block!important;
      width:100%!important;
      height:auto!important;
      aspect-ratio:2/3!important;
      object-fit:cover!important;
      object-position:center!important;
      transform:none!important;
      border-radius:0!important;
      background:#050505!important;
    }
    .cards .card .card-body{
      position:relative!important;
      inset:auto!important;
      left:auto!important;
      right:auto!important;
      bottom:auto!important;
      margin:0!important;
      padding:11px 12px 12px!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:flex-end!important;
      gap:9px!important;
      min-height:92px!important;
      background:linear-gradient(180deg,#101827 0%,#090d16 100%)!important;
      z-index:3!important;
    }
    .cards .card .card-body>.tag,
    .cards .card .card-body>p{display:none!important}
    .cards .card .card-body h3{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      min-height:38px!important;
      margin:0!important;
      padding:0 2px!important;
      color:#fff!important;
      font-size:15px!important;
      line-height:1.15!important;
      font-weight:900!important;
      text-align:center!important;
      letter-spacing:0!important;
      text-transform:none!important;
      overflow-wrap:anywhere!important;
    }
    .cards .card .card-btn{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      width:100%!important;
      min-height:44px!important;
      margin:0!important;
      padding:10px 12px!important;
      border:0!important;
      border-radius:12px!important;
      background:linear-gradient(135deg,#ff3434,#d41119)!important;
      color:#fff!important;
      font:inherit!important;
      font-size:14px!important;
      line-height:1!important;
      font-weight:900!important;
      text-align:center!important;
      text-transform:none!important;
      cursor:pointer!important;
      box-shadow:0 8px 18px rgba(220,38,38,.23)!important;
    }
    .cards .card .jr-uniform-access-btn{display:none!important}
    #area-acsfiscal .jr-track-divider{margin:8px 0 2px;padding:10px 12px;border-radius:12px;background:rgba(59,130,246,.12);border:1px solid rgba(96,165,250,.22);color:#dbeafe;font-size:11px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
    @media(max-width:760px){
      .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
      .cards .card .card-body{padding:9px!important;min-height:86px!important}
      .cards .card .card-body h3{font-size:14px!important;min-height:34px!important}
      .cards .card .card-btn{min-height:42px!important;font-size:13px!important}
    }
    @media(max-width:430px){
      .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
      .cards .card .card-body{padding:8px!important}
      .cards .card .card-body h3{font-size:13px!important}
      .cards .card .card-btn{min-height:40px!important;font-size:12px!important}
    }
  </style>`;

  const script = `<script id="jr-catalog-uniform-script-v3">
  (function(){
    var labels={
      quimica:'Professor de Química',
      prf:'Agente Administrativo PRF',
      penal:'Polícia Penal',
      sefin:'SEFIN/RO',
      radiologia:'Técnico em Radiologia',
      enfermagem:'Enfermagem',
      tecnico:'Técnico em Enfermagem',
      fisioterapia:'Fisioterapia',
      farmaceutico:'Farmácia',
      laboratorio:'Técnico de Laboratório',
      jiparana:'Ji-Paraná • Consulplan',
      vigilante:'Agente de Segurança e Vigilância',
      pedagogia:'Pedagogia',
      supervisao:'Supervisão Escolar',
      nutricao:'Nutrição',
      biomedicina:'Biomedicina',
      odontologia:'Odontologia',
      psicologia:'Psicologia • SESAU',
      psicologiasemusa:'Psicologia • SEMUSA',
      acsfiscal:'Agente Comunitário de Saúde (ACS)',
      assistentesocial:'Assistente Social',
      endemias:'Agente de Endemias',
      administrativo:'Área Administrativa',
      motorista:'Motorista',
      servicosgerais:'Serviços Gerais',
      clinico:'Clínico Geral',
      pediatria:'Médico Pediatra',
      educacaofisica:'Educação Física'
    };
    function keyOf(card){
      var k=String(card.dataset.jrCard||card.dataset.jrArt||'').trim();
      if(k)return k;
      var src=(card.getAttribute('onclick')||'')+' '+Array.from(card.querySelectorAll('[onclick]')).map(function(x){return x.getAttribute('onclick')||''}).join(' ');
      var m=src.match(/openGate\\(['"]([^'"]+)['"]\\)/);
      return m?m[1]:'';
    }
    function fallbackSvg(label){
      var safe=String(label||'Preparatório').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});
      var svg='<svg xmlns="http://www.w3.org/2000/svg" width="640" height="960" viewBox="0 0 640 960">'+
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#171923"/><stop offset=".58" stop-color="#0b1020"/><stop offset="1" stop-color="#26090d"/></linearGradient></defs>'+
        '<rect width="640" height="960" fill="url(#g)"/><circle cx="320" cy="330" r="155" fill="#ef4444" fill-opacity=".12" stroke="#ef4444" stroke-opacity=".5" stroke-width="3"/>'+
        '<path d="M255 350h130M320 285v130" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity=".95"/>'+
        '<text x="320" y="590" text-anchor="middle" fill="#fca5a5" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="800">PREPARATÓRIO</text>'+
        '<foreignObject x="65" y="625" width="510" height="190"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;color:#fff;font-size:42px;line-height:1.08;font-weight:900;text-align:center;display:flex;align-items:center;justify-content:center;height:190px;">'+safe+'</div></foreignObject>'+
        '<text x="320" y="885" text-anchor="middle" fill="#fff" fill-opacity=".72" font-family="Arial,Helvetica,sans-serif" font-size="21" font-weight="700">ESPECÍFICAS PREMIUM</text></svg>';
      return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
    }
    function ensureCardImage(card,label,force){
      var img=card.querySelector(':scope > img')||card.querySelector('.jr-as-card-art')||card.querySelector('img');
      function applyFallback(){
        if(!img){
          img=document.createElement('img');
          img.className='jr-as-card-art';
          card.insertBefore(img,card.firstChild);
        }
        if(img.dataset.jrFallback==='1')return;
        img.dataset.jrFallback='1';
        img.src=fallbackSvg(label);
        img.alt=label||'Preparatório';
        img.loading='lazy';
        img.decoding='async';
      }
      if(force){applyFallback();return;}
      if(!img){applyFallback();return;}
      if(!img.getAttribute('alt'))img.alt=label||'Preparatório';
      img.addEventListener('error',applyFallback,{once:true});
      if(img.complete && img.naturalWidth===0)applyFallback();
    }
    function ensureAdministrativeCard(){
      var found=Array.from(document.querySelectorAll('.cards .card')).find(function(card){return keyOf(card)==='administrativo';});
      if(found)return found;
      var grid=document.querySelector('.cards');
      if(!grid)return null;
      var article=document.createElement('article');
      article.className='card jr-catalog-card';
      article.dataset.jrCard='administrativo';
      var img=document.createElement('img');
      img.className='jr-catalog-art';
      img.src=fallbackSvg('Área Administrativa');
      img.alt='SESAU + SEMUSA — Área Administrativa';
      img.loading='lazy';img.decoding='async';
      article.appendChild(img);
      var body=document.createElement('div');body.className='card-body';
      var h3=document.createElement('h3');h3.textContent='Área Administrativa';
      var btn=document.createElement('button');btn.type='button';btn.className='card-btn';btn.textContent='Acessar';btn.setAttribute('onclick',"openGate('administrativo')");
      body.appendChild(h3);body.appendChild(btn);article.appendChild(body);
      grid.appendChild(article);
      return article;
    }
    function normalize(){
      ensureAdministrativeCard();
      document.querySelectorAll('.cards .card').forEach(function(card){
        var key=keyOf(card), title=labels[key]||'';
        var body=card.querySelector('.card-body');
        if(!body){
          body=document.createElement('div');body.className='card-body';card.appendChild(body);
        }
        body.querySelectorAll('.tag,p').forEach(function(n){n.remove();});
        body.querySelectorAll('.jr-uniform-access-btn').forEach(function(n){n.remove();});
        var h3=body.querySelector('h3');
        if(!h3){
          h3=document.createElement('h3');
          var btn=body.querySelector('.card-btn');
          body.insertBefore(h3,btn||body.firstChild);
        }
        if(title)h3.textContent=title;
        else {
          var current=(h3.textContent||'').replace(/\\s*[•—-]\\s*(SESAU|SEMUSA).*$/i,'').trim();
          if(current)h3.textContent=current;
        }
        ensureCardImage(card,title||h3.textContent||'Preparatório',key==='penal');
        var buttons=Array.from(body.querySelectorAll('.card-btn'));
        buttons.slice(1).forEach(function(b){b.remove();});
        var button=buttons[0];
        if(!button && key){
          button=document.createElement('button');
          button.type='button';button.className='card-btn';button.textContent='Acessar';
          button.setAttribute('onclick',"openGate('"+key+"')");
          body.appendChild(button);
        }
        if(button){
          button.textContent='Acessar';
          if(title)button.setAttribute('aria-label','Acessar '+title);
        }
      });

      // jr-area-headings-v1: padroniza títulos internos sem alterar o conteúdo de estudo.
      var areaLabels={
        'area-radiologia':'Técnico em Radiologia',
        'area-enfermagem':'Enfermagem',
        'area-tecnico':'Técnico em Enfermagem',
        'area-fisioterapia':'Fisioterapia',
        'area-nutricao':'Nutrição',
        'area-farmaceutico':'Farmácia',
        'area-laboratorio':'Técnico de Laboratório',
        'area-jiparana':'Ji-Paraná • Consulplan',
        'area-biomedicina':'Biomedicina',
        'area-vigilante':'Agente de Segurança e Vigilância',
        'area-odontologia':'Odontologia',
        'area-pedagogia':'Pedagogia',
        'area-supervisao':'Supervisão Escolar',
        'area-psicologia':'Psicologia • SESAU',
        'area-psicologia-semusa':'Psicologia • SEMUSA',
        'area-assistente-social':'Assistente Social',
        'area-acsfiscal':'Agente Comunitário de Saúde (ACS)',
        'area-educacaofisica':'Educação Física',
        'area-administrativo':'Área Administrativa',
        'area-clinico':'Médico Clínico Geral',
        'area-quimica':'Professor de Química',
        'area-prf':'Agente Administrativo • PRF',
        'area-endemias':'Agente de Combate às Endemias',
        'area-sefin':'SEFIN/RO • Material Geral',
        'area-penal':'Polícia Penal',
        'area-motorista':'Motorista',
        'area-servicosgerais':'Serviços Gerais',
        'area-pediatria':'Médico Pediatra'
      };
      Object.keys(areaLabels).forEach(function(id){
        var area=document.getElementById(id);
        if(!area)return;
        var heading=area.querySelector('.area-head h2');
        if(heading)heading.textContent=areaLabels[id];
      });

      // jr-acs-front-fix-v1: deixa ACS claro e prioritário dentro do bloco compartilhado.
      var acsArea=document.getElementById('area-acsfiscal');
      if(acsArea){
        var h2=acsArea.querySelector('.area-head h2');
        if(h2)h2.textContent='Agente Comunitário de Saúde (ACS)';
        var mini=acsArea.querySelector('.area-head .mini-tag');
        if(mini)mini.textContent='SEMUSA Porto Velho • ACS • Senha ACS2026';
        var desc=acsArea.querySelector('.area-head p');
        if(desc)desc.textContent='Preparatório de Agente Comunitário de Saúde (ACS), com legislação, atribuições, visita domiciliar, vacinação, educação em saúde, Lei 11.350/06, simulados e questões. Fiscal Sanitário permanece como conteúdo complementar.';
        var listBox=acsArea.querySelector('.list-box');
        var list=listBox&&listBox.querySelector('.scroll-list');
        if(list){
          var items=Array.from(list.querySelectorAll('.lesson-item[data-area="acsfiscal"]'));
          var acs=items.filter(function(btn){var probe=(btn.getAttribute('data-note')||'')+' '+(btn.getAttribute('data-title')||'')+' '+(btn.textContent||'');return /Agente Comunitário de Saúde|\bACS\b/i.test(probe)&&!/Fiscal Sanitário/i.test(probe);});
          var fiscal=items.filter(function(btn){return acs.indexOf(btn)<0;});
          if(acs.length){
            var oldDivider=list.querySelector('.jr-track-divider');if(oldDivider)oldDivider.remove();
            acs.forEach(function(btn){list.appendChild(btn);});
            if(fiscal.length){
              var divider=document.createElement('div');divider.className='jr-track-divider';divider.textContent='Conteúdo complementar • Fiscal Sanitário';list.appendChild(divider);
              fiscal.forEach(function(btn){list.appendChild(btn);});
            }
            var boxStrong=listBox.querySelector('.box-head strong');if(boxStrong)boxStrong.textContent='Aulas de Agente Comunitário de Saúde';
            var boxSpan=listBox.querySelector('.box-head span');if(boxSpan)boxSpan.textContent=acs.length+' aulas ACS • '+fiscal.length+' complementares';
            var first=acs[0];
            var player=acsArea.querySelector('#player-acsfiscal');
            var title=acsArea.querySelector('#title-acsfiscal');
            var note=acsArea.querySelector('#note-acsfiscal');
            var link=acsArea.querySelector('#link-acsfiscal');
            if(player&&first.dataset.embed)player.src=first.dataset.embed;
            if(title)title.textContent=first.dataset.title||'Aula 1 • Introdução ao ACS';
            if(note)note.textContent=first.dataset.note||'Agente Comunitário de Saúde';
            if(link&&first.dataset.yt)link.href=first.dataset.yt;
          }
        }
      }
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',normalize);
    else normalize();
    setTimeout(normalize,250);
  })();
  <\/script>`;

  if(!html.includes('id="jr-catalog-uniform-v3"')) html=html.replace('</head>',css+'</head>');
  if(!html.includes('id="jr-catalog-uniform-script-v3"')) html=html.replace('</body>',script+'</body>');
  return html;
}

module.exports = { applyCardLayout, repairRadiologia, repairEnfermagem, repairChemistryResources, applyCatalogNormalization };
