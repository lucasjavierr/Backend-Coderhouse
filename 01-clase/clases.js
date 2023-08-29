/* const person1 = {
  name: "Lucas",
  edad: 19,
}; */

class Person {
  #course = "Backend";

  constructor(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
  }

  saludar() {
    console.log(`Hola ${this.name}`);
  }

  getPrivateVarieble() {
    console.log(this.#course);
  }
}

const person1 = new Person("Lucas", 19, "San Javier");
console.log(person1);
person1.saludar();
person1.getPrivateVarieble();

const person2 = new Person("Avril", 19, "Eldorado");
console.log(person2);
person2.saludar();
