<template>
    <div class="account-details-container">
       <div class="account-details-overlay" v-if="isShowDialog"></div>
       <div class="account-details-top">
         <span class="account-details-title">
            {{ FormMode === this.$_MISAEnum.FormMode.Add || FormMode === this.$_MISAEnum.FormMode.Replicate ? this.$_MISAResource[this.$_LANGCODE].accountForm.add
          : this.$_MISAResource[this.$_LANGCODE].accountForm.update }}
         </span>
         <div class="account-details-icon-wraper">
            <i tabindex="0" class="sprite-info-icon"></i>
            <i @click="handleCloseAccountForm" tabindex="0" class="sprite-close-icon"></i>
         </div>
       </div>
       <div class="account-details-main">
            <div class="account-details-main-first">
                <div>
                    <label for="">Số tài khoản <span class="account-required">*</span></label>
                    <m-input  @handle-text-change="handleAccountNumberInputChange"  :class="{isError:this.errorField.accountNumber}" ref="accountNumberInputRef" v-model="accountData.AccountNumber"></m-input>
                </div>
                <div>
                   <div>
                        <label for="">Tên tài khoản <span class="account-required">*</span></label>
                        <m-input  @handle-text-change="handleAccountNameInputChange" :class="{isError:this.errorField.accountName}" ref="accountNameInputRef" v-model="accountData.AccountName"></m-input>
                   </div>
                   <div>
                        <label for="">Tên tiếng anh</label>
                        <m-input v-model="accountData.EnglishName"></m-input>
                   </div>
                </div>
                <div>
                    <div v-if="isShowListAccountGeneral" class="account-general-box">
                       <ul>
                            <li class="account-general-box-title">
                                <span>Số tài khoản</span>
                                <span>Tên tài khoản</span>
                            </li>
                            <li @click="handleChooseParentAccount(account)" :class="{isActive:account.AccountNumber === parseInt(textSearch)}"  class="account-item-value" v-for="account in accountList" :key="account.AccountId" >           
                                    <span :class="{isTextBold:account.IsParent === 1}" :style="{paddingLeft:`${account.level * 10}px`}">{{ account.AccountNumber }}</span>
                                    <span :class="{isTextBold:account.IsParent === 1}">{{ account.AccountName }}</span>                 
                            </li>   
                        
                       </ul>
                    </div>
                    <div>
                        <label for="">Tài khoản tổng hợp</label>
                        <m-input @handle-text-change="handleAccountGeneralInputChange" v-model="textSearch"></m-input>
                        <div @click="handleShowListAccountGeneral">
                            <i :class="{isIconRotate:isShowListAccountGeneral}"   class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                    </div>
                    <div>
                        <label for="">Tính chất <span class="account-required">*</span></label>
                        <m-input  @handle-text-change="handleNatureInputChange" :class="{isError:this.errorField.nature}" ref="natureInputRef" v-model="natureTextSearch"></m-input>
                        <div @click="handleShowListNature">
                            <i :class="{isIconRotate:this.isShowListNature}"  class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                        <ul class="nature-list-box" v-if="isShowListNature">
                            <li :class="{ isActive: nature.value === natureTextSearch }"  @click="()=>handleChooseNature(nature)" v-for="nature in natureList" :key="nature.key">{{ nature.value }}</li>                 
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="">Diễn giải</label>
                        <textarea v-model="accountData.AccountExplain" id="myTextarea" rows="2" cols="50" ></textarea>
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
                                <li :class="{ isActive: obj === this.checkboxObject.obj.value }" @click="()=>handleChooseObj(obj)" v-for="obj in objList" :key="obj">{{ obj }}</li>                 
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
                        <input  type="checkbox">
                        <label for="">Đối tượng THCP</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <input v-model="this.checkboxObject.objTHCP.value" v-bind:disabled="!this.checkboxObject.objTHCP.isCheck" v-bind:readonly="this.checkboxObject.objTHCP.isCheck" />
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
                            <input v-model="this.checkboxObject.construction.value" v-bind:disabled="!this.checkboxObject.construction.isCheck" v-bind:readonly="this.checkboxObject.construction.isCheck"/>
                            <div>
                                <i class="sprite-dropdown-container-top-black-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input  type="checkbox">
                        <label for="">Đơn đặt hàng</label>
                    </div>
                    <div>
                        <div class="input-select-wraper">
                            <input v-model="this.checkboxObject.order.value" v-bind:disabled="!this.checkboxObject.order.isCheck" v-bind:readonly="this.checkboxObject.order.isCheck"/>
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
                            <input v-model="this.checkboxObject.contractSell.value" v-bind:disabled="!this.checkboxObject.contractSell.isCheck" v-bind:readonly="this.checkboxObject.contractSell.isCheck" />
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
                            <input v-model="this.checkboxObject.contractPay.value" v-bind:disabled="!this.checkboxObject.contractPay.isCheck" v-bind:readonly="this.checkboxObject.contractPay.isCheck"/>
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
                            <input v-model="this.checkboxObject.items.value" v-bind:disabled="!this.checkboxObject.items.isCheck" v-bind:readonly="this.checkboxObject.items.isCheck"/>
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
                            <input v-model="this.checkboxObject.unit.value" v-bind:disabled="!this.checkboxObject.unit.isCheck" v-bind:readonly="this.checkboxObject.unit.isCheck"/>
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
                            <input v-model="this.checkboxObject.codeCharts.value" v-bind:disabled="!this.checkboxObject.codeCharts.isCheck" v-bind:readonly="this.checkboxObject.codeCharts.isCheck"/>
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
             class="button button--normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.cancelText"
                >
          </m-button>
            </div>
            <div>
            <m-button
            @click="handleSubmitForm"  
            ref="questionBtnRef"  
            tabindex="0"    
            class="button button--normal"
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.keep "
            
          >
          </m-button>
            <m-button   
            class="button button--success"
            @click="()=>handleSubmitForm(this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd)"  
            :btnName="this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd"
          >
          </m-button>     
            </div>
            
       </div>
    </div>
