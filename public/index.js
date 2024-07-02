"use strict";
// Navigation elements
const pagination = document.querySelector(".pagination");
const sidebar = document.querySelector(".sidebar");
const nextBtn = document.querySelector(".btn-p--next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".btn-p--confirm");
const navBtns = document.querySelectorAll(".btn-nav");
// Step forms
const allStepform = document.querySelector("form");
const infoForm = document.querySelector(".personal-info");
const planForm = document.querySelector(".plan");
const addOnForm = document.querySelector(".add-ons");
const summary = document.querySelector(".summary");
const confirmation = document.querySelector(".confirm");
//  Misc elements
const inputs = document.querySelectorAll("#name, #email, #tel");
const plans = document.querySelector(".plans");
const addOnCards = document.querySelectorAll(".add-on-card");
const switchBtn = document.querySelector(".btn-switch");
const addOnsWrapper = document.querySelector(".add-on-inputs");
const changeBtn = document.querySelector(".change");
const summaryAddOnsWrapper = document.querySelector(".summary__add-ons");
let currStep = 1; // Current step in the form navigation
let hasError = false; // Error state
// Prevent default form submission on enter key press
allStepform.addEventListener("submit", (e) => e.preventDefault());
/// Activates the current step button in the sidebar
const activateStepButton = (stepIndex) => {
    navBtns.forEach((btn, index) => {
        if (index === stepIndex - 1)
            btn.classList.add("btn-nav--active");
        else
            btn.classList.remove("btn-nav--active");
    });
};
// Updates the form to display the current step
const updateFormStep = () => {
    console.log(`Current Step: ${currStep}`);
    // Manage button visibility
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    prevBtn.classList.remove("invisible");
    // Hide all forms initially
    [infoForm, planForm, addOnForm, summary].forEach((form) => form.classList.add("hidden"));
    // Show the form corresponding to the current step
    switch (currStep) {
        case 1:
            prevBtn.classList.add("invisible");
            infoForm.classList.remove("hidden");
            break;
        case 2:
            planForm.classList.remove("hidden");
            break;
        case 3:
            addOnForm.classList.remove("hidden");
            break;
        case 4:
            submitBtn.classList.remove("hidden");
            nextBtn.classList.add("hidden");
            summary.classList.remove("hidden");
            break;
    }
};
// Handles changes between form steps using next/previous buttons
const changeStep = (target) => {
    if (target.classList.contains("btn-p--next") && currStep < 4) {
        currStep++;
    }
    else if (target.classList.contains("prev") && currStep > 1) {
        currStep--;
    }
    activateStepButton(currStep);
    updateFormStep();
};
// Handles the step changes through sidebar nav click
const navigateSidebar = (navBtn) => {
    // Update current form step base on the button value
    if (navBtn.textContent)
        currStep = +navBtn.textContent;
    activateStepButton(currStep);
    updateFormStep();
};
/////////////////////////////////////////
// PERSONAL INFO FORM VALIDATION
/**
 * Displays an error message for an input element.
 * @param msg - The error message to display.
 * @param el - The input element associated with the error.
 */
const showError = (msg, el) => {
    const inputContainer = el.closest("div");
    inputContainer.classList.add("error");
    const errorMsgElement = inputContainer.querySelector("span");
    errorMsgElement.textContent = msg;
};
/**
 * Reverts the error state for an input element.
 * @param el - The input element to revert the error state.
 */
const revertError = (el) => {
    const inputContainer = el.closest("div");
    inputContainer.classList.remove("error");
};
// Validates the personal info form inputs and shows errors if invalid
const handleError = () => {
    const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];
    inputs.forEach((input, i) => {
        // Check if empty
        if (input.value.trim() === "") {
            showError("This field is required", input);
            return;
        }
        else
            revertError(input);
        // Check if input is valid
        if (!regexArr[i].test(input.value)) {
            if (i === 0)
                showError("Make sure it's a full name", input);
            if (i === 1)
                showError("Whoops, make sure it's an email", input);
            if (i === 2)
                showError("Make sure it follows the format given", input);
        }
        else
            revertError(input);
    });
    // Update hasError
    hasError = Array.from(inputs).some((input) => { var _a; return ((_a = input.closest("div")) === null || _a === void 0 ? void 0 : _a.classList.contains("error")) || false; });
};
// Adds change event listeners to the personal info form inputs to handle validation.
const checkErrorOnChange = () => {
    inputs.forEach((input) => {
        input.addEventListener("change", handleError);
    });
};
// Event listener for pagination buttons
pagination.addEventListener("click", (e) => {
    const target = e.target;
    if (target.nodeName !== "BUTTON")
        return; // Matching strategy
    e.preventDefault();
    handleError();
    checkErrorOnChange();
    if (hasError)
        return;
    changeStep(target);
});
// Handles navigation button clicks in the sidebar.
const handleSidebarNavClick = (e) => {
    const target = e.target;
    const clicked = target.closest(".btn-nav");
    if (!clicked)
        return; // Matching strategy
    handleError();
    checkErrorOnChange();
    if (hasError)
        return;
    navigateSidebar(clicked);
};
// Event listener for sidebar navigation buttons
sidebar.addEventListener("click", handleSidebarNavClick);
/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY
// Handles the selection of a plan card
const handlePlanSelection = (e) => {
    var _a, _b;
    const target = e.target;
    const clicked = target.closest(".plan-card");
    // Matching strategy
    if (!clicked)
        return;
    // Remove active classes from all plan cards
    document
        .querySelectorAll(".plan-card")
        .forEach((card) => card.classList.remove("card--active"));
    // Add active class to the clicked plan card
    clicked.classList.add("card--active");
    // Update summary with selected plan and price
    const planContent = (_a = clicked.querySelector("p.font-bold")) === null || _a === void 0 ? void 0 : _a.textContent;
    const planPrice = (_b = clicked.querySelector("p.text-2xl")) === null || _b === void 0 ? void 0 : _b.innerHTML;
    const summaryPlan = document.querySelector(".summary__plan");
    const summaryPlanPrice = document.querySelector(".summary .price");
    if (planContent)
        summaryPlan.textContent = planContent;
    if (planPrice)
        summaryPlanPrice.innerHTML = planPrice;
    // Calculate total bill in the summary phase
    sumTotalBill();
};
// Event listener for plan selection
plans.addEventListener("click", handlePlanSelection);
// Handles the switching between monthly and yearly plan periods.
const handlePlanPeriodSwitch = (e) => {
    var _a;
    e.preventDefault();
    (_a = document.querySelector(".option-switch")) === null || _a === void 0 ? void 0 : _a.classList.toggle("yearly");
    plans.classList.toggle("period--yearly");
    addOnCards.forEach((addOnCard) => {
        addOnCard.classList.toggle("period--yearly");
    });
    summary.classList.toggle("period--yearly");
};
// Event listeners to handle plan period switch in plan and summary phase
switchBtn.addEventListener("click", handlePlanPeriodSwitch);
changeBtn.addEventListener("click", handlePlanPeriodSwitch);
/////////////////////////////////////////
// ADD-ONS FUNCTIONALITY
// Updates the add-ons section in the summary based on the selected add-ons.
const updateAddOnsSummary = () => {
    const addOnInputs = document.querySelectorAll(".add-on-check");
    // Clear the summary add-ons wrapper
    summaryAddOnsWrapper.innerHTML = "";
    // Add selected add-ons to the summary
    addOnInputs.forEach((input) => {
        var _a, _b;
        if (input.checked) {
            const label = input.nextElementSibling;
            const addOnName = (_a = label.querySelector("p.font-bold")) === null || _a === void 0 ? void 0 : _a.textContent;
            const addOnPrice = (_b = label.querySelector("p.text-primary-purplish-blue")) === null || _b === void 0 ? void 0 : _b.innerHTML;
            // Template for adding selected add-on to the summary
            const summaryAddOn = `<ul
        class="flex justify-between text-2xl font-medium mb-6"
      >
        <li class="text-neutral-cool-gray">${addOnName}</li>
        <li>${addOnPrice}</li>
      </ul>`;
            // Insert the add-on into the summary
            summaryAddOnsWrapper.insertAdjacentHTML("beforeend", summaryAddOn);
        }
    });
    // Show message if no add-ons are selected
    if (!summaryAddOnsWrapper.innerHTML)
        summaryAddOnsWrapper.innerHTML = "<p>No add-on is added</p>";
};
// Initialize add-ons check
updateAddOnsSummary();
// Calculates and updates the total bill in the summary
const sumTotalBill = () => {
    var _a, _b;
    const planMonthBill = ((_a = document.querySelector(".summary .price .month")) === null || _a === void 0 ? void 0 : _a.textContent) || "0";
    const planYearBill = ((_b = document.querySelector(".summary .price .year")) === null || _b === void 0 ? void 0 : _b.textContent) || "0";
    // Parse plan bills
    let monthPrice = parseInt(planMonthBill);
    let yearPrice = parseInt(planYearBill);
    // Add add-ons bills to the plan bill
    summaryAddOnsWrapper.querySelectorAll(".month").forEach((addOnPrice) => {
        monthPrice += parseInt(addOnPrice.textContent || "0");
    });
    summaryAddOnsWrapper.querySelectorAll(".year").forEach((addOnPrice) => {
        yearPrice += parseInt(addOnPrice.textContent || "0");
    });
    // Display total bill
    const totalMonthElement = document.querySelector(".total .month");
    const totalYearElement = document.querySelector(".total .year");
    totalMonthElement.textContent = `+$${monthPrice}/mo`;
    totalYearElement.textContent = `+$${yearPrice}/yr`;
};
// Initialize the total bill summation
sumTotalBill();
// Handles the selection of add-ons
const handleAddOnsSelection = (e) => {
    const target = e.target;
    const clicked = target.closest(".add-on-card");
    // Matching strategy
    if (!clicked)
        return;
    setTimeout(() => {
        updateAddOnsSummary();
        sumTotalBill();
    }, 10);
};
// Event listener to handle the selection of add-ons
addOnsWrapper.addEventListener("click", handleAddOnsSelection);
/////////////////////////////////////////
// FORM CONFIRMATION
// Handles the form submission and displays the confirmation message.
const handleConfirm = () => {
    allStepform.classList.add("hidden");
    confirmation.classList.remove("hidden");
    confirmation.classList.add("flex");
    sidebar.removeEventListener("click", handleSidebarNavClick);
};
// Event listener to handle confirmation and submission
submitBtn.addEventListener("click", handleConfirm);
