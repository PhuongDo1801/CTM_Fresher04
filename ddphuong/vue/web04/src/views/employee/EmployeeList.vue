<template>
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
            <tbody>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
                <EmployeeDataExample></EmployeeDataExample>
            </tbody>
        </table>
        <div class="container__right-main-footer">
            <div class="container__right-main-footer-left">
                <span>Tổng số: <b>1035</b> bản ghi</span>
            </div>

            <div class="container__right-main-footer-right">
                <div class="container__dropdown-wraper">
                    <ul class="container__dropdown-wraper-list">
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
                    <div class="container__dropdown-wraper-icon">
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
</template>

<script>
import EmployeeDataExample from './EmployeeDataExample.vue';
export default {
  components: { EmployeeDataExample },
    name : "EmployeeList",
}
</script>

<style>

</style>