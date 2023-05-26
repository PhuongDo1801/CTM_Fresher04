<template>
  <m-data-table :header="header" :data="data"></m-data-table>
  <div class="table__bottom">
    <p class="table__bottom-left">Tổng số: <b> 122</b> bản ghi</p>
    <span class="table__bottom-right">
      <div class="combobox">
        <span class="wrapper-input">
          <input
            class="base-input input-icon input-icon-search"
            type="text"
            id="search"
            placeholder="- Chọn giá trị -"
            value="20 bản ghi trên 1 trang"
          />

          <span @click="onToggleShowBoardValue" class="wrapper-icon plr-12">
            <span class="combobox__icon-down" :style="{ transform: iconUp ? 'rotate(180deg)' : '' }"></span>
          </span>
        </span>
        <div v-if="isShowBoardValue" class="board-value">
          <span class="board-value__value">10 bàn ghi trên một trang</span>
          <span class="board-value__value">20 bản ghi trên một trang</span>
          <span class="board-value__value">30 bản ghi trên một trang</span>
          <span class="board-value__value">40 bản ghi trên một trang</span>
          <span class="board-value__value">50 bản ghi trên một trang</span>
        </div>
      </div>
      <span class="btn-back">Trước</span>
      <ul class="table__list-page">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <span class="btn-next">Sau</span>
    </span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EmployeeList",
  data() {
    return {
      isShowBoardValue: false,
      iconUp: false,

      header: [
        {
          id: 0,
          headerName: "MÃ NHÂN VIÊN",
          className: ["width-150"],
          fieldName: "EmployeeCode",
        },
        {
          id: 1,
          headerName: "TÊN NHÂN VIÊN",
          className: ["width-200"],
          fieldName: "FullName",
        },
        {
          id: 2,

          headerName: "GIỚI TÍNH",
          className: ["width-100"],
          fieldName: "Gender",
          type: "gender",
        },
        {
          id: 3,

          headerName: "NGÀY SINH",
          className: ["width-150", "text-align-center"],
          fieldName: "DateOfBirth",
          type: "date",
        },
        {
          id: 4,
          headerName: "SỐ CMND",
          className: ["width-200"],
          fieldName: "PersonId",
          title: "Số chứng minh thư nhân dân",
        },
        {
          id: 5,
          headerName: "CHỨC DANH",
          className: ["width-150"],
          fieldName: "Position",
        },
        {
          id: 6,
          headerName: "TÊN ĐƠN VỊ",
          className: ["width-200"],
          fieldName: "DepartmentName",
        },
        {
          id: 7,
          headerName: "SỐ TÀI KHOẢN",
          className: ["width-200"],
          fieldName: "BankId",
        },
        {
          id: 8,
          headerName: "TÊN NGÂN HÀNG",
          className: ["width-200"],
          fieldName: "BankName",
        },
        {
          id: 9,
          headerName: "CHI NHÁNH TK NGÂN HÀNG",
          className: ["width-250"],
          fieldName: "BankBranch",
          title: "CHI NHÁNH TÀI KHOẢN NGÂN HÀNG",
        },
      ],
      data: [],
    };
  },
  methods: {
    onToggleShowBoardValue() {
      this.isShowBoardValue = !this.isShowBoardValue;
      this.iconUp = !this.iconUp;
    },
  },
  mounted() {
    axios
      .get("https://cukcuk.manhnv.net/api/v1/Employees")
      .then((res) => {
        this.data = res.data;
      })
      .catch((e) => console(e));
  },
};
</script>

<style></style>
