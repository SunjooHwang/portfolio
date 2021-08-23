import LocomotiveScroll from "locomotive-scroll";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
gsap.registerPlugin(ScrollTrigger);

// configure Swiper to use modules
import "swiper/swiper-bundle.css";

const aboutSection = document.querySelector(".section--about");

const header = document.querySelector(".header");
const navItems = document.querySelectorAll(".navbar__menu__item");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".navbar__hamburger");
const navMobile = document.querySelector(".navbar__menu--mobile");

const headerClasses = ["header--opaque", "header--transparent"];

const mainContainer = document.querySelector(".container");

const headerToggle = function () {
  console.log("toggle");
  headerClasses.forEach((headerClass) => header.classList.toggle(headerClass));
};

const scroll = new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
scroll.on("scroll", () => {
  ScrollTrigger.update;
});

// tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".container").style.transform
    ? "transform"
    : "fixed",
});

gsap.to(header, {
  scrollTrigger: {
    trigger: aboutSection,
    start: "top 70",
    onEnter: headerToggle,
    onLeaveBack: headerToggle,
    scroller: ".container",
  },
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => scroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
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

const mailData = {
  service_id: "service_etoh47v",
  template_id: "template_bwtgrds",
  user_id: "user_poIv8MFe13Qt8NqiRqneG",
};

const sendMail = function () {
  ajax("https://api.emailjs.com/api/v1.0/email/send", {
    type: "POST",
    data: JSON.stringify(mailData),
    contentType: "application/json",
  })
    .done(function () {
      alert("Your mail is sent!");
    })
    .fail(function (error) {
      alert("Oops... " + JSON.stringify(error));
    });
};
