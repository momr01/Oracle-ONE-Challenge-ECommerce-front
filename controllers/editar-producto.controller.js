import { productosServices } from "../services/products-service.js";
import { parametro } from "../services/functions.js";
import { administrar } from "./adm-each-producto.controller.js";
import { Info } from "../class/Info.js";
import { Producto } from "../class/Producto.js";

let user = sessionStorage.getItem("rol");

const mostrarPagina = () => {
  const id = parametro();

  const prepararEdicion = async () => {
    const formulario = document.querySelector("#form__agregar__producto");
    const inputs = document.querySelectorAll("[data-type]");
    const divErrores = document.querySelectorAll(
      ".div__error__editar__producto"
    );

    const dataEditar = new Producto(id);

    const res = await productosServices.getProducto(id);

    if (!res.id) {
      window.location.href = "../index.html";
    } else {
      inputs.forEach((input) => {
        if (input.dataset.type === "url") {
          input.filename = res[input.dataset.type];
        } else {
          input.value = res[input.dataset.type];
        }

        dataEditar[input.dataset.type] = res[input.dataset.type];
      });

      const info = new Info(inputs, formulario, dataEditar, divErrores, false);
      administrar(info);
    }
  };

  if (!id) {
    window.location.href = "../index.html";
  } else {
    prepararEdicion();
  }
};

if (user) {
  mostrarPagina();
} else {
  window.location.href = "/index.html";
}
