const lessons = [
  ['2Akj3Agwf-o', 'Farmacêutico • Ouro Preto 2022 • IBGP', 'Romilton Júnior • preparação para Farmacêutico IBGP'],
  ['7b-f59C9jUI', 'Saúde Pública • questões IBGP', 'Oral Medicine Cursos • treino de Saúde Pública da banca'],
  ['yAI0X5g7amg', 'Português • perfil IBGP e provas comentadas', 'Prof.ª Flávia Rita • conhecimentos gerais da banca'],
  ['-8vIgfRVbGk', 'Farmácia hospitalar e comunitária • questões', 'Farmatop Concursos • aula complementar de Farmácia'],
  ['PkOP0jFmCCc', 'Farmácia hospitalar • revisão', 'Alexandre Martins / Gran Cursos Saúde • aula complementar']
];
const pciExams = [
  ['Farmacêutico • Dores do Indaiá/MG • IBGP 2021', 'https://www.pciconcursos.com.br/provas/download/farmaceutico-prefeitura-dores-do-indaia-mg-ibgp-2021'],
  ['Farmacêutico • Itabira/MG • IBGP 2018', 'https://www.pciconcursos.com.br/provas/download/tecnico-superior-de-saude-farmaceutico-prefeitura-itabira-mg-ibgp-2018'],
  ['Técnico em Farmácia • São João del-Rei/MG • IBGP 2021 (complementar)', 'https://www.pciconcursos.com.br/provas/download/tecnico-em-farmacia-prefeitura-sao-joao-del-rei-mg-ibgp-2021']
];
function escape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function enrichFarmacia(html) {
  const start=html.indexOf('<section class="area" id="area-farmaceutico">');
  const end=start<0?-1:html.indexOf('</section>',start);
  if(end<0)return html;
  let section=html.slice(start,end);
  if(section.includes('id="jr-farmacia-aulas-20261009"'))return html;
  // The PM/RN hospital exam is Consulplan, not IBGP.
  section=section.replace('Farmacêutico — Farmácia Hospitalar — IBGP','Farmacêutico — Farmácia Hospitalar — Consulplan (complementar)');
  section=section.replace('📝 IBGP • Provas anteriores de Farmácia','📝 Provas anteriores • Farmácia');
  section=section.replace('PCI • prova + gabarito</span>', 'IBGP + complementar Consulplan</span>');
  const videoItems=lessons.map(([id,title,note])=>'<button class="lesson-item" type="button" data-area="farmaceutico" data-embed="https://www.youtube.com/embed/'+id+'" data-title="'+escape(title)+'" data-note="'+escape(note)+'" data-yt="https://www.youtube.com/watch?v='+id+'"><span class="lesson-mark">▶</span><span class="lesson-text"><strong>'+escape(title)+'</strong><small>'+escape(note)+'</small></span><span class="lesson-open lesson-status">Assistir</span></button>').join('');
  const videoBox='<div class="list-box jr-ibgp-questions" id="jr-farmacia-aulas-20261009"><div class="box-head"><strong>Aulas de apoio • Farmácia e banca IBGP</strong><span>5 aulas</span></div><div class="scroll-list">'+videoItems+'</div></div>';
  const examItems=pciExams.map(([title,url])=>'<a class="pdf-item" href="'+url+'" target="_blank" rel="noopener"><span class="pdf-mark">PCI</span><span class="lesson-text"><strong>'+escape(title)+'</strong><small>Prova e gabarito • acervo PCI Concursos</small></span><span class="lesson-open">Abrir</span></a>').join('');
  const examBox='<div class="list-box jr-ibgp-questions" id="jr-farmacia-pci-20261009"><div class="box-head"><strong>Provas e gabaritos • IBGP • acervo PCI</strong><span>PCI Concursos</span></div><div class="scroll-list">'+examItems+'</div></div>';
  const firstBox=section.indexOf('<div class="list-box');
  if(firstBox>=0)section=section.slice(0,firstBox)+examBox+videoBox+section.slice(firstBox);
  else section+=examBox+videoBox;
  return html.slice(0,start)+section+html.slice(end);
}
module.exports={enrichFarmacia,lessons,pciExams};
