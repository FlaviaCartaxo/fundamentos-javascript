const products = [
  {
    id: 1,
    name: "Teclado Mecânico",
    category: "Periféricos",
    price: 650.00,
    image: "./images/teclado-mecanico.jpg",
    quantity: 2
  },
  {
    id: 2,
    name: "Cadeira Gamer",
    category: "Acessórios",
    price: 500.00,
    image: "./images/cadeira-gamer.jpg",
    quantity: 2
  },
  {
    id: 3,
    name: "Headset Bluetooth",
    category: "Periféricos",
    price: 350.00,
    image: "./images/headset.jpg",
    quantity: 2
  }
]

function renderCartItems() {
  const cartItemsSection = document.getElementById('cart-items')
  const totalElement = document.getElementById('total')
  const subtotalElement = document.getElementById('subtotal')
  let subtotal = 0;

  cartItemsSection.innerHTML = '';

  products.forEach(product => {
    const itemTotal = product.quantity * product.price
    subtotal += itemTotal

    const total = new Intl.NumberFormat(
      "pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(itemTotal)
    const row = document.createElement("tr")
    row.innerHTML = `
    <tr>
        <td>
          <div class="product">
            <img src="${product.image}" height="100" width="100" alt="${product.name}" />
            <div class="info">
              <div class="name">${product.name}</div>
              <div class="category">${product.category}</div>
            </div>
          </div>
        </td>
        <td>${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}</td>
        <td>
          <div class="quantity">
            <button onclick="decreaseQuantity(${product.id})" >
              <i class="bx bx-minus"></i>
            </button>
            <span>${product.quantity}</span>
            <button onclick="increaseQuantity(${product.id})">
              <i class="bx bx-plus"></i>
            </button>
          </div>
        </td>
        <td>${total}</td>
        <td>
          <button class="remove" onclick="removeProduct(${product.id})">
            <i class="bx bx-x"></i>
          </button>
        </td> 
      </tr>
    `
    cartItemsSection.appendChild(row);

  })

  const subtotalCurrency = new Intl.NumberFormat(
    "pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(subtotal)

  subtotalElement.textContent = subtotalCurrency
  totalElement.textContent = subtotalCurrency
}

function increaseQuantity(productId) {
  const prod = products.find(product => product.id === productId)
  if (prod) {
    prod.quantity++
    renderCartItems()
  }
}

function decreaseQuantity(productId) {
  const prod = products.find(product => product.id === productId)
  if (prod && prod.quantity > 1) {
    prod.quantity--
    renderCartItems()
  }
}

function removeProduct(productId) {
  const index = products.findIndex(product => product.id === productId)

  if (index !== -1) {
    products.splice(index, 1)
    renderCartItems()
  }
}

document.addEventListener('DOMContentLoaded', renderCartItems);