<template>
  <input
    :title="title"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInputChangeText"

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
    handleInputChangeText(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("handleTextChange",event.target.value);
    },
  },
};
</script>

<style scoped>

</style>
