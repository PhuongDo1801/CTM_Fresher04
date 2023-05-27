<template>
  <div class="container">
    <div class="container__left">
      <TheSidebar />
    </div>
    <div class="container__right">
      <TheNavbar />
      <TheMain />
    </div>

  </div>
</template>

<script>
import TheSidebar from "./layout/TheSidebar.vue";
import TheNavbar from "./layout/TheNavbar.vue";
import TheMain from "./layout/TheMain.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheNavbar,
    TheMain,
  },

  data(){
    return {
       
    }
  },
  mounted(){
    
  }
};
</script>

<style>
@import url(@/css/style.css);
</style>
