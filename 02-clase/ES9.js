// desestructuracion de objetos
const userAvril = {
  name: "Avril",
  lastname: "Ruiz Díaz",
  age: 19,
  city: "Mendoza",
};

// forma vieja de extraer valores de las propiedades de un objeto
const cityAvril = userAvril.city;
const ageAvril = userAvril.age;

// actual
const { age, city } = userAvril;
// console.log("age", age);
// console.log("city", city);

// -------------------------------------------------------------------------
// spread operator
// Copiar todas las propiedades de un objeto
// Crear objetos nuevos sin mutar el objeto original
const avrilData = {
  // name: userAvril.name,
  // age: userAvril.age,
  ...userAvril,
  course: "JavaScript",
  level: "Intermedio",
  grade: 4.8,
};
// console.log(avrilData);

// spread operator con arrays
const array1 = [1, 2, 3, 4];
const array2 = [5, 6, 7, 8];
const arrayCompleto = [...array1, ...array2, 9, 10];
console.log(arrayCompleto);

// rest operator
function sumar(a, b, ...rest) {
  console.log(rest);
}
