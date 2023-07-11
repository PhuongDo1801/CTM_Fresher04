<template>
  <div ref="dialogRef" class="container__right-dialog"  v-show="isShowDialog">
    <div  class="container__right-dialog-top">
      <div tabindex="0" ref="myComponent"></div>
      <i
        v-if="
          dialogType === this.$_MISAEnum.DialogType.delete ||
          dialogType === this.$_MISAEnum.DialogType.duplicate || 
          dialogType === this.$_MISAEnum.DialogType.deleteMultiple||
          dialogType === this.$_MISAEnum.DialogType.conflict
        "
        class="sprite-warning-icon"
      ></i>
      <i
        v-if="dialogType === this.$_MISAEnum.DialogType.question"
        class="sprite-question-icon"
      ></i>

      <i
        v-if="dialogType === this.$_MISAEnum.DialogType.badRequest || dialogType === this.$_MISAEnum.DialogType.notFound ||  dialogType === this.$_MISAEnum.DialogType.serverError"
        class="sprite-exc-point-icon"
      ></i>
      <ul class="dialog-content-list">
        <li :class="{noneStyle:textDialog.length < 2}" v-for="text in textDialog" :key="text">{{ text }}</li>
        <span></span>
      </ul>
    </div>
    <hr />

    <template v-if="dialogType ===  this.$_MISAEnum.DialogType.question">
      <div class="container__right-dialog-bottom">
        <div class="container__right-dialog-bottom-left">
          <m-button  
            ref="questionBtnRef"  
            tabindex="0"    
            @click="handleCloseDialog"
            class="container__right-dialog-btn normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText"
          >
          </m-button>
        </div>

        <div class="container__right-dialog-bottom-right">
          <m-button        
            @click="handleCloseEmployeeForm"
            class="container__right-dialog-btn normal"
            :btnName=" this.$_MISAResource[this.$_LANGCODE].textBtnForm.notAllowText"
          >
          </m-button>

        <m-button       
          @click="handleSubmitForm"
          @keydown.tab.prevent="handleTabIndex()"
          class="container__right-dialog-btn success"
          :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText"
        >
        </m-button>
        </div>     

      </div>
    </template>


    <template v-if="dialogType ===  this.$_MISAEnum.DialogType.deleteMultiple">
      <div class="container__right-dialog-bottom">
        <div class="container__right-dialog-bottom-left">
          <m-button          
            @click="handleCloseDeleteMultipleDialog"
            class="container__right-dialog-btn normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText"
          >
        </m-button>
        </div>
    
        <div class="container__right-dialog-bottom-right">
          <m-button   
            @click="handleDeleteMultiple"
            class="container__right-dialog-btn success"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText"
          >
        </m-button>     
        </div>     
      </div>
    </template>


    <template v-if="dialogType === this.$_MISAEnum.DialogType.delete">
      <div class="container__right-dialog-bottom">
        <div class="container__right-dialog-bottom-left">
          <m-button         
            @click="handleCloseDialog"
            class="container__right-dialog-btn normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText"
          >
        </m-button>
        </div>

        <div class="container__right-dialog-bottom-right">
          <m-button      
            @click="handleDeleteEmployee"
            class="container__right-dialog-btn success"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.confirmText"
          >
        </m-button>    
        </div>     
      </div>
    </template>

    <template v-if="dialogType === this.$_MISAEnum.DialogType.conflict||dialogType === this.$_MISAEnum.DialogType.notFound">
      <div class="container__right-dialog-bottom">     
        <div class="container__right-dialog-bottom-right">
          <m-button            
            @click="handleCloseDialog"
            class="container__right-dialog-btn success"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.agreeText"
          >
        </m-button>    
        </div>     

      </div>
    </template>

    <template v-if="dialogType === this.$_MISAEnum.DialogType.badRequest">
      <div class="container__right-dialog-bottom">
        <div class="container__right-dialog-bottom-center">
            <m-button         
              @click="handleCloseDialog"
              class="container__right-dialog-btn normal"
              :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.closeText"
            >
            </m-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MISADialog",
  props: {
    handleDeleteEmployee: Function,
    handleCloseEmployeeForm: Function,
    handleSubmitForm:Function,
    handleCloseDialog: Function,
    handleCloseDeleteMultipleDialog:Function,
    handleDeleteMultiple:Function,
    textDialog: Array,
    isShowDialog: Boolean,
    dialogType: String,

  },

  methods:{
    /**
    * Mô tả: Xử lý tab cho button
    * created by: ndthinh
    * created date: 04-07-2023
    */
    handleTabIndex(){
      console.log(this.$refs.questionBtnRef);
      this.$refs.questionBtnRef.$el.focus(); 
    }
  },
  watch: {
    /**
    * Mô tả: Theo dõi thay đổi của biến hiển thị để focus vào component
    * created by: ndthinh
    * created date: 04-07-2023
    */
    isShowDialog(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.myComponent.focus();
        });
      }
    }
  },
};
</script>

<style scoped>
.dialog-content-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  flex: 1;
  width: 270px;
  padding-left: 20px;
}

.dialog-content-list li {
  margin: 5px;
}
.noneStyle{
  list-style:none;
}
</style>
