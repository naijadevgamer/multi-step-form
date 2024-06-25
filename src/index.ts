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
const showError = (msg: string, el: any) => {
  el.closest("div").classList.add("error");
  el.previousElementSibling.lastElementChild.textContent = msg;
};
const revertError = (el: any) => {
  el.closest("div").classList.remove("error");
};
const inputs = document.querySelectorAll("#name, #email, #tel") as NodeList;
const handleError = () => {
  const inputsArr = Array.from(inputs);
  const fullNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

  const regexArr = [fullNameRegex, emailRegex, phoneNumberRegex];

  inputs.forEach((e, i) => {
    const input = e as HTMLInputElement;
    // Check if empty
    if (input.value === "") return showError("Field is empty", input);
    else revertError(input);

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
    } else revertError(input);
  });

  // Update hasError
  hasError = inputsArr.some((e) => {
    const input = e as HTMLInputElement;
    if (input.parentElement?.classList.contains("error")) return true;
  });
};

const checkErrorOnChange = () => {
  inputs.forEach((e) => {
    const input = e as HTMLInputElement;
    input.addEventListener("change", handleError);
  });
};

pagination.addEventListener("click", (e) => {
  e.preventDefault();
  handleError();
  checkErrorOnChange();
  if (hasError) return;
  handleStepChange(e);
});

sidebar.addEventListener("click", (e) => {
  handleError();
  checkErrorOnChange();
  if (hasError) return;
  handleSidebarClick(e);
});

// Prevent default submission
const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
