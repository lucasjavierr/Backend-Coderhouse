class TicketManager {
  #precioBaseGanancia = 0.15;
  constructor () {
    this.eventos = [];
  }

  getEventos () {
    console.log(this.eventos);
  }

  agregarEvento (nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
    if (!nombre || !lugar || !precio) {
      return console.log('Los campos deben estar completos');
    }

    let newId;
    if (this.eventos.length === 0) {
      newId = 1;
    } else {
      newId = this.eventos[this.eventos.length - 1].id + 1;
    }

    const nuevoEvento = {
      id: newId,
      nombre,
      lugar,
      precio: precio * (1 + this.#precioBaseGanancia),
      capacidad,
      fecha,
      participantes: []
    };

    this.eventos.push(nuevoEvento);
  }

  agregarUsuario (idEvento, idUsuario) {
    const evento = this.eventos.find((evento) => evento.id === idEvento);

    if (!evento) {
      console.log('El evento no existe');
    } else {
      evento.participantes.push(idUsuario);
    }
  }

  ponerEventoEnGira (idEvento, nuevaLocalidad, nuevaFecha) {
    const eventoExistente = this.eventos.find((ev) => ev.id === idEvento);

    if (!eventoExistente) {
      console.log('El evento ingresado no existe');
    } else {
      eventoExistente.lugar = nuevaLocalidad;
      eventoExistente.fecha = nuevaFecha;
    }
  }
}

const manager1 = new TicketManager();
console.log(manager1);
manager1.agregarEvento(
  'Ver segunda temporada de Loki',
  'Disney+',
  800,
  2,
  new Date('2023-10-06')
);
manager1.agregarEvento(
  'Cena con mi novia',
  'Holly Posadas',
  3000,
  2,
  new Date()
);
manager1.agregarUsuario(2, 100);
manager1.agregarUsuario(2, 140);
// manager1.ponerEventoEnGira(1, 'HBO Max', new Date('2023-10-01'))
manager1.getEventos();
