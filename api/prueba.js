import { crearToken, verificarToken } from "./auth.js";

export default async function handler(req, res) {
  try {

    const token = crearToken("1054");

    const sesion = verificarToken(token);

    return res.status(200).json({
      exito: true,
      tokenGenerado: !!token,
      longitudToken: token.length,
      tokenValido: !!sesion,
      codigoFinca: sesion
        ? sesion.codigoFinca
        : null
    });

  } catch (error) {

    return res.status(500).json({
      exito: false,
      error: error.message
    });

  }
}
