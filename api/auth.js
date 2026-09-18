const crypto = require("crypto");

const DURACION_TOKEN = 60 * 60;

function base64url(texto) {
  return Buffer.from(texto)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function firmar(datos) {
  const secreto = process.env.TOKEN_SECRET;

  if (!secreto) {
    throw new Error("TOKEN_SECRET no configurado");
  }

  return crypto
    .createHmac("sha256", secreto)
    .update(datos)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function crearToken(codigoFinca) {

  const ahora = Math.floor(Date.now() / 1000);

  const payload = {
    codigoFinca: String(codigoFinca).trim(),
    exp: ahora + DURACION_TOKEN
  };

  const datos = base64url(
    JSON.stringify(payload)
  );

  const firma = firmar(datos);

  return datos + "." + firma;
}

function verificarToken(token) {

  try {

    if (!token) {
      return null;
    }

    const partes = token.split(".");

    if (partes.length !== 2) {
      return null;
    }

    const datos = partes[0];
    const firmaRecibida = partes[1];

    const firmaEsperada = firmar(datos);

    const a = Buffer.from(firmaRecibida);
    const b = Buffer.from(firmaEsperada);

    if (
      a.length !== b.length ||
      !crypto.timingSafeEqual(a, b)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(datos, "base64").toString("utf8")
    );

    const ahora = Math.floor(Date.now() / 1000);

    if (!payload.exp || payload.exp < ahora) {
      return null;
    }

    return payload;

  } catch (error) {

    return null;
  }
}

module.exports = {
  crearToken,
  verificarToken
};
