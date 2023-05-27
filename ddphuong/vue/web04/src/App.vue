<template>
  <div class="container">
    <div class="container__left">
      <TheSidebar></TheSidebar>
    </div>
    <div class="container__right">
      <TheNavbar></TheNavbar>
      <TheMain></TheMain>
    </div>
  </div>
  
</template>

<script>
import TheSidebar from './layout/TheSidebar.vue';
import TheNavbar from './layout/TheNavbar.vue';
import TheMain from './layout/TheMain.vue';

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheNavbar,
    TheMain,
  }
}
</script>

<style>
@import url('./css/layout.css');
@import url('./css/responsive.css');
</style>
