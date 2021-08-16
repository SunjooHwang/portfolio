import LocomotiveScroll from "locomotive-scroll";

const aboutSection = document.querySelector(".section--about");
const header = document.querySelector(".header");
const navItems = document.querySelectorAll(".navbar__menu__item");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".navbar__hamburger");
const navMobile = document.querySelector(".navbar__menu--mobile");

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 2,
});

const headerOptions = {
  root: null,
  threshold: 0.1,
};

const navOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const headerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      header.classList.add("header--opaque");
      header.classList.remove("header--transparent");
    } else {
      header.classList.remove("header--opaque");
      header.classList.add("header--transparent");
    }
  });
};

const navCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target.id);
      const navItem = navItems[entry.target.id];
      navItem.classList.add("item--active");
      Object.values(navItems).forEach((item) => {
        if (item != navItem) {
          item.classList.remove("item--active");
        }
      });
    }
  });
};

const observeHeader = new IntersectionObserver(headerCallback, headerOptions);
const observeNav = new IntersectionObserver(navCallback, navOptions);

observeHeader.observe(aboutSection);
sections.forEach((section) => observeNav.observe(section));

hamburger.addEventListener("click", () => {
  navMobile.classList.toggle("mobile--active");
});
