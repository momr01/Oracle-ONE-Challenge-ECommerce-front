import { productosServices } from "../services/products-service.js";

const msjVacios = {
  //url: "Debe ingresar la url de la imagen",
  url: "Debe seleccionar un archivo de imagen",
  categoria: "Debe seleccionar una categoría",
  nombre: "Debe ingresar el nombre del producto",
  precio: "Debe ingresar el precio del producto",
  descripcion: "Debe ingresar una descripción del producto",
};

const iniciarProceso = async (data, agregar) => {
  if (agregar) {
    //console.log("agregar");
    const result = await productosServices.crearProducto(data);
    analizarResFinal(result, agregar);
  } else {
    const result = await productosServices.editarProducto(data);
    analizarResFinal(result, agregar);
  }
};

const analizarResFinal = async (result, agregar) => {
  if (result) {
    const exito = await Swal.fire({
      icon: "success",
      title: "Exito!",
      text: agregar ? "Producto creado exitosamente" : "Producto modificado",
      showConfirmButton: true,
      confirmButtonText: "Volver",
    });
    if (exito.isConfirmed) {
      window.location.href = "../screens/productos.html";
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se editó el producto. Por favor vuelva a intentarlo.",
      confirmButtonText: "Entendido",
    });
  }
};

const reflejarValidez = (input, index, err, data) => {
  if (!input.value) {
    input.classList.remove("input__border__green");
    input.classList.add("input__border__red");
    err[index].textContent = msjVacios[input.dataset.type];
    data[input.dataset.type] = "";
  } else {
    input.classList.remove("input__border__red");
    input.classList.add("input__border__green");
    err[index].textContent = "";
    if (input.dataset.type == "url") {
      const array = input.value.split("\\");
      const nombre = array[2];
      const ruta = `/assets/data/${nombre}`;

      data[input.dataset.type] = ruta;
    } else {
      data[input.dataset.type] = input.value;
    }
  }
};

const administrar = ({ inputs, form, data, err, agregar }) => {
  inputs.forEach((input, index) => {
    input.addEventListener("blur", () => {
      reflejarValidez(input, index, err, data);
    });

    input.addEventListener("keyup", () => {
      reflejarValidez(input, index, err, data);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      data.url !== "" &&
      data.categoria !== "" &&
      data.nombre !== "" &&
      data.precio !== "" &&
      data.descripcion !== ""
    ) {
      iniciarProceso(data, agregar);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor revise los datos ingresados",
        confirmButtonText: "Volver",
      });
    }
  });
};

export { administrar };
