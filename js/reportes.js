document.addEventListener("DOMContentLoaded", () => {
  const agua = JSON.parse(localStorage.getItem("produccion_agua")) || [];
  const hielo = JSON.parse(localStorage.getItem("produccion_hielo")) || [];

  // Llenar tablas
  llenarTabla("tabla-agua", agua, [
    "fecha", "turno", "linea", "marca_pet", "bidon_7", "marca_bidon7",
    "bidon_20", "marca_bidon20", "caja_20", "marca_caja20", "responsable"
  ]);

  llenarTabla("tabla-hielo", hielo, [
    "fecha", "turno", "linea", "marca_hielo", "maquina", "tiempo",
    "paletas", "lote", "vencimiento", "peso", "unidades", "responsable"
  ]);

  // Gráficos de Agua
  generarGraficoBarras("graficoAguaPorMarca", contarPorMarca(agua), "Producción por Marca", "#66b3ff");
  generarGraficoTorta("graficoAguaPorLinea", contarPorCampo(agua, "linea"), "Producción por Línea");

  // Gráficos de Hielo
  generarGraficoBarras("graficoHieloPorMarca", contarPorMarca(hielo), "Producción por Marca", "#007bff");
  generarGraficoBarras("graficoHieloPorPresentacion", contarPorCampo(hielo, "linea"), "Presentación");
  generarGraficoComparativo("graficoHieloPorTurno", hielo, "turno", "peso", "Producción por Turno");
  generarGraficoBarras("graficoHieloBolsasPorHora", calcularBolsasPorHora(hielo), "Bolsas por Hora", "#17a2b8");
  generarGraficoBarras("graficoHieloEficiencia", calcularEficiencia(hielo), "Eficiencia por Máquina (%)", "#28a745");
});

function llenarTabla(id, datos, campos) {
  const tbody = document.querySelector(`#${id} tbody`);
  if (!tbody) return;
  tbody.innerHTML = "";
  datos.forEach(dato => {
    const fila = document.createElement("tr");
    campos.forEach(campo => {
      const td = document.createElement("td");
      td.textContent = dato[campo] || "";
      fila.appendChild(td);
    });
    tbody.appendChild(fila);
  });
}

function contarPorCampo(arr, campo) {
  return arr.reduce((acc, item) => {
    const key = item[campo];
    if (key) acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function contarPorMarca(arr) {
  const marcas = {};
  arr.forEach(item => {
    ["marca_pet", "marca_bidon7", "marca_bidon20", "marca_caja20", "marca_hielo"].forEach(campo => {
      const marca = item[campo];
      if (marca) marcas[marca] = (marcas[marca] || 0) + 1;
    });
  });
  return marcas;
}

function generarGraficoBarras(id, datos, label, color = "#4caf50") {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(datos),
      datasets: [{
        label: label,
        data: Object.values(datos),
        backgroundColor: color
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

function generarGraficoTorta(id, datos, label) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(datos),
      datasets: [{
        label: label,
        data: Object.values(datos),
        backgroundColor: Object.keys(datos).map(() => randomColor())
      }]
    },
    options: { responsive: true }
  });
}

function generarGraficoComparativo(id, datos, campoFiltro, campoValor, label) {
  const ctx = document.getElementById(id);
  if (!ctx) return;

  const grupos = {};
  datos.forEach(d => {
    const grupo = d[campoFiltro];
    grupos[grupo] = (grupos[grupo] || 0) + (parseFloat(d[campoValor]) || 0);
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(grupos),
      datasets: [{
        label: label,
        data: Object.values(grupos),
        backgroundColor: ["#66b3ff", "#4caf50", "#f39c12"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

function calcularBolsasPorHora(hielo) {
  const porMaquina = {};
  hielo.forEach(entry => {
    const maquina = entry.maquina;
    const tiempo = parseFloat(entry.tiempo || 0);
    const unidades = parseFloat(entry.unidades || 0);
    if (maquina && tiempo > 0) {
      const bolsasHora = unidades / tiempo;
      porMaquina[maquina] = bolsasHora;
    }
  });
  return porMaquina;
}

function calcularEficiencia(hielo) {
  const eficiencia = {};
  hielo.forEach(entry => {
    const maquina = entry.maquina;
    const paletas = parseFloat(entry.paletas || 0);
    const tiempo = parseFloat(entry.tiempo || 0);
    if (maquina && tiempo > 0) {
      const valor = (paletas / tiempo) * 100;
      eficiencia[maquina] = Math.round(valor * 100) / 100;
    }
  });
  return eficiencia;
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
