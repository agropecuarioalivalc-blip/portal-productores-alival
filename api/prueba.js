import { crearToken } from "./auth.js";
import { verificarToken } from "./auth.js";

export default async function handler(req, res) {
  try {

    // 1. Probar login directamente contra Apps Script

    const respuestaLogin = await fetch(
      "https://script.google.com/macros/s/AKfycbziCfWdKFAXKBOg0vGD68w6fgva9uRuIqQ12KmnQqphaLJxPxjH1EZHa2E_zC9NZavBxQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigoFinca: "1054",
          pin: "21489"
        })
      }
    );

    const resultadoLogin =
      await respuestaLogin.json();

    if (!resultadoLogin.exito) {
      return res.status(200).json({
        exito: false,
        etapa: "login",
        mensaje: resultadoLogin.mensaje
      });
    }

    // 2. Crear token

    const token =
      crearToken(resultadoLogin.codigoFinca);

    // 3. Verificar token

    const sesion =
      verificarToken(token);

    // 4. Probar documentos

    const respuestaDocumentos = await fetch(
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

    const resultadoDocumentos =
      await respuestaDocumentos.json();

    return res.status(200).json({
      exito: true,

      login: {
        exito: resultadoLogin.exito,
        codigoFinca: resultadoLogin.codigoFinca
      },

      token: {
        generado: !!token,
        longitud: token.length,
        verificado: !!sesion
      },

      documentos: {
        estadoHTTP: respuestaDocumentos.status,
        exito: resultadoDocumentos.exito,
        cantidad: resultadoDocumentos.documentos
          ? resultadoDocumentos.documentos.length
          : 0,
        mensaje: resultadoDocumentos.mensaje || ""
      }
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      mensaje: error.message
    });

  }
}
