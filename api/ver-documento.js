module.exports = async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        exito: false,
        mensaje: "Método no permitido"
      });
    }

    const { codigoFinca, anio, mes } = req.body || {};

    if (!codigoFinca || !anio || !mes) {
      return res.status(400).json({
        exito: false,
        mensaje: "Código de finca, año y mes son obligatorios"
      });
    }

    const codigoSolicitado =
      String(codigoFinca).trim();

    const anioSolicitado =
      String(anio).trim();

    const mesSolicitado =
      String(mes).trim().toUpperCase();


    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbziCfWdKFAXKBOg0vGD68w6fgva9uRuIqQ12KmnQqphaLJxPxjH1EZHa2E_zC9NZavBxQ/exec",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          accion: "verDocumento",
          codigoFinca: codigoSolicitado,
          anio: anioSolicitado,
          mes: mesSolicitado
        })
      }
    );


    const texto =
      await respuesta.text();


    let resultado;

    try {

      resultado =
        JSON.parse(texto);

    } catch (error) {

      return res.status(500).json({
        exito: false,
        mensaje:
          "Apps Script no devolvió JSON válido: " +
          texto.substring(0, 500)
      });

    }


    if (!resultado.exito) {

      return res.status(200).json({
        exito: false,
        mensaje:
          resultado.mensaje ||
          "Apps Script no pudo obtener el documento."
      });

    }


    return res.status(200).json({

      exito: true,

      codigoFinca:
        resultado.codigoFinca,

      anio:
        resultado.anio,

      mes:
        resultado.mes,

      tipoDocumento:
        resultado.tipoDocumento,

      nombreArchivo:
        resultado.nombreArchivo,

      tipoMime:
        resultado.tipoMime,

      archivoBase64:
        resultado.archivoBase64

    });


  } catch (error) {

    return res.status(500).json({

      exito: false,

      mensaje:
        "ERROR INTERNO VERCEL: " +
        error.message

    });

  }

};
