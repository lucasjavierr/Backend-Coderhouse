document.addEventListener('DOMContentLoaded', async () => {
  const nameUser = document.getElementById('nameUser')
  const emailUser = document.getElementById('emailUser')
  const roleUser = document.getElementById('roleUser')

  const response = await fetch('/api/sessions/profile', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  })
  const result = await response.json()
  console.log(result)
  if (result.status === 'error') window.location.href = '/login'
  if (result.status === 'success') {
    nameUser.innerText = `Bienvenido! ${result.user.firstName}`
    emailUser.innerText = `Tu email: ${result.user.email}`
    roleUser.innerText = `Tu rol es de: ${result.user.role}`
  }
})

// obtengo los botones para agregar al carrito, y luego el valor del atributo data-product-id
const addToCartButtons = document.querySelectorAll('.add-to-cart-button')

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id')
    addProductToCart(productId)
  })
})

// creo la funcion y hago el fetch POST a la url con la que añado un producto al carrito
async function addProductToCart (productId) {
  // cartId hardcodeado
  const cartId = '6525b05f6d9f1c50835332d1'

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
      console.log(data)
      console.log('Producto agregado al carrito:', data)
    })
    .catch((error) => {
      console.error('Error al agregar el producto al carrito:', error)
    })
}
