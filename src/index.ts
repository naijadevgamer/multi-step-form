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
    e.preventDefault();
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

pagination.addEventListener("click", handleStepChange);

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

sidebar.addEventListener("click", handleSidebarClick);
