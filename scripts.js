// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Search Bar Toggle
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

// Cart Functionality
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Open Cart
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

// Close Cart
closeCart.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// Close Cart when clicking overlay
overlay.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    const name = e.target.getAttribute("data-name");
    const price = parseFloat(e.target.getAttribute("data-price"));
    const image = e.target.getAttribute("data-image");

    // Check if item already in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    updateCart();

    // Show cart sidebar
    cartSidebar.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Animation for cart button
    cartBtn.classList.add("animate-bounce");
    setTimeout(() => {
      cartBtn.classList.remove("animate-bounce");
    }, 1000);
  });
});

// Update Cart UI
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
                    <div class="text-center py-12 text-charcoal/50">
                        <i class="fas fa-shopping-bag text-4xl mb-4 animate-float"></i>
                        <p class="text-lg">Your cart is empty</p>
                    </div>
                `;
    cartSubtotal.textContent = "$0.00";
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
                <div class="cart-item flex items-center py-4 border-b border-champagne">
                    <div class="flex-shrink-0 w-20 h-20 bg-champagne rounded-md overflow-hidden">
                        <img src="${item.image}" alt="${
        item.name
      }" class="w-full h-full object-cover">
                    </div>
                    <div class="ml-4 flex-1">
                        <h4 class="text-sm font-sans font-medium">${
                          item.name
                        }</h4>
                        <p class="text-sm text-charcoal/50">$${item.price.toFixed(
                          2
                        )}</p>
                    </div>
                    <div class="flex items-center">
                        <button class="decrease-quantity text-charcoal/50 hover:text-gold px-2 py-1 transition duration-300" data-id="${
                          item.id
                        }">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="mx-2 text-sm">${item.quantity}</span>
                        <button class="increase-quantity text-charcoal/50 hover:text-gold px-2 py-1 transition duration-300" data-id="${
                          item.id
                        }">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                        <button class="remove-item ml-4 text-charcoal/50 hover:text-red-500 transition duration-300" data-id="${
                          item.id
                        }">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `
    )
    .join("");

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  // Add event listeners to quantity buttons
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").getAttribute("data-id");
      const item = cart.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        updateCart();
      }
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").getAttribute("data-id");
      const item = cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      updateCart();
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
