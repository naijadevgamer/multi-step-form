const nextBtn = document.querySelector(".btn-p--next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const submitBtn = document.querySelector(
  ".btn-p--confirm"
) as HTMLButtonElement;
const navBtns = document.querySelectorAll(".btn-nav") as NodeList;
const pagination = document.querySelector(".pagination") as HTMLDivElement;
const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
const infoForm = document.querySelector(".personal-info") as HTMLDivElement;
const planForm = document.querySelector(".plan") as HTMLDivElement;
const addOnForm = document.querySelector(".add-ons") as HTMLDivElement;
const summary = document.querySelector(".summary") as HTMLDivElement;

let currPage = 1;
let hasError: boolean;

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
  // Page 1, and there are other pages
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
  if (currPage === 2) planForm.classList.remove("hidden");

  if (currPage === 3) addOnForm.classList.remove("hidden");

  if (currPage === 4) {
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    summary.classList.remove("hidden");
  }
};

// Handles the step changes through next or prev button click
const handleStepChange = (e: Event): void => {
  const target = e.target as HTMLElement;
  if (target && target.nodeName === "BUTTON") {
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
  }
};

// Handles the step changes through sidebar nav click
const handleSidebarClick = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target && target.nodeName === "BUTTON") {
    const elNum = target.textContent;
    if (elNum && ["1", "2", "3", "4"].includes(elNum)) {
      currPage = +elNum;
      handleBtnActive(currPage);
      handlePageChange();
    }
  }
};

/////////////////////////////////////////
// PERSONAL INFO FORM VALIDATION

/*
const showError = function (msg) {
  form.classList.remove("item-start");
  form.classList.add("item-center");
  formDiv.classList.add("error");
  errorText.textContent = msg;
  errorText.classList.remove("hidden");
  errorIcon.classList.add("opacity-100");
  errorIcon.classList.remove("opacity-0");
};

const revertError = function () {
  form.classList.add("item-start");
  form.classList.remove("item-center");
  formDiv.classList.remove("error");
  errorText.classList.add("hidden");
  errorIcon.classList.add("opacity-0");
  errorIcon.classList.remove("opacity-100");
};

const handleError = function () {
  const input = document.querySelector("form input");
  const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  // Check if empty
  if (input.value === "") return showError("Field is empty");
  // check if valid email
  if (!reg.test(input.value))
    return showError("Whoops, make sure it's an email");

  revertError();
  input.value = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleError();
});*/

const showError = (msg: string, el: any) => {
  el.closest("div").classList.add("error");
  el.previousElementSibling.lastElementChild.textContent = msg;
};
const revertError = (el: any) => {
  el.closest("div").classList.remove("error");
};

const handleError = () => {
  const inputs = document.querySelectorAll("#name, #email, #tel") as NodeList;
  const inputsArr = Array.from(inputs);

  inputs.forEach((e) => {
    const input = e as HTMLInputElement;
    if (input.value === "") showError("Field is empty", input);
    else revertError(input);
  });
  hasError = inputsArr.some((e) => {
    const input = e as HTMLInputElement;
    if (input.parentElement?.classList.contains("error")) return true;
  });
};

pagination.addEventListener("click", (e) => {
  e.preventDefault();
  handleError();
  if (hasError) return;
  handleStepChange(e);
});

sidebar.addEventListener("click", (e) => {
  handleError();
  if (hasError) return;
  handleSidebarClick(e);
});

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
