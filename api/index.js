export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  const fbc = req.query.fbcId || 'fb.1.' + Date.now() + '.' + req.query.fbclid || '';
  const fbp = req.cookies?._fbp || '';
  const phone = req.query.phone || '556292264075';

  // Texto visível ao cliente
  const visibleMsg = 'Oi, tenho interesse nas cuecas';

  // Texto invisível (usando caractere \u200B entre cada letra, que é invisível)
  const hidden = `FBC:${fbc} FBP:${fbp} IP:${ip} UA:${userAgent}`
    .split('')
    .map(c => c + '\u200B')
    .join('');

  // Mensagem final com dados escondidos
  const finalMsg = visibleMsg + '\n\n' + hidden;

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(finalMsg)}`;
  res.writeHead(302, { Location: link });
  res.end();
}
