"use strict";
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const navBtns = document.querySelectorAll(".btn-nav");
const pagination = document.querySelector(".pagination");
const sidebar = document.querySelector(".sidebar");
const infoForm = document.querySelector(".personal-info");
const planForm = document.querySelector(".plan");
const plans = document.querySelector(".plans");
const addOnForm = document.querySelector(".add-ons");
const summary = document.querySelector(".summary");
let currPage = 1;
let hasError;
// Handle step button active in sidebar
const handleBtnActive = (num) => {
    navBtns.forEach((e, i) => {
        const el = e;
        if (i === num - 1)
            el.classList.add("btn-nav--active");
        else
            el.classList.remove("btn-nav--active");
    });
};
// Change the step of the form
const handlePageChange = () => {
    console.log(currPage);
    // Manipulate pagination display classes
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    prevBtn.classList.remove("invisible");
    // Hide all forms
    infoForm.classList.add("hidden");
    planForm.classList.add("hidden");
    addOnForm.classList.add("hidden");
    summary.classList.add("hidden");
    // Match changes
    if (currPage === 1) {
        prevBtn.classList.add("invisible");
        infoForm.classList.remove("hidden");
    }
    if (currPage === 2)
        planForm.classList.remove("hidden");
    if (currPage === 3)
        addOnForm.classList.remove("hidden");
    if (currPage === 4) {
        submitBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
        summary.classList.remove("hidden");
    }
};
// Handles the step changes through next or prev button click
const handleStepChange = (e) => {
    const target = e.target;
    // Matching strategy
    if (target.nodeName !== "BUTTON")
        return;
    // Handle next step
    if (target.classList.contains("btn-p--next") && currPage < 4) {
        currPage++;
        handleBtnActive(currPage);
        handlePageChange();
    }
    // Handle prev step
    if (target.classList.contains("prev") && currPage > 1) {
        currPage--;
        handleBtnActive(currPage);
        handlePageChange();
    }
};
// Handles the step changes through sidebar nav click
const handleSidebarNav = (e) => {
    const target = e.target;
    const clicked = target.closest(".btn-nav");
    // Matching strategy
    if (!clicked)
        return;
    if (clicked.textContent)
        currPage = +clicked.textContent;
    handleBtnActive(currPage);
    handlePageChange();
};
/////////////////////////////////////////
// PERSONAL INFO FORM VALIDATION
const showError = (msg, el) => {
    el.closest("div").classList.add("error");
    el.previousElementSibling.lastElementChild.textContent = msg;
};
const revertError = (el) => {
    el.closest("div").classList.remove("error");
};
const inputs = document.querySelectorAll("#name, #email, #tel");
const handleError = () => {
    const inputsArr = Array.from(inputs);
    const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];
    inputs.forEach((e, i) => {
        const input = e;
        // Check if empty
        if (input.value === "")
            return showError("Field is empty", input);
        else
            revertError(input);
        // Check if input is valid
        if (!regexArr[i].test(input.value)) {
            if (i === 0) {
                return showError("Make sure it's a full name", input);
            }
            if (i === 1) {
                return showError("Whoops, make sure it's an email", input);
            }
            if (i === 2) {
                return showError("Make sure it's a phone number", input);
            }
        }
        else
            revertError(input);
    });
    // Update hasError
    hasError = inputsArr.some((e) => {
        var _a;
        const input = e;
        if ((_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("error"))
            return true;
    });
};
const checkErrorOnChange = () => {
    inputs.forEach((e) => {
        const input = e;
        input.addEventListener("change", handleError);
    });
};
pagination.addEventListener("click", (e) => {
    e.preventDefault();
    handleError();
    checkErrorOnChange();
    if (hasError)
        return;
    handleStepChange(e);
});
sidebar.addEventListener("click", (e) => {
    handleError();
    checkErrorOnChange();
    if (hasError)
        return;
    handleSidebarNav(e);
});
// Prevent default submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY
const handlePlanSelection = (e) => {
    const target = e.target;
    const clicked = target.closest(".plan-card");
    // Matching strategy
    if (!clicked)
        return;
    // Remove active classes
    document.querySelectorAll(".plan-card").forEach((card) => {
        card.classList.remove("card--active");
    });
    // Add active class to target
    clicked.classList.add("card--active");
};
plans.addEventListener("click", handlePlanSelection);
