/* popup employee */
const popupEmployee = document.getElementById("container-popup-employee");
const btnClose = document.getElementsByClassName("sprite-close-icon")[0];
const overlay = document.getElementsByClassName("container__right-overlay")[0];
const btnAddEmployee = document
  .getElementById("btn-add-employee")
  .addEventListener("click", () => {
    popupEmployee.style.display = "block";
    overlay.style.display = "block";
  });

btnClose.addEventListener("click", () => {
  popupEmployee.style.display = "none";
  overlay.style.display = "none";
});

/* dropdown icon */

const dropdownIcon = document.getElementsByClassName(
  "sprite-dropdown-blue-icon-wraper"
);
const tableListOptions = document.getElementsByClassName("table-list-option");

for (let i = 0; i < dropdownIcon.length; i++) {
  dropdownIcon[i].addEventListener("click", () => {
    tableListOptions[i].classList.toggle("active");
  });
}

/* list options */
const listOptions = document.getElementsByClassName("table-list-option");
const listOptionDelete = document.getElementsByClassName(
  "table-list-option-delete"
);

for (let i = 0; i < listOptionDelete.length; i++) {
  listOptionDelete[i].addEventListener("click", () => {
    document
      .getElementsByClassName("container__right-dialog")[0]
      .classList.toggle("active");
    overlay.style.display = "block";
  });
}

/* pageing */

const paging = document.getElementsByClassName(
  "container__dropdown-wraper-list"
)[0];
const dropdownSelectPageing = document.getElementsByClassName(
  "container__dropdown-wraper"
)[0];
const dropdownPageList = document.getElementsByClassName(
  "container__dropdown-wraper-list-item"
);

dropdownSelectPageing.addEventListener("click", () => {
  paging.classList.toggle("active");
  dropdownSelectPageing.classList.toggle("active");
});

for (let i = 0; i < dropdownPageList.length; i++) {
  dropdownPageList[i].addEventListener("click", () => {
    document.getElementsByClassName(
      "container__dropdown-wraper-item"
    )[0].innerHTML = dropdownPageList[i].innerHTML;
  });
}

/* dialog */
const dialogBtn = document.getElementsByClassName(
  "container__right-dialog-btn"
);
for (let i = 0; i < dialogBtn.length; i++) {
  dialogBtn[i].addEventListener("click", () => {
    document
      .getElementsByClassName("container__right-dialog")[0]
      .classList.toggle("active");
    overlay.style.display = "none";
  });
}
