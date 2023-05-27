<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :title="title"
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
  name: "MISAInput",
  props: {
    title: String,
    placeholder: String,
    type: String,
    modelValue: String,
  },
};
</script>

<style></style>
