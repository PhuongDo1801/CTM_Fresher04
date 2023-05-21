const listOptions = document.getElementsByClassName("table-list-option");
const overlay = document.getElementsByClassName("container__right-overlay")[0];
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