import { getProductos, crearDivCard } from "../services/functions.js";

let user = sessionStorage.getItem("rol");

const mostrarPagina = () => {
  const mostrarInfo = (data) => {
    crearDivCard(data, contenido);
  };

  const contenido = ( url, nombre, precio, id ) => {
    const card = `
      <div class="section__all__productos__cards__card">
      <a href="../screens/borrar-producto.html?id=${id}"><img src="../assets/delete.svg" class="section__all__products__cards__card__delete" alt=""></a>
                          <a href="../screens/editar-producto.html?id=${id}"><img src="../assets/edit.svg" class="section__all__products__cards__card__edit" alt=""></a>
                          <img src="../${url}" class="section__all__products__cards__card__img" alt="" />
                      </div>
                      
                      <h5 class="section__productos__cards__card__titulo">
                        ${nombre}
                      </h5>
                      <p class="section__productos__cards__card__precio">$ ${precio}</p>
                      <p class="section__productos__cards__card__id">#${id}</p>`;

    return card;
  };

  getProductos(mostrarInfo);
};

if (user) {
  mostrarPagina();
} else {
  window.location.href = "/index.html";
}
