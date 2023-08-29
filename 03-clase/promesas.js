const dividir = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      return reject("No es posible divir por 0");
    }

    resolve(dividendo / divisor);
  });
};

// .then() obtiene el resultado que se pasa en el método para resolve
// .catch() obtiene el resultado que se pasa en el método para reject
/* dividir(10, 0)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  }); */

// ---------------------------------------------------------------------------------------
const estudiantes = [
  { id: 1, nombre: "Lucas", calificacion: 2.9 },
  { id: 2, nombre: "Avril", calificacion: 10 },
];

const obtenerEstudiante = (idEstudiante) => {
  return new Promise((res, rej) => {
    const estudianteEncontrado = estudiantes.find(
      (est) => est.id === idEstudiante
    );
    if (!estudianteEncontrado) {
      return rej("El estudiante no fue encontrado");
    }
    res(estudianteEncontrado);
  });
};

const aproboCurso = (estudiante) => {
  return new Promise((res, rej) => {
    if (estudiante.calificacion <= 3) {
      return rej(`El estudiante ${estudiante.nombre} no aprobó el curso`);
    }
    res(`El estudiante ${estudiante.nombre} aprobó el curso`);
  });
};

obtenerEstudiante(2)
  .then((resultado) => {
    console.log(resultado);
    return aproboCurso(resultado);
  })
  .then((resoltado2) => {
    console.log(resoltado2);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })
  .finally(() => {
    console.log("Todas las promesas ya terminaron de ejecutarse");
  });
