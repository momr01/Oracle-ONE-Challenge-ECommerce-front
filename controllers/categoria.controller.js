import {
  getProductos,
  parametro,
  crearDivCard,
} from "../services/functions.js";

const mainCategory = parametro();
const tituloCategoria = document.querySelector("#categoria__titulo");
tituloCategoria.textContent = mainCategory;

const verMatch = (prod) => {
  if (prod.categoria == mainCategory) {
    crearDivCard(prod, contenido);
  }
};

const contenido = (url, nombre, precio, id) => {
  const card = `
    <div class="section__all__productos__cards__card">
                        <img src="../${url}" class="section__all__products__cards__card__img" alt="" />
                    </div>
                    
                    <h5 class="section__productos__cards__card__titulo">
                      ${nombre}
                    </h5>
                    <p class="section__productos__cards__card__precio">$ ${precio}</p>
                    <a href="../screens/producto.html?id=${id}" class="section__productos__cards__card__enlace"
    >Ver producto</a
  >`;

  return card;
};

getProductos(verMatch);
