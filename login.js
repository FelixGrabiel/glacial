const usuarios = [
  { usuario: "supervisor1", clave: "1234", rol: "Supervisor Producción" }, //supervisores
  { usuario: "calidad1", clave: "1234", rol: "Supervisor Calidad" }, // calidad
  { usuario: "jefeop", clave: "1234", rol: "Jefe de Operaciones" }, //Jesus Garcia
  { usuario: "liderhielo", clave: "1234", rol: "Líder de Línea Hielo" },// Lideres hielo, Sheyla, Felix, Francelys, Odwar
  { usuario: "lider agua", clave: "1234", rol: "Lider de Li­nea Agua" }, //Lider de agua Carlos, Yeikari, Yenni, Walter
  {usuario: "jefemantenimiento", clave: "1234", rol: "Jefe de Mantenimiento"}, //Adrian
  { usuario: "admin", clave: "admin", rol: "Administrador" } 
];

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);

  if (encontrado) {
    localStorage.setItem("usuario", JSON.stringify(encontrado));
    window.location.href = "index.html";
  } else {
    document.getElementById("mensaje").textContent = "Usuario o clave incorrectos";
  }
});
localStorage.setItem("usuario", JSON.stringify(encontrado));
window.location.href = "index.html";
function cerrarSesion() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario || !["Supervisor Producción", "Administrador"].includes(usuario.rol)) {
  window.location.href = "login.html";
}

