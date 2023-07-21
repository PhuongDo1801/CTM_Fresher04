<template>
     <button>
        <div v-if="!isCircleSuccess && !isCircleNormal">
          {{ btnName }}  
        </div> 

        <div v-if="isCircleNormal">
          {{ btnName }}  
        </div> 

        <div class="button-name" v-if="isCircleSuccess">
          {{ btnName }}  
        </div>   
          <div v-if="isCircleSuccess" class="button-hr"></div>
          <i v-if="isCircleNormal === true" class="sprite-dropdown-container-top-black-icon"></i>
          <div class="button-wraper-icon" v-if="isCircleSuccess === true" >
            <i class="sprite-dropdown-icon-white"></i>
          </div>
      </button>
</template>
  <script>
  export default {
    name: "MISAButton",
    props: {
      btnName:String,
      isCircleNormal:Boolean,
      isCircleSuccess:Boolean
    },
  };


  </script>
  
  <style scoped>

.button-name{
  width: calc(100px - 36px);
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px 0 0 30px ;
}

  .button-wraper-icon{
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:0 30px 30px 0;
  }

  .button-name:hover{
    background-color: #4acf2f;
  }
  .button-wraper-icon:hover{
    background-color: #4acf2f;
  }

  .button-hr{
    height: 28px;
    border: 0.5px solid white !important;
  }
  </style>
  