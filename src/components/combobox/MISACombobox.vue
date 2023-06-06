<template>
  <div class="combobox-container" @keydown="handleKeyDown">
    <m-input
      @keydown="handleKeyDownEnter"
      ref="unitNameRef"
      :value="this.unitName"
      type="text"
      @handle-text-change="handleInputUnitNameChange"
      :class="{
        isErrInput: isErrInputUnitName,
      }"
    ></m-input>

    <div @click="handleShowChooseUnitName" class="dropdown-icon-wraper">
      <i
        class="sprite-dropdown-black-icon"
        :class="{
          isRotate: isRotate,
        }"
      ></i>
    </div>
    <ul v-if="isChooseUnitNameValue" class="employee-unitname-list">
      <li
        :class="{
          isActive: index === indexItem,
        }"
        @click="handleChangeValueUnitName(unitName[this.textKey])"
        v-for="(unitName, index) in unitNameList"
        :key="unitName.id"
      >
        {{ unitName[this.textKey] }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MISACombobox",
  props: {
    unitName: String,
    url: String,
    textKey: String,
    isErrInputUnitName: Boolean,
  },
  data() {
    return {
      unitNameList: [],
      unitNameListTemp: [],
      isChooseUnitNameValue: false,
      isRotate: false,
      valueSearch: "",
      indexItem: -1,
      inputValue: "",
    };
  },

  methods: {
    async getDepartment() {
      try {
        const { data } = await axios.get(this.url);
        this.unitNameList = data;
        this.unitNameListTemp = data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Xử lý chọn giá trị combobox
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    handleChangeValueUnitName(value) {
      this.$emit("handleChooseUnitName", value);
      this.isChooseUnitNameValue = false;
      this.$refs.unitNameRef.$el.classList.remove("isErrInput");
      this.$refs.unitNameRef.$el.focus();
      this.isRotate = false;
    },

    /**
     * Mô tả: xử lý hiển thị danh sách combobox
     * created by : NDTHINH
     * created date: 07-06-2023
     */

    handleShowChooseUnitName() {
      this.isChooseUnitNameValue = !this.isChooseUnitNameValue;
      this.$refs.unitNameRef.$el.focus();
      this.isRotate = !this.isRotate;
    },

    /**
     * Mô tả: Xử lý giá trị input thay đổi
     * created by : NDTHINH
     * created date: 07-06-2023
     */

    handleInputUnitNameChange(value) {
      this.inputValue = value;
      if (value.trim().length === 0) {
        this.$emit("inputUnitNameChange", false);
        this.$refs.unitNameRef.$el.classList.add("isErrInput");
        this.isChooseUnitNameValue = true;
        this.unitNameList = [...this.unitNameListTemp];
      } else {
        this.unitNameList = this.unitNameListTemp.filter((item) => {
          return item[this.textKey].toLowerCase().includes(value.toLowerCase());
        });
        this.isChooseUnitNameValue = true;
        this.$emit("inputUnitNameChange", true);
        this.$refs.unitNameRef.$el.classList.remove("isErrInput");
      }
    },
    /**
     * Mô tả: Xử lý keydown trên combobox
     * created by : NDTHINH
     * created date: 07-06-2023
     */
    handleKeyDown(e) {
      if (e.keyCode === 40) {
        if (
          this.unitNameList.length > 0 &&
          this.indexItem < this.unitNameList.length - 1
        ) {
          this.isChooseUnitNameValue = true;
          this.isRotate = true;
          this.indexItem += 1;
          this.$emit(
            "handleChooseUnitName",
            this.unitNameList[this.indexItem][this.textKey]
          );
        } else {
          this.indexItem = -1;
          this.$emit("handleChooseUnitName", this.inputValue);
        }
      }

      if (e.keyCode === 38) {
        if (this.unitNameList.length > 0 && this.indexItem === -1) {
          this.isChooseUnitNameValue = true;
          this.isRotate = true;
          this.indexItem = this.unitNameList.length - 1;
          this.$emit(
            "handleChooseUnitName",
            this.unitNameList[this.indexItem][this.textKey]
          );
        } else if (this.indexItem > 0) {
          this.indexItem -= 1;
          this.$emit(
            "handleChooseUnitName",
            this.unitNameList[this.indexItem][this.textKey]
          );
        } else {
          this.indexItem = -1;
          this.$emit("handleChooseUnitName", this.inputValue);
        }
      }
    },

    handleKeyDownEnter(e) {
      if (e.keyCode === 13) {
        this.isChooseUnitNameValue = false;
        this.isRotate = false;
      }
    },
  },

  mounted() {
    this.getDepartment();
    this.$emit("getUnitNameInput", this.$refs.unitNameRef);
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
