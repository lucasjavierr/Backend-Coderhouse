const cursoUsuarios = {
  lucas: "react",
  avril: "diseño grafico",
  dani: "javascript",
  juli: "java",
};

// Object.keys
// Obtiene las propiedades de un objeto en un array
const propsObj = Object.keys(cursoUsuarios);
console.log(propsObj); // --> lucas,avril,dani,juli

// Object.values
// Obtiene los valores de las propiedades de un objeto en un array
const valuesObj = Object.values(cursoUsuarios);
console.log(valuesObj); // --> react,diseño grafico,javascript,java

// Object.entries
// Crea un array en el que cada key y value del objeto, se convierte en un array de nivel inferior
// en esos arrays inferiores, la primera posicion sera la prop[0] y la segunda el value[1]
const entries = Object.entries(cursoUsuarios);
console.log(entries); // --> [ ['lucas', 'react'], ['avril', 'diseño grafico'] ]
