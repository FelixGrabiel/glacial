document.getElementById("form-produccion-agua").addEventListener("submit", function (e) {
  e.preventDefault();

  const registro = {
    fecha: document.getElementById("fecha").value,
    turno: document.getElementById("turno").value,
    linea: document.getElementById("linea").value,
    produccion_pet: document.getElementById("produccion_pet").value,
    marca_pet: document.getElementById("marca_pet").value,
    bidon_7: document.getElementById("bidon_7").value,
    marca_bidon7: document.getElementById("marca_bidon7").value,
    bidon_20: document.getElementById("bidon_20").value,
    marca_bidon20: document.getElementById("marca_bidon20").value,
    caja_20: document.getElementById("caja_20").value,
    marca_caja20: document.getElementById("marca_caja20").value,
    responsable: document.getElementById("responsable").value,
    usuario: JSON.parse(localStorage.getItem("usuario")).usuario,
    fechaHoraRegistro: new Date().toLocaleString()
  };

  const registros = JSON.parse(localStorage.getItem("produccionAgua")) || [];
  registros.push(registro);
  localStorage.setItem("produccionAgua", JSON.stringify(registros));

  document.getElementById("mensaje").textContent = "✅ Registro guardado exitosamente.";
  this.reset();
});
    
