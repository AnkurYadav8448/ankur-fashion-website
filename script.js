// ─── Cart State ───────────────────────────────────────────────
const cart = [];

// ─── Product Data (All 33 Products) ──────────────────────────
const products = [
  { id: 1,  name: "Floral Summer Dress",      price: 1499 },
  { id: 2,  name: "Party Wear Outfit",         price: 2199 },
  { id: 3,  name: "Pink Casual Style",         price: 1899 },
  { id: 4,  name: "Modern Fashion Set",        price: 2599 },
  { id: 5,  name: "Traditional Silk Saree",    price: 4499 },
  { id: 6,  name: "Anarkali Suit Set",         price: 3299 },
  { id: 7,  name: "Jaipuri Printed Kurti",     price: 1799 },
  { id: 8,  name: "Gota Patti Dress",          price: 3999 },
  { id: 9,  name: "Festival Saree Collection", price: 5499 },
  { id: 10, name: "Wedding Special",           price: 8999 },
  { id: 11, name: "Party Wear Saree",          price: 4199 },
  { id: 12, name: "Designer Ethnic Gown",      price: 5899 },
  { id: 13, name: "Modern Indo-Western Set",   price: 3799 },
  { id: 14, name: "White Sneakers",            price: 2499 },
  { id: 15, name: "Sports Running Shoes",      price: 3299 },
  { id: 16, name: "Black Fashion Shoes",       price: 2899 },
  { id: 17, name: "Stylish Heels",             price: 1999 },
  { id: 18, name: "Casual Sneakers",           price: 2199 },
  { id: 19, name: "Leather Wallet",            price: 999  },
  { id: 20, name: "Classic Brown Wallet",      price: 1299 },
  { id: 21, name: "Premium Black Wallet",      price: 1499 },
  { id: 22, name: "Mini Stylish Wallet",       price: 899  },
  { id: 23, name: "Luxury Wallet Set",         price: 1799 },
  { id: 24, name: "Black Sunglasses",          price: 1299 },
  { id: 25, name: "Fashion Goggles",           price: 1599 },
  { id: 26, name: "Premium Shades",            price: 2199 },
  { id: 27, name: "Stylish Sun Glasses",       price: 1899 },
  { id: 28, name: "Golden Frame Goggles",      price: 2499 },
  { id: 29, name: "Pink Fashion Heels",        price: 2299 },
  { id: 30, name: "Elegant Sandals",           price: 1799 },
  { id: 31, name: "Stylish White Shoes",       price: 3099 },
  { id: 32, name: "Modern Sneakers",           price: 2699 },
  { id: 33, name: "Premium Sports Shoes",      price: 4199 },
];

// ─── Add to Cart ──────────────────────────────────────────────
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
  showToast(`"${product.name}" added to cart!`);
}

// ─── Update Cart Badge Count ──────────────────────────────────
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "inline-block" : "none";
}

// ─── Toast Notification ───────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ─── Cart Modal ───────────────────────────────────────────────
function openCart() {
  const modal = document.getElementById("cart-modal");
  renderCartModal();
  modal.style.display = "flex";
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function renderCartModal() {
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  if (cart.length === 0) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    total.textContent = "";
    return;
  }

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>Qty: ${item.qty}</span>
      <span>₹${(item.price * item.qty).toLocaleString()}</span>
      <button onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join("");

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  total.textContent = `Total: ₹${grandTotal.toLocaleString()}`;
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) cart.splice(index, 1);
  updateCartBadge();
  renderCartModal();
}

// ─── Wire Up Buttons on Page Load ─────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // ─── Add to Cart Buttons ────────────────────────────────────
  const cartButtons = document.querySelectorAll("section .add-btn");
  cartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => addToCart(index + 1));
  });

  // ─── Buy Now Buttons ────────────────────────────────────────
  const buyButtons = document.querySelectorAll("section .buy-btn");
  buyButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      addToCart(index + 1);
      openCart();
    });
  });

  // ─── Inject Cart Icon into Header ───────────────────────────
  const header = document.querySelector("header");
  const cartIcon = document.createElement("div");
  cartIcon.id = "cart-btn";
  cartIcon.innerHTML = `🛒 Cart <span id="cart-badge" style="display:none">0</span>`;
  cartIcon.onclick = openCart;
  header.appendChild(cartIcon);

  // ─── Inject Toast Element ───────────────────────────────────
  const toast = document.createElement("div");
  toast.id = "toast";
  document.body.appendChild(toast);

  // ─── Inject Cart Modal ──────────────────────────────────────
  const modal = document.createElement("div");
  modal.id = "cart-modal";
  modal.style.display = "none";
  modal.innerHTML = `
    <div id="cart-modal-content">
      <h2>🛒 Your Cart</h2>
      <div id="cart-items"></div>
      <p id="cart-total"></p>
      <button onclick="closeCart()">✕ Close</button>
    </div>
  `;
  document.body.appendChild(modal);

});