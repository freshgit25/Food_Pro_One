const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart");

// Add to cart functionality
document.querySelectorAll(".add-cart-btn").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    const existingItem = cart.find(product => product.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} x${product.quantity} 
      <span>$${(product.price * product.quantity).toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(li);
    total += product.price * product.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function toggleCart() {
  cartPanel.classList.toggle("active");
}

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! Total: $" + cartTotal.textContent);
  cart.length = 0;
  updateCart();
  toggleCart();
});

// Sign Out button
document.getElementById("signout-btn").addEventListener("click", () => {
  const confirmSignOut = confirm("Are you sure you want to sign out?");
  if (confirmSignOut) {
    // Clear cart before signing out
    cart.length = 0;
    updateCart();

    // Optional: Clear saved session if you're using localStorage
    // localStorage.removeItem("loggedInUser");

    // Redirect to login page
    window.location.href = "login.html"; // Change path if needed
  }
});
