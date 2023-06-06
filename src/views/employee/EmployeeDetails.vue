<template>
  <div id="container-popup-employee" class="container__right-popup">
    <div v-if="isPopupOverlayShow" class="popup-overlay"></div>

    <div class="container__right-popup-top">
      <div>
        <span>{{
          FormMode === this.$_MISAEnum.FormMode.Add
            ? this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeTitleFormCreate
            : this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeTitleFormUpdate
        }}</span>
        <div>
          <input
            ref="isCustomerRef"
            v-model="employeeData.isCustomer"
            type="checkbox"
            id="input-is-customer"
          />
          <label for="input-is-customer">{{
            this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIsCustomer
          }}</label>
        </div>
        <div>
          <input
            v-model="employeeData.isProvider"
            type="checkbox"
            id="input-is-provider"
          />
          <label for="input-is-provider">{{
            this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeIsProvider
          }}</label>
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
              >{{
                this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeCode
              }}<span style="color: red"> *</span></label
            >
            <m-input
              ref="employeeCode"
              v-model="employeeData.code"
              type="text"
              @handle-text-change="handleInputEmployeeCodeChange"
              :class="{
                isErrInput: isErrInputEmplCode,
              }"
              id="input-employee-code"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-name"
              >{{
                this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeName
              }}
              <span style="color: red"> *</span></label
            >

            <m-input
              ref="employeeNameRef"
              v-model="employeeData.name"
              type="text"
              id="input-employee-name"
              @handle-text-change="handleInputEmployeeNameChange"
              :class="{
                isErrInput: isErrInputEmplName,
              }"
            ></m-input>
          </div>

          <div>
            <label for="input-employee-unitName"
              >{{
                this.$_MISAResource[this.$_LANGCODE].employeeForm
                  .employeeUnitName
              }}<span style="color: red"> *</span></label
            >
            <m-combobox
              @handle-choose-unit-name="handleChooseUnitName"
              @input-unit-name-change="handleInputUnitNameChange"
              @get-unit-name-input="handleSetUnitNameInputRef"
              textKey="DepartmentName"
              url="http://localhost:3000/department"
              :unitName="employeeData.unitName"
            ></m-combobox>
          </div>

          <div>
            <label for="input-employee-position">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeePositionName
            }}</label>

            <m-input
              v-model="employeeData.positionName"
              type="text"
              id="input-employee-position"
            ></m-input>
          </div>
        </div>
        <div class="container__right-popup-body-top-right">
          <div>
            <label for="input-employee-dob">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeDob
            }}</label>
            <input
              v-model="employeeData.dateOfBirth"
              type="date"
              id="input-employee-dob"
            />
          </div>
          <div>
            <label for="input-employee-gender-male">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeGender
            }}</label>
            <div>
              <input
                v-model="employeeData.gender"
                value="Nam"
                name="gender"
                type="radio"
                id="input-employee-gender-male"
              />

              <label for="input-employee-gender-male">{{
                this.$_MISAResource[this.$_LANGCODE].employeeGender.male
              }}</label>

              <input
                v-model="employeeData.gender"
                value="Nữ"
                name="gender"
                type="radio"
                id="input-employee-gender-female"
              />
              <label for="input-employee-gender-female">{{
                this.$_MISAResource[this.$_LANGCODE].employeeGender.female
              }}</label>

              <input
                v-model="employeeData.gender"
                value="Khác"
                name="gender"
                type="radio"
                id="input-employee-gender-other"
              />
              <label for="input-employee-gender-other">{{
                this.$_MISAResource[this.$_LANGCODE].employeeGender.other
              }}</label>
            </div>
          </div>
          <div>
            <label for="input-employee-identity-number">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeIdentityNum
            }}</label>

            <m-input
              v-model="employeeData.identityNumber"
              type="text"
              id="input-employee-identity-number"
              title="Số chứng minh thư"
            ></m-input>
          </div>

          <div>
            <label for="input-employee-date-release-identity">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeIdentityDateRelease
            }}</label>
            <input
              v-model="employeeData.identityDateRelease"
              placeholder="Ngày cấp"
              type="date"
              id="input-employee-date-release-identity"
            />
          </div>
          <div>
            <label for="input-employee-place-release-identity">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeIdentityPlaceRelease
            }}</label>

            <m-input
              v-model="employeeData.identityPlaceRelease"
              type="text"
              id="input-employee-place-release-identity"
            ></m-input>
          </div>
        </div>
      </div>
      <div class="container__right-popup-body-bottom">
        <div>
          <label for="input-employee-address">{{
            this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeAddress
          }}</label>

          <m-input
            v-model="employeeData.address"
            type="text"
            id="input-employee-address"
          ></m-input>
        </div>

        <div>
          <div>
            <label for="input-employee-phone">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm.employeePhone
            }}</label>

            <m-input
              v-model="employeeData.phone"
              type="text"
              id="input-employee-phone"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-phone-n">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeePhonePermanent
            }}</label>

            <m-input
              v-model="employeeData.phonePermanent"
              type="text"
              id="input-employee-phone-n"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-email">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeEmail
            }}</label>

            <m-input
              v-model="employeeData.email"
              type="text"
              id="input-employee-email"
            ></m-input>
          </div>
        </div>

        <div>
          <div>
            <label for="input-employee-bank-account">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeBankAccount
            }}</label>

            <m-input
              v-model="employeeData.bankAccount"
              type="text"
              id="input-employee-bank-account"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-bank-name">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm.employeeBankName
            }}</label>

            <m-input
              v-model="employeeData.bankName"
              type="text"
              id="input-employee-bank-name"
            ></m-input>
          </div>
          <div>
            <label for="input-employee-bank-branch">{{
              this.$_MISAResource[this.$_LANGCODE].employeeForm
                .employeeBankBranch
            }}</label>

            <m-input
              v-model="employeeData.branch"
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
            <button>
              {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.keep }}
            </button>
            <button
              @keydown.tab.prevent="processTabIndex()"
              @click="handleSubmitForm"
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
import EmployeeService from "../../services/EmployeeService";
export default {
  name: "EmployeeDetails",
  components: {},
  props: {
    handleCloseEmployeeForm: Function,
    getListEmployee: Function,
    employees: Array,
    handleShowOverlay: Function,
    handleDuplicateEplCode: Function,
    handleInputTextEmpty: Function,
    workIsDone: Function,
    isPopupOverlayShow: Boolean,
    employeeDataProps: Object,
  },

  data() {
    return {
      emplCode: null,
      isErrInputEmplCode: false,
      isErrInputEmplName: false,
      isErrInputUnitName: false,
      isDuplicateCode: false,
      unitNameRef: null,
      employeeData: {
        isCustomer: false,
        isProvider: false,
        gender: null,
        code: "",
        name: "",
        identityNumber: "",
        positionName: "",
        bankAccount: "",
        bankName: "",
        branch: "",
        email: "",
        phone: "",
        phonePermanent: "",
        address: "",
        identityPlaceRelease: "",
        unitName: "",
        identityDateRelease: null,
        dateOfBirth: null,
      },
    };
  },
  methods: {
    handleChooseUnitName(unitName) {
      this.employeeData.unitName = unitName;
    },

    handleShowChooseUnitName() {
      this.isChooseUnitNameValue = !this.isChooseUnitNameValue;
      this.$refs.unitNameRef.$el.focus();
      this.isRotate = !this.isRotate;
    },

    processTabIndex() {
      this.$refs.isCustomerRef.focus();
      //this.$refs.employeeCode.$el.focus();
    },

    handleInputUnitNameChange(value) {
      this.isErrInputUnitName = value;
    },

    handleSetUnitNameInputRef(unitNameRef) {
      this.unitNameRef = unitNameRef;
    },
    /**
     * Mô tả: Xử lý input mã nhân viên thay đổi text
     * created by : NDTHINH
     * created date: 29-06-2023
     */
    handleInputEmployeeCodeChange() {
      if (this.employeeData.code.length === 0) {
        this.isErrInputEmplcode = true;
        this.$refs.employeeCode.$el.classList.add("isErrInput");
      } else {
        this.isErrInputEmplCode = false;
        this.$refs.employeeCode.$el.classList.remove("isErrInput");
      }
    },

    /**
     * Mô tả:Xử lý input tên nhân viên thay đổi text
     * created by : NDTHINH
     * created date: 02-06-2023
     */
    handleInputEmployeeNameChange() {
      if (this.employeeData.name.length === 0) {
        this.isErrInputEmplName = true;
      } else {
        this.isErrInputEmplName = false;
      }
    },

    /**
     * Mô tả: Xử lý đóng form chi tiết nhân viên và reset input
     * created by : NDTHINH
     * created date: 29-05-2023
     */
    handleCloseFormAndReset() {
      this.handleCloseEmployeeForm();
      this.$refs.employeeCode.$el.classList.remove("employee-create-input");
      this.$refs.employeeCode.$el.focus();
      this.employeeData.code = "";
      this.$emit("resetEmployeeState");
    },

    /**
     * Mô tả: xử lý tạo mới nhân viên và cập nhật thông tin nhân viên
     * created by : NDTHINH
     * created date: 30-05-2023
     */
    async handleSubmitForm() {
      try {
        // xử lý mã nhân viên để trống
        if (this.employeeData?.code.trim().length === 0) {
          this.isErrInputEmplCode = true;
          this.$refs.employeeCode.$el.title =
            this.$_MISAResource[
              this.$_LANGCODE
            ].employeeMsg.employeeCodeTitleErr;

          //
          this.handleInputTextEmpty(
            this.$_MISAResource[this.$_LANGCODE].employeeMsg
              .employeeCodeEmptyErr,
            "emplCodeErr"
          );
          this.$emit("handleFocusEmployeeCode", this.$refs.employeeCode.$el);
        }
        // xử lý tên nhân viên để trống
        if (this.employeeData.name.trim().length === 0) {
          this.isErrInputEmplName = true;
          this.$refs.employeeNameRef.$el.title =
            this.$_MISAResource[
              this.$_LANGCODE
            ].employeeMsg.employeeNameTitleErr;

          //
          this.handleInputTextEmpty(
            this.$_MISAResource[this.$_LANGCODE].employeeMsg
              .employeeNameEmptyErr,
            "emplNameErr"
          );
          this.$emit("handleFocusEmployeeName", this.$refs.employeeNameRef.$el);
        }

        // xử lý tên đơn vị để trống
        if (this.employeeData.unitName.trim().length === 0) {
          this.isErrInputUnitName = true;
          this.unitNameRef.$el.classList.add("isErrInput");
          this.unitNameRef.$el.title =
            this.$_MISAResource[
              this.$_LANGCODE
            ].employeeMsg.employeeUnitNameTitleErr;
          //
          this.handleInputTextEmpty(
            this.$_MISAResource[this.$_LANGCODE].employeeMsg
              .employeeUnitNameErr,
            "emplUnitNameErr"
          );
          this.$emit("handleFocusUnitName", this.unitNameRef.$el);
        }
        if (
          this.employeeData?.code.trim().length === 0 ||
          this.employeeData?.name.trim().length === 0 ||
          this.employeeData?.unitName.trim().length === 0
        ) {
          return;
        }

        // thêm nhân viên
        if (this.FormMode === this.$_MISAEnum.FormMode.Add) {
          // xử lý mã nhân viên đã tồn tại
          const employeeExist = this.employees.find((item) =>
            item.code.includes(this.employeeData.code)
          );
          if (employeeExist) {
            this.handleDuplicateEplCode(employeeExist.code);
            this.handleShowOverlay();
            return;
          }

          // call API thêm nhân viên
          const { status, data } = await EmployeeService.save(
            this.employeeData
          );
          if (status === this.$_MISAEnum.ResponseCode.created) {
            this.$emit("updateTableEmployee", data, "created");
            this.workIsDone(
              this.$_MISAResource[this.$_LANGCODE].employeeMsg.addSuccess,
              true
            );
          }
        } else {
          // call API cập nhật thông tin nhân viên
          const { status, data } = await EmployeeService.updateById(
            this.employeeData.id,
            this.employeeData
          );
          if (status === this.$_MISAEnum.ResponseCode.success) {
            this.$emit("updateTableEmployee", data, "updated");
            this.workIsDone(
              this.$_MISAResource[this.$_LANGCODE].employeeMsg.updateSuccess,
              true
            );
          }
        }
        this.handleCloseEmployeeForm();
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
  },
  mounted() {
    this.$refs.employeeCode.$el.focus();
    if (this.employeeDataProps !== null) {
      const jsonObject = JSON.stringify(this.employeeDataProps);
      this.employeeData = JSON.parse(jsonObject);
    }
  },

  computed: {
    FormMode: function () {
      if (this.employeeDataProps === null) {
        return this.$_MISAEnum.FormMode.Add;
      } else {
        return this.$_MISAEnum.FormMode.Update;
      }
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
  border: 1px solid red !important;
}
.isNotErrInput {
  border: 1px solid #2ca01c;
}

.isRotate {
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
</style>
