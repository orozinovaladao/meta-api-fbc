export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  const fbc = req.query.fbc || `fb.1.${Date.now()}.${req.query.fbclid || ''}`;
  const fbp = req.cookies?._fbp || '';
  const phone = req.query.phone || '556292264075';

  const separator = '\u200B'; // caractere invisível
  const hiddenData = [
    `FBC:${fbc}`,
    `FBP:${fbp}`,
    `IP:${ip}`,
    `UA:${userAgent}`
  ].join(separator);

  const msg = `Oi, tenho interesse nas cuecas${separator}${hiddenData}`;
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  res.writeHead(302, { Location: link });
  res.end();
}
