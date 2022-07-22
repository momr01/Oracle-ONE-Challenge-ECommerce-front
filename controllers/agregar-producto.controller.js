import { Info } from "../class/Info.js";
import { Producto } from "../class/Producto.js";
import { administrar } from "./adm-each-producto.controller.js";

let user = sessionStorage.getItem("rol");

const mostrarPagina = () => {
  const formulario = document.querySelector("#form__agregar__producto");
  const inputs = document.querySelectorAll("[data-type]");
  const divErrores = document.querySelectorAll(
    ".div__error__agregar__producto"
  );

  const dataNuevo = new Producto();

  const info = new Info(inputs, formulario, dataNuevo, divErrores, true);

  administrar(info);
};

if (user) {
  mostrarPagina();
} else {
  window.location.href = "/index.html";
}
