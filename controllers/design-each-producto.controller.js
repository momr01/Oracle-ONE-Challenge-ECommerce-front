import { productosServices } from "../services/products-service.js";
import {
  parametro,
  getProductos,
  validarPrecio,
} from "../services/functions.js";

const id = parametro();

const divContainer = document.querySelector(
  ".section__each__product__container"
);

productosServices
  .getProducto(id)
  .then((res) => {
    crearContenedor(res);
    mostrarSimilares(res);
  })
  .catch((err) => console.log(err));

const crearContenedor = ({ url, nombre, precio, descripcion, promocion }) => {
  const section = document.createElement("section");
  section.classList.add("section__product__data__container");

  const precioFinal = validarPrecio(promocion, precio);

  const info = `<div class="section__product__data__img">
            <img src="../${url}" alt="${nombre}" />
          </div>
          <div class="section__product__data__texto">
            <h3>${nombre}</h3>
            <h5>$ ${precioFinal}</h5>
            <p>${descripcion}</p>
          </div>`;

  section.innerHTML = info;
  divContainer.appendChild(section);
};

const mostrarSimilares = ({ categoria }) => {
  console.log(categoria);
  const section = document.createElement("section");
  section.classList.add("section__product__similares__container");

  section.innerHTML = `<div class="section__product__similares__titulo">
  <h3>Productos similares</h3>
</div>
<div class="section__productos__cards"></div>`;

  divContainer.appendChild(section);

  const crearSimilares = (dato) => {
    if (dato.id !== id) crearTarjetaProducto(dato, categoria);
  };

  getProductos(crearSimilares);
};

const crearTarjetaProducto = (data, first) => {
  const { categoria } = data;
  const section = document.querySelector(
    ".section__product__similares__container"
  );

  const precioFinal = validarPrecio(data.promocion, data.precio);

  if (categoria == first) {
    const div = document.createElement("div");
    div.classList.add("section__productos__cards__card");

    const texto = contenido(data.url, data.nombre, precioFinal, data.id);
    div.innerHTML = texto;

    section.children[1].appendChild(div);
  }
};

const contenido = (url, nombre, precio, id ) => {
  const card = `
  <img src="../${url}" alt="${nombre}" />
  <h5 class="section__productos__cards__card__titulo">
    ${nombre}
  </h5>
  <p class="section__productos__cards__card__precio">$ ${precio}</p>
  <a href="../screens/producto.html?id=${id}" class="section__productos__cards__card__enlace"
    >Ver producto</a
  >`;

  return card;
};
