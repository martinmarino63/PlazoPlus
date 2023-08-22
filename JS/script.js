// En este primer entregable se realizará un breve simulador replicando el cálculo de interés TNA del plazo fijo.
// TNA = 97%, cantidad mínima 30 días, máxima 365 días
// El usuario ingresará el monto a colocar y luego se le pedirá cuantos días desea.
// Al finalizar, se le mostrará al usuario el interés obtenido junto al monto total

const TNA = 0.97; // Constante de la tasa TNA
const unidadTiempo = 365;

const obtenerResultado = (montoInicial, tiempoDeseado) => {
    return (montoInicial * TNA * tiempoDeseado) / unidadTiempo;
};

const montoFinal = (resultado, montoInicial) => {
    return resultado + montoInicial;
};

alert('Hola, gracias por utilizar el simulador de plazo fijo TNA. Por favor, complete los siguientes datos.');

let montoInicial;
let tiempoDeseado;

do {
    const userInput = prompt('Ingrese el monto inicial a colocar: (Monto mínimo: 50000)');
    if (userInput === null) {
        alert('Se ha cancelado la solicitud.');
        break;
    } else {
        montoInicial = parseInt(userInput);
        console.log(montoFinal)
        if (isNaN(montoInicial)) {
            alert('Error: Debe ingresar un número.');
        } else if (montoInicial < 50000) {
            alert('Error: El monto mínimo es 50000.');
        }
    }
} while (isNaN(montoInicial) || montoInicial < 50000);

if (montoInicial >= 50000) {
    do {
        const userInput = prompt('Ingrese el tiempo deseado a invertir: (Mínimo 30 días, máximo 365)');
        if (userInput === null) {
            alert('Se ha cancelado la solicitud.');
            break;
        } else {
            tiempoDeseado = parseInt(userInput);
            console.log(tiempoDeseado);
            if (isNaN(tiempoDeseado)) {
                alert('Error: Debe ingresar la cantidad de días en números.');
            } else if (tiempoDeseado < 30) {
                alert('Error: El tiempo mínimo es 30 días.');
            } else if (tiempoDeseado > 365) {
                alert('Error: El tiempo máximo es de 365 días.');
            }
        }
    } while (isNaN(tiempoDeseado) || tiempoDeseado < 30 || tiempoDeseado > 365);

    let resultado = obtenerResultado(montoInicial, tiempoDeseado);
    console.log(resultado);
    let resultadoCompuesto = montoFinal(resultado, montoInicial)
    console.log(resultadoCompuesto);
    alert('El resultado de tu plazo fijo es: $' + Math.round(resultado) + ' en un tiempo de ' + tiempoDeseado + ' días');
    alert('El monto total a obtener finalizado el período es de: $' + Math.round(resultadoCompuesto));
}