<!-- Chuyển sang tái sử dụng -->
<template>
    <div class="container__right-dialog">
        <div class="container__right-dialog-top">
            <div class="question-icon"></div>
            <!-- <i class="warning-icon"></i> -->
            <span>Bạn có thực sự muốn xóa người dùng này không ?</span>
        </div>
        <hr>
        <div class="container__right-dialog-bottom">
            <button class="container__right-dialog-btn cancel-btn"  @click="closePopupEmployee">Hủy</button>
            <button class="container__right-dialog-btn accept-btn" @click="handleDeleteEmployee">Đồng ý</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "EmployeeDelete",
    props: ["DeleteFunction"],
    methods: {
        handleDeleteEmployee(){ 
            this.DeleteFunction(true);
        },
        closePopupEmployee(){
            this.$emit("onClosePopupEmployee")
        }
    }
}
</script>

<style>

</style>