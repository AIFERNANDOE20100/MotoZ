function ensureLightbox() {
  let overlay = document.getElementById("imageLightbox");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "imageLightbox";
  overlay.className = "image-lightbox";
  overlay.innerHTML = `
    <div class="image-lightbox__backdrop" data-close="true"></div>
    <div class="image-lightbox__content">
      <button class="image-lightbox__close" type="button" aria-label="Close" data-close="true">×</button>
      <img id="imageLightboxImg" alt="Full size image">
    </div>
  `;

  document.body.appendChild(overlay);
  return overlay;
}

function openLightbox(src) {
  const overlay = ensureLightbox();
  const img = document.getElementById("imageLightboxImg");
  if (!img) return;

  img.src = src;
  overlay.classList.add("is-open");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  const overlay = document.getElementById("imageLightbox");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target?.dataset?.close === "true") {
    closeLightbox();
    return;
  }

  if (target?.dataset?.lightbox === "true") {
    const src = target.dataset.fullsrc || target.src;
    if (src) {
      event.preventDefault();
      openLightbox(src);
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
