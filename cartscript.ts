interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    image: string;
  }
  
  interface CartItem extends Product {
    quantity: number;
  }
  
  // Import the global functions
  import './global';
  
  document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart') as HTMLElement;
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Display cart
    function displayCart() {
      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }
  
      let totalPrice = 0;
  
      cartContainer.innerHTML = cart.map(item => {
        totalPrice += item.price * item.quantity;
        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
            <button onclick="window.updateQuantity(${item.id}, 1)">+</button>
            <button onclick="window.updateQuantity(${item.id}, -1)">-</button>
            <button onclick="window.removeFromCart(${item.id})">Remove</button>
          </div>
        `;
      }).join('');
  
      cartContainer.innerHTML += `
        <div class="cart-total">
          <h2>Total Price: $${totalPrice.toFixed(2)}</h2>
        </div>
      `;
    }
  
    // Update quantity
    window.updateQuantity = function(id: number, delta: number) {
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity += delta;
        if (cartItem.quantity <= 0) {
          window.removeFromCart(id);
        } else {
          saveCart();
          displayCart();
        }
      }
    };
  
    // Remove from cart
    window.removeFromCart = function(id: number) {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      displayCart();
    };
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Display initial cart
    displayCart();
  });
  