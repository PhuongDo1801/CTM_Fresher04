window.onload = function () {
  const employee = new Employees();
  employee.getEmployeeList();
};

class Employees {
  constructor() {
    console.log("Zzzzzzzzz ...");
  }

  /**
   * Tạo các sự kiện
   */

  intEvents() {
    try {
      // Sự kiện mở form
      document
        .querySelector("#btn-add-employee")
        .addEventListener("click", this.showFormAddEmployee);

      // Sự kiện đóng form
      document
        .querySelector(".sprite-close-icon")
        .addEventListener("click", this.hiddenFormAddEmployee);

      // Sự kiện mở danh sách thao tác
      document
        .querySelectorAll(".sprite-dropdown-blue-icon-wraper")
        .forEach((item, index) => {
          item.addEventListener("click", () => this.showOptionsList(index));
        });

      // Sự kiện xóa nhân viên
      document
        .querySelectorAll(".table-list-option-delete")
        .forEach((item, index) => {
          item.addEventListener("click", () =>
            this.handleShowFormDeleteEmployeee(item.getAttribute("employeeid"))
          );
        });

      document
        .querySelector(".container__dropdown-wraper")
        .addEventListener("click", this.showFormPaging);

      document
        .querySelectorAll(".container__dropdown-wraper-list-item")
        .forEach((item) => {
          item.addEventListener("click", () =>
            this.handleChangeTextPaging(item.innerText)
          );
        });

      document
        .querySelector(".btn-add-employee")
        .addEventListener("click", this.handleAddEmployee);

      document
        .querySelector("#btn-allow-delete")
        .addEventListener("click", () =>
          this.handleAllowDeleteEmployee(
            document.querySelector("#btn-allow-delete").getAttribute("eid")
          )
        );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gọi API lấy danh sách nhân viên
   * Method: GET
   */
  async getEmployeeList() {
    try {
      // 1.Gọi api lấy dữ liệu nhân viên
      const res = await fetch("http://localhost:3000/employees");
      const data = await res.json();
      // 2.Load dữ liệu nhân viên vào table
      this.renderEmployeeList(data);

      // Khởi tạo các sự kiện
      this.intEvents();
    } catch (error) {
      console.log(error);
    }
  }
  /**Load dữ liệu vào table */
  renderEmployeeList(data) {
    try {
      // Lấy body table
      const table = document.querySelector("#container__table tbody");
      // Lấy danh sách cột th
      const ths = document.querySelectorAll("#container__table th");

      //Duyệt danh sách dữ liệu nhân viên
      data.forEach((item) => {
        const tr = document.createElement("tr");
        for (let th of ths) {
          const td = document.createElement("td");
          const modelName = th.getAttribute("model-name");
          const type = th.getAttribute("type");

          //Kiểm tra kiểu
          switch (type) {
            // Tạo checkbox
            case "checkbox":
              const input = document.createElement("input");
              input.type = "checkbox";
              td.append(input);
              break;
            // Tạo danh sách thao tác
            case "operation":
              const span = document.createElement("span");
              span.innerText = "Sửa";
              const div = document.createElement("div");
              div.className = "sprite-dropdown-blue-icon-wraper";
              const i = document.createElement("i");
              i.className = "sprite-dropdown-blue-icon";
              const ul = document.createElement("ul");
              ul.className = "table-list-option";
              const liFirstChild = document.createElement("li");
              liFirstChild.innerText = "Nhân bản";
              const liSecond = document.createElement("li");
              liSecond.className = "table-list-option-delete";
              liSecond.setAttribute("employeeid", item.id);
              liSecond.innerHTML = "Xóa";
              const liLastChild = document.createElement("li");
              liLastChild.innerText = "Ngưng sử dụng";

              ul.append(liFirstChild);
              ul.append(liSecond);
              ul.append(liLastChild);
              div.append(i);
              div.append(ul);
              td.append(span);
              td.appendChild(div);

              break;
            default:
              console.log("Zzzzzz...");
          }

          if (item[modelName] !== undefined) {
            if (modelName === "dateOfBirth") {
              td.innerText = this.handleCustomDate(item[modelName]);
            } else {
              td.innerText = item[modelName];
            }
          }
          tr.append(td);
        }
        table.append(tr);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**Hiển thị form thêm nhân viên */

  showFormAddEmployee() {
    try {
      document.querySelector("#container-popup-employee").style.display =
        "block";
      document.querySelector(".container__right-overlay").style.display =
        "block";
    } catch (error) {
      console.log(error);
    }
  }

  /**Hiển thị danh sách thao tác */

  showOptionsList(index) {
    try {
      document.querySelectorAll(".table-list-option").forEach((item, idx) => {
        if (index === idx) {
          item.classList.toggle("active");
        } else {
          item.classList.remove("active");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  showFormPaging() {
    try {
      document
        .querySelector(".container__dropdown-wraper-list")
        .classList.toggle("active");
    } catch (error) {
      console.log(error);
    }
  }

  handleCustomDate(date) {
    const dateCurrent = date.split("-");
    const newDate =
      dateCurrent[2] + "/" + dateCurrent[1] + "/" + dateCurrent[0];
    return newDate;
  }

  handleChangeTextPaging(text) {
    try {
      document.querySelector(
        ".container__dropdown-wraper-item span"
      ).innerText = text;
    } catch (error) {
      console.log(error);
    }
  }

  /**Ẩn form thêm nhân viên */

  hiddenFormAddEmployee() {
    try {
      document.querySelector("#container-popup-employee").style.display =
        "none";
      document.querySelector(".container__right-overlay").style.display =
        "none";
    } catch (error) {
      console.log(error);
    }
  }

  async handleAddEmployee() {
    try {
      // Lấy giá trị từ form chi tiết nhân viên

      const isCustomer = document.querySelector("#employee-customer").checked;
      const isProvider = document.querySelector("#employee-provider").checked;
      const code = document.querySelector("#employee-code").value;
      const name = document.querySelector("#employee-name").value;
      const unitName = document.querySelector("#employee-unit-name").value;
      const gender = document.querySelector("input[name=gender]:checked").value;
      const positionName = document.querySelector("#employee-position").value;
      const dateOfBirth = document.querySelector("#employee-date-of-birth").value;
      const identityNumber = document.querySelector("#employee-identity-number").value;
      const identityDateRelease = document.querySelector("#employee-identity-date-release").value;
      const identityPlaceRelease = document.querySelector("#employee-place-release").value;
      const address = document.querySelector("#employee-address").value;
      const phone = document.querySelector("#employee-phone").value;
      const phonePermanent = document.querySelector("#employee-phone-permanent").value;
      const email = document.querySelector("#employee-email").value;
      const bankAccount = document.querySelector("#employee-bank-account").value;
      const bankName = document.querySelector("#employee-bank-name").value;
      const branch = document.querySelector("#employee-branch").value;

      const employeeData = {
        id: new Date().getMilliseconds() * 123,
        code,
        name,
        unitName,
        gender,
        positionName,
        dateOfBirth,
        identityNumber,
        identityDateRelease,
        identityPlaceRelease,
        address,
        phone,
        phonePermanent,
        email,
        bankAccount,
        bankName,
        branch,
        isCustomer,
        isProvider,
        isProvider,
        isCustomer,
      };

      // Xử lý thêm mới nhân viên
      await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      document.querySelector(".toast-message").classList.toggle("active");
    } catch (error) {
      console.log(error);
    }
  }

  /** Xử xóa nhân viên */

  async handleAllowDeleteEmployee(eId) {
    try {
      await fetch(`http://localhost:3000/employees/${eId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**Xử lý truyền Id nhân viên sang popup xóa nhân viên */
  handleShowFormDeleteEmployeee(employeeId) {
    try {
      const formDeleteEmployeee = document.querySelector(
        ".container__right-dialog"
      );
      formDeleteEmployeee.classList.toggle("active");
      document
        .querySelector("#btn-allow-delete")
        .setAttribute("eid", employeeId);
      document.querySelector(".container__right-overlay").style.display =
        "block";
    } catch (error) {
      console.log(error);
    }
  }
}
