const VERIFY_URL = "https://sesau-certo.vercel.app/api/verify-area-ticket";
const HEALTH_AREAS = new Set([
  "radiologia","enfermagem","tecnico","fisioterapia","farmaceutico","laboratorio",
  "nutricao","biomedicina","odontologia","psicologia","psicologiasemusa","acsfiscal","endemias","clinico"
]);

async function verifyTicket(ticket){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),8000);
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
    const area=String(data.area||"").trim().toLowerCase();
    if(!HEALTH_AREAS.has(area)) return null;
    return {area,exp:Number(data.exp||0)};
  }finally{
    clearTimeout(timer);
  }
}

module.exports=async function handler(req,res){
  res.setHeader("Cache-Control","no-store, max-age=0");
  res.setHeader("Pragma","no-cache");
  res.setHeader("Referrer-Policy","no-referrer");
  res.setHeader("X-Content-Type-Options","nosniff");

  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false});
  }

  const length=Number(req.headers["content-length"]||0);
  if(length>12288) return res.status(413).json({ok:false});

  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):(req.body||{});
    const ticket=String(body.ticket||"");
    if(!ticket || ticket.length>8192) return res.status(400).json({ok:false});

    const verified=await verifyTicket(ticket);
    if(!verified) return res.status(401).json({ok:false});

    const maxAge=Math.max(60,Math.min(60*60*24*30,Math.floor((verified.exp-Date.now())/1000)));
    const cookieName="jr_area_access_"+verified.area;
    res.setHeader("Set-Cookie",
      cookieName+"="+encodeURIComponent(ticket)+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age="+maxAge);

    return res.status(200).json({ok:true,area:verified.area});
  }catch(err){
    console.error("Claim SESAU area:",err?.message||err);
    return res.status(500).json({ok:false});
  }
};
