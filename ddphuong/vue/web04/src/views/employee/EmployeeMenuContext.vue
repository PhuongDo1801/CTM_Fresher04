<template>
    <div class="dropdown-blue-icon-wraper">
        <i class="dropdown-blue-icon" @click="showContextMenu"></i>
        <ul class="table-list-option" v-if="isShowContextMenu">
            <li>Nhân bản</li>
            <li class="table-list-option-delete">Xóa</li>
            <li>Ngưng sử dụng</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "EmployeeMenuContext",
    data() {
        return {
            isShowContextMenu: false,
            showDeleteDialog: Function,
        } 
    },
    props: {
        
    },
    methods: {
        showContextMenu(){
            this.isShowContextMenu = !this.isShowContextMenu;
        }
    },
}
</script>

<style>

</style>