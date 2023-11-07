const deleteToCartButtons = document.querySelectorAll('.delete-to-cart-button');

deleteToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    deleteProductToCart(productId);
  });
});

async function deleteProductToCart (productId) {
  // cartId hardcodeado
  const cartId = '6525b05f6d9f1c50835332d1';

  fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
    method: 'DELETE',
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
      console.log('Producto eliminado del carrito:', data);
    })
    .catch((error) => {
      console.error('Error al eliminar el producto del carrito:', error);
    });
}
