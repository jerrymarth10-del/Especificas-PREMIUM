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
  if (typeof html !== 'string' || html.includes('id="jr-pedagogia-ibgp"')) return html;
  const start = html.indexOf('<section class="area" id="area-pedagogia">');
  if (start < 0) return html; // não modifica nenhuma outra área
  const end = html.indexOf('</section>', start);
  if (end < 0) return html;
  const existingSection = html.slice(start, end);
  const pdfAlreadyLinked = existingSection.includes('especifica-series-iniciais.pdf');
  const pdf = pdfAlreadyLinked ? '' : `
    <a class="pdf-item" href="/especifica-series-iniciais.pdf" target="_blank" rel="noopener noreferrer">
      <span class="pdf-mark">PDF</span>
      <span class="lesson-text"><strong>Específica — Séries Iniciais</strong><small>PDF existente no repositório do Projeto 2</small></span>
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
        <div class="box-head"><strong>SEMED Porto Velho 2026 • Provas anteriores IBGP</strong><span>3 provas com gabaritos</span></div>
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

module.exports = { insertPedagogiaIbgp, exams };
