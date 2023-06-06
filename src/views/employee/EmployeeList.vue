<template>
  <EmployeeDetails
    v-if="isShowEmployeeDetails"
    :handleCloseEmployeeForm="handleCloseEmployeeForm"
    :getListEmployee="getListEmployee"
    :employees="employees"
    :handleShowOverlay="handleShowOverlay"
    :handleDuplicateEplCode="handleDuplicateEplCode"
    :handleInputTextEmpty="handleInputTextEmpty"
    :workIsDone="workIsDone"
    :isPopupOverlayShow="isPopupOverlayShow"
    :employeeDataProps="employeeDataProps"
    @reset-employee-state="handleResetEmployeeProps"
    @update-table-employee="handleUpdateEmployeeOnTable"
    @handle-focus-employee-code="handleSetEmployeeCodeRef"
    @handle-focus-employee-name="handleSetEmployeeNameRef"
    @handle-focus-unit-name="handleSetEmployeeUnitNameRef"
  />

  <div
    :style="{
      display: isShowOverlay ? 'block' : 'none',
    }"
    class="container__right-overlay"
  ></div>

  <m-toast-message
    :textMessage="textMessage"
    :isDone="isDone"
  ></m-toast-message>

  <m-dialog
    :textDialog="textDialog"
    :isShowDialog="isShowDialog"
    :handleCancelDelete="handleCancelDelete"
    :handleDeleteEmployee="handleDeleteEmployee"
    :handleCloseDuplicateForm="handleCloseDuplicateForm"
    :handleCloseEmptyInputForm="handleCloseEmptyInputForm"
    :isDialogCreateClick="isDialogCreateClick"
    :isDialogDeleteClick="isDialogDeleteClick"
    :isDialogUpdateClick="isDialogUpdateClick"
    :isDialogEmptyClick="isDialogEmptyClick"
  ></m-dialog>

  <div class="container__right-main-top">
    <span> {{ this.$_MISAResource[this.$_LANGCODE].pagesName.employee }}</span>
    <button @click="handleShowEmployeeForm" id="btn-add-employee">
      {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.addEmployee }}
    </button>
  </div>
  <div class="container__right-main-body">
    <div class="container__right-search">
      <div class="container__right-search-input">
        <input
          v-model="textSearch"
          title="Tìm kiếm thông tin nhân viên"
          placeholder="Tìm theo mã, tên nhân viên"
          type="text"
          id="input-search"
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
                <input name="input-table-checkbox" type="checkbox" />
              </th>
              <th model-name="code">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeCode
                }}
              </th>
              <th model-name="name">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeName
                }}
              </th>
              <th model-name="gender">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeGender
                }}
              </th>
              <th model-name="dateOfBirth" type="date">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeDob
                }}
              </th>
              <th model-name="identityNumber" title="Số chứng minh nhân dân">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeIdentityNum
                }}
              </th>
              <th model-name="positionName">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeePositionName
                }}
              </th>
              <th model-name="unitName">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeUnitName
                }}
              </th>
              <th model-name="bankAccount">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeBankAccount
                }}
              </th>
              <th model-name="bankName">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeBankName
                }}
              </th>
              <th title="Chi nhánh tài khoản ngân hàng" model-name="branch">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeBankBranch
                }}
              </th>
              <th type="operation">
                {{
                  this.$_MISAResource[this.$_LANGCODE].employeeTable
                    .employeeOperation
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              @dblclick="getSingleValueEmployee(employee)"
              v-for="(employee, key) in employees"
              :key="employee.id"
            >
              <td>
                <input name="input-table-checkbox" type="checkbox" />
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
                <span>
                  {{
                    this.$_MISAResource[this.$_LANGCODE].employeeOptions.title
                  }}</span
                >
                <div
                  @click="handleShowOptions(key)"
                  class="sprite-dropdown-blue-icon-wraper"
                >
                  <i class="sprite-dropdown-blue-icon"></i>
                  <ul
                    ref="optionsRef"
                    class="table-list-option"
                    v-show="
                      parseInt(optionIndex) === parseInt(key) && isOptionShow
                    "
                  >
                    <li>
                      {{
                        this.$_MISAResource[this.$_LANGCODE].employeeOptions
                          .replication
                      }}
                    </li>
                    <li
                      @click="handleShowQADelete(employee.id)"
                      class="table-list-option-delete"
                    >
                      {{
                        this.$_MISAResource[this.$_LANGCODE].employeeOptions
                          .delete
                      }}
                    </li>
                    <li>
                      {{
                        this.$_MISAResource[this.$_LANGCODE].employeeOptions
                          .stopUsing
                      }}
                    </li>
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
          <span
            >Tổng số: <b>{{ employees.length }}</b></span
          >
        </div>
        <div class="container__right-main-footer-right">
          <div class="container__footer-right-item-first">
            <span>Số bản ghi/trang:</span>
            <div @click="handleShowPageList">
              <span>{{ this.currentPageSize }} </span>
              <span>&nbsp;</span>
              <i class="sprite-dropdown-gray-d-icon"></i>
              <ul v-show="isPagingShow" class="footer__pagesize-list">
                <li
                  @click="handleChangeRowPage(item.value)"
                  v-for="item in pagings"
                  :key="item"
                >
                  {{ item.value }}
                </li>
              </ul>
            </div>
          </div>
          <div class="container__footer-right-item-second">
            <span>1 </span>
            <span>&nbsp; - &nbsp;</span>
            <span>{{ employees.length }}</span>

            <span> &nbsp; bản ghi </span>
          </div>
          <div class="container__footer-right-item-three">
            <i @click="handleBackPage" class="sprite-arrow-left-icon"></i>
            <i @click="handleNextPage" class="sprite-arrow-right-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDetails from "./EmployeeDetails.vue";
import { customDate } from "@/utils/utils";
import EmployeeService from "../../services/EmployeeService";
import { pagings } from "../../data/paging";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetails,
  },
  data() {
    return {
      employeeCodeRef: null,
      employeeNameRef: null,
      employeeUnitNameRef: null,
      idTimeOut: null,
      inputTypeEmplCodeErr: false,
      inputTypeEmplNameErr: false,
      inputTypeEmplUnitNameErr: false,
      textSearch: "",
      offset: 0,
      limit: 10,
      page: 1,
      start: 0,
      pagings,
      isPopupOverlayShow: false,
      textMessage: "",
      textDialog: [],
      isDone: false,
      emplCode: null,
      isDuplicateCode: false,
      isShowEmployeeDetails: false,
      optionIndex: null,
      isOptionShow: false,
      isQAdelete: false,
      isShowDialog: false,
      isShowOverlay: false,
      employeeId: null,
      employees: [],
      employeeDataProps: null,
      isShowFormEmployeeUpdate: false,
      isDialogCreateClick: false,
      isDialogDeleteClick: false,
      isDialogUpdateClick: false,
      isDialogEmptyClick: false,
      isPagingShow: false,
      currentPageSize: 15,
      totalSizePage: 0,
    };
  },
  methods: {
    /**
     * Mô tả: Xử lý lấy dữ liệu trang trước
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    async handleBackPage() {
      try {
        if (this.page > 1) {
          this.page = this.page - 1;
          const data = await EmployeeService.getPaging(this.page, this.limit);
          this.employees = data;
        }
      } catch (error) {
        switch (error.code) {
          case 500:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,
                true
              )
            );
            break;
          default:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,
                true
              )
            );
        }
      }
    },

    /**
     * Mô tả: Xử lý lấy dữ liệu trang tiếp theo
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    async handleNextPage() {
      try {
        if (this.page < this.totalSizePage) {
          this.page = this.page + 1;
          const data = await EmployeeService.getPaging(this.page, this.limit);
          this.employees = data;
        }
      } catch (error) {
        switch (error.code) {
          case 500:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,
                true
              )
            );
            break;
          default:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,
                true
              )
            );
        }
      }
    },
    /**
     * Mô tả: Thay đổi số lượng dòng hiển thị
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    handleChangeRowPage(value) {
      this.currentPageSize = value;
    },

    /**
     * Mô tả: Hiển thị danh sách hiển thị số lượng dòng
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    handleShowPageList() {
      this.isPagingShow = !this.isPagingShow;
    },

    /**
     * Mô tả: lấy input mã nhân viên ref
     * created by : NDTHINH
     * created date: 02-06-2023
     */
    handleSetEmployeeCodeRef(emplCodeRef) {
      this.employeeCodeRef = emplCodeRef;
    },

    /**
     * Mô tả: lấy input tên nhân viên ref
     * created by : NDTHINH
     * created date: 02-06-2023
     */

    handleSetEmployeeNameRef(emplNameRef) {
      this.employeeNameRef = emplNameRef;
    },
    /**
     * Mô tả: lấy input tên đơn vị ref
     * created by : NDTHINH
     * created date: 04-06-2023
     */
    handleSetEmployeeUnitNameRef(emplUnitNameRef) {
      this.employeeUnitNameRef = emplUnitNameRef;
    },

    /**
     * Mô tả: Xử lý reset dữ liệu nhân viên trong props
     * created by : NDTHINH
     * created date: 01-06-2023
     */
    handleResetEmployeeProps() {
      this.employeeDataProps = null;
    },
    /**
     * Mô tả: Xử lý thay đổi số dòng hiển thị trên table
     * created by : NDTHINH
     * created date: 31-05-2023
     */
    async handleChangeNumberRow(num) {
      this.rowNumber = num;
      try {
        const data = await EmployeeService.findByFilter(0, parseInt(num));
        this.employees = data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Hiển lựa chọn số dòng hiển thị
     * created by : NDTHINH
     * created date: 31-05-2023
     */
    handleShowPaging() {
      this.isPagingShow = !this.isPagingShow;
    },
    /**
     * Mô tả: Custom ngày tháng năm
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    customDate,
    /**
     * Mô tả: Xử lý hủy xóa nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */

    handleCancelDelete() {
      this.isShowDialog = false;
      this.handleCloseOverlay();
      this.isDialogDeleteClick = false;
      this.textDialog = [];
    },
    /**
     * Mô tả:Hiển thị text message khi thực hiện xong công việc
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    workIsDone(text, isDone) {
      this.textMessage = text;
      this.isDone = isDone;
      setTimeout(() => {
        this.isDone = false;
      }, 3000);
    },

    /**
     * Mô tả: Xử lý trùng mã nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleDuplicateEplCode(emplCode) {
      this.isDuplicateCode = true;
      this.emplCode = emplCode;
      this.isShowDialog = true;
      this.isDialogCreateClick = true;
      this.textDialog.push(
        this.$_MISAResource[this.$_LANGCODE].employeeMsg.duplicateCode(
          this.emplCode
        )
      );
      this.isPopupOverlayShow = true;
      this.isShowOverlay();
      this.textDialog = [];
    },
    /**
     * Mô tả: Xử lý input để trống
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleInputTextEmpty(text, type) {
      this.isShowDialog = true;
      this.isDialogEmptyClick = true;
      this.textDialog.push(text);
      this.isPopupOverlayShow = true;

      if (type === "emplCodeErr") {
        this.inputTypeEmplCodeErr = true;
      }

      if (type === "emplNameErr") {
        this.inputTypeEmplNameErr = true;
      }

      if (type === "emplUnitNameErr") {
        this.inputTypeEmplUnitNameErr = true;
      }
    },

    /**
     * Mô tả: Đóng form thông báo trùng mã nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleCloseDuplicateForm() {
      this.isDuplicateCode = false;
      this.isShowDialog = false;
      this.isDialogCreateClick = false;
      this.isPopupOverlayShow = false;
      this.textDialog = [];
    },

    /**
     * Mô tả: Xử lý đóng form nhân viên
     * created by : NDTHINH
     * created date: 04-06-2023
     */
    handleCloseEmptyInputForm() {
      this.isShowDialog = false;
      this.isDialogEmptyClick = false;
      this.isPopupOverlayShow = false;
      this.textDialog = [];
      if (this.inputTypeEmplCodeErr === true) {
        this.employeeCodeRef.focus();
        this.inputTypeEmplCodeErr = false;
        return;
      }
      if (this.inputTypeEmplNameErr === true) {
        this.employeeNameRef.focus();
        this.inputTypeEmplNameErr = false;
        return;
      }

      if (this.inputTypeEmplUnitNameErr === true) {
        this.employeeUnitNameRef.focus();
      }
    },

    /**
     * Mô tả: Hiển thị overlay
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleShowOverlay() {
      this.isShowOverlay = true;
    },

    /**
     * Mô tả: Tắt overlay
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleCloseOverlay() {
      this.isShowOverlay = false;
    },
    /**
     * Mô tả: Hiển hị form tạo nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleShowEmployeeForm() {
      this.isShowEmployeeDetails = true;
      this.handleShowOverlay();
    },

    /**
     * Mô tả: Đóng form update nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */

    /**
     * Mô tả: Đóng form tạo nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */

    handleCloseEmployeeForm() {
      this.isShowEmployeeDetails = false;
      this.handleCloseOverlay();
    },

    /**
     * Mô tả: Xử lý hiển thị thao tác
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleShowOptions(key) {
      this.optionIndex = key;
      this.isOptionShow = !this.isOptionShow;
    },

    /**
     * Mô tả: Xử lý hiển thị câu hỏi xóa
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleShowQADelete(employeeId) {
      this.isShowDialog = true;
      this.handleShowOverlay();
      this.isOptionShow = true;
      this.employeeId = employeeId;
      this.isDialogDeleteClick = true;
      this.textDialog.push(
        this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteQuestion
      );
      this.$refs.optionsRef[this.optionIndex].classList.remove("active");
    },

    /**
     * Mô tả: Lấy thông tin một nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */

    getSingleValueEmployee(employee) {
      this.employeeDataProps = employee;
      this.isShowFormEmployeeUpdate = true;
      this.isShowEmployeeDetails = true;
      this.handleShowOverlay();
    },

    /**
     * Mô tả: Xử lý thêm, sửa, xóa nhân viên trên table
     * created by : NDTHINH
     * created date: 29-05-2023
     */

    handleUpdateEmployeeOnTable(employee, type) {
      //thêm
      if (type === "created") {
        this.employees.push(employee);
        return;
      }

      //cập nhật
      if (type === "updated") {
        this.employees = this.employees.map((item) => {
          if (item.id === employee.id) {
            return employee;
          }
          return item;
        });
        this.employeeDataProps = null;
        return;
      }

      //xóa
      this.employees = this.employees.filter((item, index) => {
        return this.optionIndex !== index;
      });
      this.optionIndex = null;
      this.textMessage =
        this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteSuccess;
      this.isDone = true;
      this.isDialogDeleteClick = false;
      this.isOptionShow = false;
      setTimeout(() => {
        this.isDone = false;
      }, 3000);
    },

    /**
     * Mô tả: Call API xóa nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    async handleDeleteEmployee() {
      try {
        const status = await EmployeeService.deleteById(this.employeeId);
        if (status === 200) {
          this.isShowDialog = false;
          this.handleCloseOverlay();
          this.isOptionShow = !this.isOptionShow;
          this.handleUpdateEmployeeOnTable();
          this.textDialog = [];
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Lấy danh sách nhân viên
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    async getListEmployee() {
      try {
        const { data, length } = await EmployeeService.findAll();
        this.employees = data;
        this.totalSizePage = Math.ceil(length / 10);
      } catch (error) {
        switch (error.code) {
          case 500:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,
                true
              )
            );
            break;
          default:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,
                true
              )
            );
        }
      }
    },

    async findByName(emplName) {
      try {
        const data = await EmployeeService.findByName(emplName);
        this.employees = data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getListEmployee();
  },

  watch: {
    textSearch(newValue) {
      if (this.idTimeOut !== null) {
        clearTimeout(this.idTimeOut);
      }
      const id = setTimeout(() => {
        this.findByName(newValue);
      }, 600);
      this.idTimeOut = id;
    },
  },
};
</script>

<style scoped>
.pagingShow {
  border: 1px solid green;
}
</style>
