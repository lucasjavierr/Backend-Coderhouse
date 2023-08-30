const personas = ["Lucas", "Avril", "Dani", "Juli", "Fabri"];

function mostrarLista(array) {
  if (array.length <= 0) {
    console.log("Lista vacía");
  } else {
    array.map((elm) => console.log(elm));
  }
  console.log(`La lista contiene ${array.length} elementos`);
}

mostrarLista(personas);
