// funcion declarada o definida
function nombreFuncion(parametro1, parametro2) {
  const resultado = parametro1 + parametro2;
  return resultado;
}

// funciones expresadas
const funcionSuma = function (parametro1, parametro2) {
  const resultado = parametro1 + parametro2;
  return resultado;
};

// funciones expresadas --> flecha
// para mas de una liena agregamos las llaves {}
const funcionFlecha1 = (parametro1, parametro2) => {
  const resultado = parametro1 + parametro2;
  return resultado;
};

// si es solo una instruccion, el simbolo => es un return implicito
const funcionFlecha2 = (parametro1, parametro2) => parametro1 + parametro2;

// si tiene solo un parametro, no son necesarios los parentesis
// aca los puso el linter
const funcionFlecha3 = (parametro1) => parametro1 * 2;

// las funciones anonimas no cuentan con nombre y usualmente no ocupan espacio en memoria
const numeros = [1, 2, 3, 4, 5];
numeros.forEach((elm) => console.log(`Elemento: ${elm}`));
