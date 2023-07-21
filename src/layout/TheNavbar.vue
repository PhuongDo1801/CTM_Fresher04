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
      <div class="container__right-navbar-right-wraper">
    
        <!-- <i class="sprite-circle-dropdown "></i> -->

        <div class="right__navbar-input-wrap">
            <m-input :placeholder = "this.$_MISAResource[this.$_LANGCODE].pagesName.findTextTop"></m-input>
            <i class="sprite-search-icon"></i>
        </div>
        <div><i class="sprite-setting-icon"></i></div>
        <div><i class="sprite-message-icon"></i></div>
        <div><i class="sprite-question-icon-normal"></i></div>
        <div><i class="sprite-bell-icon"></i></div>
      </div>
      <span class="container__right-navbar-username">Nguyễn Đức Thịnh</span>
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
