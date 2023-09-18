const bancos = [];
const bancoSelect = document.getElementById('banco');

const fetchData = async () => {
    try {
        const res = await fetch('../json/bancos.json');

        if (!res.ok) {
            throw new Error(`Error al cargar datos (${res.status} ${res.statusText})`);
        }

        const data = await res.json();

        if (data.length === 0) {
            console.error('No se encontraron datos en el archivo JSON.');
            return;
        }

        bancos.push(...data);

        const bancoSeleccionadoInicial = bancos[0];
        actualizarDetallesBanco(bancoSeleccionadoInicial);

        bancos.forEach((banco, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = banco.nombre;
            bancoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}


const realizarCalculo = (montoIngresado, tasa, diasIngresados) => {
    return montoFinal = Math.floor(montoIngresado * Math.pow(1 + tasa, diasIngresados / 365));
}

const montoIngresadoInput = document.getElementById('montoIngresado');
const diasIngresadosInput = document.getElementById('diasIngresados');
const esClienteCheckbox = document.getElementById('esCliente');
const calcularButton = document.getElementById('calcular');
const errorOutput = document.getElementById('errorOutput');
const diasOutput = document.getElementById('dias');

bancos.forEach((banco, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = banco.nombre;
    bancoSelect.appendChild(option);
});


const actualizarDetallesBanco = (bancoSeleccionado) => {
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


const actualizarUltimaSimulacion = () => {
    const ultimaSimulacionJSON = localStorage.getItem('ultimaSimulacion');
    const ultimaSimulacionDiv = document.getElementById('ultimaSimulacion');
    const montoIngresadoUltima = document.getElementById('montoIngresadoUltima');
    const montoFinalUltima = document.getElementById('montoFinalUltima');
    const diasIngresadosUltima = document.getElementById('diasIngresadosUltima');
    const tasaUltima = document.getElementById('tasaUltima');
    const nombreBancoSeleccionadoUltima = document.getElementById('nombreBancoSeleccionadoUltima')
    if (ultimaSimulacionJSON) {
        const ultimaSimulacion = JSON.parse(ultimaSimulacionJSON);
        console.log(ultimaSimulacion);

        ultimaSimulacionDiv.style.display = 'block';
        nombreBancoSeleccionadoUltima.textContent = `Banco seleccionado: ${ultimaSimulacion.bancoSeleccionado}`;
        montoIngresadoUltima.textContent = `Monto a invertir: $${ultimaSimulacion.montoIngresado}`;
        montoFinalUltima.textContent = `Monto al finalizar: $${ultimaSimulacion.montoFinal}`;
        diasIngresadosUltima.textContent = `Días a invertir: ${ultimaSimulacion.diasIngresados} días`;
        tasaUltima.textContent = `Tasa de interés: ${ultimaSimulacion.tasa}`;
    }
}


bancoSelect.addEventListener('change', () => {
    const bancoSeleccionado = bancos[bancoSelect.selectedIndex];
    actualizarDetallesBanco(bancoSeleccionado);
});

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

    const simulacion = {
        bancoSeleccionado: bancoSeleccionado.nombre,
        montoIngresado: montoIngresado,
        montoFinal: montoFinal,
        diasIngresados: diasIngresados,
        tasa: (tasa * 100) + '%'
    };

    Swal.fire({
        title: 'Resumen de Simulación',
        icon: 'info',
        html: `
            <p><strong>Has seleccionado:</strong> ${simulacion.bancoSeleccionado}</p>
            <p><strong>El monto a invertir es de:</strong> $${simulacion.montoIngresado}</p>
            <p><strong>Invertirás por:</strong> ${simulacion.diasIngresados} días</p>
            <p><strong>A una tasa de interés de:</strong> ${simulacion.tasa}</p>
        `,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Simulación',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('ultimaSimulacion', JSON.stringify(simulacion));
            console.log('Simulación Guardada en localStorage:', simulacion);
            montoIngresadoInput.value = '';
            diasIngresadosInput.value = '';
            esClienteCheckbox.checked = false;
            Swal.fire({
                title: 'Simulación Exitosa',
                icon: 'success',
                html: `
                <p>A continuación, te presentamos el resultado de la simulación:</p>
                <p><strong>Invirtiendo en:</strong> ${simulacion.bancoSeleccionado}</p>
                <p><strong>Con un monto de:</strong> $${simulacion.montoIngresado}</p>
                <p><strong>Por:</strong> ${simulacion.diasIngresados} días</p>
                <p><strong>A una tasa de interés de:</strong> ${simulacion.tasa}</p>
                <br>
                <p><strong>Recibirás el siguiente monto:</strong> $${simulacion.montoFinal}</p>
                <p>¡Gracias por utilizar nuestro simulador!</p>
                `,
                confirmButtonText: 'Finalizar Simulación',
            }).then(() => {
                actualizarUltimaSimulacion();
            });
        }
    });
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
    fetchData();
    actualizarUltimaSimulacion();
});