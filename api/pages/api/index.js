// pages/api/index.js

export default function handler(req, res) {
  // Pega os parâmetros da URL
  const { phone, fbc, fbcId } = req.query;

  // Número do WhatsApp (padrão se não passar)
  const targetPhone = phone || "5562992618475";

  // Monta mensagem final
  const visibleMsg = "Olá, quero mais informações!";
  const hiddenData = `\n\n[FBC: ${fbc || "sem_fbc"} | ID: ${fbcId || "sem_id"}]`;

  const finalMsg = encodeURIComponent(visibleMsg + hiddenData);

  // Gera link do WhatsApp
  const link = `https://wa.me/${targetPhone}?text=${finalMsg}`;

  // Redireciona pro WhatsApp
  res.writeHead(302, { Location: link });
  res.end();
}
