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

// Add class 'active' to section when near top of viewport

// Gets top position of section elements in viewport
const offset = (section) => section.getBoundingClientRect().top;

//removes active class
const removeActive = (section) => {
  section.classList.remove("your-active-class");
  section.style.cssText = "border: none";
};
// add active class
const addActive = (condition, section) => {
  if (condition) {
    section.classList.add("your-active-class");
    section.style.cssText =
      "border: 5px solid #ff3d33; transition: all 300ms ease; transition-delay: 0.3s";
  }
};
//handles add/remove of classes in and outer
const sectionActivation = () => {
  sections.forEach((section) => {
    const sectionOffset = offset(section);

    isInviewport = () => sectionOffset < 200 && sectionOffset > -200;

    removeActive(section);
    addActive(isInviewport(), section);
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
