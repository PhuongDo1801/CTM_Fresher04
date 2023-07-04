<template>
  <div class="container__right-dialog" :class="{ active: isShowDialog }">
    <div class="container__right-dialog-top">
      <i
        v-if="
          dialogType === this.$_MISAEnum.DialogType.delete ||
          dialogType === this.$_MISAEnum.DialogType.duplicate || 
          dialogType === this.$_MISAEnum.DialogType.deleteMultiple
        "
        class="sprite-warning-icon"
      ></i>
      <i
        v-if="dialogType === this.$_MISAEnum.DialogType.question"
        class="sprite-question-icon"
      ></i>

      <i
        v-if="dialogType === this.$_MISAEnum.DialogType.badRequest"
        class="sprite-exc-point-icon"
      ></i>
      <ul class="dialog-content-list">
        <li v-for="text in textDialog" :key="text">{{ text }}</li>
        <span></span>
      </ul>
    </div>
    <hr />
    <div class="container__right-dialog-bottom">
      <div class="container__right-dialog-bottom-left">
        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.question"
          @click="handleCloseDialog"
          class="container__right-dialog-btn danger"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.deleteMultiple"
          @click="handleCloseDeleteMultipleDialog"
          class="container__right-dialog-btn danger"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.delete"
          @click="handleCloseDialog"
          class="container__right-dialog-btn danger"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText }}
        </button>
      </div>

      <div class="container__right-dialog-bottom-center">
        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.badRequest"
          @click="handleCloseDialog"
          class="container__right-dialog-btn success"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.closeText }}
        </button>
      </div>

      <div class="container__right-dialog-bottom-right">
        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.question"
          @click="handleCloseEmployeeForm"
          class="container__right-dialog-btn danger"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.notAllowText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.delete"
          @click="handleDeleteEmployee"
          class="container__right-dialog-btn success"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.deleteMultiple"
          @click="handleDeleteMultiple"
          class="container__right-dialog-btn success"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.duplicate"
          @click="handleCloseDialog"
          class="container__right-dialog-btn success"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.agreeText }}
        </button>

        <button
          v-if="dialogType === this.$_MISAEnum.DialogType.question"
          @click="handleSubmitForm"
          class="container__right-dialog-btn success"
        >
          {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialog",
  props: {
    handleDeleteEmployee: Function,
    handleCloseEmployeeForm: Function,
    handleSubmitForm:Function,
    handleCloseDialog: Function,
    handleCloseDeleteMultipleDialog:Function,
    handleDeleteMultiple:Function,
    textDialog: Array,
    isShowDialog: Boolean,
    dialogType: String,

  },
};
</script>

<style scoped>
.dialog-content-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  flex: 1;
  width: 270px;
}

.dialog-content-list li {
  margin: 5px;
  list-style: none;
}
</style>
