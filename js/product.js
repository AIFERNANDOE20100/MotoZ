function formatPrice(value) {
  return `${value.toLocaleString("en-LK")} LKR`;
}

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function getSelectedColorFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("color");
  return raw ? raw.trim() : "";
}

async function renderProduct() {
  if (window.PRODUCTS_READY) {
    await window.PRODUCTS_READY;
  }

  const productId = getProductId();
  const product = window.PRODUCTS.find(item => item.id === productId);

  if (!product) {
    document.getElementById("productView").innerHTML =
      "<div class=\"empty-state\">Product not found.</div>";
    return;
  }

  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = formatPrice(product.price);
  const addButton = document.getElementById("addToCartButton");
  if (!product.in_stock) {
    addButton.textContent = "Out of Stock";
    addButton.disabled = true;
  }

  const colorSelect = document.getElementById("colorSelect");
  const colorRow = colorSelect?.closest(".form-row");
  const urlColor = getSelectedColorFromUrl();
  const colors = Array.isArray(product.colors) ? product.colors : [];

  colorSelect.innerHTML = "";
  if (urlColor) {
    if (colorRow) colorRow.style.display = "none";
    colorSelect.innerHTML = `<option value="${urlColor}">${urlColor}</option>`;
  } else if (colors.length) {
    if (colorRow) colorRow.style.display = "";
    colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
  } else {
    if (colorRow) colorRow.style.display = "none";
    colorSelect.innerHTML = `<option value="Default">Default</option>`;
  }

  setMainImage(product.images[0]);
  renderGallery(product.images);

  addButton.addEventListener("click", () => {
    const quantity = Number(document.getElementById("quantityInput").value);
    const selectedColor = colorSelect.value;

    if (Number.isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      quantity
    });

    alert("Added to cart.");
  });
}

document.addEventListener("DOMContentLoaded", renderProduct);
