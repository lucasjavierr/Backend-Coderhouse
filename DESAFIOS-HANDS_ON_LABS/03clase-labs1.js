const sumar = (num1, num2) => {
  return new Promise((res, rej) => {
    if (num1 === 0 || num2 === 0) {
      return rej("Operacón innecesaria");
    }
    if (num1 < 0 || num2 < 0) {
      return rej("La calculadora sólo debe devolver valores positivos");
    }
    res(num1 + num2);
  });
};

const restar = (num1, num2) => {
  return new Promise((res, rej) => {
    if (num1 === 0 || num2 === 0) {
      return rej("Operacón inválida");
    }
    if (num1 < 0 || num2 < 0) {
      return rej("La calculadora sólo debe devolver valores positivos");
    }
    res(num1 - num2);
  });
};

const multiplicar = (num1, num2) => {
  return new Promise((res, rej) => {
    if (num1 < 0 || num2 < 0) {
      return rej("La calculadora sólo debe devolver valores positivos");
    }
    res(num1 * num2);
  });
};

const dividir = (num1, num2) => {
  return new Promise((res, rej) => {
    if (num1 === 0 || num2 === 0) {
      return rej("Operacón inválida");
    }
    if (num1 < 0 || num2 < 0) {
      return rej("La calculadora sólo debe devolver valores positivos");
    }
    res(num1 / num2);
  });
};

const calculos = async () => {
  try {
    const suma1 = await sumar(5, 9);
    console.log(`El resultado de la suma es: ${suma1}`);
    const multiplicacion1 = await multiplicar(10, suma1);
    console.log(`El resultado de la multiplicación es: ${multiplicacion1}`);
  } catch (error) {
    console.log(`Hubo un error: ${error}`);
  }
};

calculos();
