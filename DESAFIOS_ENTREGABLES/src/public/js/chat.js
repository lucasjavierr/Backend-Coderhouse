/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const socketClient = io();

const userName = document.getElementById('userName');
const inputMsg = document.getElementById('inputMsg');
const sendMsg = document.getElementById('sendMsg');
const chatPanel = document.getElementById('chat_panel');

let user; // => variable para identificar al usuario

// eslint-disable-next-line no-undef
/* Swal.fire({
  title: 'Chat con Websocket',
  text: 'Ingresa tu nombre de usuario',
  input: 'text',
  inputValidator: (value) => {
    return !value && 'Debes ingresar el nombre de usuario para continuar';
  },
  allowOutsideClick: false,
  allowEscapeKey: false
}).then((inputValue) => {
  user = inputValue.value;
  userName.innerHTML = user;
  socketClient.emit('authenticated', user);
}); */

socketClient.on('allMessages', (dataServer) => {
  console.log(dataServer);
  let msgElement = '';
  dataServer.forEach((elm) => {
    msgElement += `<p>Usuario: ${elm.user} ---> ${elm.message}</p>`;
  });
  chatPanel.innerHTML = msgElement;
});

socketClient.on('newUser', (data) => {
  if (user) {
    // eslint-disable-next-line no-undef
    Swal.fire({
      text: data,
      toast: true,
      position: 'top-right',
      timer: 3000
    });
  }
});

sendMsg.addEventListener('click', () => {
  const msg = { user, message: inputMsg.value };
  // console.log(msg);
  socketClient.emit('msgChat', msg);
  inputMsg.value = '';
});
