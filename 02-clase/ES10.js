// string.trim() para eliminar espacios al inicio y al final de una cadena de caracteres
const correoEspacio = "                lucas@gmail.com              ";

const correoSinEspacio = correoEspacio.trim(); // --> 'lucas@gmail.com'

if (correoSinEspacio === "lucas@gmail.com") {
  console.log("sesion iniciada");
} else {
  console.log("fallo al iniciar sesion");
}

// Array.flat() aplana un array que tiene otros arrays inferiores
// [ [1, 2, 3], [4, 5, 6] ] --> [ 1, 2, 3, 4, 5, 6 ]
const numeros = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, [9, 10]],
];
console.log(numeros.flat(2));
// flat.(1) aplana el primer nivel del array, con (2) aplana al segundo etc
