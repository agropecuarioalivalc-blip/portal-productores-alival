module.exports = async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        exito: false,
        mensaje: "Método no permitido"
      });
    }

    const { codigoFinca } = req.body || {};

    if (!codigoFinca) {
      return res.status(400).json({
        exito: false,
        mensaje: "Código de finca obligatorio"
      });
    }

    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbziCfWdKFAXKBOg0vGD68w6fgva9uRuIqQ12KmnQqphaLJxPxjH1EZHa2E_zC9NZavBxQ/exec",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          accion: "comunicaciones",
          codigoFinca: String(codigoFinca).trim()
        })
      }
    );

    const texto = await respuesta.text();

    return res.status(200).json({
      prueba: true,
      estadoGoogle: respuesta.status,
      urlFinal: respuesta.url,
      tipoContenido:
        respuesta.headers.get("content-type"),
      respuestaInicio:
        texto.substring(0, 1000)
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      mensaje: error.message
    });

  }

};
