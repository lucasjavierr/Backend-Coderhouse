const objetos = [
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2
  },
  {
    manzanas: 1,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 4
  }
];

const tienda1 = Object.keys(objetos[0]);
const tienda2 = Object.keys(objetos[1]);

const tienda = [...tienda1, ...tienda2];

// con Set elimino los valores repetidos del array
const productos = new Set(tienda);
const productosTienda = [...productos];
console.log('Productos de la tienda:', productosTienda);

const values1 = Object.values(objetos[0]);
const values2 = Object.values(objetos[1]);
const values = [...values1, ...values2];

const totalVendidos = values.reduce((acc, value) => (acc += value), 0);
console.log('Total vendidos: ' + totalVendidos);
// 01:19:30
