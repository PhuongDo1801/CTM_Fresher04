<template>
  <span class="wrapper-input focus-green">
    <input
      class="base-input"
      :type="type"
      :placeholder="placeholder"
      :title="title"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <span class="wrapper-icon plr-8" v-if="urlIcon ? true : false">
      <!-- <img src="@/assets/icon/magnifying-glass-solid.svg" alt=""> -->
      <img class="search-icon" :src="urlIcon" alt="search-icon" />
    </span>
  </span>
</template>

<script>
export default {
  name: "MInput",

  props: {
    title: String,
    type: String,
    placeholder: String,
    className: String,
    urlIcon: String,
    modelValue: String,
  },
};
</script>

<style></style>
