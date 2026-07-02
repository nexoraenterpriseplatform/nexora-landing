/*====================================================
NEXORA WEBSITE
RC2.7.4 — MAIN ENGINE
====================================================*/

console.log("NEXORA Official Website — RC2.7.4 Ambient Experience carregada.");

/*====================================================
ELEMENTOS
====================================================*/

const navbar = document.querySelector(".navbar");

/*====================================================
NAVBAR
====================================================*/

function handleNavbarScroll() {

  if (!navbar) return;

  if (window.scrollY > 24) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

}

/*====================================================
PAGE LOADED
====================================================*/

function initializeWebsite() {

  document.body.classList.add("page-loaded");

  handleNavbarScroll();

}

/*====================================================
WINDOW EVENTS
====================================================*/

window.addEventListener(
  "scroll",
  handleNavbarScroll,
  { passive: true }
);

window.addEventListener(
  "load",
  initializeWebsite
);

/*====================================================
INITIAL STATE
====================================================*/

initializeWebsite();