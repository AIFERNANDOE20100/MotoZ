const CART_KEY = "sm_cart";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(
    entry =>
      entry.productId === item.productId &&
      entry.color === item.color
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

function updateCartQuantity(productId, color, quantity) {
  const cart = getCart();
  const entry = cart.find(
    item => item.productId === productId && item.color === color
  );

  if (!entry) return;

  if (quantity <= 0) {
    removeFromCart(productId, color);
    return;
  }

  entry.quantity = quantity;
  saveCart(cart);
}

function removeFromCart(productId, color) {
  const cart = getCart().filter(
    item => !(item.productId === productId && item.color === color)
  );
  saveCart(cart);
}

function cartTotals(cart) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const { totalItems } = cartTotals(getCart());
  badge.textContent = String(totalItems);
  badge.classList.toggle("is-hidden", totalItems === 0);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
