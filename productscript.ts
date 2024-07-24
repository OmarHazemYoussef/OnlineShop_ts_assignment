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
    const productDetailsContainer = document.getElementById('product-details') as HTMLElement;
    let product: Product | null = JSON.parse(localStorage.getItem('currentProduct') || 'null');
  
    if (!product) {
      productDetailsContainer.innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Display product details
    productDetailsContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <button onclick="window.addToCart(${product.id})">Add to Cart</button>
    `;
  
    // Add to cart
    window.addToCart = function(id: number) {
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product!, quantity: 1 });
      }
      saveCart();
      alert('Product added to cart');
    };
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });
  