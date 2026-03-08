function formatPrice(value) {
  return `${value.toLocaleString("en-LK")} LKR`;
}

async function renderCatalog() {
  const container = document.getElementById("productContainer");
  if (!container) return;

  if (window.PRODUCTS_READY) {
    await window.PRODUCTS_READY;
  }

  container.innerHTML = "";

  window.PRODUCTS.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    const stockLabel = product.in_stock ? "In Stock" : "Out of Stock";
    const stockClass = product.in_stock ? "in" : "out";

    card.innerHTML = `
      <img class="zoomable" data-lightbox="true" data-fullsrc="${product.images[0]}" src="${product.images[0]}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">${formatPrice(product.price)}</div>
      <span class="stock-badge ${stockClass}">${stockLabel}</span>
      <div style="margin-top: 10px;">
        <a class="btn" href="product.html?id=${product.id}">View Product</a>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderCatalog);
