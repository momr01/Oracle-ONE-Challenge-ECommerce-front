import { usuarioServices } from "../services/usuario-service.js";

let user = sessionStorage.getItem("rol");

const mostrarPagina = () => {
  const formulario = document.querySelector(".section__form");
  const inputs = document.querySelectorAll("[data-type]");
  const divMensajes = document.querySelectorAll(".mensaje__error__login");

  const msjVacios = {
    email: "Debe ingresar un correo electrónico válido",
    password: "Debe ingresar una contraseña",
  };

  const msjErroneos = {
    email: "El email ingresado no es válido",
    password:
      "La contraseña ingresada no es válida. Debe respetar el orden: 5 letras + 2 números + 1 símbolo.",
  };

  const expresiones = {
    email: "^([a-z0-9]+)[._-]?([a-z0-9]?)+[@][a-z]+[.][a-z]+[.]?[a-z]+$",
    password: "[a-z]{5}[0-9]{2}[\\W]{1}",
  };

  const dataLogin = {
    email: "",
    password: "",
  };

  const pintarInput = (input, index, prueba) => {
    if (!input.value) {
      console.log(msjVacios[input.dataset.type]);
      input.classList.add("input__border__red");
      divMensajes[index].textContent = msjVacios[input.dataset.type];
    } else if (prueba.test(input.value)) {
      input.classList.add("input__border__green");
      divMensajes[index].textContent = "";
      dataLogin[input.dataset.type] = input.value;
    } else {
      input.classList.remove("input__border__green");
      input.classList.add("input__border__red");
      divMensajes[index].textContent = msjErroneos[input.dataset.type];
      dataLogin[input.dataset.type] = "";
    }
  };

  const validarBD = async ({ email, password }) => {
    let resultado = [];
    //console.log(data);
    const response = await usuarioServices.listaUsuarios();

    if (response.length > 0) {
      response.forEach((res) => {
        // console.log(res.email);
        // console.log(email);
        // console.log(res.password);
        // console.log(password);
        if (res.email === email && res.password === password) {
          resultado.push(res.rol);
        }
      });
    }

    return resultado;
  };

  const alertaError = () => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Revise los datos ingresados y vuelva a intentarlo.",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  inputs.forEach((input, index) => {
    const prueba = new RegExp(expresiones[input.dataset.type]);

    input.addEventListener("blur", () => {
      pintarInput(input, index, prueba);
    });

    input.addEventListener("keyup", () => {
      pintarInput(input, index, prueba);
    });
  });

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (dataLogin.email !== "" && dataLogin.password !== "") {
      console.log("ENVIADO");

      const resultado = await validarBD(dataLogin);

      // console.log(resultado.length);

      if (resultado.length == 1) {
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: "Redireccionando...",
          showConfirmButton: false,
          timer: 3000,
        }).then((res) => {
          sessionStorage.setItem("rol", resultado);
          window.location.href = "../screens/productos.html";
        });
      } else {
        alertaError();
      }

      // console.log(valido);

      // if (valido) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Exito!",
      //     text: "Redireccionando...",
      //     showConfirmButton: false,
      //     timer: 3000,
      //   }).then((res) => {
      //     window.location.href = "../screens/productos.html";
      //   });
      // }

      // Swal.fire({
      //   icon: "success",
      //   title: "Exito!",
      //   text: "Redireccionando...",
      //   showConfirmButton: false,
      //   timer: 3000,
      // }).then((res) => {
      //   window.location.href = "../screens/productos.html";
      // });
    } else {
      console.log("NO ENVIADO");
      // Swal.fire({
      //   icon: "error",
      //   title: "Error!",
      //   text: "Revise los datos ingresados y vuelva a intentarlo.",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      alertaError();
    }
  });
};

if (user) {
  window.location.href = "../screens/productos.html";
} else {
  mostrarPagina();
}
