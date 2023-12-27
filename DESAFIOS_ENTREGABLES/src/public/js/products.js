const addToCartButtons = document.querySelectorAll('.add-to-cart-button')

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id')
    addProductToCart(productId)
  })
})

async function addProductToCart (productId) {
  // cartId hardcodeado
  const cartId = '6525b05f6d9f1c50835332d1'

  await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
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
      console.log('Producto agregado del carrito:', data)
    })
    .catch((error) => {
      console.error('Error al agregar el producto del carrito:', error)
    })
}
