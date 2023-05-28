<template>
    <div class="container__right-overlay" v-if="isShowOverlay"></div>
    <EmployeeDelete v-if="isShowDelete" :DeleteFunction="showDeleteFunction" @onClosePopupEmployee="onClosePopupEmployee"></EmployeeDelete>
    <EmployeeDetail v-if="isShowDetail" @onCloseDialog="onCloseDialog" :employeeInput="employeeSelected"></EmployeeDetail>
    <div class="container__right-main-top">
        <span>Nhân viên</span>
        <m-button id="btn-add-employee" text="Thêm mới nhân viên" @click="btnAddOnClick"></m-button>
    </div>
    <div class="container__right-main-body">
        <div class="container__right-search">
            <div class="container__right-search-input">
                <m-inputText title="Tìm kiếm thông tin nhân viên" placeholder="Tìm theo mã, tên nhân viên"></m-inputText>
                <i class="search-icon"></i>
            </div>
            <i class="refresh-icon"></i>
        </div>
        <div class="container__right-table">
            <table class="container__table" id="table-employee-list">
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" />
                        </th>
                        <th class="text-align-left" style="min-width: 150px;" model-name="EmployeeCode">MÃ NHÂN VIÊN
                        </th>
                        <th class="text-align-left" style="min-width: 150px;" model-name="FullName">TÊN NHÂN VIÊN</th>
                        <th class="text-align-left" style="min-width: 100px;" model-name="GenderName">GIỚI TÍNH</th>
                        <th class="text-align-center" style="min-width: 100px;" model-name="DateOfBirth" type="date">
                            NGÀY SINH</th>
                        <th class="text-align-left" style="min-width: 150px;">
                            <div class="tooltip" title="Số chứng minh nhân dân">Số CMND
                                <!-- <span class="tooltiptext">Số chứng minh nhân dân</span> -->
                            </div>
                        </th>
                        <th class="text-align-left" style="min-width: 150px;">CHỨC DANH</th>
                        <th class="text-align-left" style="min-width: 150px;">TÊN ĐƠN VỊ</th>
                        <th class="text-align-left" style="min-width: 150px;">SỐ TÀI KHOẢN</th>
                        <th class="text-align-left" style="min-width: 150px;">TÊN NGÂN HÀNG</th>
                        <th class="text-align-left" style="min-width: 300px;">
                            <div class="tooltip" title="Chi nhánh tài khoản ngân hàng">Chi nhánh TK ngân hàng
                                <!-- <span class="tooltiptext">Chi nhánh tài khoản ngân hàng</span> -->
                            </div>
                        </th>
                        <th class="text-align-center" style="min-width: 150px;" type="dropdown">CHỨC NĂNG</th>
                    </tr>
                </thead>
                <tbody class="table__body">
                    <!-- <EmployeeDataExample></EmployeeDataExample> -->
                    <tr @dblclick="showEmployeeDetail(item)" v-for="(item) in employees" :key="item.EmployeeId">
                        <td class="text-align-center">
                            <input type="checkbox" />
                        </td>
                        <td class="text-align-left">{{ item.EmployeeCode }}</td>
                        <td class="text-align-left">{{ item.FullName }}</td>
                        <td class="text-align-left"></td>
                        <td class="text-align-center">{{ formatDate(item.DateOfBirth) }}</td>
                        <td class="text-align-left"></td>
                        <td class="text-align-left"></td>
                        <td class="text-align-left"></td>
                        <td class="text-align-left"></td>
                        <td class="text-align-left"></td>
                        <td class="text-align-left"></td>
                        <td class="text-align-center">
                            <span>Sửa</span>
                            <div class="dropdown-blue-icon-wraper" @click="showContextMenu(item.EmployeeCode )">
                                <i class="dropdown-blue-icon"></i>
                                <ul class="table-list-option" v-if="id == item.EmployeeCode && isShowContextMenu">
                                    <li>Nhân bản</li>
                                    <li class="table-list-option-delete" @click="showDeleteEmployeeDialog">Xóa</li>
                                    <li>Ngưng sử dụng</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="container__right-main-footer">
                <div class="container__right-main-footer-left">
                    <span>Tổng số: <b>1035</b> bản ghi</span>
                </div>

                <div class="container__right-main-footer-right">
                    <div class="container__dropdown-wraper">
                        <ul class="container__dropdown-wraper-list" v-if="isShowPaging">
                            <li class="container__dropdown-wraper-list-item">
                                10 bản ghi trên trang
                            </li>
                            <li class="container__dropdown-wraper-list-item">
                                20 bản ghi trên trang
                            </li>
                            <li class="container__dropdown-wraper-list-item">
                                30 bản ghi trên trang
                            </li>
                            <li class="container__dropdown-wraper-list-item">
                                50 bản ghi trên trang
                            </li>
                            <li class="container__dropdown-wraper-list-item">
                                100 bản ghi trên trang
                            </li>
                        </ul>
                        <div class="container__dropdown-wraper-item">
                            <span>20 bản ghi trên trang</span>
                        </div>
                        <div class="container__dropdown-wraper-icon" @click="btnShowPaging">
                            <i class="dropdown-gray-icon"></i>
                        </div>
                    </div>
                    <div class="container__right-pages">
                        <span>Trước</span>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>...</li>
                            <li>52</li>
                        </ul>
                        <span>Sau</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeDelete from './EmployeeDelete.vue';
