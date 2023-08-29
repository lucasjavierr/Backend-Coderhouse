// dos personas van a un restaurante
// la primera pide una ensalada, una pasta y un jugo
// la segunda pide una ensalada, una carne y un jugo
// ensalada = 15min
// pasta = 30min
// carne = 50min
// jugo = 10min

// SINCRONO
/* setTimeout(() => {
  console.log("1. ensalada lista");
  setTimeout(() => {
    console.log("1. pasta lista");
    setTimeout(() => {
      console.log("1. jugo listo");
      setTimeout(() => {
        console.log("2. ensalada lista");
        setTimeout(() => {
          console.log("2. carne lista");
          setTimeout(() => {
            console.log("2. jugo listo");
          }, 1000);
        }, 5000);
      }, 1500);
    }, 1000);
  }, 3000);
}, 1500); */
// en total son 130 minutos para llegar al jugo de la segunda persona

// ASÍNCRONO
setTimeout(() => {
  console.log("1. ensalada lista");
}, 1500);

setTimeout(() => {
  console.log("1. pasta lista");
}, 3000);

setTimeout(() => {
  console.log("1. jugo listo");
}, 1000);

setTimeout(() => {
  console.log("2. ensalada lista");
}, 1500);

setTimeout(() => {
  console.log("2. carne lista");
}, 5000);

setTimeout(() => {
  console.log("2. jugo listo");
}, 1000);
