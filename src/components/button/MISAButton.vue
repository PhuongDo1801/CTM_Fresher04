<template>
    <button
        v-if="
          dialogTypeClick.type ===
          this.$_MISAResource[this.$_LANGCODE].dialogType.delete
        "
        @click="handleDeleteEmployee"
        id="btn-allow-delete"
        class="container__right-dialog-btn"
      >
        {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText }}
      </button>
</template>
  
  <script>
  export default {
    name: "MISAButton",
    props: {
      buttonName:String
    },
    data() {
      return {
        
      };
    },
    methods: {
     
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  