<template>
  <button class="base-btn" @click="onHandle">
    <span class="btn__text"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "MButton",

  methods: {
    onHandle() {
      this.$emit("onHandle");
    },
  },
};
</script>
<style></style>
