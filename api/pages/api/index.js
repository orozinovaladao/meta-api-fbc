export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  const fbc = req.query.fbc || 'fb.1.' + Date.now() + '.' + req.query.fbcId || '';
  const fbp = req.cookies?._fbp || '';
  const phone = req.query.phone || '5562992610475';

  // Texto visível para o cliente
  const visibleMsg = 'Oi, tenho interesse nas cuecas';

  // Texto invisível (com separadores invisíveis entre cada caractere)
  const hidden = `FBC:${fbc} FBP:${fbp} IP:${ip} UA:${userAgent}`
    .split("")
    .map(c => c + "\u2063") // Invisible Separator (mais estável que \u200B no WhatsApp)
    .join("");

  // Mensagem final que será enviada para o WhatsApp
  const finalMsg = visibleMsg + "\n\n" + hidden;

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(finalMsg)}`;
  res.writeHead(302, { Location: link });
  res.end();
}
