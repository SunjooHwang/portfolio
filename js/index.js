import { rosybrown } from "color-name";
import LocomotiveScroll from "locomotive-scroll";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";

// configure Swiper to use modules
import "swiper/swiper-bundle.css";

const homeSection = document.querySelector(".section--home");

const sectionsIntersected = [
  document.querySelector(".section--about"),
  document.querySelector(".section--skills"),
  document.querySelector(".section--works"),
  document.querySelector(".section--contact"),
];

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
  threshold: 0.3,
};

const navOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const headerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      header.classList.add("header--opaque");
      header.classList.remove("header--transparent");
      navMobile.classList.add("mobile--white");
    }
  });
};

const homeCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      header.classList.remove("header--opaque");
      header.classList.add("header--transparent");
      navMobile.classList.remove("mobile--white");
    }
  });
};

const navCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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
const observeHome = new IntersectionObserver(homeCallback, headerOptions);

sectionsIntersected.forEach((section) => observeHeader.observe(section));
observeHome.observe(homeSection);

// observeHeader.observe(aboutSection);
sections.forEach((section) => observeNav.observe(section));

hamburger.addEventListener("click", () => {
  navMobile.classList.toggle("mobile--active");
});

SwiperCore.use([Navigation, Pagination]);

const swiper = new Swiper(".skills__slider", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 30,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
