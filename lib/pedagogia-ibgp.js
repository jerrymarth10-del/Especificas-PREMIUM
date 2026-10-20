'use strict';

// Acréscimo isolado ao bloco já existente "Pedagogia - Professor 30h e 40h".
// Provas anteriores IBGP de OUTROS municípios, não provas SEMED Porto Velho 2026.
const exams = [
  {
    title: 'IBGP 2023 • PEB Anos Iniciais (1º ao 5º) — Uberaba/MG',
    detail: 'PCI Concursos • prova oficial + gabaritos após recursos',
    url: 'https://www.pciconcursos.com.br/provas/download/peb-anos-iniciais-do-ensino-fundamental-1-ao-5-ano-prefeitura-uberaba-mg-ibgp-2023'
  },
  {
    title: 'IBGP 2023 • Professor de Educação Infantil — Uberaba/MG',
    detail: 'PCI Concursos • prova correlata + gabaritos após recursos',
    url: 'https://www.pciconcursos.com.br/provas/download/professor-de-educacao-infantil-prefeitura-uberaba-mg-ibgp-2023'
  },
  {
    title: 'IBGP 2018 • Professor de Ensino Fundamental I — Santana do Paraíso/MG',
    detail: 'PCI Concursos • prova oficial + gabarito',
    url: 'https://www.pciconcursos.com.br/provas/download/professor-de-ensino-fundamental-i-prefeitura-santana-do-paraiso-mg-ibgp-2018'
  }
];

function insertPedagogiaIbgp(html) {
  if (typeof html !== 'string') return html;
  html = html.replace(/Pedagogia - Professor 30h e 40h/g, 'Professor SEMED — Séries Iniciais');
  if (html.includes('id="jr-pedagogia-ibgp"')) return html;
  const start = html.indexOf('<section class="area" id="area-pedagogia">');
  if (start < 0) return html; // não modifica nenhuma outra área
  const end = html.indexOf('</section>', start);
  if (end < 0) return html;
  const existingSection = html.slice(start, end);
  const pdfAlreadyLinked = existingSection.includes('especifica-series-iniciais.pdf');
  const pdf = pdfAlreadyLinked ? '' : `
    <a class="pdf-item" href="/especifica-series-iniciais.pdf" target="_blank" rel="noopener noreferrer">
      <span class="pdf-mark">PDF</span>
      <span class="lesson-text"><strong>Específica — Séries Iniciais</strong><small>Material de estudo de Séries Iniciais</small></span>
      <span class="lesson-open">Abrir</span>
    </a>`;
  const links = exams.map((item) => `
    <a class="pdf-item" href="${item.url}" target="_blank" rel="noopener noreferrer">
      <span class="pdf-mark">IBGP</span>
      <span class="lesson-text"><strong>${item.title}</strong><small>${item.detail}</small></span>
      <span class="lesson-open">Prova + gabarito</span>
    </a>`).join('');
  const addition = `
    <div class="area-grid" id="jr-pedagogia-ibgp" style="margin-top:18px">
      <div class="list-box">
        <div class="box-head"><strong>SEMED Porto Velho 2026 • Provas anteriores IBGP</strong><span>2 provas de Ensino Fundamental + 1 de Educação Infantil</span></div>
        <p style="padding:8px 14px;font-size:13px;line-height:1.55;color:var(--muted)">
          Concurso SEMED Porto Velho: Edital 24/2026, cargo 519 — Professor Nível II, Séries Iniciais, 30h. As provas abaixo são de OUTROS municípios, para praticar o estilo da banca IBGP.
          <a href="https://adminnovo.ibgpconcursos.com.br/concurso.jsp?cod=783" target="_blank" rel="noopener noreferrer">Consultar edital e banca</a>.
        </p>
        <div class="scroll-list">${pdf}${links}</div>
        <p style="padding:8px 14px;font-size:12px;color:var(--muted)">O PCI Concursos pode solicitar verificação de segurança antes de liberar os PDFs da prova e do gabarito.</p>
      </div>
    </div>`;
  return html.slice(0, end) + addition + html.slice(end);
}


const IBGP_PEDAGOGIA_VIDEOS = Object.freeze([
  {
    id: 'CjNnlMIv1C0',
    title: 'Aula extra 01 - Prova IBGP: Professor de Anos Iniciais',
    note: 'Resolução de prova anterior para Professor de Anos Iniciais'
  },
  {
    id: 'Lp84Gc8HPng',
    title: 'Aula extra 02 - IBGP: PEB I, Infantil e Séries Iniciais',
    note: 'Questões de provas da banca para Professor da Educação Básica'
  },
  {
    id: 'be1Qm-HaKWM',
    title: 'Aula extra 03 - Simulado IBGP: Conhecimentos Pedagógicos',
    note: 'Resolução comentada e revisão de temas pedagógicos'
  },
  {
    id: 'ruDbPW_Oq90',
    title: 'Aula extra 04 - IBGP: Português em questões comentadas',
    note: 'Treino complementar de Português no estilo da banca'
  }
]);

