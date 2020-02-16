import { debounce } from "../../utilities";

window.addEventListener("DOMContentLoaded", animateHeader);

function animateHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", debounce(handleScroll));

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add("header__sticky");
    }
    if (window.scrollY < 20) {
      header.classList.remove("header__sticky");
    }
  }
}
