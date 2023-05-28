<template>
  <EmployeeDetail
    :isShow="isShowEmployeeDetail"
    :onCloseEmployeeDetail="onCloseEmployeeDetail"
    :employee="employeeSelected"
    v-if="isShowEmployeeDetail"
  ></EmployeeDetail>
  <div class="main">
    <div class="main__header">
      <span class="main__table-title">Nhân viên</span>
      <!-- <button class="base-btn regular-btn">
        <span class="btn__text">Thêm mới nhân viên</span>
      </button> -->
      <m-button class="regular-btn" @onHandle="onToggleEmployeeDetail">Thêm mới nhân viên</m-button>
    </div>

    <div class="main__body">
      <div class="main__top">
        <!-- <span class="wrapper-input focus-green">
          <input class="base-input" type="text" id="search" placeholder="Search" />

          <span class="wrapper-icon plr-8">
            <img class="search-icon" src="@/assets/icon/magnifying-glass-solid.svg" alt="search-icon" />
          </span>
        </span> -->

        <m-input :urlIcon="require('@/assets/icon/magnifying-glass-solid.svg')"></m-input>
        <span class="wrapper-icon"
          ><img class="icon-reload" src="@/assets/icon/sidebar/arrow-rotate-right-solid.svg" alt="reload"
        /></span>
      </div>

      <!-- ---------table------------ -->
      <EmployeeList
        :isShowEmployeeDetail="isShowEmployeeDetail"
        :employeeSelected="employeeSelected"
        :showEmployeeDetail="showEmployeeDetail"
      ></EmployeeList>
    </div>
  </div>
</template>

<script>
import EmployeeDetail from "@/pages/employee/EmployeeDetail.vue";
import EmployeeList from "@/pages/employee/EmployeeList.vue";

export default {
  name: "TheMain",
  components: { EmployeeDetail, EmployeeList },
  data() {
    return {
      isShowEmployeeDetail: false,
      employeeSelected: {},
      employeeList: [],
    };
  },

  created() {},

  methods: {
    onToggleEmployeeDetail() {
      this.isShowEmployeeDetail = true;
      this.employeeSelected = {};
    },
    onCloseEmployeeDetail() {
      this.isShowEmployeeDetail = false;
    },
    showEmployeeDetail(em) {
      this.employeeSelected = em;
      this.isShowEmployeeDetail = true;
    },
  },
};
</script>

<style></style>
