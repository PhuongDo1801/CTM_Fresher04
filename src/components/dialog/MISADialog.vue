<template>
  <div class="container__right-dialog" :class="{ active: isShowDialog }">
    <div class="container__right-dialog-top">
      <i
        v-if="isDialogCreateClick || isDialogUpdateClick || isDialogDeleteClick"
        class="sprite-warning-icon"
      ></i>
      <i v-if="isDialogEmptyClick" class="sprite-exc-point-icon"></i>
      <ul class="dialog-content-list">
        <li v-for="text in textDialog" :key="text">{{ text }}</li>
      </ul>
    </div>
    <hr />
    <div class="container__right-dialog-bottom">
      <button
        v-if="isDialogDeleteClick"
        @click="handleCancelDelete"
        id="btn-not-allow-delete"
        class="container__right-dialog-btn"
      >
        {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText }}
      </button>
      <button
        v-if="isDialogDeleteClick"
        @click="handleDeleteEmployee"
        id="btn-allow-delete"
        class="container__right-dialog-btn"
      >
        {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
      </button>

      <button
        v-if="isDialogCreateClick"
        @click="handleCloseDuplicateForm"
        id="btn-allow-delete"
        class="container__right-dialog-btn"
      >
        {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
      </button>

      <button
        v-if="isDialogEmptyClick"
        @click="handleCloseEmptyInputForm"
        id="btn-allow-delete"
        class="container__right-dialog-btn"
      >
        {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialog",
  props: {
    handleDeleteEmployee: Function,
    handleCancelDelete: Function,
    handleCloseDuplicateForm: Function,
    handleCloseEmptyInputForm: Function,
    textDialog: Array,
    isShowDialog: Boolean,
    isDialogCreateClick: Boolean,
    isDialogDeleteClick: Boolean,
    isDialogUpdateClick: Boolean,
    isDialogEmptyClick: Boolean,
  },
};
</script>

<style  scoped>
  .dialog-content-list{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .dialog-content-list li{
     margin: 5px;
  }
</style>
