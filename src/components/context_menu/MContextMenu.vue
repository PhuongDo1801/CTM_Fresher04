<template>
  <ul class="context-menu" :style="{ top: topPosition }">
    <li class="context-menu__option option--copy">Nhân bản</li>
    <li class="context-menu__option option--delete">Xóa</li>
    <li class="context-menu__option option--stop">Ngừng sử dụng</li>
  </ul>
</template>

<script>
export default {
  name: "MContextMenu",
  data() {
    return {
      y: "100px",
    };
  },
  props: {
    topPosition: String,
  },
};
</script>

<style></style>
