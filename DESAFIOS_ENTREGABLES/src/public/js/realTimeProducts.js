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
  console.log(jsonData);

  // enviamos el objeto a servidor
  socketClient.emit('addProduct', jsonData);
  createProductForm.reset();
});

// recibimos los productos
socketClient.on('allProducts', (dataProducts) => {
  console.log('products', dataProducts);
  let productsElements = '';
  dataProducts.forEach((elm) => {
    productsElements += `
    <li>
      <picture>
        <img src=${elm.thumbnails[0]} />
      </picture>
      <div>
        <h3>${elm.title}</h3>
        <p>$${elm.price}</p>
        <p>${elm.description}</p>
      </div>
      <div>
        <button onClick='deleteProduct(${elm.id})'>Eliminar producto</button>
      </div>
    </li>
    `;
    productsContainer.innerHTML = productsElements;
  });
});

const deleteProduct = (productId) => {
  socketClient.emit('productId', productId);
};