</template>

<script>
    import accountService from '@/services/AccountService';
    import { handleTreeObject} from "@/utils/handleTreeObject";
    import {validateNumber} from '@/utils/validateNumber'
    import { equalObject } from "@/utils/compareObject";
    export default {
        name:"AccountDetails",
        props:{
            accountDataProps:Object,
            handleUpdateAccountOnTable:Function,
            isShowDialog:Boolean,
            getFormSubmit: Function,
        },
        
        data() {
            return {
                checkboxObject:{
                    obj:{
                        value:"",
                        isCheck:false
                    },
                    objTHCP:{
                        value:"",
                        isCheck:false
                    },
                    order:{
                        value:"",
                        isCheck:false
                    },
                    contractPay:{
                        value:"",
                        isCheck:false
                    },
                    unit:{
                        value:"",
                        isCheck:false
                    },
                    bankAccount:{
                        value:"",
                        isCheck:false
                    },
                    construction:{
                        value:"",
                        isCheck:false
                    },
                    contractSell:{
                        value:"",
                        isCheck:false
                    },
                    items:{
                        value:"",
                        isCheck:false
                    },
                    codeCharts:{
                        value:"",
                        isCheck:false
                    }
                },
                accountData:{
                    AccountNumber:null,
                    AccountName:null,
                    EnglishName:null,
                    ParentId:null,
                    Nature:null,
                    AccountExplain:null ,
                    Status:1,
                    IsParent:0
                },
                isShowListAccountGeneral:false,
                isShowListObject:false,
                isShowListNature:false,
                objList:["Nhà cung cấp","Khách hàng","Nhân viên"],
                natureList:[
                    {key:1,value:"Dư nợ"}, 
                    {key:2,value:"Dư có"}, 
                    {key:3,value:"Lưỡng tính"}, 
                    {key:4,value:"Không có số dư "}, 
                ],
                offset : 0, 
                limit:15,
                natureTextSearch:"",
                textSearch:"",
                accountList:[],
                parentId:null,
                isGetAll:1,
                errorListRef:[],
                errorListMessages:[],
                accountClone:null,
                errorField:{
                    accountNumber:false,
                    accountName:false,
                    nature:false
                },
            }
        },

        methods:{
            handleCloseAccountForm(){          
                if (this.FormMode === this.$_MISAEnum.FormMode.Update) {
                    if (!equalObject(this.accountDataProps, this.accountData)) {
                    this.$emit("showCloseFormQuestion",this.$_MISAResource[this.$_LANGCODE].dialogMsg.closeFormQuestion);
                    this.getFormSubmit(this.handleSubmitForm);
                    }else{
                        this.$emit("handleCloseAccountForm");
                    }
                }

                if (this.FormMode === this.$_MISAEnum.FormMode.Add || this.FormMode === this.$_MISAEnum.FormMode.Replicate) {
                    if(!equalObject(this.accountClone, this.accountData)){
                        this.$emit("showCloseFormQuestion",this.$_MISAResource[this.$_LANGCODE].dialogMsg.closeFormQuestion);
                        this.getFormSubmit(this.handleSubmitForm);
                    }else{
                        this.$emit("handleCloseAccountForm");
                    }
                   
                }
            },

            handleShowListObject(){
                if(this.checkboxObject.obj.isCheck){
                    this.isShowListObject = !this.isShowListObject
                }
            },

            handleChooseObj(obj){
                this.checkboxObject.obj.value = obj; 
                this.isShowListObject = false; 
            },

            handleAccountGeneralInputChange(){
                if(this.textSearch.trim().length === 0){
                    this.accountData.ParentId = null; 
                }
                this.isShowListAccountGeneral = true; 
                const listFilter = this.accountList.filter(item=> item.AccountNumber.toString().includes(this.textSearch)).sort((a,b)=> a.AccountNumber - b.AccountNumber);               
                const rest = this.accountList.filter(item=> !item.AccountNumber.toString().includes(this.textSearch));
                this.accountList = listFilter.concat(rest); 
            },
            handleAccountNumberInputChange(){
                this.errorField.accountNumber = false; 
            },
            handleAccountNameInputChange(){
                this.errorField.accountName = false; 
            },

            handleNatureInputChange(){
                this.errorField.nature = false; 
            },
            handleShowListAccountGeneral(){
                this.isShowListAccountGeneral = !this.isShowListAccountGeneral;  
            },
            handleChooseNature(nature){
                this.accountData.Nature = nature.key; 
                this.natureTextSearch = nature.value; 
                this.isShowListNature = false; 
    
            },

            handleChooseParentAccount(account){
                this.textSearch = account.AccountNumber;
                this.accountData.ParentId = account.AccountId; 
                this.isShowListAccountGeneral = false; 
            },

            handleShowListNature(){
                this.isShowListNature = !this.isShowListNature; 
            },

            handleGetNodeTree(childList,results){
                childList?.forEach(item=>{
                    results?.push(item); 
                    if(item.children?.length > 0){
                        this.handleGetNodeTree(item.children,results); 
                    }
                })
            },

            async handleGetListAccount(){
                try {              
                const {Data} = await accountService.findByFilter(
                    this.offset,
                    this.limit,
                    this.textSearch,
                    this.parentId,
                    this.isGetAll
                );    
                 const trees = handleTreeObject(Data);     
                 trees.forEach(item=>{
                    this.accountList.push(item); 
                    if(item.children?.length > 0){
                        this.handleGetNodeTree(item.children,this.accountList); 
                    }
                 })

                 if (this.FormMode === this.$_MISAEnum.FormMode.Update) {
                    this.accountList = this.accountList.filter(item=>item.AccountId !== this.accountData.AccountId);
                    const parentAccount = this.accountList.find(item=>item.AccountId === this.accountData.ParentId);
                    if(parentAccount !== undefined){
                        this.textSearch = parentAccount.AccountNumber; 
                    } 
                }  
                    
                } catch (error) {
                    console.log(error); 
                }
            },

            handleValidateInput(){
                if(this.accountData.AccountNumber === null){
                    this.errorListMessages.push("Số tài khoản không được để trống.")
                    this.errorListRef.push(this.$refs.accountNumberInputRef); 
                    this.errorField.accountNumber = true; 
                }else if(validateNumber(this.accountData.AccountNumber)){
                        if( parseInt(this.accountData.AccountNumber) < 100){
                            this.errorListMessages.push("Số tài khoản phải từ 3 ký tự trở lên.")
                            this.errorListRef.push(this.$refs.accountNumberInputRef); 
                            this.errorField.accountNumber = true; 
                        }
                }else{
                    this.errorListMessages.push("Số tài khoản phải là số.")
                    this.errorListRef.push(this.$refs.accountNumberInputRef); 
                    this.errorField.accountNumber = true; 
                }
               
                

                if(this.accountData.AccountName === null){
                    this.errorListMessages.push("Tên tài khoản không được để trống.")
                    this.errorListRef.push(this.$refs.accountNameInputRef); 
                    this.errorField.accountName = true; 
                }else if(this.accountData.AccountName.trim().length > 255){
                    this.errorListMessages.push("Tên tài khoản không được lớn hơn 255 ký tự.")
                    this.errorListRef.push(this.$refs.accountNameInputRef); 
                }

                if(this.natureTextSearch.trim().length === 0){
                    this.errorListMessages.push("Tính chất không được để trống.")
                    this.errorListRef.push(this.$refs.natureInputRef); 
                    this.errorField.nature = true; 
                }

                if(this.errorListMessages.length > 0){
                    this.$emit("handleShowErrorMessage",this.errorListMessages,this.errorListRef,this.$_MISAEnum.DialogType.badRequest);            
                }
               
            },
            handleResetFormAndInitAccountData(){
                this.accountData =  { 
                    AccountNumber:null,
                    AccountName:null,
                    EnglishName:null,
                    ParentId:null,
                    Nature:null,
                    AccountExplain:null ,
                    Status:1,
                    IsParent:0 
                }
                this.textSearch = ""; 
            },

            async handleSubmitForm(typeBtn){
                try {
                    this.handleValidateInput(); 
                    if (this.errorListMessages.length > 0) {
                         this.errorListMessages = [];
                         this.errorListRef = [];
                        return;
                    }   
                    this.$emit("showLoadingIcon");
                    if (this.FormMode === this.$_MISAEnum.FormMode.Add || this.FormMode === this.$_MISAEnum.FormMode.Replicate) {
                        this.accountData.AccountNumber = parseInt(this.accountData.AccountNumber);
                        const { status, data } = await accountService.save(this.accountData);
                        if (status === this.$_MISAEnum.ResponseCode.created) {
                         if (typeBtn === this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
                          this.handleResetFormAndInitAccountData();
                         }
                         this.$emit("updateTableAccount",data,this.$_MISAEnum.ApiType.created,typeBtn);                   
                         this.$emit("hiddenLoadingIcon");
                        }
                    }else{
                            const { status, data } = await accountService.updateById(this.accountData.AccountId,this.accountData);
                            if (status === this.$_MISAEnum.ResponseCode.success) {
                                this.$emit("updateTableAccount",data,this.$_MISAEnum.ApiType.updated);   
                            }
                        }
                } catch (error) {   
                    console.log(error); 
                }
            },

        },
        watch:{
            'checkboxObject.obj.isCheck': function(value){
                if(value === true){
                    this.checkboxObject.obj.value = "Khách hàng";
                }else{
                    this.checkboxObject.obj.value = ""; 
                }
            },
            
           
            natureTextSearch:function(value){
                if(value === ""){
                    this.accountData.ParentId = null; 
                }
            }
        },

        computed:{
            FormMode:function(){
                if (this.accountDataProps === null) {
                    return this.$_MISAEnum.FormMode.Add;
                } 
                if(this.accountDataProps !== null){
                    return this.$_MISAEnum.FormMode.Update;
                }
                if(this.accountDataProps !== null){
                    return this.$_MISAEnum.FormMode.Replicate;
                }
                return null; 
            }
        },
        mounted(){
            if(this.natureTextSearch.trim().length === 0){
                this.natureTextSearch = this.natureList[0].value; 
                this.accountData.Nature = this.natureList[0].key; 
            }

            if(this.accountDataProps !== null){
                const objectString = JSON.stringify(this.accountDataProps);
                this.accountData = JSON.parse(objectString); 
            }
            this.$refs.accountNumberInputRef.focus();          
            this.accountClone = Object.assign({}, this.accountData);
        },
        created(){
            this.handleGetListAccount(); 
        }
    }

</script>

<style scoped >
    .isIconRotate{
        transform: rotate(180deg);
    }
    .isActive{
        background-color: #50b83c;
        color: white;
    }

    .isError{
        border: 1px solid red !important;
    }
   .isActive:hover{
        background-color: #50b83c;
        color: white;
    }

    .isTextBold{
        font-weight:500
    }
</style>