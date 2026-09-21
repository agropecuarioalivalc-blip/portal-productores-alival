export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        exito: false,
        mensaje: "Método no permitido"
      });
    }

    const { codigoFinca, pin } = req.body || {};

    if (!codigoFinca || !pin) {
      return res.status(400).json({
        exito: false,
        mensaje: "Código de finca y PIN son obligatorios"
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
          codigoFinca: String(codigoFinca).trim(),
          pin: String(pin).trim()
        })
      }
    );

    const resultado = await respuesta.json();

    if (!resultado.exito) {
      return res.status(200).json(resultado);
    }

    const token = crearToken(
      resultado.codigoFinca
    );

    return res.status(200).json({
  exito: true,
  productor: resultado.productor,
  codigoFinca: resultado.codigoFinca,
  nombreFinca: resultado.nombreFinca
});

  } catch (error) {

    return res.status(500).json({
      exito: false,
      mensaje: "No fue posible procesar la solicitud"
    });

  }
}
