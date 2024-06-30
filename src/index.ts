// Interface and Type Definitions
interface ValidationResult {
  isValid: boolean;
  message: string;
}

// All About navigations
const pagination = document.querySelector(".pagination") as HTMLDivElement;
const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
const nextBtn = document.querySelector(".btn-p--next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const submitBtn = document.querySelector(
  ".btn-p--confirm"
) as HTMLButtonElement;
const navBtns = document.querySelectorAll<HTMLButtonElement>(".btn-nav");

// All About steps displayed and hided
const allStepform = document.querySelector("form") as HTMLFormElement;
const infoForm = document.querySelector(".personal-info") as HTMLDivElement;
const planForm = document.querySelector(".plan") as HTMLDivElement;
const addOnForm = document.querySelector(".add-ons") as HTMLDivElement;
const summary = document.querySelector(".summary") as HTMLDivElement;
const confirmation = document.querySelector(".confirm") as HTMLDivElement;

// Other with multiple use
const plans = document.querySelector(".plans") as HTMLDivElement;
const addOnCards = document.querySelectorAll<HTMLLabelElement>(".add-on-card");
const switchBtn = document.querySelector(".btn-switch") as HTMLButtonElement;
const summaryAddOnsWrapper = document.querySelector(
  ".summary__add-ons"
) as HTMLDivElement;

let currStep = 1; // current Step
let hasError: boolean;

// Prevent default submission on enter click
allStepform.addEventListener("submit", (e) => e.preventDefault());

// Handle step button active in sidebar
const handleBtnActive = (num: number) => {
  navBtns.forEach((e, i) => {
    const el = e as HTMLButtonElement;
    if (i === num - 1) el.classList.add("btn-nav--active");
    else el.classList.remove("btn-nav--active");
  });
};

// Change the step of the form
const handlePageChange = (): void => {
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
  if (currStep === 2) planForm.classList.remove("hidden");

  if (currStep === 3) addOnForm.classList.remove("hidden");

  if (currStep === 4) {
    submitBtn.classList.remove("hidden"); // Button
    nextBtn.classList.add("hidden"); // Button
    summary.classList.remove("hidden");
  }
};

// Handles the step changes through next or prev button click
const handleStepChange = (target: HTMLElement): void => {
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
const handleSidebarNav = (navBtn: HTMLButtonElement) => {
  // Update current form step base on the button value
  if (navBtn.textContent) currStep = +navBtn.textContent;
  handleBtnActive(currStep);
  handlePageChange();
};

/////////////////////////////////////////
// PERSONAL INFO FORM VALIDATION
const showError = (msg: string, el: HTMLInputElement) => {
  const inputContainer = el.closest("div");
  if (inputContainer) {
    inputContainer.classList.add("error");
    const errorMsgElement = inputContainer.querySelector("span");
    if (errorMsgElement) errorMsgElement.textContent = msg;
  }
};

const revertError = (el: HTMLInputElement) => {
  const inputContainer = el.closest("div");
  if (inputContainer) {
    inputContainer.classList.remove("error");
  }
};

const inputs = document.querySelectorAll<HTMLInputElement>(
  "#name, #email, #tel"
);

const handleError = () => {
  const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

  const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];

  inputs.forEach((input, i) => {
    // Check if empty
    if (input.value === "") return showError("Field is empty", input);
    else revertError(input);

    // Check if input is valid
    if (!regexArr[i].test(input.value)) {
      if (i === 0) showError("Make sure it's a full name", input);
      if (i === 1) showError("Whoops, make sure it's an email", input);
      if (i === 2) showError("Make sure it's a phone number", input);
    } else revertError(input);
  });

  // Update hasError
  hasError = Array.from(inputs).some(
    (input) => input.closest("div")?.classList.contains("error") || false
  );
};

// Continue to check for when personal info input values are changed or edited
const checkErrorOnChange = () => {
  inputs.forEach((input) => {
    input.addEventListener("change", handleError);
  });
};

// Handle the event on next and prev buttons
pagination.addEventListener<"click">("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.nodeName !== "BUTTON") return; // Matching strategy
  e.preventDefault();
  // handleError();
  // checkErrorOnChange();
  // if (hasError) return;
  handleStepChange(target);
});

// Handle the event on nav button click in the sidebar
sidebar.addEventListener<"click">("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".btn-nav") as HTMLButtonElement;
  if (!clicked) return; // Matching strategy
  handleError();
  checkErrorOnChange();
  if (hasError) return;
  handleSidebarNav(clicked);
});

