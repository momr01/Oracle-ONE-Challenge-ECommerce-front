import { urlProductos } from "../helpers/url.js";

const listaProductos = () => fetch(urlProductos).then((res) => res.json());

const crearProducto = ({ url, categoria, nombre, precio, descripcion }) => {
  return fetch(urlProductos, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      categoria,
      nombre,
      precio,
      descripcion,
      id: uuid.v4(),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const getProducto = (id) =>
  fetch(`${urlProductos}/${id}`).then((res) => res.json());

const editarProducto = ({
  url,
  categoria,
  nombre,
  precio,
  descripcion,
  id,
}) => {
  return fetch(`${urlProductos}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      categoria,
      nombre,
      precio,
      descripcion,
    }),
  });
  //  .then((res) => console.log(res))
  //  .catch((err) => console.log(err));
};

const eliminarProducto = (id) => {
  return fetch(`${urlProductos}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const productosServices = {
  listaProductos,
  crearProducto,
  getProducto,
  editarProducto,
  eliminarProducto,
};
