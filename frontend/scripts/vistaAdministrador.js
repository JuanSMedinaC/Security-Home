const imagenExit = document.getElementById("exit");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
