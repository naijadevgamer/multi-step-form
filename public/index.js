"use strict";
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
let currPage = 1;
const handlePage = () => {
    // Page 1, and there are other pages
    console.log(currPage);
    if (currPage === 1) {
        prevBtn.classList.add("invisible");
        submitBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
    }
    if (currPage === 2) {
        prevBtn.classList.remove("invisible");
        submitBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
    }
    if (currPage === 3) {
        prevBtn.classList.remove("invisible");
        submitBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
    }
    if (currPage === 4) {
        prevBtn.classList.remove("invisible");
        submitBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
    }
};
const handleNext = () => {
    if (currPage < 4)
        currPage += 1;
    handlePage();
};
nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleNext();
});
