class Contador {
  static #contadorGlobal = 0;

  constructor (nombre) {
    this.nombre = nombre;
    this.contador = 0;
  }

  getResponsable () {
    console.log(`Responsable: ${this.nombre}`);
  }

  contar () {
    this.contador++;
    Contador.#contadorGlobal++;
  }

  getCuentaIndividual () {
    console.log(`El contador individual de ${this.nombre} es ${this.contador}`);
  }

  getCuentaGlobal () {
    console.log(`El contador global es ${Contador.#contadorGlobal}`);
  }
}

const contLucas = new Contador('Lucas');
const contAvril = new Contador('Avril');
// console.log(contLucas);
// console.log(contAvril);

contLucas.getResponsable();
contAvril.getResponsable();

contLucas.contar();
contLucas.getCuentaIndividual();
contLucas.getCuentaGlobal();

contAvril.contar();
contAvril.getCuentaIndividual();
contLucas.getCuentaGlobal();

contAvril.contar();
contAvril.getCuentaIndividual();
contLucas.getCuentaGlobal();

console.log(contLucas);
console.log(contAvril);
