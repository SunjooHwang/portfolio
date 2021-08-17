import { rosybrown } from "color-name";
import LocomotiveScroll from "locomotive-scroll";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";

// configure Swiper to use modules
import "swiper/swiper-bundle.css";

const homeSection = document.querySelector(".section--home");
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

const navOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const navCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const navItem = navItems[entry.target.id];
      navItem.classList.add("item--active");
      navItem.classList.remove("hvr-sweep-to-right");
      navItem.classList.add("hvr-sweep-to-right--white");
      Object.values(navItems).forEach((item) => {
        if (item != navItem) {
          navItem.classList.remove("item--active");
          navItem.classList.add("hvr-sweep-to-right");
          navItem.classList.remove("hvr-sweep-to-right--white");
        }
      });
    }
  });
};

const observeNav = new IntersectionObserver(navCallback, navOptions);

sections.forEach((section) => observeNav.observe(section));

hamburger.addEventListener("click", () => {
  navMobile.classList.toggle("mobile--active");
});

SwiperCore.use([Navigation, Pagination]);

const swiper = new Swiper(".skills__slider", {
  slidesPerView: 4,
  slidesPerColumn: 2,
  slidesPerGroup: 8,
  spaceBetween: 0,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ScrollTrigger.create({
//   target: "#1",
//   start: "top top",
//   end: 99999,
//   markers: true,
//   toggleClass: { className: "header--opaque", targets: ".header" },
// });

const headerClasses = ["header--opaque", "header--transparent"];

const headerToggle = function () {
  console.log("toggle");
  headerClasses.forEach((headerClass) => header.classList.toggle(headerClass));
};

gsap.to(header, {
  scrollTrigger: {
    trigger: aboutSection,
    start: "top 70",
    onEnter: headerToggle,
    onLeaveBack: headerToggle,
  },
});
