<template>
  <m-dialog
    v-if="isShowDialog"
    @onCancel="onCloseDialog"
    @onSuccess="() => onChangeEmployeeDetail(employee)"
    title="Sửa bản ghi?"
    iconClass="icon-warning"
    desc="Bạn chắc chắn muốn sửa bản ghi?"
    btnSuccess="Đồng ý"
    btnCancle="Hủy"
  ></m-dialog>
  <div class="overlay"></div>
  <div class="detail-staff__container">
    <div class="popup">
      <div class="popup__main">
        <div class="popup__top">
          <span class="popup__top-left">
            <h3 class="popup__header">Thông tin nhân viên</h3>
            <input class="popup__checkbox" type="checkbox" id="customer" />
            <label class="checkbox__label" for="customer">Là khách hàng</label>
            <input class="popup__checkbox" type="checkbox" id="provider" />
            <label class="checkbox__label" for="provider">Là nhà cung cấp</label>
          </span>
          <span class="popup__top-right">
            <i class="icon-question"></i>
            <span @click="onCloseEmployeeDetail" class="popup__icon"><i class="icon-close"></i></span>
          </span>
        </div>

        <div class="popup__mid">
          <div class="two-cols">
            <div class="col-left">
              <div class="two-cols">
                <span class="popup__field flex-1">
                  <label class="label-input">Mã <span class="star-red">*</span></label>

                  <!-- <div class="wrapper-input">
                    <input class="base-input normal-input" type="text" value="NV-1644" placeholder="Mã" autofocus />
                  </div> -->
                  <m-input type="text" placeholder="Mã" v-model="employeeSelected.EmployeeCode"></m-input>

                  <!-- <div class="wrapper-warning-input">
                    <div class="triangle-up"></div>
                    <p class="warning-message">Mã không được để trống</p>
                  </div> -->
                </span>

                <span class="popup__field flex-1dot5 ml-8">
                  <label class="label-input">Tên <span class="star-red">*</span></label>

                  <!-- <div class="wrapper-input">
                    <input class="base-input normal-input" type="text" placeholder="Tên" />
                  </div> -->
                  <m-input type="text" placeholder="Tên" v-model="employeeSelected.FullName"></m-input>
                </span>
              </div>
              <div class="popup__field">
                <label class="label-input">Đơn vị <span class="star-red">*</span></label>
                <div class="combobox">
                  <span class="wrapper-input">
                    <input
                      class="base-input input-icon input-icon-search"
                      type="text"
                      placeholder="- Chọn giá trị -"
                      v-model="employeeSelected.DepartmentName"
                    />

                    <span class="wrapper-icon plr-12">
                      <img class="combobox__search-icon" src="@/assets/icon/angle-down-solid.svg" alt="search-icon" />
                    </span>
                  </span>
                  <!-- <div class="board-value">
                        <span class="board-value__title"
                          >- Chọn giá trị -
                          <span class="wrapper-icon"
                            ><img
                              class="combobox__checked-icon"
                              src="/ttanh/html/assets/icon/check-solid.svg"
                              alt="icon-check" /></span
                        ></span>
                        <span class="board-value__value">Hà Nội</span>
                        <span class="board-value__value">TP.Hồ Chí Minh</span>
                        <span class="board-value__value">Đà Nẵng</span>
                        <span class="board-value__value">Hải Phòng</span>
                        <span class="board-value__value">Hải Dương</span>
                      </div> -->
                </div>
              </div>

              <div class="popup__field">
                <label class="label-input">Chức danh</label>
                <div class="wrapper-input">
                  <input
                    class="base-input normal-input"
                    type="text"
                    placeholder="Chức danh"
                    v-model="employeeSelected.Position"
                  />
                </div>
              </div>
            </div>
            <div class="col-right">
              <div class="two-cols">
                <span class="popup__field flex-1">
                  <label class="label-input">Ngày sinh <span class="star-red">*</span></label>
                  <!-- <span class="wrapper-input">
                    <input class="base-input input-icon input-icon-search" type="date" placeholder="dd/MM/yyyy" />

                    <span class="wrapper-icon">
                          <img
                            class="search-icon"
                            src="/ttanh/html/assets/icon/calendar-regular.svg"
                            alt="search-icon"
                          />
                        </span>
                  </span> -->
                  <m-input type="date" v-model="employeeSelected.DateOfBirth"></m-input>
                </span>

                <span class="popup__field flex-1dot5" style="margin-left: 16px">
                  <label class="label-input">Giới tính</label>
                  <span class="popup__input-radio"
                    ><input class="popup__radio" type="radio" value="Nam" v-model="employeeSelected.Gender" /><label
                      class="label-radio"
                      for="male"
                      >Nam</label
                    >
                    <input class="popup__radio" type="radio" value="Nữ" v-model="employeeSelected.Gender" /><label
                      class="label-radio"
                      for="female"
                      >Nữ</label
                    >

                    <input class="popup__radio" type="radio" value="Khác" v-model="employeeSelected.Gender" /><label
                      class="label-radio"
                      for="other"
                      >Khác</label
                    >
                  </span>
                </span>
              </div>

              <div class="two-cols">
                <span class="popup__field flex-1dot5">
                  <label class="label-input" title="Số chứng minh thư nhân dân">Số CMND</label>
                  <!-- <div class="wrapper-input">
                    <input class="base-input normal-input" type="text" value="12312312" placeholder="CMND" />
                  </div> -->
                  <m-input
                    type="text"
                    placeholder="CMND"
                    title="Chứng minh thư nhân dân"
                    v-model="employeeSelected.IdentityNumber"
                  ></m-input>
                </span>

                <span class="popup__field flex-1 ml-8">
                  <label class="label-input">Ngày cấp </label>
                  <!-- <span class="wrapper-input">
                    <input class="base-input input-icon input-icon-search" type="date" placeholder="dd/MM/yyyy" />

                    <span class="wrapper-icon">
                          <img
                            class="search-icon"
                            src="/ttanh/html/assets/icon/calendar-regular.svg"
                            alt="search-icon"
                          />
                        </span>
                  </span> -->
                  <m-input type="date" v-model="employeeSelected.IdentityDateRelease"></m-input>
                </span>
              </div>

              <div class="popup__field">
                <label class="label-input">Nơi cấp</label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" value="Hà Nội" placeholder="Nơi cấp" />
                </div> -->
                <m-input type="text" placeholder="Nơi cấp" v-model="employeeSelected.IdentityPlaceRelease"></m-input>
              </div>
            </div>
          </div>

          <div class="single-col">
            <div class="popup__field">
              <label class="label-input">Địa chỉ </label>
              <!-- <div class="wrapper-input">
                <input class="base-input normal-input" type="text" placeholder="Địa chỉ" />
              </div> -->
              <m-input type="text" placeholder="Địa chỉ" v-model="employeeSelected.Address"></m-input>
            </div>
            <div class="list-popup-field">
              <div class="popup__field width-25per">
                <label class="label-input" title="Điện thoại di động">ĐT di động </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" placeholder="Số điện thoại" />
                </div> -->
                <m-input type="text" placeholder="Điện thoại di động" v-model="employeeSelected.Phone"></m-input>
              </div>
              <div class="popup__field width-25per">
                <label class="label-input" title="Điện thoại cố định">ĐT cố định </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" placeholder="Số điện thoại cố định" />
                </div> -->
                <m-input
                  type="text"
                  placeholder="Số điện thoại cố định"
                  v-model="employeeSelected.PhonePermanent"
                ></m-input>
              </div>
              <div class="popup__field width-25per">
                <label class="label-input">Email </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="email" placeholder="example@gmail.com  " />
                </div> -->
                <m-input type="email" placeholder="Email" v-model="employeeSelected.Email"></m-input>
              </div>
            </div>

            <div class="list-popup-field">
              <div class="popup__field width-25per">
                <label class="label-input">Tài khoản ngân hàng </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" placeholder="Tài khoản ngân hàng" />
                </div> -->
                <m-input type="text" placeholder="Tài khoản ngân hàng" v-model="employeeSelected.BankId"></m-input>
              </div>
              <div class="popup__field width-25per">
                <label class="label-input">Tên ngân hàng </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" placeholder="Tên ngân hàng" />
                </div> -->
                <m-input type="text" placeholder="Tên ngân hàng" v-model="employeeSelected.BankName"></m-input>
              </div>
              <div class="popup__field width-25per">
                <label class="label-input">Chi nhánh </label>
                <!-- <div class="wrapper-input">
                  <input class="base-input normal-input" type="text" placeholder="Chi nhánh" />
                </div> -->
                <m-input type="text" placeholder="Chi nhánh" v-model="employeeSelected.BankBranch"></m-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="popup__footer">
        <div class="footer--left">
          <!-- <button class="base-btn sub-btn">
            <span class="btn__text btn__text--black">Hủy</span>
          </button> -->
          <m-button @click="onCloseEmployeeDetail" class="sub-btn">Hủy</m-button>
        </div>
        <div class="footer--right">
          <!-- <button class="base-btn sub-btn">
            <span class="btn__text btn__text--black">Cất</span>
          </button> -->

          <m-button class="sub-btn">Cất</m-button>

          <!-- <button type="button" class="base-btn regular-btn ml-8">
            <span class="btn__text">Cất và Thêm</span>
          </button> -->
          <m-button @onHandle="() => onAddBtn(employee)" class="regular-btn ml-8">Cất và Thêm</m-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EmployeeDetail",
  data() {
    return {
      employeeSelected: {},
      isNewForm: true,
      isShowDialog: false,
    };
  },
  created() {
    if (Object.keys(this.employee).length != 0) {
      this.isNewForm = false;
    }
    let em = JSON.stringify(this.employee);
    this.employeeSelected = JSON.parse(em);
  },

  props: ["employee", "name", "onCloseEmployeeDetail"],

  methods: {
    onCloseDialog() {
      this.isShowDialog = false;
    },
    onAddBtn(inputEmployee) {
      let strInputEm = JSON.stringify(inputEmployee);
      let strSelectedEm = JSON.stringify(this.employeeSelected);
      if (strInputEm !== strSelectedEm && !this.isNewForm) {
        this.isShowDialog = true;
      } else {
        axios
          .post("http://localhost:3000/employees", {
            ...this.employeeSelected,
          })
          .then(() => {
            inputEmployee = {};
            this.employeeSelected = {};
          })
          .catch((e) => console.log(e));
      }
    },
    onChangeEmployeeDetail(inputEmployee) {
      axios
        .put(`http://localhost:3000/employees/${inputEmployee.id}`, {
          ...this.employeeSelected,
        })
        .then(() => {
          for (let field in inputEmployee) {
            if (inputEmployee[field] !== this.employeeSelected[field]) {
              inputEmployee[field] = this.employeeSelected[field];
            }
          }
          this.onCloseDialog();
          this.onCloseEmployeeDetail();
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style></style>
