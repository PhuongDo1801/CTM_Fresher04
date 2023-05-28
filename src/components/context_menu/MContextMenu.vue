<template>
  <ul class="context-menu" :style="{ top: topPosition }">
    <li class="context-menu__option option--copy">Nhân bản</li>
    <li @click="onDelete" class="context-menu__option option--delete">Xóa</li>
    <li class="context-menu__option option--stop">Ngừng sử dụng</li>
  </ul>
  <m-dialog
    v-if="isShowDialog"
    @onCancel="() => onCancel(onClose)"
    @onSuccess="() => onSuccess(employees, id, onClose, index)"
    title="Xóa bản ghi?"
    iconClass="icon-warning"
    desc="Bạn chắc chắn muốn xóa bản ghi?"
    btnSuccess="Đồng ý"
    btnCancle="Hủy"
  ></m-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "MContextMenu",
  data() {
    return {
      y: "100px",
      isShowDialog: false,
      isShowContextMenu: false,
      employees: [],
    };
  },
  created() {
    this.employees = this.employeeList;
  },
  props: {
    topPosition: String,
    id: Number,
    index: Number,
    onClose: Function,
    employeeList: Array,
  },

  methods: {
    onDelete() {
      this.isShowDialog = true;
    },
    onCancel(onClose) {
      this.isShowDialog = false;
      onClose();
    },
    onSuccess(employees, id, onClose, index) {
      axios
        .delete(`http://localhost:3000/employees/${id}`)
        .then(() => {
          employees = employees.splice(index, 1);
          console.log(this.employees);
          onClose();
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style></style>
