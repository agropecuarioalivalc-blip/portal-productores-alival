export default async function handler(req, res) {
  try {

    const respuesta = await fetch(
      "https://portal-de-productores-alival.vercel.app/api/ver-documento",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigoFinca: "1054",
          anio: 2026,
          mes: "AGOSTO"
        })
      }
    );

    const resultado = await respuesta.json();

    return res.status(200).json({
      exito: true,
      respuestaDocumento: {
        exito: resultado.exito,
        nombreArchivo: resultado.nombreArchivo,
        tipoMime: resultado.tipoMime,
        tieneBase64: !!resultado.archivoBase64,
        longitudBase64: resultado.archivoBase64
          ? resultado.archivoBase64.length
          : 0
      }
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      mensaje: error.message
    });

  }
}
