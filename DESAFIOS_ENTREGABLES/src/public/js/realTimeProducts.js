/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socketClient = io();

const productsContainer = document.getElementById('productsContainer');
const createProductForm = document.getElementById('createProductForm');

// enviamos info del formulario al servidor
createProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // obtengo los datos ingresados en el formulario
  const formData = new FormData(createProductForm);

  // recorro todos los valores, y creo una propiedad con su respectivo nombre y valor
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  jsonData.price = parseInt(jsonData.price);
  jsonData.stock = parseInt(jsonData.stock);

  // enviamos el objeto a servidor
  socketClient.emit('addProduct', jsonData);
  createProductForm.reset();
});

// recibimos los productos
socketClient.on('allProducts', (dataProducts) => {
  // console.log('products', dataProducts);
  let productsElements = '';
  dataProducts.forEach((elm) => {
    productsElements += `
    <div class='card_body'>
      <picture class='card_image_container'>
        <img src='${elm.thumbnail}' />
      </picture>
      <div class="card_info_container">
        <h3>${elm.title}</h3>
        <p>$${elm.price}</p>
        <p>${elm.description}</p>
      </div>
      <div class="card_button_container">
        <button onClick='deleteProduct(${elm.id})'>Eliminar producto</button>
      </div>
    </div>
    `;
    productsContainer.innerHTML = productsElements;
  });
});

const deleteProduct = (productId) => {
  socketClient.emit('productId', productId);
};
