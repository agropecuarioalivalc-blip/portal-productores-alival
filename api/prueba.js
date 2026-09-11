export default function handler(req, res) {
  res.status(200).json({
    exito: true,
    mensaje: "La función de Vercel funciona correctamente"
  });
}
