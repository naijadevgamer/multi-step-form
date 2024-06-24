"use strict";
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const sidebar = document.querySelector(".sidebar");
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
const handlePrev = () => {
    if (currPage > 1)
        currPage -= 1;
    handlePage();
};
nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleNext();
});
prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handlePrev();
});
const handleNavButtonClick = (e) => {
    const target = e.target;
    if (target && target.nodeName === "BUTTON") {
        const elNum = target.textContent;
        if (elNum && ["1", "2", "3", "4"].includes(elNum)) {
            currPage = +elNum;
            handlePage();
        }
    }
};
sidebar.addEventListener("click", handleNavButtonClick);
