"use strict";
// All About navigations
const pagination = document.querySelector(".pagination");
const sidebar = document.querySelector(".sidebar");
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const navBtns = document.querySelectorAll(".btn-nav");
// All About steps displayed and hided
const allStepform = document.querySelector("form");
const infoForm = document.querySelector(".personal-info");
const planForm = document.querySelector(".plan");
const addOnForm = document.querySelector(".add-ons");
const summary = document.querySelector(".summary");
const confirmation = document.querySelector(".confirm");
// Other with multiple use
const plans = document.querySelector(".plans");
const addOnCards = document.querySelectorAll(".add-on-card");
const switchBtn = document.querySelector(".btn-switch");
const summaryAddOnsWrapper = document.querySelector(".summary__add-ons");
let currStep = 1; // current Step
let hasError;
// Prevent default submission on enter click
allStepform.addEventListener("submit", (e) => e.preventDefault());
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
    console.log(currStep);
    // Manipulate pagination display classes
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    prevBtn.classList.remove("invisible");
    // Hide all forms
    infoForm.classList.add("hidden");
    planForm.classList.add("hidden");
    addOnForm.classList.add("hidden");
    summary.classList.add("hidden");
    // Show current form step
    if (currStep === 1) {
        prevBtn.classList.add("invisible"); // Button
        infoForm.classList.remove("hidden");
    }
    if (currStep === 2)
        planForm.classList.remove("hidden");
    if (currStep === 3)
        addOnForm.classList.remove("hidden");
    if (currStep === 4) {
        submitBtn.classList.remove("hidden"); // Button
        nextBtn.classList.add("hidden"); // Button
        summary.classList.remove("hidden");
    }
};
// Handles the step changes through next or prev button click
const handleStepChange = (target) => {
    // Handle next step
    if (target.classList.contains("btn-p--next") && currStep < 4) {
        currStep++;
        handleBtnActive(currStep);
        handlePageChange();
    }
    // Handle prev step
    if (target.classList.contains("prev") && currStep > 1) {
        currStep--;
        handleBtnActive(currStep);
        handlePageChange();
    }
};
// Handles the step changes through sidebar nav click
const handleSidebarNav = (navBtn) => {
    // Update current form step base on the button value
    if (navBtn.textContent)
        currStep = +navBtn.textContent;
    handleBtnActive(currStep);
    handlePageChange();
};
/////////////////////////////////////////
// PERSONAL INFO FORM VALIDATION
const showError = (msg, el) => {
    const inputContainer = el.closest("div");
    if (inputContainer) {
        inputContainer.classList.add("error");
        const errorMsgElement = inputContainer.querySelector("span");
        if (errorMsgElement)
            errorMsgElement.textContent = msg;
    }
};
const revertError = (el) => {
    const inputContainer = el.closest("div");
    if (inputContainer) {
        inputContainer.classList.remove("error");
    }
};
const inputs = document.querySelectorAll("#name, #email, #tel");
const handleError = () => {
    const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];
    inputs.forEach((input, i) => {
        // Check if empty
        if (input.value === "")
            return showError("Field is empty", input);
        else
            revertError(input);
        // Check if input is valid
        if (!regexArr[i].test(input.value)) {
            if (i === 0)
                showError("Make sure it's a full name", input);
            if (i === 1)
                showError("Whoops, make sure it's an email", input);
            if (i === 2)
                showError("Make sure it's a phone number", input);
        }
        else
            revertError(input);
    });
    // Update hasError
    hasError = Array.from(inputs).some((input) => { var _a; return ((_a = input.closest("div")) === null || _a === void 0 ? void 0 : _a.classList.contains("error")) || false; });
};
// Continue to check for when personal info input values are changed or edited
const checkErrorOnChange = () => {
    inputs.forEach((input) => {
        input.addEventListener("change", handleError);
    });
};
// Handle the event on next and prev buttons
pagination.addEventListener("click", (e) => {
    const target = e.target;
    if (target.nodeName !== "BUTTON")
        return; // Matching strategy
    e.preventDefault();
    // handleError();
    // checkErrorOnChange();
    // if (hasError) return;
    handleStepChange(target);
});
// Handle the event on nav button click in the sidebar
sidebar.addEventListener("click", (e) => {
    const target = e.target;
    const clicked = target.closest(".btn-nav");
    if (!clicked)
        return; // Matching strategy
    handleError();
    checkErrorOnChange();
    if (hasError)
        return;
    handleSidebarNav(clicked);
});
/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY
const handlePlanSelection = (e) => {
    var _a, _b;
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
    // Add active plan and price to summary
    const planContent = (_a = clicked.querySelector("p.font-bold")) === null || _a === void 0 ? void 0 : _a.textContent;
    const planPrice = (_b = clicked.querySelector("p.text-2xl")) === null || _b === void 0 ? void 0 : _b.innerHTML;
    const summaryPlan = document.querySelector(".summary__plan");
    const summaryPlanPrice = document.querySelector(".summary .price");
    if (planContent)
        summaryPlan.textContent = planContent;
    if (planPrice)
        summaryPlanPrice.innerHTML = planPrice;
    // Calculate total bill in summary phase
    sumTotalBill();
};
plans.addEventListener("click", handlePlanSelection);
// Handle plan period option switch
const planPeriodOptionSwitch = (e) => {
    var _a;
    e.preventDefault();
    (_a = document.querySelector(".option-switch")) === null || _a === void 0 ? void 0 : _a.classList.toggle("yearly");
    plans.classList.toggle("period--yearly");
    addOnCards.forEach((addOnCard) => {
        addOnCard.classList.toggle("period--yearly");
    });
    summary.classList.toggle("period--yearly");
};
const changeBtn = document.querySelector(".change");
switchBtn.addEventListener("click", planPeriodOptionSwitch);
changeBtn.addEventListener("click", planPeriodOptionSwitch);
const handleAddOnsCheck = () => {
    const addOnInputs = document.querySelectorAll(".add-on-check");
    // Empty the add-ons in the summary
    summaryAddOnsWrapper.innerHTML = "";
    // Put add-ons that are checked in the summary
    addOnInputs.forEach((input) => {
        var _a, _b;
        if (input.checked) {
            const label = input.nextElementSibling;
            // Get name of add-on
            const addOnName = (_a = label.querySelector("p.font-bold")) === null || _a === void 0 ? void 0 : _a.textContent;
            // Get price of add-on
            const addOnPrice = (_b = label.querySelector("p.text-primary-purplish-blue")) === null || _b === void 0 ? void 0 : _b.innerHTML;
            // Template of add-on to be placed in the summary
            const summaryAddOn = `<ul
        class="flex justify-between text-2xl font-medium mb-6"
      >
        <li class="text-neutral-cool-gray">${addOnName}</li>
        <li>${addOnPrice}</li>
      </ul>`;
            // Put add-Ons checked in the summary
            summaryAddOnsWrapper.insertAdjacentHTML("beforeend", summaryAddOn);
        }
    });
};
// Function to sum up all the prices in the summary
const sumTotalBill = () => {
    var _a, _b;
    const planMonthBill = (_a = document.querySelector(".summary .price .month")) === null || _a === void 0 ? void 0 : _a.textContent;
    const planYearBill = (_b = document.querySelector(".summary .price .year")) === null || _b === void 0 ? void 0 : _b.textContent;
    // Start by adding the plan bill for month and year
    let monthPrice = Number.parseInt(planMonthBill);
    let yearPrice = Number.parseInt(planYearBill);
    // Add the bills for the addons selecteted to moth plan bill for month
    summaryAddOnsWrapper.querySelectorAll(".month").forEach((addOnPrice) => {
        const addOnBill = Number.parseInt(addOnPrice.textContent);
        monthPrice += addOnBill;
    });
    // Add the bills for the addons selecteted to year plan bill for year
    summaryAddOnsWrapper.querySelectorAll(".year").forEach((addOnPrice) => {
        const addOnBill = Number.parseInt(addOnPrice.textContent);
        yearPrice += addOnBill;
    });
    // display total bill calculated
    const totalM = document.querySelector(".total .month");
    const totalY = document.querySelector(".total .year");
    totalM.textContent = `+$${monthPrice}/mo`;
    totalY.textContent = `+$${yearPrice}/yr`;
};
// Initialize summation of bills incase neither plan or addons is selected which will not trigger the summation
sumTotalBill();
// Function to handle changes in add-ons step when clicked
const handleAddOns = (e) => {
    const target = e.target;
    const clicked = target.closest(".add-on-card");
    // Matching strategy
    if (!clicked)
        return;
    setTimeout(() => {
        handleAddOnsCheck();
        sumTotalBill();
    }, 10);
};
const addOnsWrapper = document.querySelector(".add-on-inputs");
addOnsWrapper.addEventListener("click", handleAddOns);
// Handle confirm to submit all
const handleConfirm = () => {
    allStepform.classList.add("hidden");
    confirmation.classList.remove("hidden");
    confirmation.classList.add("flex");
    sidebar.removeEventListener("click", () => { });
};
submitBtn.addEventListener("click", handleConfirm);
