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

// mismo ejemplo que promesas.js pero con async-await
const operacionesAsincronas = async () => {
  try {
    const estudiante = await obtenerEstudiante(6);
    const resultado = await aproboCurso(estudiante);
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
};

operacionesAsincronas();
