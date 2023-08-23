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
    new Banco('Banco Nación', 1.0, 1.3, 50000, 1000000, '30 días', '365 días'),
    new Banco('Banco Santander', 0.97, 1.28, 100000, 2000000, '60 días', '365 días'),
    new Banco('Banco BBVA', 1.05, 1.45, 500000, 2000000, '90 días', '365 días')
];

let realizarOtroPlazoFijo = true;

while (realizarOtroPlazoFijo) {
    const opcionesBancos = bancos.map((banco, index) => {
        return `${index + 1}. ${banco.nombre}\n   Tasa No Cliente: ${banco.tasaNoCliente * 100}%\n   Tasa Cliente: ${banco.tasaCliente * 100}%\n   Monto Mínimo: $${banco.montoMinimo}\n   Monto Máximo: $${banco.montoMaximo}\n   Tiempo Mínimo: ${banco.tiempoMinimo}\n   Tiempo Máximo: ${banco.tiempoMaximo}`;
    }).join('\n\n');

    const seleccion = prompt(`Elige un banco:\n${opcionesBancos}`);
    const bancoSeleccionado = bancos[seleccion - 1];

    if (bancoSeleccionado) {
        const esCliente = confirm('¿Eres cliente del banco?');
        const clienteTexto = esCliente ? 'Sí' : 'No';

        const tasa = esCliente ? bancoSeleccionado.tasaCliente : bancoSeleccionado.tasaNoCliente;

        const montoIngresado = parseInt(prompt(`Ingresa el monto a ingresar (entre ${bancoSeleccionado.montoMinimo} y ${bancoSeleccionado.montoMaximo}):`));
        if (montoIngresado < bancoSeleccionado.montoMinimo || montoIngresado > bancoSeleccionado.montoMaximo) {
            alert('Monto ingresado fuera del rango válido');
            continue;
        }

        const diasIngresados = parseInt(prompt(`Ingresa los días a colocar (entre ${bancoSeleccionado.tiempoMinimo} y ${bancoSeleccionado.tiempoMaximo}):`));
        if (diasIngresados < bancoSeleccionado.tiempoMinimo || diasIngresados > bancoSeleccionado.tiempoMaximo) {
            alert('Días ingresados fuera del rango válido');
            continue;
        }

        let montoFinal = montoIngresado * Math.pow(1 + tasa, diasIngresados / 365);
        montoFinal = Math.floor(montoFinal);

        alert(`Has seleccionado el banco: ${bancoSeleccionado.nombre}\nCliente: ${clienteTexto}\nEl monto ingresado es de $${montoIngresado}\nLos días a ingresar son ${diasIngresados} días\n\nMonto obtenido al finalizar el plazo fijo: $${montoFinal}`);

        realizarOtroPlazoFijo = confirm('¿Quieres realizar otro plazo fijo?');
    } else {
        alert('Selección inválida');
        realizarOtroPlazoFijo = confirm('¿Quieres realizar otro plazo fijo?');
    }
}

alert('¡Gracias por usar nuestro servicio de plazos fijos!');
