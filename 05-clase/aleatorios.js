// 10000 NUMEROS ALEATORIOS ENTRE 1 Y 20
// AÑADIRLOS A UN OBJETO CON EL NUMERO COMO KEY Y LA CANTIDAD DE VECES QUE SALIO COMO VALUE
// UNIRLOS A UN ARRAY
// SUMAR LA CANTIDAD

// numero aleatorio entre 1 y 20
// Math.random() * 20 // 0.01 - 19.99
// Math.ceil(0.2) = 1
// Math.floor(0.2) = 0
// Math.round 0.2=0; 0.6=1; 0.5=1
// Math.ceil(Math.random() * 20)  // 1 al 20

// como evaluar si una propiedad existe dentro de un objeto?
const obj = { 1: 100, 2: 330 };
// 1 forma = obj.hasOwnProperty('nombreProperty')
// 2 forma = obj['nombreProperty']
// 3 forma = obj.nombreProperty --> no puede tener caracteres raros ('location-city')

let aleatorios = {};
for (let i = 0; i < 10000; i++) {
  const numeroAleatorio = Math.ceil(Math.random() * 20);

  if (aleatorios[numeroAleatorio]) {
    aleatorios[numeroAleatorio]++;
  } else {
    aleatorios[numeroAleatorio] = 1;
  }
}

console.log(aleatorios);
const totalCantidades = Object.values(aleatorios).reduce(
  (acc, curr) => (acc += curr),
  0
);

console.log(totalCantidades);
