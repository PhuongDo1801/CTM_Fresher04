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