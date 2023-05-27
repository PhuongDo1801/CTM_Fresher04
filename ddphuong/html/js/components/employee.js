window.onload = function () {
    new Employee();
}

class Employee {
    constructor() {
        this.initEvents();
        this.loadData();
    }
    /*
    Khai báo sự kiện
    Author: DDPHUONG (22/05/2023)
    ModifiedBy: 
    */

    initEvents() {
        try {
            //logic code
            //Đóng mở form thêm mới nhân viên
            document.querySelector("#btn-add-employee").onclick = this.btnAddEmployee;
            document.querySelector("#close-icon-add-employee").onclick = this.btnCloseDialogAddEmployee;
            //Đóng mở dropdown
            document
                .querySelectorAll(".dropdown-blue-icon-wraper")
                .forEach((item, index) => {
                    item.addEventListener("click", () => this.showOptionsListEmployee(index));
                })
            // Đóng mở dialog xoá nhân viên
            document
                .querySelectorAll(".table-list-option-delete")
                .forEach((item, index) => {
                    item.addEventListener("click", () => this.ShowDialogDelete(index));
                })
            //Đóng mở paging
            // document.querySelector(".container__dropdown-wraper").onclick = this.showFormPaging;
                // .addEventListener("click", this.showFormPaging);
            

        }
        catch (error) {
            console.log(error)
        }
    }
    async loadData() {
        try {
            // 1. Gọi api lấy dữ liệu 
            var data = await fetch("https://cukcuk.manhnv.net/api/v1/Employees").then(res => res.json());
            console.log(data);

            // 2. Lấy được dữ liệu thì thực hiện xử lý và hiển thị
            // 3. Duyệt từng bản ghi trong mảng dữ liệu khi trả về
            for (const item of data) {
                // Tạo dòng dữ liệu tương ứng vào từng bản ghi và append vào table
                let trElement = document.createElement("tr");
                // Đọc header table để lấy ra thông tin:
                let ths = document.querySelectorAll("#table-employee-list thead th")
                // duyệt từng th để đọc thông tin
                for (const th of ths) {

                    // Lấy thông tin gì của đối tượng
                    const modelName = th.getAttribute("model-name");
                    let value = "";
                    // Giá trị tương ứng của đối tượng là gì?
                    if (modelName != null) {
                        value = item[modelName];
                    }
                    // Build tdElement
                    let tdElement = document.createElement("td");
                    const type = th.getAttribute("type")
                    switch (type) {
                        case "checkbox":
                            value = document.createElement("input");
                            value.setAttribute("type", "checkbox");
                            tdElement.classList.add("text-align-center");
                            break;
                        case "date":
                            value = this.formatDate(value);
                            tdElement.classList.add("text-align-center");
                            break;
                        default:

                            break;
                    }
                    tdElement.append(value);
                    // append vào tr
                    trElement.append(tdElement);
                }
                document.querySelector("#table-employee-list tbody").append(trElement);

            }

        }
        catch (error) {
            console.log(error)
        }
    }

    formatDate(dateValue) {
        try {
            let date = new Date(dateValue);
            let dateString = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${dateString}/${month}/${year}`;
        }
        catch (error) {
            console.log(error);
        }
    }

    /*
    Hiển thị form
    Author: DDPHUONG (22/05/2023)
    ModifiedBy: 
    */

    btnAddEmployee() {
        // Hiển thị form chi tiết
        const popupEmployee = document.getElementById("container-popup-employee");
        const overlay = document.getElementsByClassName("container__right-overlay")[0];
        popupEmployee.style.display = "block";
        overlay.style.display = "block";
    }

    /*
    Ẩn form thêm mới nhân viên
    Author: DDPHUONG (22/05/2023)
    ModifiedBy: 
    */
    btnCloseDialogAddEmployee() {
        // Ẩn thị form chi tiết
        const popupEmployee = document.getElementById("container-popup-employee");
        const overlay = document.getElementsByClassName("container__right-overlay")[0];
        popupEmployee.style.display = "none";
        overlay.style.display = "none";
    }
    /*
    Đóng mở option chức năng trong table
    Author: DDPHUONG (22/05/2023)
    ModifiedBy: 
    */
    showOptionsListEmployee(index) {
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
    /*
    Đóng mở Dialog xoá nhân viên
    Author: DDPHUONG (22/05/2023)
    ModifiedBy: 
    */
    ShowDialogDelete(index) {
        try {
            const overlay = document.getElementsByClassName("container__right-overlay")[0];
            document.querySelector(".container__right-dialog").classList.toggle("active");
        } catch (error) {
            console.log(error);
        }
    }
    /*
    Đóng mở paging
    Author: DDPHUONG (23/05/2023)
    ModifiedBy: 
    */
    showFormPaging() {
        try {
            document
                .querySelector(".container__dropdown-wraper-list")
                .classList.toggle("active");
        } catch (error) {
            console.log(error);
        }
    }

}