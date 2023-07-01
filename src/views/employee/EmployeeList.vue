<template>
  <EmployeeDetails
    v-if="isShowEmployeeDetails"
    :handleCloseEmployeeForm="handleCloseEmployeeForm"
    :getListEmployee="getEmployeeList"
    :handleShowOverlay="handleShowOverlay"
    :workIsDone="workIsDone"
    :isPopupOverlayShow="isPopupOverlayShow"
    :employeeDataProps="employeeDataProps"
    :employeeCodeInit="employeeCodeInit"
    :departments="departments"
    :getFormSubmit="getFormSubmit"
    @reset-employee-state="handleResetEmployeeProps"
    @update-table-employee="handleUpdateEmployeeOnTable"
    @show-loading-icon="handleShowLoadingIcon"
    @hidden-loading-icon="handleHiddenLoadingIcon"
    @get-Input-Error-Text="handleShowDialogErrorInput"
    @show-close-form-question="handleShowCloseFormQuestion"
    @get-Employee-Code-Input="setEmployeeCodeRef"
  />

  <div v-if="isLoadingData">
    <img class="loader" src="../../assets/img/loading.svg" alt="" />
  </div>

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
    :dialogType="dialogType"
    :handleCloseDialog="handleCloseDialog"
    :handleDeleteEmployee="handleDeleteEmployee"
    :handleSubmitForm="handleSubmitForm"
    :handleCloseEmployeeForm="handleCloseEmployeeForm"
  ></m-dialog>

  <div class="container__right-main-top">
    <span> {{ this.$_MISAResource[this.$_LANGCODE].pagesName.employee }}</span>
    <button @click="handleShowEmployeeForm" id="btn-add-employee">
      {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.addEmployee }}
    </button>
  </div>
  <div class="container__right-main-body">
    <div class="container__right-search">
      <button disabled class="container__right-search-btn">
        <span>Thực hiện hàng loạt</span>
        &nbsp;&nbsp;
        <i class="sprite-dropdown-container-top-icon"></i>
      </button>

      <div class="container__right-search-input">
        <input
          v-model="textSearch"
          placeholder="Tìm theo mã, tên nhân viên"
          type="text"
          id="input-search"
        />
        <i class="sprite-search-icon"></i>
        <i @click="handleReloadTable" class="sprite-refresh-icon"></i>
      </div>
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
              <th model-name="identityNumber">
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
              :key="employee.EmployeeId"
            >
              <td>
                <input
                  name="input-table-checkbox"
                  type="checkbox"
                  @dblclick.stop
                />
              </td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.FullName }}</td>
              <td>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.male">
                  {{ this.$_MISAResource[this.$_LANGCODE].employeeGender.male }}
                </span>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.female">
                  {{
                    this.$_MISAResource[this.$_LANGCODE].employeeGender.female
                  }}
                </span>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.other">
                  {{
                    this.$_MISAResource[this.$_LANGCODE].employeeGender.other
                  }}
                </span>
              </td>
              <td>
                {{ employee.DateOfBirth && customDateV1(employee.DateOfBirth) }}
              </td>
              <td>
                {{ employee.IdentityNumber }}
              </td>
              <td>{{ employee.JobTitle }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td>
                {{ employee.BankAccount }}
              </td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.BankBranch }}</td>
              <td @dblclick.stop>
                <span>
                  {{
                    this.$_MISAResource[this.$_LANGCODE].employeeOptions.title
                  }}
                </span>
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
                      @click="handleShowDialogDelete(employee)"
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
            >Tổng số: <b>{{ totalRecord && totalRecord }}</b></span
          >
        </div>
        <div class="container__right-main-footer-right">
          <div class="container__footer-right-item-first">
            <span>Số bản ghi/trang:</span>
            <div @click="handleShowPageList">
              <span>&nbsp;{{ originRecord }}</span>
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
            <span>1</span>
            <span>&nbsp; - &nbsp;</span>
            <span>{{ employees?.length }}</span>

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
import { customDateV1, customDateV2 } from "@/utils/date";
import employeeService from "../../services/EmployeeService";
import departmentService from "../../services/DepartmentService";
import { pagings } from "../../data/paging";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetails,
  },
  data() {
    return {
      isLoadingData: false,
      employeeCodeRef: null,
      departments: [],
      idTimeOut: null,
      formSubmit: null,
      inputErrorListRef: null,
      textSearch: "",
      offset: 0,
      limit: 15,
      page: 1,
      pagings,
      isPopupOverlayShow: false,
      textMessage: "",
      textDialog: [],
      isDone: false,
      isShowEmployeeDetails: false,
      optionIndex: null,
      isOptionShow: false,
      dialogType: null,
      isShowDialog: false,
      isShowOverlay: false,
      employeeId: null,
      employees: [],
      employeeDataProps: null,
      isPagingShow: false,
      totalRecord: null,
      originRecord: 15,
      employeeCodeInit: null,
    };
  },
  methods: {
    getFormSubmit(formSubmit) {
      this.formSubmit = formSubmit;
    },

    setEmployeeCodeRef(employeeCodeRef) {
      this.employeeCodeRef = employeeCodeRef;
    },
    /**
     * Mô tả: Xử lý thêm hoặc sửa nhân viên
     * created by : ndthinh
     * created date: 01-07-2023
     */
    handleSubmitForm() {
      this.textDialog = [];
      this.formSubmit();
    },

    /**
     * Mô tả: Xử lý lấy dữ liệu trang trước
     * created by : ndthinh
     * created date: 07-06-2023
     */
    async handleBackPage() {
      try {
        this.handleShowLoadingIcon();
        if (this.page > 1) {
          this.offset = this.offset - this.limit;
          this.getEmployeeList();
          this.page -= 1;
        }
        this.handleHiddenLoadingIcon();
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
     * created by : ndthinh
     * created date: 07-06-2023
     */
    async handleNextPage() {
      try {
        this.handleShowLoadingIcon();
        if (this.page < Math.ceil(this.totalRecord / this.limit)) {
          this.offset = this.page * this.limit;
          this.page += 1;
          this.getEmployeeList();
        }
        this.handleHiddenLoadingIcon();
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

    handleShowCloseFormQuestion(message) {
      this.dialogType = this.$_MISAEnum.DialogType.question;
      this.textDialog.push(message);
      this.isShowDialog = true;
      this.handleShowOverlay();
      this.isPopupOverlayShow = true;
    },

    /**
     * Mô tả: Hiển thị lỗi input trên dialog
     * created by : NDTHINH
     * created date: 30-06-2023
     */
    handleShowDialogErrorInput(errorList, inputErrorListRef, typeError) {
      this.dialogType = typeError;
      this.isShowDialog = true;
      (this.inputErrorListRef = inputErrorListRef),
        errorList.forEach((item) => {
          this.textDialog.push(item);
        });
      this.isPopupOverlayShow = true;
    },

    /**
     * Mô tả: Xử lý hiện icon loading khi lấy dữ liệu
     * created by : ndthinh
     * created date: 17-06-2023
     */

    handleShowLoadingIcon() {
      this.isLoadingData = true;
    },

    /**
     * Mô tả: Xử lý ẩn icon loading khi lấy dữ liệu
     * created by : ndthinh
     * created date: 17-06-2023
     */
    handleHiddenLoadingIcon() {
      this.isLoadingData = false;
    },

    /**
     * Mô tả: Thay đổi số lượng dòng hiển thị
     * created by : ndthinh
     * created date: 07-06-2023
     */
    handleChangeRowPage(value) {
      this.originRecord = value;
      this.limit = value;
      this.getEmployeeList();
      if (parseInt(value) > this.totalRecord) {
        this.page = Math.ceil(this.totalRecord / this.limit);
        this.offset = (this.page - 1) * this.limit;
      } else {
        this.page = Math.ceil(parseInt(value) / this.limit);
        this.offset = (this.page - 1) * this.limit;
      }
    },

    /**
     * Mô tả: Hiển thị danh sách hiển thị số lượng dòng
     * created by : ndthinh
     * created date: 07-06-2023
     */
    handleShowPageList() {
      this.isPagingShow = !this.isPagingShow;
    },

    /**
     * Mô tả: Xử lý reset dữ liệu nhân viên trong props
     * created by : ndthinh
     * created date: 01-06-2023
     */
    handleResetEmployeeProps() {
      this.employeeDataProps = null;
    },
    /**
     * Mô tả: Xử lý đóng dialog
     * created by : ndthinh
     * created date: 30-06-2023
     */
    handleCloseDialog() {
      this.isShowDialog = false;
      if (this.dialogType === this.$_MISAEnum.DialogType.delete) {
        this.isShowOverlay = false;
      }
      if (this.inputErrorListRef?.length > 0) {
        this.inputErrorListRef[0].focus();
      } else {
        this.employeeCodeRef?.focus();
      }
      this.isPopupOverlayShow = false;
      this.employeeId = null;
      this.dialogType = null;
      this.textDialog = [];
      this.inputErrorListRef = [];
      this.dialogType = null;
    },

    /**
     * Mô tả: Xử lý thay đổi số dòng hiển thị trên table
     * created by : ndthinh
     * created date: 31-05-2023
     */
    async handleChangeNumberRow(num) {
      this.rowNumber = num;
      try {
        const data = await employeeService.findByFilter(0, parseInt(num));
        this.employees = data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Hiển lựa chọn số dòng hiển thị
     * created by : ndthinh
     * created date: 31-05-2023
     */
    handleShowPaging() {
      this.isPagingShow = !this.isPagingShow;
    },
    /**
     * Mô tả: Custom ngày tháng năm
     * created by : ndthinh
     * created date: 29-05-2023
     */
    customDateV1,

    /**
     * Mô tả:Hiển thị text message khi thực hiện xong công việc
     * created by : ndthinh
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
     * Mô tả: Hiển thị overlay
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleShowOverlay() {
      this.isShowOverlay = true;
    },

    /**
     * Mô tả: Tắt overlay
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleCloseOverlay() {
      this.isShowOverlay = false;
    },
    /**
     * Mô tả: Hiển hị form tạo nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleShowEmployeeForm() {
      this.isShowEmployeeDetails = true;
      this.handleShowOverlay();
    },

    /**
     * Mô tả: Đóng form tạo nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */

    handleCloseEmployeeForm() {
      this.isShowEmployeeDetails = false;
      this.handleResetEmployeeProps();
      this.handleCloseOverlay();
      this.isShowDialog = false;
      this.isPopupOverlayShow = false;
      this.textDialog = [];
    },

    /**
     * Mô tả: Xử lý hiển thị thao tác
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleShowOptions(key) {
      this.optionIndex = key;
      this.isOptionShow = !this.isOptionShow;
    },

    /**
     * Mô tả: Lấy danh sách phòng ban
     * created by : NDTHINH
     * created date: 26-06-2023
     */
    async getDepartment() {
      try {
        const { Data } = await departmentService.findAll(
          this.offset,
          this.limit,
          this.inputValue
        );
        this.departments = Data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Xử lý hiển thị câu hỏi xóa
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleShowDialogDelete(employee) {
      this.isShowDialog = true;
      this.dialogType = this.$_MISAEnum.DialogType.delete;
      this.handleShowOverlay();
      this.isOptionShow = true;
      this.employeeId = employee?.EmployeeId;
      this.textDialog.push(
        this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteQuestion(
          employee?.EmployeeCode
        )
      );
    },

    /**
     * Mô tả: Lấy thông tin một nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */

    getSingleValueEmployee(employee) {
      employee.DateOfBirth =
        employee?.DateOfBirth && customDateV2(employee.DateOfBirth);
      employee.DateRange =
        employee?.DateRange && customDateV2(employee.DateRange);
      this.employeeDataProps = employee;
      this.isShowEmployeeDetails = true;
      this.handleShowOverlay();
    },

    /**
     * Mô tả: Xử lý thêm, sửa, xóa nhân viên trên table
     * created by : ndthinh
     * created date: 29-05-2023
     */

    handleUpdateEmployeeOnTable(employee, type, typeBtn) {
      try {
        //thêm
        if (type === this.$_MISAEnum.ApiType.created) {
          if (
            typeBtn ===
            this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd
          ) {
            this.getEmployeeCodeInit();
          } else {
            this.handleCloseEmployeeForm();
          }
          this.employees.unshift(employee);
          this.totalRecord += 1;

          this.employeeDataProps = null;
          return;
        }

        //cập nhật
        if (type === this.$_MISAEnum.ApiType.updated) {
          if (
            typeBtn ===
            this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd
          ) {
            this.getEmployeeCodeInit();
          } else {
            this.handleCloseEmployeeForm();
          }

          if (employee !== null) {
            this.employees = this.employees.map((item) => {
              if (item.EmployeeId === employee?.EmployeeId) {
                return employee;
              }
              return item;
            });
          }

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
      } catch (error) {
        console.log(error);
      }
    },

    handleReloadTable() {
      this.offset = 0;
      this.limit = 15;
      this.page = 1;
      this.originRecord = this.limit;
      this.getEmployeeList();
    },

    /**
     * Mô tả: Call API xóa nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */
    async handleDeleteEmployee() {
      try {
        this.handleShowLoadingIcon();
        const status = await employeeService.deleteById(this.employeeId);
        if (status === 200) {
          this.isShowDialog = false;
          this.handleCloseOverlay();
          this.isOptionShow = false;
          this.handleUpdateEmployeeOnTable();
          this.textDialog = [];
          this.totalRecord -= 1;
          this.dialogType = null;
        }
        this.handleHiddenLoadingIcon();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Lấy danh sách nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */
    async getEmployeeList(textFilter) {
      try {
        this.handleShowLoadingIcon();
        this.isLoadingData = true;
        const { Data, TotalRecord } = await employeeService.findByFilter(
          this.offset,
          this.limit,
          textFilter
        );
        this.employees = Data;
        this.totalRecord = TotalRecord;
        this.isLoadingData = false;
        this.handleHiddenLoadingIcon();
      } catch (error) {
        this.isLoadingData = false;
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
     * Mô tả: Hàm khởi tạo mã nhân viên
     * created by : ndthinh
     * created date: 23-06-2023
     */
    async getEmployeeCodeInit() {
      try {
        const data = await employeeService.getMaxEmployeeCode();
        this.employeeCodeInit = data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getEmployeeList();
    this.getEmployeeCodeInit();
    this.getDepartment();
  },

  watch: {
    textSearch(newValue) {
      if (this.idTimeOut !== null) {
        clearTimeout(this.idTimeOut);
      }
      const id = setTimeout(() => {
        this.getEmployeeList(newValue);
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

.loader {
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  z-index: 99999;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
