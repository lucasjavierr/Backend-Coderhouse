// obtengo los botones para agregar al carrito, y luego el valor del atributo data-product-id
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    addProductToCart(productId);
  });
});

// creo la funcion y hago el fetch POST a la url con la que añado un producto al carrito
function addProductToCart (productId) {
  // cartId hardcodeado
  const cartId = '6525b05f6d9f1c50835332d1';

  fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cartId,
      productId
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Producto agregado al carrito:', data);
    })
    .catch((error) => {
      console.error('Error al agregar el producto al carrito:', error);
    });
}
