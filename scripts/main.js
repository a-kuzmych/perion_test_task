"use strict";

const slides = [
  {
    text: `"The first time I used the Samsung Bespoke Jet™, I cried. I'm not being sensational; I really did. Of course, this vacuum worked great. But that's not all."`,
    img: "./assets/img/slider-image-1.png",
    page: "1/5",
  },
  {
    text: `"If you're an over-cleaner, like myself, you'll nerd out on all of the functions. If you avoid this chore at all costs, you'll appreciate how simple Samsung makes it."`,
    img: "./assets/img/slider-image-2.png",
    page: "2/5",
  },
  {
    text: `"Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)"`,
    img: "./assets/img/slider-image-3.png",
    page: "3/5",
  },
  {
    text: `"When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that's when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It's like a vacuum for your vacuum."`,
    img: "./assets/img/slider-image-4.png",
    page: "4/5",
  },
  {
    text: `"Because it's so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily."`,
    img: "./assets/img/slider-image-5.png",
    page: "5/5",
  },
];

let currentIndex = 0;

const logo = document.querySelector(".slider__logo");
const lines = document.querySelectorAll(".slider__line");
const slideText = document.querySelector(".slider__quote");
const slideImage = document.getElementById("slideImage");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

slides.forEach((slide) => {
  const img = new Image();
  img.src = slide.img;
});

window.addEventListener("load", function () {
  gsap.to(logo, { x: 0, opacity: 1, duration: 0.4 });
  gsap.to(lines, { opacity: 1, x: 0, duration: 0.6, delay: 1.2, stagger: 0.25 });

  gsap.to(slideImage, {
    x: window.innerWidth > 768 ? 350 : 0,
    y: window.innerWidth <= 768 ? 320 : 0,
    delay: 2,
    duration: 0.8,
    onComplete: () => {
      gsap.to(slideImage, { x: 0, y: 0, duration: 0 });
      slideImage.style.position = "relative";
      gsap.to(slideText, { visibility: "visible", opacity: 1, duration: 0.5 });
      gsap.to(pageNumber, { opacity: 1, duration: 0.5 });
      startAutoPlay();
    },
  });
});

function updateSlide(index, direction = "next") {
  const slide = slides[index];

  gsap.to(slideText, {
    duration: 0.15,
    opacity: 0,
    onComplete: () => {
      slideText.textContent = slide.text;
      gsap.to(slideText, { opacity: 1, duration: 0.35 });
    },
  });

  gsap.to(pageNumber, {
    opacity: 0,
    duration: 0.15,
    onComplete: () => {
      pageNumber.textContent = slide.page;
      gsap.to(pageNumber, { opacity: 1, duration: 0.35 });
    },
  });

  gsap.to(slideImage, {
    opacity: 0.3,
    duration: 0.25,
    onComplete: () => {
      slideImage.src = slide.img;
      gsap.to(slideImage, { opacity: 1, duration: 0.4 });
    },
  });

  gsap.fromTo(
    slideText,
    { x: direction === "next" ? 50 : -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4 }
  );

  checkButtons();
}

function checkButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
  prevBtn.classList.toggle("disabled", currentIndex === 0);
  nextBtn.classList.toggle("disabled", currentIndex === slides.length - 1);
}

let autoPlayTimer;
let userInteracted = false;

function startAutoPlay() {
  if (userInteracted) return;
  autoPlayTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  }, 4500);
}

function stopAutoPlay() {
  clearInterval(autoPlayTimer);
  userInteracted = true;
}

prevBtn.addEventListener("click", () => {
  stopAutoPlay();
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex, "prev");
});

nextBtn.addEventListener("click", () => {
  stopAutoPlay();
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex, "next");
});

updateSlide(currentIndex);
