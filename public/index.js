"use strict";
var _a;
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const navBtns = document.querySelectorAll(".btn-nav");
const addOnCards = document.querySelectorAll(".add-on-card");
const pagination = document.querySelector(".pagination");
const sidebar = document.querySelector(".sidebar");
const infoForm = document.querySelector(".personal-info");
const planForm = document.querySelector(".plan");
const plans = document.querySelector(".plans");
const switchParent = document.querySelector(".option-switch");
const switchBtn = document.querySelector(".btn-switch");
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
    // Show current form step
    if (currPage === 1) {
        prevBtn.classList.add("invisible"); // Button
        infoForm.classList.remove("hidden");
    }
    if (currPage === 2)
        planForm.classList.remove("hidden");
    if (currPage === 3)
        addOnForm.classList.remove("hidden");
    if (currPage === 4) {
        submitBtn.classList.remove("hidden"); // Button
        nextBtn.classList.add("hidden"); // Button
        summary.classList.remove("hidden");
    }
};
// Handles the step changes through next or prev button click
const handleStepChange = (target) => {
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
const handleSidebarNav = (navBtn) => {
    // Update current form step base on the button value
    if (navBtn.textContent)
        currPage = +navBtn.textContent;
    handleBtnActive(currPage);
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
// Prevent default submission
(_a = document
    .querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => e.preventDefault());
/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY
const summaryAddOnsWrapper = document.querySelector(".summary__add-ons");
const sumTotalBill = () => {
    var _a, _b;
    const planMonthBill = (_a = document.querySelector(".summary .price .month")) === null || _a === void 0 ? void 0 : _a.textContent;
    const planYearBill = (_b = document.querySelector(".summary .price .year")) === null || _b === void 0 ? void 0 : _b.textContent;
    console.log(planMonthBill, planYearBill);
    let monthPrice = Number.parseInt(planMonthBill);
    let yearPrice = Number.parseInt(planYearBill);
    summaryAddOnsWrapper.querySelectorAll(".month").forEach((p) => {
        const addOnBill = Number.parseInt(p.textContent);
        monthPrice += addOnBill;
    });
    summaryAddOnsWrapper.querySelectorAll(".year").forEach((p) => {
        const addOnBill = Number.parseInt(p.textContent);
        yearPrice += addOnBill;
    });
    console.log(monthPrice, yearPrice);
    const totalM = document.querySelector(".total .month");
    const totalY = document.querySelector(".total .year");
    totalM.textContent = `+$${monthPrice}/mo`;
    totalY.textContent = `+$${yearPrice}/yr`;
};
sumTotalBill();
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
    sumTotalBill();
};
plans.addEventListener("click", handlePlanSelection);
// Handle plan period option switch
const planPeriodOptionSwitch = (e) => {
    e.preventDefault();
    switchParent.classList.toggle("yearly");
    plans.classList.toggle("period--yearly");
    addOnCards.forEach((addOnCard) => {
        addOnCard.classList.toggle("period--yearly");
    });
    summary.classList.toggle("period--yearly");
};
switchBtn.addEventListener("click", planPeriodOptionSwitch);
const changeBtn = document.querySelector(".change");
changeBtn.addEventListener("click", planPeriodOptionSwitch);
const handleAddOnsCheck = () => {
    const addOnInputs = document.querySelectorAll(".add-on-check");
    summaryAddOnsWrapper.innerHTML = "";
    addOnInputs.forEach((input) => {
        var _a, _b;
        if (input.checked) {
            const label = input.nextElementSibling;
            const addOnName = (_a = label.querySelector("p.font-bold")) === null || _a === void 0 ? void 0 : _a.textContent;
            const addOnPrice = (_b = label.querySelector("p.text-primary-purplish-blue")) === null || _b === void 0 ? void 0 : _b.innerHTML;
            const summaryAddOn = `<ul
      class="flex justify-between text-2xl font-medium mb-6"
    >
      <li class="text-neutral-cool-gray">${addOnName}</li>
      <li>
        ${addOnPrice}
      </li>
    </ul>`;
            summaryAddOnsWrapper.insertAdjacentHTML("beforeend", summaryAddOn);
        }
    });
};
// const sumTotalBill = () => {
//   const planMonthBill: any = document.querySelector(
//     ".summary .price .month"
//   )?.textContent;
//   const planYearBill: any = document.querySelector(
//     ".summary .price .year"
//   )?.textContent;
//   let monthPrice = Number.parseInt(planMonthBill);
//   let yearPrice = Number.parseInt(planYearBill);
//   summaryAddOnsWrapper.querySelectorAll(".month").forEach((p: any) => {
//     const addOnBill = Number.parseInt(p.textContent);
//     monthPrice += addOnBill;
//   });
//   summaryAddOnsWrapper.querySelectorAll(".year").forEach((p: any) => {
//     const addOnBill = Number.parseInt(p.textContent);
//     yearPrice += addOnBill;
//   });
//   const totalM = document.querySelector(".total .month") as HTMLElement;
//   const totalY = document.querySelector(".total .year") as HTMLElement;
//   totalM.textContent = `+$${monthPrice}/mo`;
//   totalY.textContent = `+$${yearPrice}/yr`;
// };
// sumTotalBill();
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
// Handle the summary
