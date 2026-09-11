export default async function handler(req, res) {
  try {

    const respuesta = await fetch(
      "https://portal-de-productores-alival.vercel.app/api/documentos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigoFinca: "1054"
        })
      }
    );

    const resultado = await respuesta.json();

    return res.status(200).json({
      exito: true,
      respuestaDocumentos: resultado
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      error: error.message
    });
  }
}
