const dropdownIcon = document.getElementsByClassName(
  "dropdown-blue-icon-wraper"
);
const tableListOptions = document.getElementsByClassName("table-list-option");

for (let i = 0; i < dropdownIcon.length; i++) {
  dropdownIcon[i].addEventListener("click", () => {
    tableListOptions[i].classList.toggle("active");
  });
}