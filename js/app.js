// Defining Global Variables
const navigation = document.getElementById("nav__list");
const sections = document.querySelectorAll("section");

// Building navigation
const navBar = () => {
  let navHead = "";
  //loop all section
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionData = section.dataset.nav;

    navHead += `<li><a class="menu__link" href="#${sectionId}">${sectionData}</a></li>`;
  });

  navigation.innerHTML = navHead;
};

navBar();

// Add class 'active' to section when near top of viewport

// find the largest value to the section number
const offset = (section) => Math.floor(section.getBoundingClientRect().top);

//remove active class
const removeActive = (section) => {
  section.classList.remove("your-active-class");
  section.style.cssText = "border: none";
};
// add acive class
const addActive = (condition, section) => {
  if (condition) {
    section.classList.add("your-active-class");
    section.style.cssText = "border: 5px solid #cc3333;";
  }
};
//handles add/remove of classes in and outer
const sectionActivation = () => {
  sections.forEach((section) => {
    const elementOffset = offset(section);

    inviewport = () => elementOffset < 150 && elementOffset >= -150;

    removeActive(section);
    addActive(inviewport(), section);
  });
};

window.addEventListener("scroll", sectionActivation);

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
