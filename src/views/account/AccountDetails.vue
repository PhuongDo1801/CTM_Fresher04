<template>
    <div class="account-details-container">
       <div class="account-details-top">
         <span class="account-details-title">Thêm tài khoản</span>
         <div class="account-details-icon-wraper">
            <i tabindex="0" class="sprite-info-icon"></i>
            <i @click="handleCloseAccountForm" tabindex="0" class="sprite-close-icon"></i>
         </div>
       </div>
       <div class="account-details-main">
            <div class="account-details-main-first">
                <div>
                    <label for="">Số tài khoản <span class="account-required">*</span></label>
                    <m-input></m-input>
                </div>
                <div>
                   <div>
                        <label for="">Tên tài khoản <span class="account-required">*</span></label>
                        <m-input></m-input>
                   </div>
                   <div>
                        <label for="">Tên tiếng anh</label>
                        <m-input></m-input>
                   </div>
                </div>
                <div>
                    <div>
                        <label for="">Tài khoản tổng hợp</label>
                        <m-input></m-input>
                        <div>
                            <i class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                    </div>
                    <div>
                        <label for="">Tính chất <span class="account-required">*</span></label>
                        <m-input></m-input>
                        <div>
                            <i class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="">Diễn giải</label>
                        <textarea id="myTextarea" rows="2" cols="50" ></textarea>
                    </div>
                    <div>
                        <input type="checkbox">
                        <span>Có hoạch toán ngoại lệ</span>
                    </div>
                </div>
            </div>
            <div class="account-details-main-secound">
                <span> <i class="sprite-dropdown-black-icon"></i> &ensp; Theo dõi chi tiết theo</span>
                <div>
                    <div>
                        <input v-model="this.checkboxObject.obj.isCheck" type="checkbox">
                        <label for="">Đối tượng</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <input v-model="this.checkboxObject.obj.value" v-bind:disabled="!this.checkboxObject.obj.isCheck" v-bind:readonly="this.checkboxObject.obj.isCheck"/>
                            <div @click="handleShowListObject">
                                <i :class="{isIconRotate:this.isShowListObject}" class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                            <ul v-if="isShowListObject">
                                <li :class="{ objActive: obj === this.checkboxObject.obj.value }" @click="()=>handleChooseObj(obj)" v-for="obj in objList" :key="obj">{{ obj }}</li>                 
                            </ul>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox">
                        <label for="">Tài khoản ngân hàng</label>
                    </div>
                  
                </div>
                <div>
                    <div>
                        <input type="checkbox">
                        <label for="">Đối tượng THCP</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox">
                        <label for="">Công trình</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input ></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox">
                        <label for="">Đơn đặt hàng</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox">
                        <label for="">Hợp đồng bán</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox">
                        <label for="">Hợp đồng mua</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox">
                        <label for="">Khoản mục CP</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox">
                        <label for="">Đơn vị</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox">
                        <label for="">Mã thống kê</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <m-input></m-input>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div class="account-details-bottom">
            <div>
                <m-button  
            ref="questionBtnRef"  
            tabindex="0"    
            @click="handleCloseDialog"
            class="button button--normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText"
          >
          </m-button>
            </div>
            <div>
            <m-button  
            ref="questionBtnRef"  
            tabindex="0"    
            @click="handleCloseDialog"
            class="button button--normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.keep "
          >
          </m-button>


                <m-button   
            @click="handleDeleteMultiple"
            class="button button--success"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd"
          >
        </m-button>     
            </div>
            
       </div>
    </div>
</template>

<script>
    export default {
        name:"AccountDetails",

        
        data() {
            return {
                checkboxObject:{
                    obj:{
                        value:"",
                        isCheck:false
                    },
                    objTHCP:false,
                    order:false,
                    contractPay:false,
                    unit:false,
                    bankAccount:false,
                    construction:false,
                    contractSell:false,
                    items:false,
                    codeCharts:false
                },
                isShowListObject:false,
                objList:["Nhà cung cấp","Khách hàng","Nhân viên"]
            }
        },

        methods:{
            handleCloseAccountForm(){
                this.$emit("handleCloseAccountForm"); 
            },

            handleShowListObject(){
                if(this.checkboxObject.obj.isCheck){
                    this.isShowListObject = !this.isShowListObject
                }
            },

            handleChooseObj(obj){
                this.checkboxObject.obj.value = obj; 
                this.isShowListObject = false; 
            }
        },
        watch:{
            'checkboxObject.obj.isCheck': function(value){
                if(value === true){
                    this.checkboxObject.obj.value = "Khách hàng";
                }else{
                    this.checkboxObject.obj.value = ""; 
                }
            }
        }
    }

</script>

<style scoped >
    .isIconRotate{
        transform: rotate(180deg);
    }

    .objActive{
        background-color: #50b83c;
        color: white;
    }
</style>