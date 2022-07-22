import { parametro } from "../services/functions.js";
import { productosServices } from "../services/products-service.js";

const id = parametro();

const btnEliminar = document.querySelector("#btn__eliminar__producto");
const btnVolver = document.querySelector("#btn__cancelar__producto");

const iniciarProceso = () => {
  btnEliminar.addEventListener("click", () => {
    console.log("Eliminado");

    if (id) {
      eliminar(id);
    } else {
      mostrarError();
    }
  });

  btnVolver.addEventListener("click", async () => {
    const error = await Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se borró el producto.",
      confirmButtonText: "Volver",
    });

    if (error.isConfirmed) window.location.href = "../screens/productos.html";
  });
};

const mostrarError = () => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Ocurrió un error. Vuelva a intentar",
    confirmButtonText: "Volver",
  }).then((res) => {
    if (res.isConfirmed) {
      window.location.href = "../screens/productos.html";
    } else {
      window.location.href = "../index.html";
    }
  });
};

const eliminar = async (id) => {
  const result = await productosServices.eliminarProducto(id);

  if (result) {
    //window.location.href = "../screens/productos.html";
    const exito = await Swal.fire({
      icon: "success",
      title: "Exito!",
      text: "Se eliminó el producto",
      showConfirmButton: true,
      confirmButtonText: "Volver",
    });
    if (exito.isConfirmed) {
      window.location.href = "../screens/productos.html";
    }
  } else {
    mostrarError();
  }
};

if (!id) {
  window.location.href = "../index.html";
} else {
  const res = await productosServices.getProducto(id);

  const nombreProd = document.querySelector(
    ".section__eliminar__nombre__producto"
  );
  const idProd = document.querySelector(".section__eliminar__id__producto");

  if (res.id) {
    nombreProd.textContent = res.nombre;
    idProd.textContent = res.id;
    iniciarProceso();
  } else {
    window.location.href = "../index.html";
  }
}