// Acrescenta somente uma trilha extra dentro da seção já existente de Pedagogia.
// Não altera as 45 aulas antigas, o progresso ou os links das provas e PDFs.
function insertPedagogiaIbgpAulas(html) {
  if (typeof html !== 'string' || html.includes('id="jr-pedagogia-ibgp-aulas"')) return html;
  const marker = '<div class="area-grid" id="jr-pedagogia-ibgp"';
  const areaStart = html.indexOf('<section class="area" id="area-pedagogia">');
  const insertionAt = html.indexOf(marker, areaStart);
  if (areaStart < 0 || insertionAt < 0) return html;
  const nextArea = html.indexOf('<section class="area"', areaStart + 1);
  if (nextArea >= 0 && insertionAt > nextArea) return html;

  const first = IBGP_PEDAGOGIA_VIDEOS[0];
  const items = IBGP_PEDAGOGIA_VIDEOS.map((video, i) =>
    '<button type="button" class="lesson-item" data-jr-ibgp-video="' + video.id +
    '" data-jr-ibgp-title="' + video.title +
    '" data-jr-ibgp-note="' + video.note +
    '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
    '<span class="lesson-mark">▶</span>' +
    '<span class="lesson-text"><strong>' + video.title + '</strong><small>' + video.note + '</small></span>' +
    '<span class="lesson-open">Assistir</span></button>'
  ).join('');

  const markup =
    '<div class="area-grid" id="jr-pedagogia-ibgp-aulas" style="margin-top:18px">' +
      '<div class="player-box">' +
        '<div class="box-head"><strong>Videoaulas IBGP • Séries Iniciais</strong><span>Player integrado</span></div>' +
        '<div class="video-wrap">' +
          '<iframe id="jr-pedagogia-ibgp-player" loading="lazy" src="https://www.youtube.com/embed/' + first.id +
            '" title="' + first.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +
        '<div class="player-meta">' +
          '<div><strong id="jr-pedagogia-ibgp-title">' + first.title + '</strong>' +
          '<small id="jr-pedagogia-ibgp-note">' + first.note + '</small></div>' +
          '<a class="yt-link" id="jr-pedagogia-ibgp-yt" href="https://www.youtube.com/watch?v=' + first.id +
          '" target="_blank" rel="noopener noreferrer">YouTube</a>' +
        '</div>' +
      '</div>' +
      '<div class="list-box">' +
        '<div class="box-head"><strong>Trilha complementar • questões IBGP</strong><span>4 aulas extras</span></div>' +
        '<p style="padding:8px 14px;font-size:13px;line-height:1.55;color:var(--muted)">Aulas baseadas em questões e provas anteriores da banca. Não são provas do concurso SEMED 2026. As aulas anteriores permanecem disponíveis. As aulas de legislação de Ji-Paraná são material complementar de outro município; não substituem a legislação de Porto Velho.</p>' +
        '<div class="scroll-list">' + items + '</div>' +
      '</div>' +
    '</div>';
  const behavior =
    '<script id="jr-pedagogia-ibgp-aulas-script">(function(){' +
      'document.addEventListener("click",function(event){' +
        'var button=event.target && event.target.closest ? event.target.closest("[data-jr-ibgp-video]") : null;' +
        'if(!button || !button.closest("#jr-pedagogia-ibgp-aulas")) return;' +
        'var id=button.getAttribute("data-jr-ibgp-video");' +
        'if(!/^[A-Za-z0-9_-]{11}$/.test(id)) return;' +
        'var area=document.getElementById("jr-pedagogia-ibgp-aulas");' +
        'if(!area) return;' +
        'var title=button.getAttribute("data-jr-ibgp-title")||"Videoaula IBGP";' +
        'var note=button.getAttribute("data-jr-ibgp-note")||"";' +
        'var player=area.querySelector("#jr-pedagogia-ibgp-player");' +
        'if(player) { player.src="https://www.youtube.com/embed/"+id; player.title=title; }' +
        'var titleEl=area.querySelector("#jr-pedagogia-ibgp-title"); if(titleEl) titleEl.textContent=title;' +
        'var noteEl=area.querySelector("#jr-pedagogia-ibgp-note"); if(noteEl) noteEl.textContent=note;' +
        'var link=area.querySelector("#jr-pedagogia-ibgp-yt"); if(link) link.href="https://www.youtube.com/watch?v="+id;' +
        'area.querySelectorAll("[data-jr-ibgp-video]").forEach(function(el){el.setAttribute("aria-pressed",el===button?"true":"false");});' +
      '});' +
    '})();</script>';
  return html.slice(0, insertionAt) + markup + behavior + html.slice(insertionAt);
}

module.exports = { insertPedagogiaIbgp: (html) => insertPedagogiaIbgpAulas(insertPedagogiaIbgp(html)), exams, videos: IBGP_PEDAGOGIA_VIDEOS };
