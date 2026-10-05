function esc(value){
  return String(value).replace(/[&<>"']/g,function(ch){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];
  });
}

function resource(mark,title,note,url){
  return '<a class="pdf-item jr-admin-resource" href="'+esc(url)+'" target="_blank" rel="noopener">'+
    '<span class="pdf-mark">'+esc(mark)+'</span>'+
    '<span class="lesson-text"><strong>'+esc(title)+'</strong><small>'+esc(note)+'</small></span>'+
    '<span class="lesson-open">Abrir</span></a>';
}

function buildAdministrativo(){
  const card =
    '<article class="card jr-admin-card jr-approved-art-card" onclick="openGate(\'administrativo\')" role="button" tabindex="0" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGate(\'administrativo\')}" aria-label="Acessar Área Administrativa">'+
      '<div class="jr-admin-art" aria-hidden="true"><span>📋</span><i></i></div>'+
      '<div class="card-shade"></div>'+
      '<div class="card-body">'+
        '<span class="tag">SESAU + SEMUSA • Administrativo</span>'+
        '<h3>Área Administrativa</h3>'+
        '<p>Administração Pública, Direito Administrativo, princípios, questões e materiais para cargos administrativos.</p>'+
        '<button class="card-btn" type="button" tabindex="-1">Acessar</button>'+
      '</div>'+
    '</article>';

  const resources = [
    ['PDF','Princípios Administrativos','Material de Direito Administrativo para revisão dos princípios da Administração Pública.','/DA-----Principios--Administrativos(2).pdf'],
    ['QUESTÕES','100 questões de Direito Administrativo','Banco de questões para treino e revisão de Direito Administrativo.','/100-questoes-Ineditas-de-Direito-Administrativo-Modelo-FGV-LP.pdf'],
    ['PROVA','Conhecimentos Específicos • Administração','Caderno de prova de Administração já disponível na plataforma.','/Prova_Conhecimentos_Especificos_-_Administrao_33.pdf']
  ].map(function(item){return resource(item[0],item[1],item[2],item[3]);}).join('');

  const area =
    '<section class="area jr-admin-area" id="area-administrativo">'+
      '<div class="area-top"><div class="area-head">'+
        '<div class="jr-admin-icon" aria-hidden="true">📋</div>'+
        '<div><span class="mini-tag">SESAU + SEMUSA • Área Administrativa</span>'+
        '<h2>Área Administrativa</h2>'+
        '<p>Espaço organizado para quem concorre aos cargos administrativos, com base de Administração Pública e Direito Administrativo, questões e prova para treinamento.</p></div>'+
      '</div></div>'+
      '<div class="jr-admin-chips">'+
        '<span>Administração Pública</span><span>Direito Administrativo</span><span>Princípios Administrativos</span><span>Questões</span><span>Provas</span>'+
      '</div>'+
      '<div class="jr-admin-grid">'+
        '<div class="list-box jr-admin-box"><div class="box-head"><strong>Materiais administrativos</strong><span>3 materiais</span></div><div class="scroll-list">'+resources+'</div></div>'+
        '<div class="list-box jr-admin-box"><div class="box-head"><strong>Como estudar este bloco</strong><span>Roteiro direto</span></div>'+
          '<div class="jr-admin-plan">'+
            '<div><b>1. Base</b><small>Comece pelos princípios e conceitos fundamentais da Administração Pública.</small></div>'+
            '<div><b>2. Prática</b><small>Resolva as questões de Direito Administrativo e marque os assuntos com maior dificuldade.</small></div>'+
            '<div><b>3. Prova</b><small>Use o caderno de Administração para simular cobrança de conhecimentos específicos.</small></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</section>';

  const css =
    '.jr-admin-card{position:relative!important;overflow:hidden!important;background:#06131d!important}.jr-admin-art{position:absolute;inset:0;background:radial-gradient(circle at 76% 18%,rgba(14,165,233,.32),transparent 27%),radial-gradient(circle at 18% 82%,rgba(16,185,129,.16),transparent 30%),linear-gradient(145deg,#06131d,#0a2637 54%,#0b3a4a);display:flex;align-items:center;justify-content:center}.jr-admin-art span{font-size:84px;filter:drop-shadow(0 18px 28px rgba(0,0,0,.35));transform:translateY(-18px)}.jr-admin-art i{position:absolute;width:66%;height:1px;background:linear-gradient(90deg,transparent,rgba(125,211,252,.48),transparent);box-shadow:0 34px 0 rgba(125,211,252,.22),0 68px 0 rgba(125,211,252,.12)}'+
    '.jr-admin-card .tag{background:rgba(14,165,233,.15)!important;border-color:rgba(125,211,252,.25)!important;color:#dff7ff!important}.jr-admin-area{--jr-admin:#0ea5e9}.jr-admin-icon{width:78px;height:78px;border-radius:22px;display:grid;place-items:center;flex:0 0 78px;font-size:36px;background:linear-gradient(145deg,rgba(14,165,233,.22),rgba(16,185,129,.12));border:1px solid rgba(125,211,252,.22)}'+
    '.jr-admin-chips{display:flex;flex-wrap:wrap;gap:7px;margin:4px 0 18px}.jr-admin-chips span{padding:7px 10px;border-radius:999px;background:rgba(14,165,233,.10);border:1px solid rgba(125,211,252,.18);font-size:11px;font-weight:800;color:#dbeafe}.jr-admin-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:15px}.jr-admin-box{align-self:start}.jr-admin-resource{min-height:66px}.jr-admin-plan{display:grid;gap:9px}.jr-admin-plan div{padding:12px;border-radius:13px;border:1px solid rgba(148,163,184,.16);background:rgba(15,23,42,.62)}.jr-admin-plan b,.jr-admin-plan small{display:block}.jr-admin-plan b{font-size:12px;color:#e0f2fe}.jr-admin-plan small{font-size:10px;line-height:1.45;color:#94a3b8;margin-top:4px}@media(max-width:820px){.jr-admin-grid{grid-template-columns:1fr}.jr-admin-icon{width:68px;height:68px;flex-basis:68px;font-size:31px}}';

  const script =
    '<script id="jr-administrativo-script-v1">(function(){try{if(typeof areaConfig!=="undefined"&&!areaConfig.administrativo){areaConfig.administrativo={title:"Área Administrativa",password:"ADMIN2026",sectionId:"area-administrativo",storageKey:"jr_especifica_administrativo"};}}catch(e){}})();<\/script>';

  return {card,area,css,script};
}

module.exports={buildAdministrativo};
