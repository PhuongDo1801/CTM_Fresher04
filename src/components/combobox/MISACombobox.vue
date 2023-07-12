<template>
  <div class="combobox-container" @keydown="handleKeyDown">
    <m-input
      @keydown="handleKeyDownEnter"
      ref="departmentNameRef"
      :value="this.departmentName"
      type="text"
      @handle-text-change="handleInputDepartmentNameChange"
      :class="{
        isErrInput: isErrDepartmentName,
      }"
      :title="
        isErrDepartmentName === true
          ? this.$_MISAResource[this.$_LANGCODE].employeeMsg
              .employeeDepartmentNameTitleErr
          : null
      "
    ></m-input>

    <div @click="handleShowChooseDepartmentName" class="dropdown-icon-wraper">
      <i
        class="sprite-dropdown-black-icon"
        :class="{
          isRotate: isRotate,
        }"
      ></i>
    </div>
    <ul v-if="isChooseDepartmentNameValue" class="employee-unitname-list">
      <li
        :class="{
          isActive: index === indexItem,
        }"
        @click="handleChooseValueDepartmentName(item)"
        v-for="(item, index) in departmentNameList"
        :key="item.DepartmentId"
      >
        {{ item.DepartmentName }}
      </li>

      <li v-if="departmentNameList.length === 0">
        <span class="department-not-found" >{{ this.$_MISAResource[this.$_LANGCODE].departmentMsg.notFound }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { removeDiacritics } from "../../utils/string";
export default {
  name: "MISACombobox",
  props: {
    departmentId: String,
    isErrDepartmentName: Boolean,
    departmentName: String,
    departments:Array
  },
  data() {
    return {
      departmentNameList: [],
      departmentNameListTemp: [],
      isChooseDepartmentNameValue: false,
      isRotate: false,
      indexItem: -1,
      inputValue: "",
      tempValue: "",
      offset: 0,
      limit: 15,
    };
  },

  methods: {
    /**
     * Mô tả: Xử lý chọn giá trị combobox
     * created by : ndthinh
     * created date: 07-06-2023
     */
    handleChooseValueDepartmentName(item) {
      this.$emit("handleChooseDepartmentName", item);
      this.isChooseDepartmentNameValue = false;
      this.$refs.departmentNameRef.focus();
      this.isRotate = false;
    },

    /**
     * Mô tả: xử lý hiển thị danh sách combobox
     * created by : ndthinh
     * created date: 07-06-2023
     */

    handleShowChooseDepartmentName() {
      this.isChooseDepartmentNameValue = !this.isChooseDepartmentNameValue;
      this.$refs.departmentNameRef.focus();
      this.isRotate = !this.isRotate;
    },

    /**
     * Mô tả: Xử lý giá trị input thay đổi
     * created by : ndthinh
     * created date: 07-06-2023
     */

    handleInputDepartmentNameChange(value) {
      this.inputValue = value;
      if (value.trim().length === 0) {
        this.$emit("inputDepartmentNameChange",true, "");
        this.isChooseDepartmentNameValue = true;
        this.departmentNameList = [...this.departmentNameListTemp];
      } else {
        this.isChooseDepartmentNameValue = true;
        this.departmentNameList = this.departmentNameListTemp.filter((item) => {
          return removeDiacritics(item?.DepartmentName)
            .toLowerCase()
            .includes(removeDiacritics(value).toLowerCase());
        });
        this.$emit("inputDepartmentNameChange", false, value, null);
      }
    },
    /**
     * Mô tả: Xử lý keydown trên combobox
     * created by : ndthinh
     * created date: 07-06-2023
     */
    handleKeyDown(e) {
      if (e.keyCode === 40) {
        if (
          this.departmentNameList.length > 0 &&
          this.indexItem < this.departmentNameList.length - 1
        ) {
          this.isChooseDepartmentNameValue = true;
          this.isRotate = true;
          this.indexItem += 1;
          this.$emit(
            "handleChooseDepartmentName",
            this.departmentNameList[this.indexItem]
          );

          this.isChooseDepartmentNameValue = true;
        } else {
          this.indexItem = -1;
          this.$emit("handleChooseDepartmentName", {
            DepartmentId: "",
            DepartmentName: this.inputValue,
          });
        }
      }

      if (e.keyCode === 38) {
        if (this.departmentNameList.length > 0 && this.indexItem === -1) {
          this.isChooseDepartmentNameValue = true;
          this.isRotate = true;
          this.indexItem = this.departmentNameList.length - 1;
          this.$emit(
            "handleChooseDepartmentName",
            this.departmentNameList[this.indexItem]
          );

          this.isChooseDepartmentNameValue = true;
        } else if (this.indexItem > 0) {
          this.indexItem -= 1;
          this.$emit(
            "handleChooseDepartmentName",
            this.departmentNameList[this.indexItem]
          );
          this.isChooseDepartmentNameValue = true;
        } else {
          this.indexItem = -1;
          this.$emit("handleChooseDepartmentName", {
            DepartmentId: "",
            DepartmentName: this.inputValue,
          });
        }
      }
    },

    /**
    * Mô tả: Xử lý keydown enter
    * created by: ndthinh
    * created date: 20-06-2023
    */
    handleKeyDownEnter(e) {
      if (e.keyCode === 13) {
        this.isChooseDepartmentNameValue = false;
        this.isRotate = false;
      }
    },
  },


  mounted() {
    this.$emit("getDepartmentNameInput", this.$refs.departmentNameRef);
    this.departmentNameList = this.departments; 
    this.departmentNameListTemp = this.departments; 
  },
};
</script>

<style scoped>
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
.isActive {
  background-color: #e0e0e083;
  color: #50b83c;
}
</style>
