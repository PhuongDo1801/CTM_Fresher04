<template>
  <EmployeeCreate
    :style="{
      display: isShowEmployeeDetails ? 'block' : 'none',
    }"
    :handleCloseEmployeeCreateForm="handleCloseEmployeeCreateForm"
    :getListEmployee="getListEmployee"
  />

  <EmployeeUpdate
    :style="{
      display: isShowFormEmployeeUpdate ? 'block' : 'none',
    }"
    :handleCloseEmployeeUpdateForm="handleCloseEmployeeUpdateForm"
    :employeeDataProps="employeeDataProps"
    :getListEmployee="getListEmployee"
  />

  <div
    :style="{
      display: isShowOverlay ? 'block' : 'none',
    }"
    class="container__right-overlay"
  ></div>

  <div class="container__right-dialog" :class="{ active: isQAdelete }">
    <div class="container__right-dialog-top">
      <i class="sprite-warning-icon"></i>
      <span>Bạn có thực sự muốn xóa người dùng này không ?</span>
    </div>
    <hr />
    <div class="container__right-dialog-bottom">
      <button id="btn-not-allow-delete" class="container__right-dialog-btn">
        Hủy
      </button>
      <button
        @click="handleDeleteEmployee"
        id="btn-allow-delete"
        class="container__right-dialog-btn"
      >
        Đồng ý
      </button>
    </div>
  </div>

  <div class="container__right-main-top">
    <span>Nhân viên</span>
    <button @click="handleShowEmployeeCreateForm" id="btn-add-employee">
      Thêm mới nhân viên
    </button>
  </div>
  <div class="container__right-main-body">
    <div class="container__right-search">
      <div class="container__right-search-input">
        <input
          title="Tìm kiếm thông tin nhân viên"
          placeholder="Tìm theo mã, tên nhân viên"
          type="text"
        />
        <i class="sprite-search-icon"></i>
      </div>
      <i class="sprite-refresh-icon"></i>
    </div>

    <div class="container__right-table">
      <div class="container__right-table-item">
        <table id="container__table">
          <thead>
            <tr>
              <th type="checkbox">
                <input type="checkbox" />
              </th>
              <th model-name="code">MÃ NHÂN VIÊN</th>
              <th model-name="name">TÊN NHÂN VIÊN</th>
              <th model-name="gender">GIỚI TÍNH</th>
              <th model-name="dateOfBirth" type="date">NGÀY SINH</th>
              <th model-name="identityNumber" title="Số chứng minh nhân dân">
                SỐ CMND
              </th>
              <th model-name="positionName">CHỨC DANH</th>
              <th model-name="unitName">TÊN ĐƠN VỊ</th>
              <th model-name="bankAccount">SỐ TÀI KHOẢN</th>
              <th model-name="bankName">TÊN NGÂN HÀNG</th>
              <th title="Chi nhánh tài khoản ngân hàng" model-name="branch">
                CHI NHÁNH TK NGÂN HÀNG
              </th>
              <th type="operation">CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <tr
              @dblclick="getSingleValueEmployee(employee)"
              v-for="(employee, key) in employees"
              :key="employee.id"
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{{ employee.code }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.gender }}</td>
              <td>
                {{ employee.dateOfBirth && customDate(employee.dateOfBirth) }}
              </td>
              <td>{{ employee.identityNumber }}</td>
              <td>{{ employee.positionName }}</td>
              <td>{{ employee.unitName }}</td>
              <td>{{ employee.bankAccount }}</td>
              <td>{{ employee.bankName }}</td>
              <td>{{ employee.branch }}</td>
              <td>
                <span>Sửa</span>
                <div
                  @click="handleShowOptions(key)"
                  class="sprite-dropdown-blue-icon-wraper"
                >
                  <i class="sprite-dropdown-blue-icon"></i>
                  <ul
                    class="table-list-option"
                    :class="{
                      active: parseInt(optionIndex) === parseInt(key),
                      optionshidden: isOptionShow,
                    }"
                  >
                    <li>Nhân bản</li>
                    <li
                      @click="handleShowQADelete(employee.id)"
                      class="table-list-option-delete"
                    >
                      Xóa
                    </li>
                    <li>Ngưng sử dụng</li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container__right-main-footer">
      <div>
        <div class="container__right-main-footer-left">
          <span>Tổng số: <b>1035</b> bản ghi</span>
        </div>

        <div class="container__right-main-footer-right">
          <div class="container__dropdown-wraper">
            <ul class="container__dropdown-wraper-list">
              <li class="container__dropdown-wraper-list-item">
                10 bản ghi trên trang
              </li>
              <li class="container__dropdown-wraper-list-item">
                20 bản ghi trên trang
              </li>
              <li class="container__dropdown-wraper-list-item">
                30 bản ghi trên trang
              </li>
              <li class="container__dropdown-wraper-list-item">
                50 bản ghi trên trang
              </li>
              <li class="container__dropdown-wraper-list-item">
                100 bản ghi trên trang
              </li>
            </ul>
            <div class="container__dropdown-wraper-item">
              <span>20 bản ghi trên trang</span>
            </div>
            <div class="container__dropdown-wraper-icon">
              <i class="sprite-dropdown-gray-icon"></i>
            </div>
          </div>
          <div class="container__right-pages">
            <span>Trước</span>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>...</li>
              <li>52</li>
            </ul>
            <span>Sau</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeCreate from "./EmployeeCreate.vue";
import EmployeeUpdate from "./EmployeeUpdate.vue";
import axios from "axios";
export default {
  name: "EmployeeList",
  components: {
    EmployeeCreate,
    EmployeeUpdate,
  },
  data() {
    return {
      isShowEmployeeDetails: false,
      optionIndex: null,
      isOptionShow: false,
      isQAdelete: false,
      isShowOverlay: false,
      employeeId: null,
      employees: [],
      employeeDataProps: null,
      isShowFormEmployeeUpdate: false,
    };
  },
  methods: {
    handleShowEmployeeCreateForm() {
      this.isShowEmployeeDetails = true;
      this.isShowOverlay = true;
    },

    handleCloseEmployeeUpdateForm(){
      this.isShowFormEmployeeUpdate = false; 
      this.isShowOverlay = false;
    },

    handleCloseEmployeeCreateForm() {
      this.isShowEmployeeDetails = false;
      this.isShowOverlay = false;
    },

    handleShowOptions(key) {
      this.optionIndex = key;
    },

    handleShowQADelete(employeeId) {
      this.isQAdelete = true;
      this.isShowOverlay = true;
      this.isOptionShow = true;
      this.employeeId = employeeId;
    },

    customDate(date) {
      const dateSplit = date.split("-");
      const newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
      return newDate;
    },

    getSingleValueEmployee(employee) {
      this.employeeDataProps = employee;
      this.isShowFormEmployeeUpdate = true;
      this.isShowOverlay = true;
    },

    async handleDeleteEmployee() {
      try {
        await axios.delete(
          `http://localhost:3000/employees/${this.employeeId}`
        );
        this.isQAdelete = !this.isQAdelete;
        this.isShowOverlay = !this.isShowOverlay;
        this.isOptionShow = !this.isOptionShow;
        this.getListEmployee();
      } catch (error) {
        console.log(error);
      }
    },
    async getListEmployee() {
      try {
        await axios
          .get("http://localhost:3000/employees")
          .then((response) => (this.employees = response?.data));
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getListEmployee();
  },
};
</script>

<style></style>
