function calcular() {

  // 1. Leer ingresos
  const ingresos = {
    M: Number(document.getElementById("ing_M").value),
    N: Number(document.getElementById("ing_N").value),
    V: Number(document.getElementById("ing_V").value),
    NY: Number(document.getElementById("ing_NY").value)
  };

  // 2. Leer gastos
  const gastoGatos = Number(document.getElementById("gatos").value);
  const gastoPerro = Number(document.getElementById("perro").value);

  // 3. Definir grupos
  const grupoGatos = ["M", "N", "V", "NY"];
  const grupoPerro = ["M", "N", "NY"];

  // 4. Sumar ingresos por grupo
  const totalGatos = grupoGatos.reduce((suma, p) => suma + ingresos[p], 0);
  const totalPerro = grupoPerro.reduce((suma, p) => suma + ingresos[p], 0);

  // 5. Inicializar pagos
  const pagos = {
    M: { gatos: 0, perro: 0 },
    N: { gatos: 0, perro: 0 },
    V: { gatos: 0, perro: 0 },
    NY: { gatos: 0, perro: 0 }
  };

  // 6. Calcular pagos para gatos
  grupoGatos.forEach(p => {
    pagos[p].gatos = +(ingresos[p] / totalGatos * gastoGatos).toFixed(2);
  });

  // 7. Calcular pagos para perro
  grupoPerro.forEach(p => {
    pagos[p].perro = +(ingresos[p] / totalPerro * gastoPerro).toFixed(2);
  });

  // 8. Verificación
  const sumaGatos = grupoGatos.reduce((s, p) => s + pagos[p].gatos, 0);
  const sumaPerro = grupoPerro.reduce((s, p) => s + pagos[p].perro, 0);

  console.log("Pagos calculados:", pagos);
  console.log("Verificación gatos:", sumaGatos, "vs", gastoGatos);
  console.log("Verificación perro:", sumaPerro, "vs", gastoPerro);

    // 9. Mostrar resultados en la tabla
  const tbody = document.getElementById("resultado");
  tbody.innerHTML = "";

  for (let persona in pagos) {
    const pagoGatos = pagos[persona].gatos;
    const pagoPerro = pagos[persona].perro;
    const total = pagoGatos + pagoPerro;

    const fila = `
      <tr>
        <td>${persona}</td>
        <td>$${pagoGatos.toFixed(2)}</td>
        <td>$${pagoPerro.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    `;

    tbody.innerHTML += fila;
  }
    // 10. Guardar último cálculo
  const estado = {
    ingresos,
    gastoGatos,
    gastoPerro,
    pagos
  };

  localStorage.setItem("manutencionMascotas", JSON.stringify(estado));

}

window.onload = function () {
  const estadoGuardado = localStorage.getItem("manutencionMascotas");

  if (!estadoGuardado) return;

  const estado = JSON.parse(estadoGuardado);

  // Restaurar inputs
  document.getElementById("ing_M").value = estado.ingresos.M;
  document.getElementById("ing_N").value = estado.ingresos.N;
  document.getElementById("ing_V").value = estado.ingresos.V;
  document.getElementById("ing_NY").value = estado.ingresos.NY;

  document.getElementById("gatos").value = estado.gastoGatos;
  document.getElementById("perro").value = estado.gastoPerro;

  // Volver a mostrar resultados
  const tbody = document.getElementById("resultado");
  tbody.innerHTML = "";

  for (let persona in estado.pagos) {
    const pagoGatos = estado.pagos[persona].gatos;
    const pagoPerro = estado.pagos[persona].perro;
    const total = pagoGatos + pagoPerro;

    tbody.innerHTML += `
      <tr>
        <td>${persona}</td>
        <td>$${pagoGatos.toFixed(2)}</td>
        <td>$${pagoPerro.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    `;
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
