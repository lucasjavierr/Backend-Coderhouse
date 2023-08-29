// .map() crea un nuevo array a partir de otro, con el mismo numero de elementos
// pero a cada uno de los elementos le aplicamos alguna operacion

const numeros = [1, 2, 3, 4, 5];
const numerosDuplicados = numeros.map((num) => num * 2);
// console.log("numeros", numeros);
// console.log("numeros duplicados", numerosDuplicados);

const users = [
  { name: "lucas", edad: 19 },
  { name: "avril", edad: 19 },
  { name: "avril", edad: 30 },
  { name: "julian", edad: 19 },
  { name: "benja", edad: 20 },
];

const usersNames = users.map((elm) => elm.name);
// console.log("usersNames", usersNames);

const usersNames2 = users.map((elm) => {
  return { nombre: elm.name };
});
// console.log("usersNames2", usersNames2);

// ---------------------------------------------------------------------------------
// .find() devuelve EL PRIMER ELEMENTO que cumpla una condicion
// si hay dos elementos, devuelve el primero que encuentre
// si no lo encuentra, devuelve undefined
const userAvril = users.find((elm) => elm.name === "avril");
// console.log("userAvril", userAvril);

// ---------------------------------------------------------------------------------
// .filter() devuelve TODOS los elementos que cumplen una condicion
const usersAvril = users.filter((elm) => elm.name === "avril");
// console.log("usersAvril", usersAvril);

const usersWithLetterL = users.filter((elm) => elm.name.includes("l"));
// console.log("usersWithLetterL", usersWithLetterL);

// ---------------------------------------------------------------------------------
// .reduce() reduce todos los elementos de un array a un mismo valor
// forma tradicional
const array = [1, 2, 3, 4, 5];
let total = 0;
for (let i = 0; i < array.length; i++) {
  total += array[i];
}
// console.log("total", total);

// con reduce
const sumaArray = array.reduce((acc, curr) => (acc += curr), 0);
// console.log("sumaArray", sumaArray);

const carrito = [
  { name: "libro", price: 200 },
  { name: "mochila", price: 560 },
  { name: "borrador", price: 40 },
  { name: "libro universitario", price: 890 },
];
const totalCarrito = carrito.reduce((acc, curr) => (acc += curr.price), 0);
// console.log("totalCarrito", totalCarrito);
