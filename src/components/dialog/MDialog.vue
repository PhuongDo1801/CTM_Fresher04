<template>
  <div class="overlay"></div>
  <div class="dialog">
    <div class="dialog__container">
      <div class="dialog__top" v-if="title">
        <h3 class="dialog__header">{{ title }}</h3>
        <span @click="onCancel" class="dialog__icon"
          ><img class="base-icon" src="@/assets/icon/xmark-solid.svg" alt="close-icon"
        /></span>
      </div>
      <div class="dialog__mid">
        <span class="wrapper-icon">
          <span :class="[iconClass]"></span>
        </span>
        <span class="dialog__desc">{{ desc }}</span>
      </div>
      <div class="dialog__bottom">
        <button @click="onSuccess" class="base-btn regular-btn ml-8">
          <span class="btn__text">{{ btnSuccess }}</span>
        </button>
        <button @click="onCancel" class="base-btn sub-btn">
          <span class="btn__text btn__text--black">{{ btnCancle }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MDialog",
  props: {
    title: String,
    iconClass: String,
    desc: String,
    btnSuccess: String,
    btnCancle: String,
    // isShow: Boolean,
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onSuccess() {
      this.$emit("onSuccess");
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 19;
}
</style>
