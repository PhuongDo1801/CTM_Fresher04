<template>
  <div ref="tableContainer" class="table-container">
    <table class="main__table">
      <thead>
        <tr>
          <th class="col-checkbox">
            <input type="checkbox" />
          </th>
          <th
            v-for="item in header"
            :class="item.className"
            :fieldName="item.fieldName"
            :key="item.id"
            :title="item.title ? item.title : null"
          >
            <span>{{ item.headerName }}</span>
          </th>
          <!-- <th class="width-200" fieldName="FullName">
            <span>TÊN NHÂN VIÊN</span>
          </th>
          <th class="width-100" fieldName="Gender">
            <span>GIỚI TÍNH</span>
          </th>
          <th class="width-150" fieldName="DateOfBirth">
            <p>NGÀY SINH</p>
          </th>
          <th class="width-200" fieldName="PersonId">
            <span title="Số chứng minh thư nhân dân">SỐ CMND</span>
          </th>
          <th class="width-150" fieldName="Position">
            <span>CHỨC DANH</span>
          </th>
          <th class="width-200" fieldName="DepartmentName">
            <span>TÊN ĐƠN VỊ</span>
          </th>
          <th class="width-200" fieldName="BankId">
            <span>SỐ TÀI KHOẢN</span>
          </th>
          <th class="width-200" fieldName="BankName">
            <span>TÊN NGÂN HÀNG</span>
          </th>
          <th class="width-250" fieldName="BankBranch" title="CHI NHÁNH TÀI KHOẢN NGÂN HÀNG">
            <span>CHI NHÁNH TK NGÂN HÀNG</span>
          </th> -->
          <th class="width-150" style="text-align: center">
            <p>CHỨC NĂNG</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td class="col-checkbox">
            <input type="checkbox" />
          </td>
          <td v-for="td in header" :key="td.id" :class="td.className" @dblclick="onDbClickRow($event, item)">
            <p>{{ formatData(td.type, item[td.fieldName]) }}</p>
          </td>

          <td class="align-center">
            <span class="table__function-name">Sửa</span>
            <div
              ref="btnDropDowns"
              @click="toggleContextMenu($event, index, item)"
              :style="{ border: currentIndexContextMenu === index && isShowContextMenu ? '1px solid #007aff' : null }"
              class="wrapper-icon"
            >
              <span class="dropdown-blue-icon"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <m-context-menu
      v-if="isShowContextMenu"
      :onClose="onCloseContextMenu"
      :topPosition="contextMenuY"
      :id="currentEmployeeCode"
      :employeeList="data"
      :index="currentIndexContextMenu"
    ></m-context-menu>
  </div>
</template>

<script>
export default {
  name: "MDataTable",
  data() {
    return {
      isShowContextMenu: false,
      currentIndexContextMenu: -1,
      currentEmployeeCode: 0,
      list: [0, 1, 2, 3],
      contextMenuY: "",
      employeeSelected: {},
      employeeList: [],
      // headers: this.header,
    };
  },
  props: {
    header: Array,
    data: Array,
  },

  methods: {
    toggleContextMenu($event, index, item) {
      const tableY = this.$refs.tableContainer.getBoundingClientRect().y;
      const btnY = this.$refs.btnDropDowns[index].getBoundingClientRect().y;
      this.contextMenuY = btnY - tableY + 70 + "px";
      if (!this.isShowContextMenu) {
        this.currentIndexContextMenu = index;
        this.employeeSelected = item;
        this.currentEmployeeCode = item.id;
        this.isShowContextMenu = !this.isShowContextMenu;
      } else {
        if (this.currentIndexContextMenu === index) {
          this.isShowContextMenu = !this.isShowContextMenu;
        } else {
          this.currentIndexContextMenu = index;
          this.currentEmployeeCode = item.id;
          this.employeeSelected = item;
        }
      }
    },
    onCloseContextMenu() {
      this.isShowContextMenu = false;
    },
    formatData(type, content) {
      switch (type) {
        // case "gender":
        //   return content == 0 ? "Nam" : "Nữ";
        case "date":
          return content ? content.substring(0, 10).split("-").reverse().join("/") : null;
        default:
          return content;
      }
    },
    onDbClickRow($event, item) {
      this.$emit("onDbClickRow", item);
    },
  },
};
</script>

<style></style>
