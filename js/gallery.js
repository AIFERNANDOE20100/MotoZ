function setMainImage(src) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = src;
    mainImage.dataset.lightbox = "true";
    mainImage.dataset.fullsrc = src;
    mainImage.classList.add("zoomable");
  }
}

function renderGallery(images) {
  const thumbs = document.getElementById("thumbContainer");
  if (!thumbs) return;

  thumbs.innerHTML = "";
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `thumb${index === 0 ? " active" : ""}`;
    img.alt = "thumbnail";
    img.dataset.lightbox = "true";
    img.dataset.fullsrc = src;
    img.classList.add("zoomable");

    img.addEventListener("click", () => {
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      img.classList.add("active");
      setMainImage(src);
    });

    thumbs.appendChild(img);
  });
}
