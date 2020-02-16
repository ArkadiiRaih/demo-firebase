const modals = Array.from(document.querySelectorAll(".modal"));
const modal_openners = document.querySelectorAll('[data-action="open-modal"]');

modal_openners.forEach(openner =>
  openner.addEventListener("click", toggleModal)
);
modals.forEach(modal => modal.addEventListener("click", closeModal));
window.addEventListener("click", handleWindowClick);

function toggleModal(e) {
  const [modal] = modals.filter(
    mod => mod.dataset.target == e.target.dataset.target
  );
  modal.classList.toggle("modal_opened");
}

function handleWindowClick(e) {
  if (e.target.matches(".modal_opened")) {
    e.target.classList.remove("modal_opened");
  }
}

function closeModal(e) {
  if (e.target.matches(".modal__close")) {
    this.classList.remove("modal_opened");
  }
}
