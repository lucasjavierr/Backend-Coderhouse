let num1 = 1;
let num2 = 2;
let result = num1 + num2;
// console.log(result);

function sumar(a, b) {
  let result = a + b;
  return result;
}
const res = sumar(1, 2);
console.log("Suma: " + res);
// suma(75, 50);

// funcion flecha
const sumarFlecha = (a, b) => {
  let result = a + b;
  let result2 = result * 10;
  result2 / 5;
  return result2;
};

let res2 = sumarFlecha(30, 45);
console.log("Suma flecha: " + res2);

// funcion flecha con una sola instruccion y devuelve un resultado
const multiplicar = (a, b) => a * b;
console.log("Multiplicacion: " + multiplicar(10, 6));

// funcion flecha con solo un parametro
const mostrarNombre = (nombre) => "Hola " + nombre;
console.log("Nombre: " + mostrarNombre("Lucas"));

// funcion flecha con template string
const mostrarApellido = (apellido) => `Hola ${apellido}`;
console.log("Apellido: " + mostrarApellido("Javier"));
