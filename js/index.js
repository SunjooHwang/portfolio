import LocomotiveScroll from "locomotive-scroll";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import "swiper/swiper-bundle.css";

const aboutSection = document.querySelector(".section--about");

const header = document.querySelector(".header");
const brand = document.querySelector(".navbar__brand");
const brandMobile = document.querySelector(".navbar__brand--mobile");
const navItems = document.querySelectorAll(".navbar__menu__item");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".navbar__hamburger");
const navMobile = document.querySelector(".navbar__menu--mobile");
const headerClasses = ["header--opaque", "header--transparent"];
const mailBtn = document.querySelector(".contact__mail__submit");

const navAnchors = document.querySelectorAll(".navbar__anchor");
const navAnchorsMobile = document.querySelectorAll(".navbar__anchor--mobile");

init("user_poIv8MFe13Qt8NqiRqneG");
gsap.registerPlugin(ScrollTrigger);

const headerToggle = function () {
  console.log("toggle");
  headerClasses.forEach((headerClass) => header.classList.toggle(headerClass));
};

const scroll = new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true,
});

scroll.on("scroll", () => {
  ScrollTrigger.update;
});

ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  pinType: document.querySelector(".container").style.transform
    ? "transform"
    : "fixed",
});

gsap.to(header, {
  scrollTrigger: {
    trigger: aboutSection,
    start: "top 150",
    onEnter: headerToggle,
    onLeaveBack: headerToggle,
    scroller: ".container",
  },
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());

ScrollTrigger.refresh();

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

const skillsSlider = new Swiper(".skills__slider", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 0,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".skills__pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    767: {
      slidesPerView: 4,
      slidesPerColumn: 2,
      slidesPerGroup: 8,
    },
  },
});

const worksSlider = new Swiper(".works__slider", {
  // direction: "vertical",
  slidesPerView: 1,
  pagination: {
    el: ".works__pagination",
    dynamicBullets: true,
  },
  breakpoints: {
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
    },
  },
});

const sendMail = function (e) {
  e.preventDefault();
  emailjs
    .sendForm("service_etoh47v", "template_bwtgrds", "#contact__mail")
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};

mailBtn.addEventListener("click", sendMail);

navAnchors.forEach((anchor, i) => {
  sections.forEach((sec, j) => {
    if (i == j)
      anchor.addEventListener("click", function () {
        scroll.scrollTo(sec);
      });
  });
});

navAnchorsMobile.forEach((anchor, i) => {
  sections.forEach((sec, j) => {
    if (i == j)
      anchor.addEventListener("click", function () {
        scroll.scrollTo(sec);
      });
  });
});

brand.addEventListener("click", function () {
  scroll.scrollTo(sections[0]);
});

brandMobile.addEventListener("click", function () {
  scroll.scrollTo(sections[0]);
});
