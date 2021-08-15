import LocomotiveScroll from "locomotive-scroll";

const container = document.querySelector(".section-two");
const header = document.querySelector(".header");

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 2,
});

const observerOptions = {
  root: null,
  threshold: 0.1,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("hey");
      header.classList.add("header--opaque");
      header.classList.remove("header--transparent");
    } else {
      header.classList.remove("header--opaque");
      header.classList.add("header--transparent");
    }
  });
};

const observeHeader = new IntersectionObserver(
  observerCallback,
  observerOptions
);

observeHeader.observe(container);
