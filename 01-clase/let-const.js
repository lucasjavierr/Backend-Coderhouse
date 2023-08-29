// con var una variable puede ser reasignada y redeclarada
// se puede acceder a ella en cualquier parte de la aplicación
// sin importar su contexto
/* var nombre = "pedro";

if (true) {
  var nombre = "juan";
  var edad = 20;
  console.log(edad);
}
console.log(nombre);
console.log(edad); */

// ---------------------------------------------------------------------
// let y const
let nombre = "pedro";

if (true) {
  let nombre = "juan";
  console.log(nombre);
  let edad = 20;
  console.log(edad); // --> 20

  // tambien se puede acceder a bloques internos o menor nivel
  if (true) {
    console.log(edad); // --> 20
  }
}
console.log(nombre);
console.log(edad); // --> error

// con let se puede reasignar
// con const no se puede, es un valor CONSTANTE
