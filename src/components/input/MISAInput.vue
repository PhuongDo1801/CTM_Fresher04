<template>
  <input
    :title="title"
    :placeholder="placeholder"
    :value="modelValue"
    type="text"
    @input="handleInputChangeText"
    ref="inputRef"
  />
</template>

<script>
export default {
  name: "MISAInput",
  props: {
    title: String,
    placeholder: String,
    type: String,
    modelValue: String,
    isTextChange: Boolean,
  },
  data() {
    return {
      textChange: false,
    };
  },
  methods: {
    focus() {
      this.$refs.inputRef.focus();
    },
    handleInputChangeText(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("handleTextChange", event.target.value);
    },
  },
};
</script>

<style scoped></style>
