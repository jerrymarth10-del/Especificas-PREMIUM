const VERIFY_URL = "https://sesau-certo.vercel.app/api/verify-area-ticket";
const HEALTH_AREAS = new Set([
  "radiologia","enfermagem","tecnico","fisioterapia","farmaceutico","laboratorio",
  "nutricao","biomedicina","odontologia","psicologia","acsfiscal","educacaofisica","clinico"
]);

function readCookies(req){
  const raw=String(req?.headers?.cookie||"");
  const out={};
  raw.split(";").forEach(function(part){
    const i=part.indexOf("=");
    if(i<0) return;
    const key=part.slice(0,i).trim();
    if(!key) return;
    try{out[key]=decodeURIComponent(part.slice(i+1).trim());}
    catch{out[key]=part.slice(i+1).trim();}
  });
  return out;
}

async function verifyTicket(ticket){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),7000);
  try{
    const response=await fetch(VERIFY_URL,{
      method:"POST",
      cache:"no-store",
      signal:controller.signal,
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({ticket})
    });
    const data=await response.json().catch(()=>null);
    if(!response.ok || !data?.ok) return null;
    const verifiedArea=String(data.area||"").trim().toLowerCase();
    return HEALTH_AREAS.has(verifiedArea)?verifiedArea:null;
  }finally{
    clearTimeout(timer);
  }
}

module.exports=async function handler(req,res){
  res.setHeader("Cache-Control","no-store, max-age=0");
  res.setHeader("Pragma","no-cache");
  res.setHeader("Referrer-Policy","no-referrer");
  res.setHeader("X-Content-Type-Options","nosniff");
  if(req.method!=="GET"){
    res.setHeader("Allow","GET");
    return res.status(405).json({allowed:false});
  }

  const area=String(req.query?.area||"").trim().toLowerCase();
  if(!HEALTH_AREAS.has(area)) return res.status(400).json({allowed:false});

  const ticket=readCookies(req)["jr_area_access_"+area];
  if(!ticket || ticket.length>8192) return res.status(200).json({allowed:false,area});

  try{
    const verifiedArea=await verifyTicket(ticket);
    return res.status(200).json({allowed:verifiedArea===area,area});
  }catch(error){
    console.error("Consulta de acesso SESAU:",error?.message||error);
    return res.status(503).json({allowed:false,area});
  }
};
