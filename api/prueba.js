export default function handler(request) {
  return Response.json({
    exito: true,
    mensaje: "La función de Vercel funciona correctamente"
  });
}