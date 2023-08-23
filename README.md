# Plazos Fijos Bancarios

Este es un programa simple en JavaScript que simula la interacción con diferentes bancos para calcular los intereses en un plazo fijo. El programa te permite seleccionar un banco, ingresar el monto y los días para el plazo fijo, y luego calcula el monto final con los intereses correspondientes.

## Funcionamiento

1. **Constructor de Banco**: Se define un constructor llamado `Banco` que crea instancias de bancos con diferentes atributos como el nombre del banco, tasas de interés para clientes y no clientes, montos mínimos y máximos, y tiempos mínimos y máximos para el plazo fijo.

2. **Creación de Bancos**: Se crean instancias de bancos utilizando el constructor `Banco` y se almacenan en un arreglo llamado `bancos`.

3. **Interacción con el Usuario**: Mediante un bucle `while`, el programa interactúa con el usuario a través de prompts y confirmaciones. Se muestran las opciones de bancos disponibles y se permite al usuario elegir uno.

4. **Cálculo y Validación**: Una vez seleccionado el banco, el programa pregunta al usuario si es cliente del banco y luego solicita el monto y los días para el plazo fijo. Se validan los valores ingresados para asegurarse de que estén dentro de los rangos permitidos.

5. **Cálculo de Monto Final**: Utilizando la fórmula de interés compuesto, se calcula el monto final del plazo fijo. Luego, se muestra una alerta con los detalles de la selección del banco, el cliente, el monto y los días ingresados, así como el monto final obtenido al finalizar el plazo fijo.

6. **Continuar o Salir**: Después de cada ciclo de interacción, el programa pregunta al usuario si desea realizar otro plazo fijo. Si el usuario desea continuar, el ciclo se repite. Si no, se muestra un mensaje de despedida.

## Ejecución

1. Clona este repositorio o descarga el código.

2. Abre el archivo `index.html` en tu navegador web.

3. Sigue las instrucciones en pantalla para realizar diferentes simulaciones de plazos fijos.

## Tecnologías Utilizadas

- JavaScript
- HTML

## Contribución

Si encuentras algún problema o tienes una idea de mejora, ¡no dudes en abrir un [issue](https://github.com/tuusuario/tuproyecto/issues) o enviar un [pull request](https://github.com/tuusuario/tuproyecto/pulls)!

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.
