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

    // =========================
    // VERIFICAR SESIÓN
    // =========================

    const codigoSolicitado =
  String(codigoFinca).trim();

    // =========================
    // CONSULTAR PDF
    // =========================

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
          anio: anio,
          mes: String(mes).trim().toUpperCase()
        })
      }
    );

    const resultado =
      await respuesta.json();

    return res.status(
      respuesta.ok ? 200 : 500
    ).json(resultado);

  } catch (error) {

    return res.status(500).json({
      exito: false,
      mensaje: "No fue posible obtener el documento"
    });

  }
}
