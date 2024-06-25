const nextBtn = document.querySelector(".btn-p--next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const submitBtn = document.querySelector(
  ".btn-p--confirm"
) as HTMLButtonElement;
const navBtns = document.querySelectorAll(".btn-nav") as NodeList;

const pagination = document.querySelector(".pagination") as HTMLDivElement;
const sidebar = document.querySelector(".sidebar") as HTMLDivElement;

let currPage = 1;

const handlePageChange = (): void => {
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

const handlePagination = (e: Event): void => {
  const target = e.target as HTMLElement;
  // if (target && target.nodeName === "BUTTON") {
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
};

pagination.addEventListener("click", handlePagination);

const handleBtnActive = (num: number) => {
  navBtns.forEach((e, i) => {
    const el = e as HTMLButtonElement;
    if (i === num - 1) el.classList.add("btn-nav--active");
    else el.classList.remove("btn-nav--active");
  });
};

const handleNavButtonClick = (e: Event) => {
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

sidebar.addEventListener("click", handleNavButtonClick);