/////////////////////////////////////////
// SELECT PLAN FUNCTIONALITY
const handlePlanSelection = (e: Event) => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".plan-card");

  // Matching strategy
  if (!clicked) return;

  // Remove active classes
  document.querySelectorAll(".plan-card").forEach((card) => {
    card.classList.remove("card--active");
  });

  // Add active class to target
  clicked.classList.add("card--active");

  // Add active plan and price to summary
  const planContent = clicked.querySelector("p.font-bold")?.textContent;
  const planPrice = clicked.querySelector("p.text-2xl")?.innerHTML;
  const summaryPlan = document.querySelector(".summary__plan") as HTMLElement;
  const summaryPlanPrice = document.querySelector(
    ".summary .price"
  ) as HTMLDivElement;
  if (planContent) summaryPlan.textContent = planContent;
  if (planPrice) summaryPlanPrice.innerHTML = planPrice;

  // Calculate total bill in summary phase
  sumTotalBill();
};

plans.addEventListener("click", handlePlanSelection);

// Handle plan period option switch
const planPeriodOptionSwitch = (e: Event) => {
  e.preventDefault();
  document.querySelector(".option-switch")?.classList.toggle("yearly");
  plans.classList.toggle("period--yearly");
  addOnCards.forEach((addOnCard) => {
    addOnCard.classList.toggle("period--yearly");
  });
  summary.classList.toggle("period--yearly");
};
const changeBtn = document.querySelector(".change") as HTMLElement;

switchBtn.addEventListener("click", planPeriodOptionSwitch);

changeBtn.addEventListener("click", planPeriodOptionSwitch);

const handleAddOnsCheck = () => {
  const addOnInputs =
    document.querySelectorAll<HTMLInputElement>(".add-on-check");

  // Empty the add-ons in the summary
  summaryAddOnsWrapper.innerHTML = "";

  // Put add-ons that are checked in the summary
  addOnInputs.forEach((input) => {
    if (input.checked) {
      const label = input.nextElementSibling as HTMLLabelElement;

      // Get name of add-on
      const addOnName = label.querySelector("p.font-bold")?.textContent;
      // Get price of add-on
      const addOnPrice = label.querySelector(
        "p.text-primary-purplish-blue"
      )?.innerHTML;

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
  const planMonthBill: any = document.querySelector(
    ".summary .price .month"
  )?.textContent;
  const planYearBill: any = document.querySelector(
    ".summary .price .year"
  )?.textContent;

  // Start by adding the plan bill for month and year
  let monthPrice = Number.parseInt(planMonthBill);
  let yearPrice = Number.parseInt(planYearBill);

  // Add the bills for the addons selecteted to moth plan bill for month
  summaryAddOnsWrapper.querySelectorAll(".month").forEach((addOnPrice: any) => {
    const addOnBill = Number.parseInt(addOnPrice.textContent);
    monthPrice += addOnBill;
  });

  // Add the bills for the addons selecteted to year plan bill for year
  summaryAddOnsWrapper.querySelectorAll(".year").forEach((addOnPrice: any) => {
    const addOnBill = Number.parseInt(addOnPrice.textContent);
    yearPrice += addOnBill;
  });

  // display total bill calculated
  const totalM = document.querySelector(".total .month") as HTMLElement;
  const totalY = document.querySelector(".total .year") as HTMLElement;
  totalM.textContent = `+$${monthPrice}/mo`;
  totalY.textContent = `+$${yearPrice}/yr`;
};

// Initialize summation of bills incase neither plan or addons is selected which will not trigger the summation
sumTotalBill();

// Function to handle changes in add-ons step when clicked
const handleAddOns = (e: Event) => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".add-on-card");
  // Matching strategy
  if (!clicked) return;
  setTimeout(() => {
    handleAddOnsCheck();
    sumTotalBill();
  }, 10);
};

const addOnsWrapper = document.querySelector(
  ".add-on-inputs"
) as HTMLDivElement;
addOnsWrapper.addEventListener("click", handleAddOns);

// Handle confirm to submit all
const handleConfirm = () => {
  allStepform.classList.add("hidden");
  confirmation.classList.remove("hidden");
  confirmation.classList.add("flex");

  sidebar.removeEventListener("click", () => {});
};

submitBtn.addEventListener("click", handleConfirm);
