import { urlUsuarios } from "../helpers/url.js";

const listaUsuarios = () =>
  fetch(urlUsuarios).then((res) => res.json());

export const usuarioServices = {
  listaUsuarios,
};
