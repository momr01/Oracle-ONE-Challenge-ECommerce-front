const btnCerrarSesion = document.querySelector("#btn__cerrar__sesion");

btnCerrarSesion.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "/index.html";
});
