const persons = [
  { id: 1, name: "pepe" },
  { id: 2, name: "juan" },
  { id: 3, name: "lucas" },
];

// typeof
console.log(typeof persons);
console.log(Array.isArray(persons));

// el método find devuelve el elemento completo que cumple con esa condición
// si hay mas de uno, devuelve el primero que encuentre
const person = persons.find((elm) => {
  if (elm.id === 2) {
    return elm;
  }
});
console.log(person);
