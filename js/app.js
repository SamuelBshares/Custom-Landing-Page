// Defining Global Variables
const navigation = document.getElementById("nav__list");
const sections = document.querySelectorAll("section");
const topBtn = document.getElementById("scrollBtn");

// // Building navigation
const navCreate = () => {
  sections.forEach((section) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const navbarText = document.createTextNode(section.dataset.nav);
    a.href = `#${section.id}`;
    a.classList.add("menu__link");

    a.appendChild(navbarText);
    li.appendChild(a);
    navigation.appendChild(li);
  });
};

navCreate();

// Set active class on viewport
const vpHeight = window.innerHeight;

const classActivation = () => {
  sections.forEach((section) => {
    const sectionPos = section.getBoundingClientRect();
    if (sectionPos.top < vpHeight / 2 && sectionPos.top > -(vpHeight / 2)) {
      section.classList.add("active");
    } else {
      section.classList.add("unactive");
    }
    if (sectionPos.bottom < 0 || sectionPos.top > vpHeight) {
      section.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", classActivation);
// Navbar hiding on scroll

const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-level");
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
    body.classList.remove("scroll-level");
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

//Scroll to section on nav click

const smoothScroll = () => {
  const links = document.querySelectorAll(".menu__link");
  for (const link of links) {
    link.addEventListener("click", clickHandler);
  }
  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const top = document.querySelector(href).offsetTop;

    scrollTo({
      top: top,
      behavior: "smooth",
    });
  }
};

smoothScroll();

//Scroll to top button
//button appears if scrolled to below half of the page
window.addEventListener("scroll", () => {
  const scroll = document.body.scrollTop;
  if (
    scroll > window.innerHeight / 1.5 ||
    document.documentElement.scrollTop > window.innerHeight / 1.5
  ) {
    topBtn.style.display = "block";
    window.setTimeout(() => {
      topBtn.style.transition = "opacity 0.3s ease 0.3s";
      topBtn.style.opacity = "1";
    }, 300);
  } else {
    window.setTimeout(() => {
      topBtn.style.transition = "opacity 0.3s ease 0.3s";
      topBtn.style.opacity = "0";
    }, 300);
  }
});

//scroll on top if the button is clicked

topBtn.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
