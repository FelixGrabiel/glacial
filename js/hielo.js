document.getElementById("form-produccion-hielo").addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = {
    fecha: document.getElementById("fecha").value,
    turno: document.getElementById("turno").value,
    linea: document.getElementById("linea").value,
    marca_hielo: document.getElementById("marca_hielo").value,
    maquina: document.getElementById("maquina").value,
    tiempo: parseFloat(document.getElementById("tiempo").value),
    paletas: parseInt(document.getElementById("paletas").value),
    lote: document.getElementById("lote").value,
    vencimiento: document.getElementById("vencimiento").value,
    peso: parseFloat(document.getElementById("peso").value),
    unidades: parseInt(document.getElementById("unidades").value),
    responsable: document.getElementById("responsable").value
  };

  const registros = JSON.parse(localStorage.getItem("produccion_hielo")) || [];
  registros.push(datos);
  localStorage.setItem("produccion_hielo", JSON.stringify(registros));

  alert("✅ Registro de producción de hielo guardado exitosamente.");
  this.reset();
});
