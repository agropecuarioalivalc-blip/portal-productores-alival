export default async function handler(req, res) {
  try {
    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbziCfWdKFAXKBOg0vGD68w6fgva9uRuIqQ12KmnQqphaLJxPxjH1EZHa2E_zC9NZavBxQ/exec",
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

    res.status(200).json({
      exito: true,
      respuestaAppsScript: resultado
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
}
