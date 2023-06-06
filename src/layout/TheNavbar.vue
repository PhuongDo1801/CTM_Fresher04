<template>
  <div class="container__right-navbar">
    <div class="container__right-navbar-left">
      <i class="sprite-menu-icon"></i>
      <span>
        {{ this.$_MISAResource[this.$_LANGCODE].navbar.companyName }}</span
      >
      <!-- <img src="./assets/icon/dropdown.png" alt="" /> -->
    </div>
    <div class="container__right-navbar-right">
      <i class="sprite-bell-icon"></i>
      <i class="sprite-user-icon"></i>
      <span>Nguyễn Văn Mạnh</span>
      <!-- <img src="./assets/icon/dropdown.png" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  components: {},
};
</script>

<style></style>
