"use strict";

let wrapper = document.querySelector(".slider__list");
let sliderElem = document.querySelector(".slider__container");
let slideItem = document.querySelectorAll(".slider__item");
let next = document.querySelector('.slider__next');
let prev = document.querySelector('.slider__prev');

let contrWidth = document.querySelector('.slider__container').offsetWidth;
let contentWidth = contrWidth;
let widthWrapper = slideItem.length * contentWidth + 'px';
wrapper.style.width = widthWrapper;

let pos;

let addDataPosSlide = function () {
    for (let i = 0; i < slideItem.length; i++) {
        pos = i * -200; // подобрано примерно
        slideItem[i].setAttribute("data-pos", pos + "px");
    }
};

addDataPosSlide();

let slideIndex = 1;

showSlides(slideIndex);

function showSlides(n) {
    if (n > slideItem.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slideItem.length;
    }

    wrapper.style.left = slideItem[slideIndex - 1].getAttribute("data-pos");

}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener('click', function () {
    plusSlides(-1);
});

next.addEventListener('click', function () {
    plusSlides(1);
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 39) {
        evt.preventDefault();
        plusSlides(1);
    }
    if (evt.keyCode === 37) {
        evt.preventDefault();
        plusSlides(-1);
    }
});