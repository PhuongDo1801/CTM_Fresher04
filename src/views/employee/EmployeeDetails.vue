<template>
  <div
    id="container-popup-employee"
    class="container__right-popup"
    @keydown="handleKeyDown"
  >
    <div v-if="isPopupOverlayShow" class="popup-overlay"></div>

    <div class="container__right-popup-top">
      <div>
        <span>
          {{ FormMode === this.$_MISAEnum.FormMode.Add || FormMode === this.$_MISAEnum.FormMode.Replicate ? this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeTitleFormCreate
          : this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeTitleFormUpdate }}
        </span>
        <div>
          <input
            v-model="employeeData.IsCustomer"
            type="checkbox"
            id="input-is-customer"
            ref="isCustomerRef"
          />
          <label for="input-is-customer">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIsCustomer}}</label>
        </div>
        <div>
          <input
            v-model="employeeData.IsProvider"
            type="checkbox"
            id="input-is-provider"
          />
          <label for="input-is-provider">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIsProvider}}</label>
        </div>
      </div>
      <div class="container__right-icon-wraper">
        <i tabindex="0" class="sprite-info-icon"></i>
        <i
          tabindex="0"
          @click="handleCloseFormAndReset"
          class="sprite-close-icon"
        ></i>
      </div>
    </div>

    <div class="container__right-popup-body">
      <div class="container__right-popup-body-top">
        <div class="container__right-popup-body-top-left">
          <div>
            <label for="input-employee-code"
              >{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeCode}}<span style="color: red"> *</span></label
            >
            <m-input
              ref="employeeCodeRef"
              v-model="employeeData.EmployeeCode"
              type="text"
              @handle-text-change="handleInputEmployeeCodeChange"
              :class="{isErrInput: isErrInputEmplCode}"
              :title="isErrInputEmplCode === true? this.$_MISAResource[this.$_LANGCODE].employeeMsg.employeeCodeTitleErr: null"
              id="input-employee-code"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-name">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeName}}<span style="color: red"> *</span></label>
            <m-input
              ref="employeeNameRef"
              v-model="employeeData.FullName"
              type="text"
              id="input-employee-name"
              @handle-text-change="handleInputEmployeeNameChange"
              :class="{isErrInput: isErrInputEmplName}"
              :title="isErrInputEmplName === true? this.$_MISAResource[this.$_LANGCODE].employeeMsg.employeeNameTitleErr: null"
            ></m-input>
          </div>

          <div>
            <label for="input-employee-unitName">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeUnitName}}<span style="color: red"> *</span></label
            >
            <m-combobox
              @handle-choose-department-name="handleChooseDepartmentName"
              @input-department-name-change="handleInputDepartmentNameChange"
              @get-department-name-input="getDepartmentNameInputRef"
              :departmentName="employeeData.DepartmentName"
              :departmentId="employeeData.DepartmentId"
              :isErrDepartmentName="isErrDepartmentName"
              :departments="departments"
            ></m-combobox>
          </div>

          <div>
            <label for="input-employee-position">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeePositionName}}</label>
            <m-input
              v-model="employeeData.JobTitle"
              type="text"
              id="input-employee-position"
            ></m-input>
          </div>
        </div>
        <div class="container__right-popup-body-top-right">
          <div>
            <label for="input-employee-dob">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeDob }}</label>
            <input
              ref="dateOfBirthRef"
              v-model="employeeData.DateOfBirth"
              type="date"
              id="input-employee-dob"
              :class="{isErrInput: isErrInputDbo}"
            />
          </div>
          <div>
            <label for="input-employee-gender-male">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeGender}}</label>
            <div>
              <input
                v-model="employeeData.Gender"
                value="0"
                name="gender"
                type="radio"
                id="input-employee-gender-male"
              />

              <label for="input-employee-gender-male">{{this.$_MISAResource[this.$_LANGCODE].employeeGender.male}}</label>

              <input
                v-model="employeeData.Gender"
                value="1"
                name="gender"
                type="radio"
                id="input-employee-gender-female"
              />
              <label for="input-employee-gender-female">{{this.$_MISAResource[this.$_LANGCODE].employeeGender.female}}</label>

              <input
                v-model="employeeData.Gender"
                value="2"
                name="gender"
                type="radio"
                id="input-employee-gender-other"
              />
              <label for="input-employee-gender-other">{{this.$_MISAResource[this.$_LANGCODE].employeeGender.other}}</label>
            </div>
          </div>
          <div>
            <label for="input-employee-identity-number">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIdentityNum}}</label>

            <m-input
              v-model="employeeData.IdentityNumber"
              type="text"
              id="input-employee-identity-number"
              :title= "identityNumberTitle"
            ></m-input>
          </div>

          <div>
            <label for="input-employee-date-release-identity">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIdentityDateRelease}}</label>
            <input
              v-model="employeeData.DateRange"
              ref="dateRangeRef"
              placeholder="Ngày cấp"
              type="date"
              id="input-employee-date-release-identity"
              :class="{isErrInput: isErrInputDateRange}"
            />
          </div>
          <div>
            <label for="input-employee-place-release-identity">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIdentityPlaceRelease}}</label>

            <m-input
              v-model="employeeData.IssuedBy"
              type="text"
              id="input-employee-place-release-identity"
            ></m-input>
          </div>
        </div>
      </div>
      <div class="container__right-popup-body-bottom">
        <div>
          <label for="input-employee-address">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeAddress}}</label>
          <m-input
            v-model="employeeData.Address"
            type="text"
            id="input-employee-address"
          ></m-input>
        </div>

        <div>
          <div>
            <label for="input-employee-phone">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeePhone}}</label>
            <m-input
              v-model="employeeData.PhoneNumber"
              type="text"
              id="input-employee-phone"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-phone-n">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeePhonePermanent}}</label>
            <m-input
              v-model="employeeData.PhoneLandline"
              type="text"
              id="input-employee-phone-n"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-email">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeEmail}}</label>
            <m-input
              ref="emailRef"
              v-model="employeeData.Email"
              type="text"
              id="input-employee-email"
            ></m-input>
          </div>
        </div>

        <div>
          <div>
            <label for="input-employee-bank-account">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeBankAccount}}</label>
            <m-input
              v-model="employeeData.BankAccount"
              type="text"
              id="input-employee-bank-account"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-bank-name">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeBankName}}</label>
            <m-input
              v-model="employeeData.BankName"
              type="text"
              id="input-employee-bank-name"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-bank-branch">{{this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeBankBranch}}</label>
            <m-input
              v-model="employeeData.BankBranch"
              type="text"
              id="input-employee-bank-branch"
            ></m-input>
          </div>
        </div>
        <hr />

        <div class="container__popup-footer">
          <div>
            <button>
              {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancel }}
            </button>
          </div>
          <div>
            <button
              class="btn-keep-employee"
              @click="() =>handleSubmitForm(this.$_MISAResource[this.$_LANGCODE].textBtnForm.keep)"
            >
              {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.keep }}
            </button>
            <button
              @keydown.tab.prevent="handleTabIndex()"
              @click="() =>handleSubmitForm(this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd)"
              class="btn-add-employee"
            >
              {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { equalObject } from "@/utils/compareObject";
import employeeService from "../../services/EmployeeService";
//import validateEmail from "../../utils/validateEmail";
export default {
  name: "EmployeeDetails",
  components: {},
  props: {
    handleCloseEmployeeForm: Function,
    getListEmployee: Function,
    handleShowOverlay: Function,
    handleDuplicateEplCode: Function,
    handleInputTextEmpty: Function,
    workIsDone: Function,
    isPopupOverlayShow: Boolean,
    employeeDataProps: Object,
    handleFocusInputError: Function,
    getFormSubmit: Function,
    departments: Array,
    formDetailsType:Number
  },

  data() {
    return {
      emplCode: null,
      isErrInputEmplCode: false,
      isErrInputEmplName: false,
      isErrDepartmentName: false,
      isErrInputDbo:false,
      isErrInputDateRange:false,
      isDuplicateCode: false,
      formType:null,
      departmentNameRef: null,
      initialObject: null,
      inputErrorListRef: [],
      unitNameRef: null,
      identityNumberTitle:this.$_MISAResource[this.$_LANGCODE].employeeForm.identityNumberTitle,
      errorList: [],
      employeeData: {
        IsCustomer: false,
        IsProvider: false,
        Gender: 0,
        EmployeeCode: "",
        FullName: "",
        IdentityNumber: "",
        JobTitle: "",
        BankAccount: "",
        BankName: "",
        Bankbranch: "",
        Email: null,
        PhoneNumber: "",
        PhoneLandline: "",
        Address: "",
        IssuedBy: "",
        DepartmentName: "",
        DepartmentId: "",
        DateRange: null,
        DateOfBirth: null,
      },
    };
  },
  methods: {
    /**
     * Mô tả: Xử lý đóng form chi tiết nhân viên bằng esc
     * created by : ndthinh
     * created date: 08-06-2023
     */
    handleKeyDown(e) {
      if (e.keyCode === 27) {
        this.handleCloseFormAndReset();
      }
    },

    /**
     * Mô tả: Xử lý chọn giá trị combobox
     * created by : ndthinh
     * created date: 08-06-2023
     */
    handleChooseDepartmentName(item) {
      this.employeeData.DepartmentName = item.DepartmentName;
      this.employeeData.DepartmentId = item.DepartmentId;
      this.isErrDepartmentName = false;
    },

    /**
     * Mô tả: Xử lý tabindex
     * created by : ndthinh
     * created date: 08-06-2023
     */
    handleTabIndex() {
      this.$refs.isCustomerRef.focus();
    },
    /**
     * Mô tả: Xử lý thay đổi thay đổi trạng thái khi text unit name thay đổi
     * created by : ndthinh
     * created date: 08-06-2023
     */
    handleInputDepartmentNameChange(isError, value, department) {
      this.isErrDepartmentName = isError;
      if (department !== null) {
        this.employeeData.DepartmentName = value;
        this.employeeData.DepartmentId = department?.DepartmentId;
      } else {
        this.employeeData.DepartmentName = value;
        this.employeeData.DepartmentId = null;
      }
    },

    /**
     * Mô tả: Xử lý input mã nhân viên thay đổi text
     * created by : ndthinh
     * created date: 29-06-2023
     */
    handleInputEmployeeCodeChange() {
      if (this.employeeData.EmployeeCode.length === 0) {
        this.isErrInputEmplCode = true;
      } else {
        this.isErrInputEmplCode = false;
      }
    },

    /**
     * Mô tả:Xử lý input tên nhân viên thay đổi text
     * created by : ndthinh
     * created date: 02-06-2023
     */
    handleInputEmployeeNameChange() {
      if (this.employeeData.FullName.length === 0) {
        this.isErrInputEmplName = true;
      } else {
        this.isErrInputEmplName = false;
      }
    },

    /**
     * Mô tả: Xử lý đóng form chi tiết nhân viên và reset input
     * created by : ndthinh
     * created date: 29-05-2023
     */
    handleCloseFormAndReset() {
      if (this.FormMode === this.$_MISAEnum.FormMode.Update) {
        if (!equalObject(this.employeeDataProps, this.employeeData)) {
          this.$emit("showCloseFormQuestion",this.$_MISAResource[this.$_LANGCODE].employeeMsg.closeFormQuestion);
          this.getFormSubmit(this.handleSubmitForm);
          return;
        }
      }

      if (this.FormMode === this.$_MISAEnum.FormMode.Add || this.FormMode === this.$_MISAEnum.FormMode.Replicate) {
        this.$emit("showCloseFormQuestion",this.$_MISAResource[this.$_LANGCODE].employeeMsg.closeFormQuestion);
        this.getFormSubmit(this.handleSubmitForm);
        return;
      }
      this.handleCloseEmployeeForm();
      this.employeeData.EmployeeCode = "";
      this.$emit("resetEmployeeState");
    },

    /**
     * Mô tả:
     * created by : NDTHINH
     * created date: 30-06-2023
     */
    handleValidateInput() {
      try {
        // xử lý mã nhân viên để trống
        if (this.employeeData?.EmployeeCode.trim().length === 0) {
          this.isErrInputEmplCode = true;

          this.errorList.push(this.$_MISAResource[this.$_LANGCODE].employeeMsg.employeeCodeEmptyErr);
          this.inputErrorListRef.push(this.$refs.employeeCodeRef);
        }
        // xử lý tên nhân viên để trống
        if (this.employeeData.FullName.trim().length === 0) {

          this.isErrInputEmplName = true;
          this.errorList.push(this.$_MISAResource[this.$_LANGCODE].employeeMsg.employeeNameEmptyErr);
          this.inputErrorListRef.push(this.$refs.employeeNameRef);
        
        }
        // xử lý ngày tháng không hợp lệ
        const dateOfBirth = new Date(this.employeeData?.DateOfBirth);
        const dateRange = new Date(this.employeeData?.DateRange);

        if(dateOfBirth > new Date()){
          this.isErrInputDbo = true;
          this.errorList.push(this.$_MISAResource[this.$_LANGCODE].employeeMsg.dateOfBirthInValid);
          this.inputErrorListRef.push(this.$refs.dateOfBirthRef);     
        }

        if(dateRange > new Date()){
          this.isErrInputDateRange = true;
          this.errorList.push(this.$_MISAResource[this.$_LANGCODE].employeeMsg.dateRangeInValid);
          this.inputErrorListRef.push(this.$refs.dateRangeRef);     
        }

        // xử lý tên đơn vị để trống
        if (this.employeeData?.DepartmentName.trim().length === 0) {
          this.isErrDepartmentName = true;
          this.errorList.push(this.$_MISAResource[this.$_LANGCODE].employeeMsg.employeeUnitNameErr);
          this.inputErrorListRef.push(this.departmentNameRef);
        }

        if (this.errorList.length > 0) {
          this.$emit("getInputErrorText",this.errorList,this.inputErrorListRef,this.$_MISAEnum.DialogType.badRequest);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả:Lấy thẻ input phòng ban
     * created by: ndthinh
     * created date: 30-06-2023
     */
    getDepartmentNameInputRef(departmentNameRef) {
      this.departmentNameRef = departmentNameRef;
    },

     /**
    * Mô tả: Reset form và khởi tạo giá trị cho form
    * created by: ndthinh
    * created date:30-06-2023
    */
    handleResetFormAndInitEmployeeData() {
      this.formType = this.$_MISAEnum.FormMode.Add
      this.employeeData = Object.assign({}, this.initialObject);
      this.$refs.employeeCodeRef.focus();
      this.getEmployeeCodeInit(); 
    },

    /**
     * Mô tả: Hàm khởi tạo mã nhân viên
     * created by : ndthinh
     * created date: 23-06-2023
     */
    async getEmployeeCodeInit() {
      try {
        const data = await employeeService.getMaxEmployeeCode();
        this.employeeData.EmployeeCode = data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: xử lý tạo mới nhân viên và cập nhật thông tin nhân viên
     * created by: ndthinh
     * created date: 30-05-2023
     */
    async handleSubmitForm(typeBtn) {
      try {
        this.handleValidateInput();
        this.employeeData.Gender = parseInt(this.employeeData.Gender);

        if (this.errorList.length > 0) {
          this.errorList = [];
          this.inputErrorListRef = [];
          return;
        }
          // thêm nhân viên
        if (this.FormMode === this.$_MISAEnum.FormMode.Add || this.FormMode === this.$_MISAEnum.FormMode.Replicate ) {

          this.$emit("showLoadingIcon");

          // call API thêm nhân viên
          const { status, data } = await employeeService.save(this.employeeData);

          if (status === this.$_MISAEnum.ResponseCode.created) {

            if (typeBtn === this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
              this.handleResetFormAndInitEmployeeData();
            }
            this.$emit("updateTableEmployee",data,this.$_MISAEnum.ApiType.created,typeBtn);
            this.workIsDone(this.$_MISAResource[this.$_LANGCODE].employeeMsg.addSuccess,true);
          }
          this.$emit("hiddenLoadingIcon");
          return;
        } else {
          // call API cập nhật thông tin nhân viên

          const isEqualObject = equalObject(this.employeeDataProps,this.employeeData);

          if (isEqualObject && typeBtn === this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
            this.handleResetFormAndInitEmployeeData();
            this.$emit("updateTableEmployee",null,this.$_MISAEnum.ApiType.updated,typeBtn);
            return;
          }

          if (isEqualObject) {
            this.handleCloseFormAndReset();
            return;
          }

          this.$emit("showLoadingIcon");

          const { status, data } = await employeeService.updateById(this.employeeData.EmployeeId,this.employeeData);
          if (status === this.$_MISAEnum.ResponseCode.success) {
            if (typeBtn === this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
              this.handleResetFormAndInitEmployeeData();
            }
            this.$emit("updateTableEmployee",data,this.$_MISAEnum.ApiType.updated,typeBtn);
            this.workIsDone(this.$_MISAResource[this.$_LANGCODE].employeeMsg.updateSuccess,true);
          }
          this.$emit("hiddenLoadingIcon");
        }
      } catch (error) {
        this.$emit("hiddenLoadingIcon");
        switch (error?.response?.status) {
          case 500:
            this.workIsDone(
              this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,
              true
            );
            break;

          case 400:
            this.errorList.push(error.response.data.ErrorMsgs[0]);
            this.inputErrorListRef.push(this.$refs.employeeCodeRef);
            this.$emit(
              "getInputErrorText",
              this.errorList,
              this.inputErrorListRef,
              this.$_MISAEnum.DialogType.duplicate
            );
            this.handleShowOverlay();
            this.errorList = [];
            this.inputErrorListRef = [];
            this.isErrInputEmplCode = true;
            break;

          case 404:
            break;
          default:
            this.workIsDone(
              this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,
              true
            );
        }
      }
    },
  },

   /**
    * Mô tả: Call Api
    * created by: ndthinh
    * created date: 20-06-2023
    */
  mounted() {
    this.$refs.employeeCodeRef.focus();
    this.$emit("getEmployeeCodeInput", this.$refs.employeeCodeRef);
    this.initialObject = Object.assign({}, this.employeeData);
    this.formType = this.formDetailsType;
    if (this.employeeDataProps !== null) {
      const jsonObject = JSON.stringify(this.employeeDataProps);
      this.employeeData = JSON.parse(jsonObject);
    }
    if (this.FormMode === this.$_MISAEnum.FormMode.Add || this.FormMode === this.$_MISAEnum.FormMode.Replicate) {
      this.getEmployeeCodeInit();
    }
  },

   /**
    * Mô tả: Set Form Mode
    * created by: ndthinh
    * created date: 20-06-2023
    */
  computed: {
    FormMode: function () {
      if (this.employeeDataProps === null && this.formType === this.$_MISAEnum.FormMode.Add) {
        return this.$_MISAEnum.FormMode.Add;
      } 
      if(this.employeeDataProps !== null && this.formType === this.$_MISAEnum.FormMode.Update){
        return this.$_MISAEnum.FormMode.Update;
      }
      if(this.employeeDataProps !== null && this.formType === this.$_MISAEnum.FormMode.Replicate){
        return this.$_MISAEnum.FormMode.Replicate;
      }
      return null; 
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: absolute;
  background-color: rgba(128, 128, 128, 0.107);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
}

.isErrInput {
  border: 1px solid red !important ;
}
.isNotErrInput {
  border: 1px solid #2ca01c;
}

.isRotate {
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
</style>
