// la mutabilidad con datos primitivos declarados con const no es posible
const city = "Bogota";
// city = "Buenos Aires";
console.log(city); // --> error, no se puede reasignar un valor constante

// tipos objeto son mutables
const person = {
  name: "pedro",
  edad: 20,
};

person.name = "Lucas";
console.log(person);

const numbers = [1, 2, 3, 4];
numbers.push(5);
console.log(numbers);
