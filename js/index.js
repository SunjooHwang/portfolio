import LocomotiveScroll from "locomotive-scroll";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import emailjs, { send } from "emailjs-com";
import { init } from "emailjs-com";
import "swiper/swiper-bundle.css";
import "regenerator-runtime/runtime";

init("user_poIv8MFe13Qt8NqiRqneG");
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section");

const aboutSection = document.querySelector(".section--about");

const brand = document.querySelector(".navbar__brand");
const brandMobile = document.querySelector(".navbar__brand--mobile");

const hamburger = document.querySelector(".navbar__hamburger");
const navMobile = document.querySelector(".navbar__menu--mobile");
const navAnchors = document.querySelectorAll(".navbar__anchor");
const navAnchorsMobile = document.querySelectorAll(".navbar__anchor--mobile");

const headerClasses = ["header--opaque", "header--transparent"];

const mailBtn = document.querySelector(".contact__mail__submit");

const modalSuccess = document.querySelector(".modal--success");
const modalError = document.querySelector(".modal--error");
const closeSuccessBtn = document.getElementById("modal--success__btn");
const closeErrorBtn = document.getElementById("modal--error__btn");
const spinner = document.querySelector(".modal--spinner");
const modalMessage = document.getElementById("modal--success__message");

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

const headerToggle = function () {
  headerClasses.forEach((headerClass) => header.classList.toggle(headerClass));
};

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

const renderSpinner = function () {
  spinner.style.opacity = "0";
};
const showMessage = function () {
  modalMessage.style.opacity = "1";
};
const showCloseBtn = function () {
  closeSuccessBtn.style.opacity = "1";
};

const sendMail = function () {
  emailjs
    .sendForm("service_etoh47v", "template_bwtgrds", "#contact__mail")
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        modalError.classList.remove("modal--hidden");
        console.error("FAILED...", error);
      }
    );
};

mailBtn.addEventListener("click", function (e) {
  sendMail();
  modalSuccess.classList.remove("modal--hidden");
  e.preventDefault();
  setTimeout(renderSpinner, 2000);
  setTimeout(showCloseBtn, 2000);
  setTimeout(showMessage, 2000);
});

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

closeSuccessBtn.addEventListener("click", async function () {
  modalSuccess.classList.add("modal--hidden");
  spinner.style.opacity = "1";
  modalMessage.style.opacity = "0";
  document.getElementById("contact__mail__name").value = "";
  document.getElementById("contact__mail__address").value = "";
  document.getElementById("contact__mail__message").value = "";
});

closeErrorBtn.addEventListener("click", function () {
  modalError.classList.add("modal--hidden");
});