import EmployeeDetail from './EmployeeDetail.vue';
export default {
    components: {EmployeeDelete, EmployeeDetail },
    name: "EmployeeList",
    data() {
        return {
            employees: [],
            isShowPaging: false,
            isShowDetail: false,
            isShowOverlay: false,
            isShowDelete: false,
            isShowContextMenu: false,
            id: null,
            employeeSelected: {},
        }
    },
    //hàm dùng chung
    created() {
        this.postData();
    },
    methods: {
        /**
        * Mô tả: Lấy data
        * created by : DDPHUONG
        * created date: 29-05-2023 00:31:42
        */
        postData(){
            try {
            fetch("http://localhost:3000/employees")
                .then(res => res.json())
                .then(data => {
                    this.employees = data;
                    console.log(data);
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        showDeleteFunction() {

        },
        /**
         * Mô tả: đóng form mở hà
         * created by : DDPHUONG
         * created date: 29-05-2023 00:14:52
         */
        onCloseDialog(){
            this.isShowDetail = false;
            this.isShowOverlay = false;
        },

        /**
         * Mô tả: mở form thêm mới nhân viên
         * created by : DDPHUONG
         * created date: 29-05-2023 00:15:47
         */
        btnAddOnClick() {
            this.isShowDetail = true;
            this.isShowOverlay = true;
        },
        /**
         * Mô tả: Hiển thị paging 
         * created by : DDPHUONG
         * created date: 29-05-2023 00:29:04
         */
        btnShowPaging() {
            this.isShowPaging = !this.isShowPaging;
        },
        /**
        * Mô tả: Format date
        * created by : DDPHUONG
        * created date: 29-05-2023 00:30:21
        */
        formatDate(dateValue) {
            try {
                let date = new Date(dateValue);
                let dateString = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                return `${dateString}/${month}/${year}`;
            }
            catch (error) {
                console.log(error);
            }
        },
        /**
        * Mô tả: Hiển thị thông tin một employee
        * created by : DDPHUONG
        * created date: 29-05-2023 00:30:35
        */
        showEmployeeDetail(employee) {
            this.employeeSelected = employee;
            this.isShowDetail = true;
            this.isShowOverlay = true;
        },
        /**
        * Mô tả: Hiển thị context menu
        * created by : DDPHUONG
        * created date: 29-05-2023 00:30:49
        */
        showContextMenu(index){
            if(this.id == index){
                this.isShowContextMenu = !this.isShowContextMenu;
                this.id = index;
            }
            else {
                this.isShowContextMenu = true;
                this.id = index;
            }
        },
        /**
        * Mô tả: Hiện thị dialog xác nhận xoá
        * created by : DDPHUONG
        * created date: 29-05-2023 00:31:02
        */
        showDeleteEmployeeDialog(){
            this.isShowOverlay = true;
            this.isShowDelete = true;
        },
        /**
        * Mô tả: Ẩn dialog xác nhận xoá
        * created by : DDPHUONG
        * created date: 29-05-2023 00:31:02
        */
        onClosePopupEmployee(){
            this.isShowOverlay = false;
            this.isShowDelete = false;
        }
    }
}
</script>

<style></style>