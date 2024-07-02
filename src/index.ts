// Navigation elements
const pagination = document.querySelector(".pagination") as HTMLDivElement;
const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
const nextBtn = document.querySelector(".btn-p--next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const submitBtn = document.querySelector(
  ".btn-p--confirm"
) as HTMLButtonElement;
const navBtns = document.querySelectorAll<HTMLButtonElement>(".btn-nav");

// Step forms
const allStepform = document.querySelector("form") as HTMLFormElement;
const infoForm = document.querySelector(".personal-info") as HTMLDivElement;
const planForm = document.querySelector(".plan") as HTMLDivElement;
const addOnForm = document.querySelector(".add-ons") as HTMLDivElement;
const summary = document.querySelector(".summary") as HTMLDivElement;
const confirmation = document.querySelector(".confirm") as HTMLDivElement;

//  Misc elements
const inputs = document.querySelectorAll<HTMLInputElement>(
  "#name, #email, #tel"
);
const plans = document.querySelector(".plans") as HTMLDivElement;
const addOnCards = document.querySelectorAll<HTMLLabelElement>(".add-on-card");
const switchBtn = document.querySelector(".btn-switch") as HTMLButtonElement;
const addOnsWrapper = document.querySelector(
  ".add-on-inputs"
) as HTMLDivElement;
const changeBtn = document.querySelector(".change") as HTMLElement;
const summaryAddOnsWrapper = document.querySelector(
  ".summary__add-ons"
) as HTMLDivElement;

let currStep = 1; // Current step in the form navigation
let hasError: boolean = false; // Error state

// Prevent default form submission on enter key press
allStepform.addEventListener("submit", (e) => e.preventDefault());

/// Activates the current step button in the sidebar
const activateStepButton = (stepIndex: number): void => {
  navBtns.forEach((btn, index) => {
    if (index === stepIndex - 1) btn.classList.add("btn-nav--active");
    else btn.classList.remove("btn-nav--active");
  });
};

// Updates the form to display the current step
const updateFormStep = (): void => {
  console.log(`Current Step: ${currStep}`);

  // Manage button visibility
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  prevBtn.classList.remove("invisible");

  // Hide all forms initially
  [infoForm, planForm, addOnForm, summary].forEach((form) =>
    form.classList.add("hidden")
  );

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
const changeStep = (target: HTMLElement): void => {
  if (target.classList.contains("btn-p--next") && currStep < 4) {
    currStep++;
  } else if (target.classList.contains("prev") && currStep > 1) {
    currStep--;
  }
  activateStepButton(currStep);
  updateFormStep();
};

// Handles the step changes through sidebar nav click
const navigateSidebar = (navBtn: HTMLButtonElement) => {
  // Update current form step base on the button value
  if (navBtn.textContent) currStep = +navBtn.textContent;
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
const showError = (msg: string, el: HTMLInputElement) => {
  const inputContainer = el.closest("div") as HTMLDivElement;
  inputContainer.classList.add("error");
  const errorMsgElement = inputContainer.querySelector(
    "span"
  ) as HTMLSpanElement;
  errorMsgElement.textContent = msg;
};

/**
 * Reverts the error state for an input element.
 * @param el - The input element to revert the error state.
 */
const revertError = (el: HTMLInputElement) => {
  const inputContainer = el.closest("div") as HTMLDivElement;
  inputContainer.classList.remove("error");
};

// Validates the personal info form inputs and shows errors if invalid
const handleError = (): void => {
  const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

  const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];

  inputs.forEach((input, i) => {
    // Check if empty
    if (input.value.trim() === "") {
      showError("This field is required", input);
      return;
    } else revertError(input);

    // Check if input is valid
    if (!regexArr[i].test(input.value)) {
      if (i === 0) showError("Make sure it's a full name", input);
      if (i === 1) showError("Whoops, make sure it's an email", input);
      if (i === 2) showError("Make sure it follows the format given", input);
    } else revertError(input);
  });

  // Update hasError
  hasError = Array.from(inputs).some(
    (input) => input.closest("div")?.classList.contains("error") || false
  );
};

// Adds change event listeners to the personal info form inputs to handle validation.
const checkErrorOnChange = (): void => {
  inputs.forEach((input) => {
    input.addEventListener("change", handleError);
  });
};

// Event listener for pagination buttons
pagination.addEventListener<"click">("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.nodeName !== "BUTTON") return; // Matching strategy
  e.preventDefault();
  handleError();
  checkErrorOnChange();
  if (hasError) return;
  changeStep(target);
});

// Handles navigation button clicks in the sidebar.
const handleSidebarNavClick = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".btn-nav") as HTMLButtonElement;
  if (!clicked) return; // Matching strategy
  handleError();
  checkErrorOnChange();
  if (hasError) return;
  navigateSidebar(clicked);
};

// Event listener for sidebar navigation buttons
sidebar.addEventListener("click", handleSidebarNavClick);

/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY

// Handles the selection of a plan card
const handlePlanSelection = (e: Event): void => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".plan-card");

  // Matching strategy
  if (!clicked) return;

  // Remove active classes from all plan cards
  document
    .querySelectorAll(".plan-card")
    .forEach((card) => card.classList.remove("card--active"));

  // Add active class to the clicked plan card
  clicked.classList.add("card--active");

  // Update summary with selected plan and price
  const planContent = clicked.querySelector("p.font-bold")?.textContent;
  const planPrice = clicked.querySelector("p.text-2xl")?.innerHTML;
  const summaryPlan = document.querySelector(
    ".summary__plan"
  ) as HTMLSpanElement;
  const summaryPlanPrice = document.querySelector(
    ".summary .price"
  ) as HTMLDivElement;

  if (planContent) summaryPlan.textContent = planContent;
  if (planPrice) summaryPlanPrice.innerHTML = planPrice;

  // Calculate total bill in the summary phase
  sumTotalBill();
};

// Event listener for plan selection
plans.addEventListener("click", handlePlanSelection);

// Handles the switching between monthly and yearly plan periods.
const handlePlanPeriodSwitch = (e: Event): void => {
  e.preventDefault();
  document.querySelector(".option-switch")?.classList.toggle("yearly");
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
  const addOnInputs =
    document.querySelectorAll<HTMLInputElement>(".add-on-check");

  // Clear the summary add-ons wrapper
  summaryAddOnsWrapper.innerHTML = "";

  // Add selected add-ons to the summary
  addOnInputs.forEach((input) => {
    if (input.checked) {
      const label = input.nextElementSibling as HTMLLabelElement;

      const addOnName = label.querySelector("p.font-bold")?.textContent;
      const addOnPrice = label.querySelector(
        "p.text-primary-purplish-blue"
      )?.innerHTML;

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
  const planMonthBill =
    document.querySelector(".summary .price .month")?.textContent || "0";
  const planYearBill =
    document.querySelector(".summary .price .year")?.textContent || "0";

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
  const totalMonthElement = document.querySelector(
    ".total .month"
  ) as HTMLSpanElement;
  const totalYearElement = document.querySelector(
    ".total .year"
  ) as HTMLSpanElement;
  totalMonthElement.textContent = `+$${monthPrice}/mo`;
  totalYearElement.textContent = `+$${yearPrice}/yr`;
};

// Initialize the total bill summation
sumTotalBill();

// Handles the selection of add-ons
const handleAddOnsSelection = (e: Event): void => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".add-on-card");
  // Matching strategy
  if (!clicked) return;
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
