console.log("NEXORA Official Website — Release 0.9.1 carregada.");

const navbar = document.querySelector(".navbar");

function handleNavbarScroll(){
  if (!navbar) return;

  if (window.scrollY > 24) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});
