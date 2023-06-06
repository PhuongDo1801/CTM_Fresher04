<template>
  <div
    class="toast-message"
    :class="{
      active: 
      isDone,
    }"
  >
    <div class="toast-message__left">
      <div class="toast-message__left-icon">
        <div class="sprite-done-icon"></div>
      </div>
      <div class="toast-message__left-content">
        <span>{{ textMessage }}</span>
      </div>
    </div>
    <div class="toast-message__right">
      <div class="toast-message__right-content">
        <span>Hoàn tác</span>
      </div>
      <div class="toast-message__right-icon">
        <img src="../../assets/icon/close.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAToastMessage",
  props: {
    textMessage: String,
    isDone: Boolean,
  },
};
</script>

<style></style>
