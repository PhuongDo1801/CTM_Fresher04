<template>
    <div class="account-details-container">
       <div class="account-details-top">
        {{ accountData }}
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
                    <m-input v-model="accountData.AccountNumber"></m-input>
                </div>
                <div>
                   <div>
                        <label for="">Tên tài khoản <span class="account-required">*</span></label>
                        <m-input v-model="accountData.AccountName"></m-input>
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
                            <li :class="{isTextBold:account.IsParent === 1}" class="account-item-value" v-for="account in accountList" :key="account.AccountId" >           
                                    <span :style="{paddingLeft:`${account.level * 10}px`}">{{ account.AccountNumber }}</span>
                                    <span>{{ account.AccountName }}</span>                 
                            </li>   
                        
                       </ul>
                    </div>
                    <div>
                        <label for="">Tài khoản tổng hợp</label>
                        <m-input v-model="textSearch"></m-input>
                        <div @click="handleShowListAccountGeneral">
                            <i  class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                    </div>
                    <div>
                        <label for="">Tính chất <span class="account-required">*</span></label>
                        <m-input v-model="accountData.Nature"></m-input>
                        <div @click="handleShowListNature">
                            <i class="sprite-dropdown-container-top-black-icon"></i>
                        </div>
                        <ul class="nature-list-box" v-if="isShowListNature">
                            <li :class="{ objActive: nature === this.accountData.Nature }"  @click="()=>handleChooseNature(nature)" v-for="nature in natureList" :key="nature">{{ nature }}</li>                 
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
    import accountService from '@/services/AccountService';
    import { handleTreeObject} from "@/utils/handleTreeObject";
    export default {
        name:"AccountDetails",
        props:{
            accountDataProps:Object
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
                    AccountNumber:"",
                    AccountName:"",
                    EnglishName:null,
                    ParentId:null,
                    Nature:"",
                    AccountExplain:null ,
                    Status:1,
                    IsParent:0
                },
                isShowListAccountGeneral:false,
                isShowListObject:false,
                isShowListNature:false,
                objList:["Nhà cung cấp","Khách hàng","Nhân viên"],
                natureList:["Dư nợ", "Dư có", "Lưỡng tính", "Không có số dư "],
                offset : 0, 
                limit:15,
                textSearch:"",
                accountList:[],
                parentId:null,
                isGetAll:1,
            }
        },

        methods:{
            handleShowListAccountGeneral(){
                this.isShowListAccountGeneral = !this.isShowListAccountGeneral;
                this.handleGetListAccount();  
            },
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
            },

            handleChooseNature(nature){
                this.accountData.Nature = nature; 
                this.isShowListNature = false; 
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
                } catch (error) {
                    console.log(error); 
                }
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
            if(this.accountData.Nature.trim().length === 0){
                    this.accountData.Nature = this.natureList[0]; 
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

    .isTextBold{
        font-weight:500
    }
</style>