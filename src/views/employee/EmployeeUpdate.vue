<template>
  <div id="container-popup-employee" class="container__right-popup">
    <div class="container__right-icon-wraper">
      <i class="sprite-info-icon"></i>
      <i @click="handleCloseEmployeeUpdateForm()" class="sprite-close-icon"></i>
    </div>
    <div class="container__right-popup-top">
      <span>Sửa thông tin nhân viên</span>
      <div>
        <input
          v-model="employeeData.isCustomer"
          id="employee-customer"
          title="Là khách hàng"
          type="checkbox"
        />
        <label for="">Là khách hàng</label>
      </div>
      <div>
        <input
          v-model="employeeData.isProvider"
          id="employee-provider"
          title="Là nhà cung cấp"
          type="checkbox"
        />
        <label for="">Là nhà cung cấp</label>
      </div>
    </div>

    <div class="container__right-popup-body">
      <div class="container__right-popup-body-top">
        <div class="container__right-popup-body-top-left">
          <div>
            <label for="">Mã <span style="color: red">*</span></label>

            <m-input
              type="text"
              placeholder="Mã nhân viên"
              v-model="employeeData.code"
            ></m-input>
          </div>
          <div>
            <label for="">Tên <span style="color: red">*</span></label>
            <m-input
              type="text"
              placeholder="Tên nhân viên"
              v-model="employeeData.name"
            ></m-input>
          </div>

          <div>
            <label for="">Đơn vị <span style="color: red">*</span></label>
            <select
              v-model="employeeData.unitName"
              title="Phòng nhân viên"
              name=""
              id="employee-unit-name"
              :value="employeeData.unitName"
            >
              <option value="Phòng nhân sự">Phòng nhân sự</option>
              <option value="Phòng công nghệ">Phòng công nghệ</option>
              <option value="Phòng hành chính">Phòng hành chính</option>
              <option value="Phòng kinh doanh">Phòng kinh doanh</option>
            </select>
          </div>

          <div>
            <label for="">Chức danh</label>

            <m-input
              type="text"
              placeholder="Chức danh nhân viên"
              v-model="employeeData.positionName"
            ></m-input>
          </div>
        </div>
        <div class="container__right-popup-body-top-right">
          <div>
            <label for="">Ngày sinh</label>
            <input
              v-model="employeeData.dateOfBirth"
              id="employee-date-of-birth"
              title="Ngày sinh nhân viên"
              type="date"
            />
          </div>
          <div>
            <label for="">Giới tính</label>
            <div>
              <input
                v-model="employeeData.gender"
                value="Nam"
                title="Giới tính nam"
                name="gender"
                type="radio"
              />
              <label for="">Nam</label>

              <input
                v-model="employeeData.gender"
                value="Nữ"
                title="Giới tính nữ"
                name="gender"
                type="radio"
              />
              <label for="">Nữ</label>

              <input
                v-model="employeeData.gender"
                value="Khác"
                title="Giới tính khác"
                name="gender"
                type="radio"
              />
              <label for="">Khác</label>
            </div>
          </div>
          <div>
            <label for="">Số CMND</label>

            <m-input
              type="text"
              placeholder="Số chứng minh thư"
              v-model="employeeData.identityNumber"
            ></m-input>
          </div>

          <div>
            <label for="">Ngày cấp</label>
            <input
              v-model="employeeData.identityDateRelease"
              id="employee-identity-date-release"
              placeholder="Ngày cấp"
              title="Ngày cấp"
              type="date"
            />
          </div>
          <div>
            <label for="">Nơi cấp</label>

            <m-input
              type="text"
              placeholder="Nơi cấp"
              v-model="employeeData.identityPlaceRelease"
            ></m-input>
          </div>
        </div>
      </div>
      <div class="container__right-popup-body-bottom">
        <div>
          <label for="">Địa chỉ</label>
          <m-input
            v-model="employeeData.address"
            ref="address"
            type="text"
            placeholder="Địa chỉ"
          ></m-input>
        </div>

        <div>
          <div>
            <label for="">ĐT di động</label>

            <m-input
              ref="phone"
              type="text"
              placeholder="Số điện thoại"
              v-model="employeeData.phone"
            ></m-input>
          </div>
          <div>
            <label for="">ĐT cố định</label>

            <m-input
              ref="landlinePhone"
              type="text"
              placeholder="Điện thoại cố định"
              v-model="employeeData.phonePermanent"
            ></m-input>
          </div>
          <div>
            <label for="">Email</label>

            <m-input
              v-model="employeeData.email"
              ref="email"
              type="text"
              placeholder="Email"
            ></m-input>
          </div>
        </div>

        <div>
          <div>
            <label for="">Tài khoản ngân hàng</label>

            <m-input
              ref="bankAccount"
              type="text"
              placeholder="Tài khoản ngân hàng"
              v-model="employeeData.bankAccount"
            ></m-input>
          </div>
          <div>
            <label for="">Tên ngân hàng</label>

            <m-input
              ref="bankName"
              type="text"
              placeholder="Tên ngân hàng"
              v-model="employeeData.bankName"
            ></m-input>
          </div>
          <div>
            <label for="">Chi nhánh</label>

            <m-input
              v-model="employeeData.branch"
              ref="branch"
              type="text"
              placeholder="Chi nhánh"
            ></m-input>
          </div>
        </div>
        <hr />

        <div class="container__popup-footer">
          <div>
            <button>HỦY</button>
          </div>
          <div>
            <button>CẤT</button>
            <button @click="handleUpdateEmployee" class="btn-add-employee">
              CẤT VÀ SỬA
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeUpdate",
  props: {
    employeeDataProps: Object,
    handleCloseEmployeeUpdateForm: Function,
    getListEmployee: Function,
  },

  data() {
    return {};
  },
  methods: {
    async handleUpdateEmployee() {
      try {
        await axios.put(
          `http://localhost:3000/employees/${this.employeeData.id}`,
          this.employeeData
        );
        this.handleCloseEmployeeUpdateForm();
        this.getListEmployee(); 
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    employeeData() {
      return { ...this.employeeDataProps };
    },
  },
};
</script>

<style></style>
