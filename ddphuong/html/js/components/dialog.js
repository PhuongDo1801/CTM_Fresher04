// Đóng dialog qua btn
const overlay = document.getElementsByClassName("container__right-overlay")[0];
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