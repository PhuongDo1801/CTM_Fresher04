const popupEmployee = document.getElementById("container-popup-employee");
const btnClose = document.getElementsByClassName("close-icon")[0];
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