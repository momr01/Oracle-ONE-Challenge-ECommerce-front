import { productosServices } from "./products-service.js";

//obtener todos los productos y ejecutar una funcion
const getProductos = (execFuncion) => {
  productosServices
    .listaProductos()
    .then((data) =>
      data.forEach((dato) => {
        execFuncion(dato);
      })
    )
    .catch((error) => console.log(error));
};

//obtener parametro de la url
const parametro = () => {
  const url = window.location.search;
  const array = url.split("=");
  const parametro = array[1];

  return parametro;
};

const crearDivCard = (data, contenido) => {
  const section = document.querySelector(".section__all__productos__cards");
  const div = document.createElement("div");
  div.classList.add("section__all__productos__cards__card__container");
  const precioFinal = validarPrecio(data.promocion, data.precio)
  const texto = contenido(data.url, data.nombre, precioFinal, data.id);
  div.innerHTML = texto;

  section.appendChild(div);
};

const validarPrecio = (promocion, precio) => {
  let nuevoPrecio = null;
  if (!promocion || promocion == false) {
    nuevoPrecio = precio;
  } else {
    nuevoPrecio = precio - precio * 0.5;
  }

  return nuevoPrecio;
};

export { getProductos, parametro, crearDivCard, validarPrecio };
