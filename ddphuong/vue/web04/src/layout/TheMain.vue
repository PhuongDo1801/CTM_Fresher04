<template>
    <div class="container__right-main">
        <div class="container__right-overlay"></div>
        <EmployeeDelete></EmployeeDelete>
        <EmployeeDetail></EmployeeDetail>
        <div class="container__right-main-top">
            <span>Nhân viên</span>
            <button id="btn-add-employee">Thêm mới nhân viên</button>
        </div>
        <div class="container__right-main-body">
            <div class="container__right-search">
                <div class="container__right-search-input">
                    <input title="Tìm kiếm thông tin nhân viên" placeholder="Tìm theo mã, tên nhân viên" type="text" />
                    <i class="search-icon"></i>
                </div>
                <i class="refresh-icon"></i>
            </div>
            <EmployeeList></EmployeeList>
        </div>
    </div>
</template>
<script>
import EmployeeList from '@/views/employee/EmployeeList.vue';
import EmployeeDetail from '@/views/employee/EmployeeDetail.vue';
import EmployeeDelete from '@/views/employee/EmployeeDelete.vue';
export default {
    name: "TheMain",
    components: {
        EmployeeList,
        EmployeeDetail,
        EmployeeDelete,
    }
}
</script>

<style></style>