import { productosServices } from "../services/products-service.js";
import { validarPrecio } from "../services/functions.js";

const categorias = ["TV-Series", "Movies", "Music"];
const mainSection = document.querySelector(".main__container");

const divCategoria = (text) => {
  const divCategoria = `<div class="section__productos__titulo__container"><h3 class="section__productos__titulo__titulo">${text}</h3>
  <a href="../screens/categoria-completa.html?id=${text}" class="section__productos__titulo__enlace">Ver todo</a>
  </div><div class="section__productos__cards"></div>`;
  return divCategoria;
};

const crearDiv = () => {
  const div = document.createElement("div");

  return div;
};

const getProductos = () => {
  productosServices
    .listaProductos()
    .then((data) =>
      data.forEach((dato) => {
        crearTarjetaProducto(dato);
      })
    )
    .catch((error) => console.log(error));
};

categorias.forEach((dato) => {
  const div = crearDiv();
  div.classList.add("section__productos");
  div.innerHTML = divCategoria(dato);
  mainSection.appendChild(div);
});

getProductos();

const crearTarjetaProducto = (data) => {
  const sectionProductos = document.querySelectorAll(".section__productos");

  sectionProductos.forEach((producto) => {
    const { url, nombre, precio, categoria, id, promocion } = data;
    const tituloCategoria = producto.firstChild.firstChild.textContent;

    if (categoria == tituloCategoria) {
      const div = crearDiv();
      div.classList.add("section__productos__cards__card");

      const precioFinal = validarPrecio(promocion, precio);

      const cardProducto = crearCard(url, nombre, precioFinal, id);
      div.innerHTML = cardProducto;

      producto.children[1].appendChild(div);
    }
  });
};

const crearCard = (url, nombre, precio, id) => {
  const card = `
 
  <img src="./${url}" alt="${nombre}" />
  <h5 class="section__productos__cards__card__titulo">
    ${nombre}
  </h5>
  <p class="section__productos__cards__card__precio">$ ${precio}</p>
  <a href="../screens/producto.html?id=${id}" class="section__productos__cards__card__enlace"
    >Ver producto</a
  >`;

  return card;
};
