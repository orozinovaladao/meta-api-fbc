export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  const fbc = req.query.fbclid ? `fb.${Date.now()}.${req.query.fbclid}` : '';
  const fbp = req.cookies?._fbp || '';
  const phone = req.query.phone || '556292601475';

  const msg = `FBC:${fbc} FBP:${fbp} IP:${ip} UA:${userAgent}`;
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  res.writeHead(302, { Location: link });
  res.end();
}
