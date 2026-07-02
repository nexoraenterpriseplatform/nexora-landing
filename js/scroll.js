/*====================================================
NEXORA SCROLL ENGINE
RC2.7.4 — AMBIENT EXPERIENCE
====================================================*/

/*====================================================
REVEAL ENGINE
====================================================*/

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: .16,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach((el) => revealObserver.observe(el));

/*====================================================
ACTIVE NAVIGATION
====================================================*/

const navLinks = document.querySelectorAll(".navbar-links a[href^='#']");

const navTargets = Array.from(navLinks)
  .map((link) => {
    const id = link.getAttribute("href");
    const section = document.querySelector(id);

    return { link, section };
  })
  .filter((item) => item.section);

function setActiveNavLink(){
  const scrollPosition = window.scrollY + 220;
  let activeItem = navTargets[0];

  navTargets.forEach((item) => {
    const sectionTop = item.section.offsetTop;
    const sectionBottom = sectionTop + item.section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      activeItem = item;
    }
  });

  navLinks.forEach((link) => link.classList.remove("active"));

  if (activeItem?.link) {
    activeItem.link.classList.add("active");
  }
}

/*====================================================
SCROLL PROGRESS
====================================================*/

const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress(){
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (documentHeight <= 0) {
    scrollProgress.style.width = "0%";
    return;
  }

  const progress = Math.min((scrollTop / documentHeight) * 100, 100);
  scrollProgress.style.width = `${progress}%`;
}

/*====================================================
AMBIENT SCROLL STATE
====================================================*/

function updateAmbientScrollState(){
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll > 0 ? scrollY / maxScroll : 0;

  document.documentElement.style.setProperty(
    "--nx-scroll-ratio",
    scrollRatio.toFixed(4)
  );
}

/*====================================================
SCROLL HANDLER
====================================================*/

function handleScroll(){
  setActiveNavLink();
  updateScrollProgress();
  updateAmbientScrollState();
}

window.addEventListener("scroll", handleScroll, { passive:true });
window.addEventListener("resize", handleScroll);
window.addEventListener("load", handleScroll);

handleScroll();