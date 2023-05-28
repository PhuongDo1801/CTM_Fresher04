<template>
    <div id="container-popup-employee" class="container__right-popup">
        <div class="container__right-icon-wraper">
            <i class="info-icon"></i>
            <i class="close-icon" id="close-icon-add-employee" @click="closeEmployeeDetail"></i>
        </div>
        <div class="container__right-popup-top">
            <span>Thông tin nhân viên</span>
            <div>
                <input title="Là khách hàng" type="checkbox" />
                <label for="">Là khách hàng</label>
            </div>
            <div>
                <input title="Là nhà cung cấp" type="checkbox" />
                <label for="">Là nhà cung cấp</label>
            </div>
        </div>

        <div class="container__right-popup-body">
            <div class="container__right-popup-body-top">
                <div class="container__right-popup-body-top-left">
                    <div>
                        <label for="">Mã <span style="color: red">*</span></label>
                        <input title="Mã nhân viên" 
                        placeholder="Mã nhân viên" 
                        type="text" 
                        v-model="employee.EmployeeCode" 
                        />
                    </div>
                    <div>
                        <label for="">Tên <span style="color: red">*</span></label>
                        <input title="Tên nhân viên" 
                        placeholder="Tên nhân viên" 
                        type="text" 
                        v-model="employee.FullName"
                        />
                    </div>

                    <div>
                        <label for="">Đơn vị <span style="color: red">*</span></label>
                        <select title="Phòng nhân viên" name="" id="">
                            <option value="">Phòng nhân sự</option>
                        </select>
                    </div>

                    <div>
                        <label for="">Chức danh</label>
                        <input title="Chức danh nhân viên" value="Chức danh nhân viên" type="text" />
                    </div>
                </div>
                <div class="container__right-popup-body-top-right">
                    <div>
                        <label for="">Ngày sinh</label>
                        <input title="Ngày sinh nhân viên" type="date" />
                    </div>
                    <div>
                        <label for="">Giới tính</label>
                        <div>
                            <input title="Giới tính nam" name="gender" type="radio" />
                            <label for="">Nam</label>

                            <input title="Giới tính nữ" name="gender" type="radio" />
                            <label for="">Nữ</label>

                            <input title="Giới tính khác" name="gender" type="radio" />
                            <label for="">Khác</label>
                        </div>
                    </div>
                    <div>
                        <label for="">Số CMND</label>
                        <input placeholder="Số CMND" title="Số chứng minh thư nhân dân" type="text" />
                    </div>

                    <div>
                        <label for="">Ngày cấp</label>
                        <input placeholder="Ngày cấp" title="Ngày cấp" type="date" />
                    </div>
                    <div>
                        <label for="">Nơi cấp</label>
                        <input placeholder="Nơi cấp" title="Nơi cấp" type="text" />
                    </div>
                </div>
            </div>
            <div class="container__right-popup-body-bottom">
                <div>
                    <label for="">Địa chỉ</label>
                    <input placeholder="Địa chỉ" title="Địa chỉ" type="text" />
                </div>

                <div>
                    <div>
                        <label for="">ĐT di động</label>
                        <input placeholder="Điện thoại di động" title="Điện thoại di động" type="text" />
                    </div>
                    <div>
                        <label for="">ĐT cố định</label>
                        <input placeholder="Điện thoại cố định" title="Điện thoại cố định" type="text" />
                    </div>
                    <div>
                        <label for="">Email</label>
                        <input placeholder="Email" title="Email" type="text" />
                    </div>
                </div>

                <div>
                    <div>
                        <label for="">Tài khoản ngân hàng</label>
                        <input placeholder="Tài khoản ngân hàng" title="Tài khoản ngân hàng" type="text" />
                    </div>
                    <div>
                        <label for="">Tên ngân hàng</label>
                        <input placeholder="Tên ngân hàng" title="Tên ngân hàng" type="text" />
                    </div>
                    <div>
                        <label for="">Chi nhánh</label>
                        <input placeholder="Chi nhánh" title="Chi nhánh" type="text" />
                    </div>
                </div>
                <!-- <hr /> -->

                <div class="container__popup-footer">
                    <div>
                        <button>HỦY</button>
                    </div>
                    <div>
                        <button id="btn-save" @click="btnSaveOnClick">CẤT</button>
                        <button>CẤT VÀ THÊM</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EmployeeDetail",
    data(){
        return {
            employee: {},
            isEmployeeCodeInValid: false,
        }
    },
    props: ["showDetailFunction", "employeeInput"],
    created(){
        let jsonObjectString = JSON.stringify(this.employeeInput);
        this.employee = JSON.parse(jsonObjectString)
    },
    // data(){
    //     return {
    //         isShowDetail: true,
    //     }
    // },
    methods: {
        closeEmployeeDetail(){
            this.$emit("onCloseDialog");
        },
        // Lưu khi chỉnh sử dữ liệu
        btnSaveOnClick(){
            // alert('1');
            // this.isEmployeeCodeInValid = true;
        }  
    }
}

</script>

<style>
.red-border{
    border-color: red;
}
</style>