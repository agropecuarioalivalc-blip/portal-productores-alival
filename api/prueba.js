import { crearToken } from "./auth.js";

export default async function handler(req, res) {
  try {

    const token = crearToken("1054");

    const respuesta = await fetch(
      "https://portal-de-productores-alival.vercel.app/api/documentos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          codigoFinca: "1054"
        })
      }
    );

    const texto =
      await respuesta.text();

    return res.status(200).json({
      exito: true,
      estadoHTTP: respuesta.status,
      respuesta: texto
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      error: error.message
    });

  }
}
