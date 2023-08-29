// nulish
let variable = 0; //valores falsy

const resultadoSinNull = variable || "valor vacío";
console.log(resultadoSinNull);

const resultadoConNulish = variable ?? "valor vacío";
console.log(resultadoConNulish);

// variables privadas de las clases
// solamente son accesibles dentro de las clases
class Persona {
  #variablePrivada = "soy una variable privada";
  constructor(nombre) {
    this.nombre = nombre;
  }

  getVariablePrivada() {
    console.log(this.#variablePrivada);
  }

  #metodoPrivado() {
    console.log("soy un metodo privado");
  }
}

const lucao = new Persona("Lucao");
console.log(lucao.nombre);
// console.log(lucao.#variablePivada); // --> Error
lucao.getVariablePrivada();
// lucao.#metodoPrivado() // --> Error
