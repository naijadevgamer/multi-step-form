"use strict";
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const navBtns = document.querySelectorAll(".btn-nav");
const pagination = document.querySelector(".pagination");
const sidebar = document.querySelector(".sidebar");
let currPage = 1;
const handlePageChange = () => {
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
// const handleNext = (): void => {
//   if (currPage < 4) currPage += 1;
//   handlePageChange();
// };
// const handlePrev = (): void => {
//   if (currPage > 1) currPage -= 1;
//   handlePageChange();
// };
const handlePagination = (e) => {
    const target = e.target;
    // if (target && target.nodeName === "BUTTON") {
    e.preventDefault();
    // Handle next step
    if (target.classList.contains("btn-p--next")) {
        currPage++;
        handlePageChange();
    }
    // Handle prev step
    if (target.classList.contains("prev")) {
        currPage--;
        handlePageChange();
    }
    // Handle Submit
    // if (target.textContent === "Confirm")
};
pagination.addEventListener("click", handlePagination);
// nextBtn.addEventListener("click", (e: Event) => {
//   e.preventDefault();
//   handleNext();
// });
// prevBtn.addEventListener("click", (e: Event) => {
//   e.preventDefault();
//   handlePrev();
// });
// const handleBtnActive = (e) => {
//   navBtns.forEach((el) => {
//     const ele = el as HTMLButtonElement;
//     ele.classList.remove("btn-nav--active");
//   });
// };
const handleNavButtonClick = (e) => {
    const target = e.target;
    if (target && target.nodeName === "BUTTON") {
        const elNum = target.textContent;
        if (elNum && ["1", "2", "3", "4"].includes(elNum)) {
            currPage = +elNum;
            handlePageChange();
        }
    }
    const clicked = target.closest(".btn-nav");
    // Matching strategy
    if (!clicked)
        return;
    navBtns.forEach((e) => {
        const el = e;
        el.classList.remove("btn-nav--active");
    });
    clicked.classList.add("btn-nav--active");
};
sidebar.addEventListener("click", handleNavButtonClick);
