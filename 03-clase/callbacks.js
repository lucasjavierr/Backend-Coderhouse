const numbers = [1, 2, 3, 4];

const suma = (num) => num + 1;

const newArray1 = numbers.map((num) => suma(num));
// console.log("newArray1", newArray1);

const newArray2 = numbers.map((num) => num * 2);
// console.log("newArray2", newArray2);

// --------------------------------------------------------------------------------
const sumar = (num1, num2) => num1 + num2;
const restar = (num1, num2) => num1 - num2;
const multiplicar = (num1, num2) => num1 * num2;
const dividir = (num1, num2) => num1 / num2;

// funcion receptora
const calculadora = (numero1, numero2, callback) => {
  const resultado = callback(numero1, numero2);
  console.log("Resultado:", resultado);
};

// calculadora(2, 5, sumar);
// calculadora(2, 8, multiplicar);
// calculadora(9, 3, restar);
// calculadora(10, 5, dividir);

// --------------------------------------------------------------------------------
const saludar = () => console.log("buenos dias");
const despedir = () => console.log("adios");

const funcionReceptora = (nombre, funcionAEjecutar) => {
  console.log("iniciando...");
  console.log("verificando variables xd");
  console.log(`Hola soy ${nombre}`);
  funcionAEjecutar();
};

// funcionReceptora("Lucao", saludar);
// funcionReceptora("Lucao", despedir);

// --------------------------------------------------------------------------------
const notification = () => console.log("El proceso ya terminó");
const funcionCompleja = (callback) => {
  // proceso xd
  console.log("procesando...");
  setTimeout(() => {
    callback();
  }, 3000);
};

// funcionCompleja(notification);

// --------------------------------------------------------------------------------
// ejemplo de convencion sobre como se usaba el callback para notificaciones
const funcionCallback = (error, resultado) => {
  if (error) {
    return console.log(`Ha ocurrido un error: ${error}`);
  }

  console.log(`Este es el resultado: ${resultado}`);
};

const funcionPrincipal = (numero1, numero2, callback) => {
  if (typeof numero1 !== "number") {
    return callback("El parámetro 1 debe ser un número");
  }

  const resultadoSuma = numero1 + numero2;
  callback(null, resultadoSuma);
};

funcionPrincipal(8, 3, funcionCallback);
