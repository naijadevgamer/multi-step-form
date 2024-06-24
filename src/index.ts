const nextBtn = document.querySelector(".btn-p--next") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const submitBtn = document.querySelector(
  ".btn-p--confirm"
) as HTMLButtonElement;
const sidebar = document.querySelector(".sidebar") as HTMLDivElement;

let currPage = 1;

const handlePage = (): void => {
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

const handleNext = (): void => {
  if (currPage < 4) currPage += 1;
  handlePage();
};
const handlePrev = (): void => {
  if (currPage > 1) currPage -= 1;
  handlePage();
};

nextBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  handleNext();
});

prevBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  handlePrev();
});

sidebar.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  if (target && target.nodeName === "BUTTON") {
    const elNum = target.textContent;
    if (elNum && ["1", "2", "3", "4"].includes(elNum)) {
      currPage = +elNum;
      handlePage();
    }
  }
});
