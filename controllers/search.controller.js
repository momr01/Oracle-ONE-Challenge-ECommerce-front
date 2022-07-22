import { productosServices } from "../services/products-service.js";

//const btn = document.querySelector("#search__img__btn");
const input = document.querySelector("#search__input");
const tituloCuadroBusqueda = document.querySelector(".cuadro__titulo");
const containerCards = document.querySelector(".cards__container__search");
const resSearchContainer = document.querySelector(
  ".resultados__busqueda__container__disabled"
);

let arrayProductos = [];

const expresion = new RegExp("^[A-Za-z]+$");

const habilitarContainer = () => {
  resSearchContainer.classList.remove(
    ".resultados__busqueda__container__disabled"
  );
  resSearchContainer.classList.add("resultados__busqueda__container");
};

const deshabilitarContainer = () => {
  resSearchContainer.classList.add(
    ".resultados__busqueda__container__disabled"
  );
  resSearchContainer.classList.remove("resultados__busqueda__container");
};

const validarTexto = (input, event) => {
  if (input.value.length > 3 && event.key !== "Meta") {
    habilitarContainer();
    comenzarBusqueda(input.value);
  } else {
    habilitarContainer();
    tituloCuadroBusqueda.textContent = "Ningún resultado";
    containerCards.innerHTML = "";
  }
};

input.addEventListener("keyup", (e) => {
  containerCards.innerHTML = "";
  validarTexto(input, e);
});

document.addEventListener("click", (e) => {
  if (!containerCards.contains(e.target)) {
    containerCards.innerHTML = "";
    deshabilitarContainer();
  }
});

/*btn.addEventListener("click", () => {
  if (input.value.length > 3) {
    comenzarBusqueda(input.value);
  } else {
    tituloCuadroBusqueda.textContent = "Ningún resultado";
    containerCards.innerHTML = "";
  }
});*/

const comenzarBusqueda = (text) => {
  let arrayIds = [];

  productosServices
    .listaProductos()
    .then((res) => {
      res.forEach((dato) => {
        let categoria = dato.categoria.toLowerCase();
        let nombre = dato.nombre.toLowerCase();
        let descripcion = dato.descripcion.toLowerCase();

        if (
          categoria.includes(text.toLowerCase()) ||
          nombre.includes(text.toLowerCase()) ||
          descripcion.includes(text.toLowerCase())
        ) {
          arrayIds.push(dato.id);
          arrayProductos.push(dato);

          const data = {
            arr: arrayIds,
            nombre: dato.nombre,
            url: dato.url,
            id: dato.id,
          };

          //eliminarDuplicados(array, dato.nombre, dato.url, dato.id);
          eliminarDuplicados(data);
        }
      });
    })
    .catch((err) => console.log(err));
};

const eliminarDuplicados = (data) => {
  const dataArr = new Set(data.array);
  let result = [...dataArr];

  data.array = result;

  mostrarResultados(data);
};

const mostrarResultados = ({ nombre, url, id }) => {
  tituloCuadroBusqueda.textContent = "Resultados";

  const div = document.createElement("div");
  div.classList.add("prueba");
  div.innerHTML = `<div class="img__container"><img src="../${url}" /></div>
  <div class="resultados__texto__container"><h4 class="resultados__texto__titulo">${nombre}</h4><a class="resultados__texto__enlace" href="../screens/producto.html?id=${id}">Ver producto</a></div>`;

  containerCards.appendChild(div);
};
