import { Mensaje } from "../class/Mensaje.js";
import { contactoServices } from "../services/contacto-service.js";

const formulario = document.querySelector(".section__contacto__form");
const inputs = document.querySelectorAll(".contacto__input");
const divMensajes = document.querySelectorAll(".mensaje__error__contacto");

const msj = {
  nombre: "Ingrese un nombre válido que contenga como máximo 40 caracteres",
  mensaje: "Ingrese un mensaje válido que contenga como máximo 120 caracteres",
};

const limite = {
  nombre: 40,
  mensaje: 120,
};

const formData = {
  nombre: "",
  mensaje: "",
};

const validar = (input, index) => {
  if (
    input.value.length > limite[input.dataset.contacto] ||
    input.value.length == 0
  ) {
    console.log("error");
    input.classList.remove("input__border__green");
    input.classList.add("input__border__red");
    divMensajes[index].textContent = msj[input.dataset.contacto];
    formData[input.dataset.contacto] = "";
  } else {
    input.classList.remove("input__border__red");
    input.classList.add("input__border__green");
    divMensajes[index].textContent = "";
    formData[input.dataset.contacto] = input.value;
  }
};

inputs.forEach((input, index) => {
  input.addEventListener("blur", () => {
    validar(input, index);
  });

  input.addEventListener("keyup", () => {
    validar(input, index);
  });
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (formData.nombre === "" || formData.mensaje === "") {
    console.log("error");
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor revise los datos ingresados",
      confirmButtonText: "Volver",
    });
  } else {
    console.log("enviado");
    const mensaje = new Mensaje(formData.nombre, formData.mensaje);

    console.log(mensaje);

    contactoServices
      .crearMensaje(mensaje)
      .then((res) => {
        formulario.reset();
        inputs.forEach((input) => {
          input.classList.remove("input__border__green");
        });
        formData.nombre = "";
        formData.mensaje = "";
        window.location.href = "../screens/success-cliente.html";
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error. No se enviaron los datos.",
          confirmButtonText: "Volver",
        });
      });
}});
