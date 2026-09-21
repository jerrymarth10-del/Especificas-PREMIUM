module.exports = async function handler(req, res) {
  try {
    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'especificas-premium.vercel.app';
    const sourceUrl = 'https://' + productionHost + '/api/inject';

    const source = await fetch(sourceUrl, {
      headers: { 'user-agent': 'JR-Apostilas-Image-Fix/1.0' }
    });

    if (!source.ok) {
      res.statusCode = 502;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('Não foi possível carregar a plataforma.');
      return;
    }

    let html = await source.text();
    const imageSrc = '/quimica-card.jpg?card=v8';

    html = html.replace(
      /<img\s+src="[^"]+"(?=[^>]*alt="Seduc PA Professor de Química")/g,
      '<img src="' + imageSrc + '"'
    );

    html = html.replace(
      /<img\s+src="[^"]+"(?=[^>]*alt="Professor de Química")/g,
      '<img src="' + imageSrc + '"'
    );

    res.statusCode = 200;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Erro ao montar a página: ' + (error && error.message ? error.message : 'erro desconhecido'));
  }
};
