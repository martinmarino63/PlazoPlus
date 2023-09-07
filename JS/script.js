function Banco(nombre, tasaNoCliente, tasaCliente, montoMinimo, montoMaximo, tiempoMinimo, tiempoMaximo) {
    this.nombre = nombre;
    this.tasaNoCliente = tasaNoCliente;
    this.tasaCliente = tasaCliente;
    this.montoMinimo = montoMinimo;
    this.montoMaximo = montoMaximo;
    this.tiempoMinimo = tiempoMinimo;
    this.tiempoMaximo = tiempoMaximo;
}

const bancos = [
    new Banco('Banco Nación', 1.00, 1.30, 50000, 1000000, 30, 365),
    new Banco('Banco Santander', 0.97, 1.28, 100000, 2000000, 60, 365),
    new Banco('Banco BBVA', 1.05, 1.45, 500000, 2000000, 90, 365)
];

const realizarCalculo = (montoIngresado, tasa, diasIngresados) => {
    return montoFinal = Math.floor(montoIngresado * Math.pow(1 + tasa, diasIngresados / 365));
}

const montoIngresadoInput = document.getElementById('montoIngresado');
const diasIngresadosInput = document.getElementById('diasIngresados');
const esClienteCheckbox = document.getElementById('esCliente');
const calcularButton = document.getElementById('calcular');
const errorOutput = document.getElementById('errorOutput');
const diasOutput = document.getElementById('dias');
const bancoSelect = document.getElementById('banco');

bancos.forEach((banco, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = banco.nombre;
    bancoSelect.appendChild(option);
});


function actualizarDetallesBanco(bancoSeleccionado) {
    const tasaNoClienteDetalle = document.getElementById('tasaNoClienteDetalle');
    const tasaClienteDetalle = document.getElementById('tasaClienteDetalle');
    const montoMinimoDetalle = document.getElementById('montoMinimoDetalle');
    const montoMaximoDetalle = document.getElementById('montoMaximoDetalle');
    const tiempoMinimoDetalle = document.getElementById('tiempoMinimoDetalle');
    const tiempoMaximoDetalle = document.getElementById('tiempoMaximoDetalle');

    const tasaNoClienteFormateada = (bancoSeleccionado.tasaNoCliente * 100).toFixed(2) + '%';
    const tasaClienteFormateada = (bancoSeleccionado.tasaCliente * 100).toFixed(2) + '%';

    tasaNoClienteDetalle.textContent = `Tasa (No Cliente): ${tasaNoClienteFormateada}`;
    tasaClienteDetalle.textContent = `Tasa (Cliente): ${tasaClienteFormateada}`;
    montoMinimoDetalle.textContent = `Monto Mínimo: $${bancoSeleccionado.montoMinimo}`;
    montoMaximoDetalle.textContent = `Monto Máximo: $${bancoSeleccionado.montoMaximo}`;
    tiempoMinimoDetalle.textContent = `Tiempo Mínimo (días): ${bancoSeleccionado.tiempoMinimo}`;
    tiempoMaximoDetalle.textContent = `Tiempo Máximo (días): ${bancoSeleccionado.tiempoMaximo}`;
}

bancoSelect.addEventListener('change', () => {
    const bancoSeleccionado = bancos[bancoSelect.selectedIndex];
    actualizarDetallesBanco(bancoSeleccionado);
});

const bancoSeleccionadoInicial = bancos[0];
actualizarDetallesBanco(bancoSeleccionadoInicial);


calcularButton.addEventListener('click', () => {

    const montoIngresado = parseInt(montoIngresadoInput.value);
    const diasIngresados = parseInt(diasIngresadosInput.value);
    const esCliente = esClienteCheckbox.checked;


    const bancoSeleccionado = bancos[bancoSelect.selectedIndex];


    if (isNaN(montoIngresado) || isNaN(diasIngresados) ||
        montoIngresado < bancoSeleccionado.montoMinimo ||
        montoIngresado > bancoSeleccionado.montoMaximo ||
        diasIngresados < bancoSeleccionado.tiempoMinimo ||
        diasIngresados > bancoSeleccionado.tiempoMaximo) {
        errorOutput.textContent = 'Revisa los valores.';
        console.log('Datos inválidos o fuera de rango.');
        return;
    } else errorOutput.textContent = '';


    const tasa = esCliente ? bancoSeleccionado.tasaCliente : bancoSeleccionado.tasaNoCliente;
    const montoFinal = realizarCalculo(montoIngresado, tasa, diasIngresados);
    console.log(montoFinal);


    const simulacion = {
        bancoSeleccionado: bancoSeleccionado.nombre,
        montoIngresado: montoIngresado,
        montoFinal: montoFinal,
        diasIngresados: diasIngresados,
        tasa: (tasa * 100) + '%'
    };
    localStorage.setItem('ultimaSimulacion', JSON.stringify(simulacion));
    console.log(simulacion, 'Guardado en localStorage');


    const ultimaSimulacionDiv = document.getElementById('ultimaSimulacion');
    ultimaSimulacionDiv.style.display = 'block';
    document.getElementById('nombreBancoSeleccionadoUltima').textContent = `Banco Seleccionado: ${simulacion.bancoSeleccionado}`;
    document.getElementById('montoIngresadoUltima').textContent = `Monto a invertir: $${simulacion.montoIngresado}`;
    document.getElementById('montoFinalUltima').textContent = `Monto al finalizar: $${simulacion.montoFinal}`;
    document.getElementById('diasIngresadosUltima').textContent = `Días a invertir: ${simulacion.diasIngresados} días`;
    document.getElementById('tasaUltima').textContent = `Tasa de interés: ${simulacion.tasa}`;
});



const borrarHistorialButton = document.getElementById('borrarHistorial');

borrarHistorialButton.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el historial. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar historial',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('ultimaSimulacion');
            console.log('Se ha limpiado el historial');
            const ultimaSimulacionDiv = document.getElementById('ultimaSimulacion');
            ultimaSimulacionDiv.style.display = 'none';
        }
    });
});





window.addEventListener('load', () => {
    const ultimaSimulacionJSON = localStorage.getItem('ultimaSimulacion');
    if (ultimaSimulacionJSON) {
        const ultimaSimulacion = JSON.parse(ultimaSimulacionJSON);
        console.log(ultimaSimulacion)
        const ultimaSimulacionDiv = document.getElementById('ultimaSimulacion');
        ultimaSimulacionDiv.style.display = 'block';
        document.getElementById('montoIngresadoUltima').textContent = `Monto a invertir: $${ultimaSimulacion.montoIngresado}`;
        document.getElementById('montoFinalUltima').textContent = `Monto al finalizar: $${ultimaSimulacion.montoFinal}`;
        document.getElementById('diasIngresadosUltima').textContent = `Días a invertir: ${ultimaSimulacion.diasIngresados} días`;
        document.getElementById('tasaUltima').textContent = `Tasa de interés: ${ultimaSimulacion.tasa}`;
    }
});
