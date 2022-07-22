import { urlMensajes } from "../helpers/url.js";

const crearMensaje = async ({ nombre, mensaje }) => {
  const response = await fetch(urlMensajes, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: uuid.v4(),
      nombre,
      mensaje,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response;
  }
};

export const contactoServices = {
  crearMensaje,
};
