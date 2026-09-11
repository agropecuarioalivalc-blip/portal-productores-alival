export default async function handler(req, res) {
  try {
    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbziCfWdKFAXKBOg0vGD68w6fgva9uRuIqQ12KmnQqphaLJxPxjH1EZHa2E_zC9NZavBxQ/exec",
      {
        method: "POST"
      }
    );

    const texto = await respuesta.text();

    res.status(200).json({
      exito: true,
      respuestaAppsScript: texto
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
}
