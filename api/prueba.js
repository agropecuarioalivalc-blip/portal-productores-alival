export default async function handler(req, res) {
  try {
    const respuesta = await fetch(
      "https://portal-de-productores-alival.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigoFinca: "PRUEBA",
          pin: "00000"
        })
      }
    );

    const resultado = await respuesta.json();

    return res.status(200).json({
      pruebaVercelLogin: true,
      respuestaLogin: resultado
    });

  } catch (error) {
    return res.status(500).json({
      pruebaVercelLogin: false,
      error: error.message
    });
  }
}
