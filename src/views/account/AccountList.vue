<template>
    
    <AccountDetails v-if="isShowAccountDetails"
     @handle-close-account-form="handleCloseAccountForm"
     :handleUpdateAccountOnTable="handleUpdateAccountOnTable"
     :accountDataProps="accountDataProps"
     :isShowDialog="isShowDialog"
     @update-table-account="handleUpdateAccountOnTable"
     @handle-show-error-message="handleShowDialogErrorInput"
     :getFormSubmit="getFormSubmit"
     @show-close-form-question="handleShowCloseFormQuestion"
    />

    <div v-if="isLoadingData">
      <img class="loader" src="../../assets/img/loading.svg" alt="" />
    </div>

    <div
      v-if="isShowOverlay"
      class="container__right-overlay"
    ></div>
  
  
    <div
      v-show="isShowOverlayTransparent"
      class="container__right-overlay-transparent"
      @click="handleHiddenOverlayTrs"
    ></div>
  
    <m-toast-message
      :textMessage="textMessage"
      :isDone="isDone"
    ></m-toast-message>
  
    <m-dialog
      :textDialog="textDialog"
      :isShowDialog="isShowDialog"
      :dialogType="dialogType"
      :handleCloseDialog="handleCloseDialog"
      :handleSubmitForm="handleSubmitForm"
      :handleCloseForm="handleCloseForm"
      :handleCloseDeleteMultipleDialog="handleCloseDeleteMultipleDialog"
      :handleDeleteAccount="handleDeleteAccount"
      :pageName="pageName"
      ></m-dialog>
  
    <div class="container__right-main-top">
      <span> {{ this.$_MISAResource[this.$_LANGCODE].pagesName.account }}</span>
    </div>
    <div class="container__right-main-body">
      <div class="container__right-search">  
        <div class="container__input">
            <m-input :placeholder = "this.$_MISAResource[this.$_LANGCODE].pagesName.findTextAccount"></m-input>
            <i class="sprite-search-icon"></i>
        </div>
        <div class="container__right-search-wrap">
          <span v-if="isExtends === true" @click="handleShowAllChild" class="container-extend-text">Mở rộng</span>
          <span v-if="isExtends === false" @click="handleHiddenAllChild" class="container-extend-text">Thu gọn</span>
          <i @click="handleReloadTable" class="sprite-refresh-icon"></i>
          <i @click="handleExportToExcelFile" class="sprite-excel-icon"></i>
          <i class="sprite-setting-icon-blur"></i>
          <div class="container__right-btn-wraper">
            <m-button  
              class="button button--circle--border-default"
              :btnName="this.$_MISAResource[this.$_LANGCODE].textBtn.toggleAccount"
            >
            </m-button>
  
            <m-button  
              @click="handleShowAccountForm"
              class="button button--circle--success"
              :btnName="this.$_MISAResource[this.$_LANGCODE].textBtn.add"
              :isCircleSuccess="true"
            >
            </m-button> 
  
          </div>
        </div>
      </div>
  
      <div class="container__right-table">
        <div class="container__right-table-item">
          <table id="container__table">
            <thead>
              <tr>
                <!-- <th>
                  <input @change="handleToggleCheckedAll()" v-model="isCheckedAll" name="input-table-checkbox" type="checkbox"/>
                </th> -->
                <th model-name="code">
                  SỐ TÀI KHOẢN
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeCode}} -->
                </th>
                <th model-name="name">
                  TÊN TÀI KHOẢN
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeName}} -->
                </th>
                <th model-name="gender">
                  TÍNH CHẤT
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeGender}} -->
                </th>
                <th model-name="dateOfBirth" type="date">
                  TÊN TIẾNG ANH
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeDob}} -->
                </th>
                <th style="width: 40%;text-align: left;" model-name="identityNumber">
                  DIỄN GIẢI
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeIdentityNum}} -->
                </th>
                <th model-name="positionName">
                  TRẠNG THÁI
                  <!-- {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeePositionName}} -->
                </th>
               
                <th type="operation">
                  {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeOperation}}
                </th>
              </tr>
            </thead>
            
            <tbody>
              <tr
                @dblclick="getSingleValueAccount(account)"
                v-for="(account, key) in accounts"
                :key="account.AccountId"
              >
                <td class="account-table-td">
                  <div :style="{marginLeft:`${account.level * 30}px`}" >
                    <i :class="{hidden: this.accountKeyObjectClick[account.AccountId] === true}" v-if="account.IsParent === 1" @click="()=>handleGetChildAccount(account,key)" class="sprite-box-plus-icon"></i>
                    <i :class="{show:this.accountKeyObjectClick[account.AccountId] === true}" class="sprite-box-div-icon" @click="()=>handleHiddenChildAccount(account)"></i>
                    <div v-if="account.IsParent === 0" class="space-box"></div>
                    <span class="account-text-value" :class="{isTextBold:account.IsParent === 1}">
                      {{ account.AccountNumber }}
                    </span>
                </div>
                </td>
                <td>{{ account.AccountName }}</td>
                <td>{{ this.$_MISAResource[this.$_LANGCODE].AccountNature[account.Nature]}}</td>
                <td>{{ account.EnglishName }}</td>
                <td style="text-align: left;">{{ account.AccountExplain }}</td>
                <td :class="{isTextBold:account.IsParent === 1}">{{ this.$_MISAResource[this.$_LANGCODE].AccountStatus[account.Status]}}</td>
                
           
             
                <td :class="{zIndexInc:optionIndex === key}"  @dblclick.stop>
                  <div>
                    <span>{{this.$_MISAResource[this.$_LANGCODE].employeeOptions.title}}</span>
                    &ensp;
                    <div
                    @click="handleShowOptions(key,$event)"
                    class="sprite-dropdown-blue-icon-wraper"
                    >
                      <i class="sprite-dropdown-blue-icon"></i>
                      <ul
                        :class="{menuBottom:isMenuBottom}"
                        ref="optionsRef"
                        class="table-list-option"
                        v-show="parseInt(optionIndex) === parseInt(key) && isOptionShow"
                      >
                        <li @click="handleReplication(employee)">{{this.$_MISAResource[this.$_LANGCODE].employeeOptions.replication}}</li>
                        <li
                          @click="handleShowDialogDelete(account)"
                          class="table-list-option-delete"
                        >
                          {{this.$_MISAResource[this.$_LANGCODE].employeeOptions.delete}}
                        </li>
                        <li>
                          {{this.$_MISAResource[this.$_LANGCODE].employeeOptions.stopUsing}}
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container__right-main-footer">
        <div>
          <div class="container__right-main-footer-left">
            <span
              >{{ this.$_MISAResource[this.$_LANGCODE].otherText.total }}: 
              <b>{{ totalRecord && totalRecord  }}</b>
            {{ this.$_MISAResource[this.$_LANGCODE].otherText.recordLower }}</span
            >
          </div>
          <div class="container__right-main-footer-right">
            <div class="container__footer-right-item-first">
              <div @click="handleShowPageList">
                <span>{{ originRecord}} {{ this.$_MISAResource[this.$_LANGCODE].otherText.totalRecord }}</span>
                <i :class="{isRotate:isPagingShow}" class="sprite-dropdown-gray-d-icon"></i>
                <ul v-show="isPagingShow" class="footer__pagesize-list">
                  <li
                    @click="handleChangeRowPage(item.value)"
                    v-for="item in pagings"
                    :key="item"
                  >
                    {{ item.value }}
                    {{ this.$_MISAResource[this.$_LANGCODE].otherText.totalRecord }}
                  </li>
                </ul>
              </div>
            </div>
         
            <div class="container__footer-right-item-three">
              <div class="footer-icon">
                <i  v-if="this.page === 1" @click="handleBackPage" class="sprite-arrow-left-icon"></i>
                <i  v-if="this.page > 1" @click="handleBackPage" class="sprite-arrow-right-icon" :class="{iconReverse:this.page > 1}"></i>
              </div>
                       
              <div class="footer-icon">
                <!-- v-if="this.page < Math.ceil(this.totalRecord / this.limit)" -->
                <i  @click="handleNextPage" class="sprite-arrow-right-icon"></i>
                <!-- <i v-if="this.page >= Math.ceil(this.totalRecord / this.limit)" @click="handleNextPage" class="sprite-arrow-left-icon" :class="{iconReverse:this.page > 1}"></i> -->
              </div>          
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import { customDateV1, customDateV2 } from "@/utils/date";
  import { handleTreeObject} from "@/utils/handleTreeObject";
  import accountService from "../../services/AccountService";
  import { pagings } from "../../data/paging";
  import AccountDetails from './AccountDetails.vue'; 
  export default {
    name: "EmployeeList",
    components: {
      AccountDetails
    },
    data() {
      return {
        isLoadingData: false,
        employeeCodeRef: null,
        isMenuBottom:false,
        departments: [],
        idCheckedList:[],
        idCheckedObject:{},
        isCheckedAll:false,
        idTimeOut: null,
        isMultiAction:false,
        formSubmit: null,
        inputErrorListRef: null,
        textSearch: "",
        offset: 0,
        limit: 15,
        page: 1,
        pagings,
        isPopupOverlayShow: false,
        textMessage: "",
        textDialog: [],
        isDone: false,
        isShowAccountDetails: false,
        optionIndex: null,
        isOptionShow: false,
        isShowOverlayTransparent: false,
        dialogType: null,
        isShowDialog: false,
        isShowOverlay: false,
        employeeId: null,
        accounts: [],
        accountsTemp:[],
        accountsFilter:[],
        employeeDataProps: null,
        formDetailsType:null, 
        isPagingShow: false,
        totalRecord: null,
        originRecord: 15,
        btnDisable:true,
        numCheckedNull:0,
        numCheckedNotNull:0,
        isActionListClick:false,
        parentId:null,
        indexClick:null,
        accountObject: null,
        accountKeyObjectClick:{},
        idListFilter:[],
        idListTempFilter:[],
        accountDataProps:null,
        accountId:null,
        pageName:"",
        isRequest:true,
        allListAccount : [],
        isExtends:true
      };
    },
    methods: {
      /**
      * Mô tả: Xử lý chọn tất cả checkbox
      * created by: ndthinh
      * created date: 02-07-2023
      */
      handleToggleCheckedAll(){
        if(this.isCheckedAll){
         this.employees.forEach(item=>{
          this.idCheckedObject[item.EmployeeId] = true; 
         })
         this.btnDisable = false; 
        }else{
          this.employees.forEach(item=>{
          delete this.idCheckedObject[item.EmployeeId]
         })
         const keyList = Object.keys(this.idCheckedObject); 
         if(keyList.length < 2){
          this.btnDisable = true; 
          this.isMultiAction = false; 
         }
        }
      },
  
      /**
      * Mô tả: Xử lý checkbox thay đổi giá trị
      * created by: ndthinh
      * created date: 02-07-2023
      */
      handleCheckboxChange(event,employeeId){
        if(event.target._modelValue){    
            this.idCheckedObject[employeeId] = true; 
            const keyList = Object.keys(this.idCheckedObject); 
            if(keyList.length >= 2){
              this.btnDisable = false; 
            }
            for( let employee of this.employees){
                const employeeExist = keyList.find(key => key === employee.EmployeeId)
                if(employeeExist === undefined){
                  this.isCheckedAll = false; 
                  return; 
                }
            }
  
            this.isCheckedAll = true; 
           
        }else{
             delete this.idCheckedObject[employeeId];
             const keyList = Object.keys(this.idCheckedObject); 
             if(keyList.length < 2){
              this.btnDisable = true; 
              this.isMultiAction = false; 
             }
  
             for( let employee of this.employees){
                const employeeExist = keyList.find(key => key === employee.EmployeeId)
                if(employeeExist === undefined){
                  this.isCheckedAll = false; 
                  return; 
                }
            }
        }
      },
      handleCloseForm(){
        this.isShowAccountDetails = false;
        this.handleResetAccountProps();
        this.handleCloseOverlay();
        this.isShowDialog = false;
        this.isPopupOverlayShow = false;
        this.textDialog = [];
      },
  
      /**
      * Mô tả:Ẩn chức năng xóa nhiều
      * created by: ndthinh
      * created date: 02-07-2023
      */
      handleActionListClick(){
        this.isActionListClick = true;
      },
  
    /**
      * Mô tả: Xử lý nhân bản
      * created by: ndthinh
      * created date: 02-07-2023
      */
      handleReplication(employee){
        this.employeeDataProps = employee; 
        this.isShowEmployeeDetails = true; 
        this.formDetailsType = this.$_MISAEnum.FormMode.Replicate
        this.isShowOverlay = true;
      },
  
  
      /**
      * Mô tả: Hiển thị hộp thoại xóa nhiều
      * created by: ndthinh
      * created date: 02-07-2023
      */
  
      handleShowDialogDeleteMultiple(){
        this.isShowDialog = true;
        this.dialogType = this.$_MISAEnum.DialogType.deleteMultiple;
        this.handleShowOverlay();
        this.textDialog.push(
          this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteMuitipleQuestion
        );
      },
  
      /**
      * Mô tả: Lấy form submit
      * created by: ndthinh
      * created date: 02-07-2023
      */
  
      getFormSubmit(formSubmit) {
        this.formSubmit = formSubmit;
      },
  
      /**
      * Mô tả: Hiển thị xóa nhiều
      * created by: ndthinh
      * created date: 02-07-2023
      */
      handleMultiAction(){
        this.isMultiAction = true; 
      },
  
      /**
      * Mô tả: Lấy input employee code
      * created by: ndthinh
      * created date: 02-07-2023
      */
      setEmployeeCodeRef(employeeCodeRef) {
        this.employeeCodeRef = employeeCodeRef;
      },
      /**
       * Mô tả: Xử lý thêm hoặc sửa nhân viên
       * created by : ndthinh
       * created date: 01-07-2023
       */
      handleSubmitForm() {
        this.textDialog = [];
        this.formSubmit();
      },
  
      /**
       * Mô tả: Xử lý lấy dữ liệu trang trước
       * created by : ndthinh
       * created date: 07-06-2023
       */
      async handleBackPage() {
        try {
          this.handleShowLoadingIcon();
          if (this.page > 1) {      
            this.offset = this.offset - this.limit;
            await this.getEmployeeList();
            this.page -= 1; 
            const keyList = Object.keys(this.idCheckedObject);         
            if(keyList.length < this.limit){
              this.isCheckedAll = false; 
            }else{         
              for( let employee of this.employees){
                const employeeExist = keyList.find(key => key === employee.EmployeeId)
                if(employeeExist === undefined){
                  this.isCheckedAll = false; 
                  return; 
                }
              }
              this.isCheckedAll = true;
            }
          } 
          this.handleHiddenLoadingIcon();
        } catch (error) {
          console.log(error);
          switch (error.code) {
            case 500:  
              this.workIsDone(this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,true)
            
              break;
            default:    
              this.workIsDone(this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,true)        
          }
        }
      },
  
      /**
       * Mô tả: Xử lý lấy dữ liệu trang tiếp theo
       * created by : ndthinh
       * created date: 07-06-2023
       */
      async handleNextPage() {
        try {
          this.handleShowLoadingIcon();
          if (this.page < Math.ceil(this.totalRecord / this.limit)) {
            this.offset = this.page * this.limit;
            this.page += 1;
            await this.getEmployeeList();
            const keyList = Object.keys(this.idCheckedObject);
            if(keyList.length < this.limit){
              this.isCheckedAll = false; 
            }else{         
              for( let employee of this.employees){
                const employeeExist = keyList.find(key => key === employee.EmployeeId)
                if(employeeExist === undefined){
                  this.isCheckedAll = false; 
                  return; 
                }
              }
              this.isCheckedAll = true;
            }
          }
          this.handleHiddenLoadingIcon();
        } catch (error) {
          switch (error.code) {
            case 500:         
                this.workIsDone(this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,true);
              break;
            default:
              this.workIsDone(this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,true);
          }
        }
      },
  
      /**
      * Mô tả: Xử lý hỏi trước khi đóng form
      * created by: ndthinh
      * created date: 03-07-2023
      */
      handleShowCloseFormQuestion(message) {
        this.dialogType = this.$_MISAEnum.DialogType.question;
        this.textDialog.push(message);
        this.isShowDialog = true;
        this.handleShowOverlay();
        this.isPopupOverlayShow = true;
      },
  
      /**
       * Mô tả: Hiển thị lỗi input trên dialog
       * created by : NDTHINH
       * created date: 30-06-2023
       */
      handleShowDialogErrorInput(errorList, inputErrorListRef, typeError) {
       
        this.dialogType = typeError;
        this.isShowDialog = true;
        this.inputErrorListRef = inputErrorListRef;
        errorList.forEach(item => {
          if (typeof item !== 'object') {
            this.textDialog.push(item); 
          }else{
            const keys = Object.keys(item);
            for(let key of keys){
              this.textDialog.push(item[key]);
            }
          }
        });
        this.isPopupOverlayShow = true;
      },
  
      /**
       * Mô tả: Xử lý hiện icon loading khi lấy dữ liệu
       * created by : ndthinh
       * created date: 17-06-2023
       */
  
      handleShowLoadingIcon() {
        this.isLoadingData = true;
      },
  
      /**
       * Mô tả: Xử lý ẩn icon loading khi lấy dữ liệu
       * created by : ndthinh
       * created date: 17-06-2023
       */
      handleHiddenLoadingIcon() {
        this.isLoadingData = false;
      },
  
      /**
       * Mô tả: Thay đổi số lượng dòng hiển thị
       * created by : ndthinh
       * created date: 07-06-2023
       */
      handleChangeRowPage(value) {
        this.originRecord = value;
        this.limit = value;
        this.getEmployeeList();
        if (parseInt(value) > this.totalRecord) {
          this.page = Math.ceil(this.totalRecord / this.limit);
          this.offset = (this.page - 1) * this.limit;
        } else {
          this.page = Math.ceil(parseInt(value) / this.limit);
          this.offset = (this.page - 1) * this.limit;
        }
      },
  
      /**
       * Mô tả: Hiển thị danh sách hiển thị số lượng dòng
       * created by : ndthinh
       * created date: 07-06-2023
       */
      handleShowPageList() {
        this.isPagingShow = !this.isPagingShow;
        this.isShowOverlayTransparent = true; 
      },
  
       /**
       * Mô tả: Ân overlay transparent
       * created by : ndthinh
       * created date: 07-06-2023
       */
      handleHiddenOverlayTrs(){
        this.isShowOverlayTransparent = false; 
        this.isOptionShow = false;
        this.isPagingShow = false; 
      },
  
      /**
       * Mô tả: Xử lý reset dữ liệu nhân viên trong props
       * created by : ndthinh
       * created date: 01-06-2023
       */
      handleResetAccountProps() {
        this.accountDataProps = null;
      },
      /**
       * Mô tả: Xử lý đóng dialog
       * created by : ndthinh
       * created date: 30-06-2023
       */
      handleCloseDialog() {
        if(this.dialogType === this.$_MISAEnum.DialogType.deleteMultiple || this.dialogType === this.$_MISAEnum.DialogType.delete){
          this.isShowDialog = false; 
          this.textDialog = [];
          this.idCheckedObject = {}; 
          this.dialogType = null; 
          this.btnDisable = true; 
          this.isMultiAction = false; 
          this.isCheckedAll = false;
          this.isActionListClick = false; 
          this.isShowOverlayTransparent = false; 
          this.handleCloseOverlay(); 
        }else{
        
           this.isShowDialog = false;
           this.isPopupOverlayShow = false;
           this.employeeId = null;
           this.textDialog = [];
           this.btnDisable = true; 
           this.isMultiAction = false;
           this.isCheckedAll = false; 
           this.idCheckedObject = {};
           this.dialogType = null;
           if (this.inputErrorListRef?.length > 0) {
             this.inputErrorListRef[0]?.focus();
             console.log(this.inputErrorListRef[0].value);
           } 
           this.inputErrorListRef = [];
        }
      },
  
      /**
      * Mô tả: Đóng dialog xóa nhiều
      * created by: ndthinh
      * created date: 6-07-2023
      */
  
      handleCloseDeleteMultipleDialog(){
        this.isShowDialog = false;
        this.isMultiAction = false;  
        this.isActionListClick = false; 
        this.textDialog = []; 
        this.handleCloseOverlay(); 
      }, 
  


      handleGetChildAccount(account,key){    
          this.parentId = account.AccountId; 
          this.indexClick = key; 
          this.isParentClick = true; 
          this.accountObject = account; 
          if(!Object.prototype.hasOwnProperty.call(this.accountKeyObjectClick, account.AccountId)){
            this.accountKeyObjectClick[account.AccountId] = true; 
            this.getAccountList();   
          }else{  
            this.isRequest = false; 
            this.accountKeyObjectClick[account.AccountId] = true; 
            let idList = []; 
            this.handleGetChildIdList(account.children,idList)
            if(idList.length === 0){
              const newData = handleTreeObject(this.accountsTemp); 
              const root = newData.find(item=> item.AccountId === account.AccountId); 
              if(root !== undefined){
                this.handleGetChildIdList(root.children,idList)
              }
            }
            const branchs = this.accountsTemp.filter(item=>idList.includes(item.AccountId)); 
            const treeBranchs = branchs.filter(item=>item.ParentId === account.AccountId);
            const restBranchs = branchs.filter(item=>item.ParentId !== account.AccountId)
            this.accounts = [...this.accounts.slice(0,this.indexClick + 1),...treeBranchs,...this.accounts.slice(this.indexClick + 1)]; 
            
            restBranchs.forEach(item=>{   
              let branchIndex = null;    
              const branchItem = this.accounts.find((account,index) => {
                if(account.AccountId === item.ParentId){
                  branchIndex = index; 
                  return account; 
                }
              }); 
              if(branchItem !== undefined){
                if(this.accountKeyObjectClick[branchItem.AccountId] === true){
                  this.accounts = [...this.accounts.slice(0,branchIndex + 1),item,...this.accounts.slice(branchIndex + 1)]; 
                }           
              }
            }) 
           
          }
        
      },


      handleGetChildIdList(childrenList,idChildList){
         childrenList.forEach((item)=>{
          if(item.children?.length > 0){
             this.handleGetChildIdList(item?.children,idChildList); 
          }
          idChildList?.push(item.AccountId); 
         })
      },

      handleHiddenChildAccount(account){   
        if(Object.prototype.hasOwnProperty.call(this.accountKeyObjectClick, account.AccountId)){
            this.accountKeyObjectClick[account.AccountId] = false; 
        }  
        let idList = [];  
        this.handleGetChildIdList(account.children,idList); 
        if(idList.length === 0){
              const newData = handleTreeObject(this.accountsTemp); 
              const root = newData.find(item=> item.AccountId === account.AccountId); 
              if(root !== undefined){
                this.handleGetChildIdList(root.children,idList)
              }
            }
        this.accounts = this.accounts.filter(account =>!idList.includes(account.AccountId));   
      }, 

      handleGetNodeTree(childList,results){
          childList?.forEach(item=>{
              results?.push(item); 
              if(item.children?.length > 0){
                  this.handleGetNodeTree(item.children,results); 
              }
        })
      },


      async handleGetChildByParent(listData,result){
        const length = listData.length; 
        for(let i = 0 ; i < length ; i++ ){
          if(listData[i].IsParent === 1){
            if(listData[i].AccountNumber === 4523452){
              console.log('very bad');
            }
            this.accountKeyObjectClick[listData[i].AccountId] = true; 
            this.parentId = listData[i].AccountId; 
              const {Data}  = await  accountService.findByFilter(
                this.offset,
                this.limit,
                this.textSearch,
                this.parentId
              );
        
              result.push(...Data);
              const dataFilter = Data.filter(item=> item.IsParent === 1); 
              if(dataFilter.length > 0){
                this.handleGetChildByParent(dataFilter,result); 
              }
          }
        }
      },

       async handleShowAllChild(){
        this.handleShowLoadingIcon(); 
        await this.handleGetChildByParent(this.accounts,this.allListAccount); 
        this.allListAccount = [...this.allListAccount,...this.accounts]; 
        this.accounts = []; 
        console.log('mm',this.allListAccount);
        const trees = handleTreeObject(this.allListAccount);     
                 trees.forEach(item=>{
                    this.accounts.push(item); 
                    if(item.children?.length > 0){
                        this.handleGetNodeTree(item.children,this.accounts); 
                    }
              })

        this.handleHiddenLoadingIcon(); 
        this.isExtends = false; 
      },
      
      handleHiddenAllChild(){
        this.isExtends = true; 
        this.accounts = [...this.accountsTemp]; 
        const keys = Object.keys(this.accountKeyObjectClick); 
        for(let key of keys){
          delete this.accountKeyObjectClick[key]; 
        }
        this.allListAccount = []; 
      },
  
      /**
       * Mô tả: Hiển lựa chọn số dòng hiển thị
       * created by : ndthinh
       * created date: 31-05-2023
       */
      handleShowPaging() {
        this.isPagingShow = !this.isPagingShow;
      },
      /**
       * Mô tả: Custom ngày tháng năm
       * created by : ndthinh
       * created date: 29-05-2023
       */
    
      /**
       * Mô tả:Hiển thị text message khi thực hiện xong công việc
       * created by : ndthinh
       * created date: 29-05-2023
       */
      workIsDone(text, isDone) {
        this.textMessage = text;
        this.isDone = isDone;
        setTimeout(() => {
          this.isDone = false;
        }, 3000);
      },
  
      /**
       * Mô tả: Hiển thị overlay
       * created by : ndthinh
       * created date: 29-05-2023
       */
      handleShowOverlay() {
        this.isShowOverlay = true;
      },
  
      /**
       * Mô tả: Tắt overlay
       * created by : ndthinh
       * created date: 29-05-2023
       */
      handleCloseOverlay() {
        this.isShowOverlay = false;
      },
      /**
       * Mô tả: Hiển hị form tạo nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
      handleShowAccountForm() {
        this.isShowAccountDetails = true;
        this.accountDataProps = null; 
        this.formDetailsType = this.$_MISAEnum.FormMode.Add;
        this.handleShowOverlay();
      },
  
      /**
       * Mô tả: Đóng nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
  
      handleCloseAccountForm() {
        this.isShowAccountDetails = false;
        this.handleResetAccountProps(); 
        this.handleCloseOverlay();
        this.isShowDialog = false;
        this.isPopupOverlayShow = false;
        this.textDialog = [];
      },
  
      /**
       * Mô tả: Xử lý hiển thị thao tác
       * created by : ndthinh
       * created date: 29-05-2023
       */
      handleShowOptions(key,event) {
        this.optionIndex = key;
        this.isOptionShow = !this.isOptionShow;
        this.isShowOverlayTransparent = true; 
        const y = event.clientY;
        var viewportHeight = window.innerHeight;
        if(viewportHeight - y < 200){
          this.isMenuBottom = true; 
        }else{
          this.isMenuBottom = false; 
        }
      },
  
      /**
       * Mô tả: Xử lý hiển thị câu hỏi xóa
       * created by : ndthinh
       * created date: 29-05-2023
       */
      handleShowDialogDelete(account) {
        this.isShowDialog = true;
        this.dialogType = this.$_MISAEnum.DialogType.delete;
        this.handleShowOverlay();
        this.isOptionShow = true;
        this.accountId = account?.AccountId;
        this.pageName="Account";
        this.textDialog.push(
          this.$_MISAResource[this.$_LANGCODE].accountMsg.deleteQuestion(
            account?.AccountNumber
          )
        );
      },
  
      /**
       * Mô tả: Lấy thông tin một nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
  
      getSingleValueAccount(account) {  
        this.accountDataProps = account;
        this.isShowAccountDetails = true;
      //  this.formDetailsType = this.$_MISAEnum.FormMode.Update
        this.handleShowOverlay();
      },
  
    
  
  
      /**
       * Mô tả: Xử lý thêm, sửa, xóa nhân viên trên table
       * created by : ndthinh
       * created date: 29-05-2023
       */
  
      async handleUpdateAccountOnTable(account,type,typeBtn) {
   
        try {
          if (typeBtn !== this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
              this.isShowAccountDetails = false;
              this.handleCloseOverlay();
          }       
          //thêm
                  
          if (type === this.$_MISAEnum.ApiType.created) {
            const parentIndex = this.accounts.findIndex(item=> item.AccountId === account.ParentId); 
         
            if(parentIndex === -1){
              account.level = 0; 
              account.children = []; 
              this.accounts.unshift(account);  
            }else{ 
              this.accounts[parentIndex].children = [];      
              account.level = this.accounts[parentIndex].level + 1;
              account.children = []; 
              this.handleGetChildAccount(this.accounts[parentIndex],parentIndex); 
              if(this.isRequest === false){
                this.accounts = [...this.accounts.slice(0,parentIndex + 1),{...account,level : this.accounts[parentIndex].level + 1},...this.accounts.slice(parentIndex + 1)];      
                this.isRequest = true; 
              }  
      
              this.handleShowToastMessage(this.$_MISAResource[this.$_LANGCODE].accountMsg.addSuccess);       
              return;
            }
          }
  
          //cập nhật

          if (type === this.$_MISAEnum.ApiType.updated) {
            if(account.ParentId === this.accountDataProps.ParentId){
              if (account !== null) {
                this.accounts = this.accounts.map((item) => {
                  if (item.AccountId === account?.AccountId) {
                    return account;
                  }
                  return item;
                });
              }
            }else{
              if(account.ParentId === null){
                account.level = 0; 
                this.accounts.unshift(account); 
              }
            
              const currentIndex = this.accounts.findIndex(item => item.AccountId === this.accountDataProps.AccountId);
              this.accounts = [...this.accounts.slice(0,currentIndex),...this.accounts.slice(currentIndex + 1)]; 
              const parentIndex = this.accounts.findIndex(item => item.AccountId === this.accountDataProps.ParentId);
             
             this.accounts[parentIndex].children = this.accounts[parentIndex].children.filter(item=> item.AccountId !== this.accountDataProps.AccountId); 
             console.log(123,this.accounts[parentIndex].children.length);
             if(this.accounts[parentIndex].children.length === 0){
                this.accounts[parentIndex].IsParent = 0; 
                delete this.accountKeyObjectClick[this.accounts[parentIndex].AccountId]; 
              }
                const parentIndexCurrent = this.accounts.findIndex(item=> item.AccountId === account.ParentId); 
                account.level = this.accounts[parentIndexCurrent].level  + 1; 
                this.accounts[parentIndexCurrent].children.push(account); 
                if(this.accounts[parentIndexCurrent].IsParent === 0){
                  this.accounts[parentIndexCurrent].IsParent = 1;
                }
                this.accountKeyObjectClick[this.accounts[parentIndexCurrent].AccountId] = true;
                this.accounts = [...this.accounts.slice(0,parentIndexCurrent + 1),account,...this.accounts.slice(parentIndexCurrent + 1)];
                
                const stringObject = JSON.stringify(this.accounts); 

                this.accountsTemp = JSON.parse(stringObject); 
              
            }

            this.isShowOverlayTransparent = false; 
            this.handleShowToastMessage(this.$_MISAResource[this.$_LANGCODE].accountMsg.updateSuccess);    
            this.accountDataProps = null;
            return;
          }
          //xóa

          const parentId = this.accountsTemp.find(item=> item.AccountId === this.accountId)?.ParentId;         
          this.accounts.forEach(item => {
            if(item.AccountId === parentId){
              if(item.children?.length > 0){
                item.children = item.children.filter(child => child.AccountId !== this.accountId); 
                if(item.children.length === 0){
                  item.IsParent = 0; 
                  this.accountKeyObjectClick[item.AccountId] = false;
                }
              } 
            }
          });

          this.accounts = this.accounts.filter(item => item.AccountId !== this.accountId);    
          this.handleShowToastMessage(this.$_MISAResource[this.$_LANGCODE].accountMsg.deleteSuccess);    
          this.isShowOverlayTransparent = false; 
          this.handleCloseOverlay(); 
          this.isOptionShow = false;
          setTimeout(() => {
            this.isDone = false;
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      },

      handleShowToastMessage(message){
        this.textMessage = message; 
        this.isDone = true;
        setTimeout(() => {
            this.isDone = false;
          }, 3000);
      },
  
      /**
      * Mô tả: Xử lý tải lại dữ liệu
      * created by: ndthinh
      * created date: 06-07-2023
      */
      handleReloadTable() {
        this.offset = 0;
        this.limit = 15;
        this.page = 1;
        this.originRecord = this.limit;
        this.getEmplodleDeleteyeeList();
      },
  
      /**
       * Mô tả: Call API xóa nhân account
       * created by : ndthinh
       * created date: 29-05-2023
       */
      async handleDeleteAccount() {
        try {
          this.handleShowLoadingIcon();
          const status = await accountService.deleteById(this.accountId);
          if (status === this.$_MISAEnum.ResponseCode.success) {
            this.isShowDialog = false;
            this.handleCloseOverlay();
            this.isOptionShow = false;
            this.handleUpdateAccountOnTable();
            this.textDialog = [];         
            this.totalRecord -= 1;
            this.dialogType = null;
          }
          this.handleHiddenLoadingIcon();
        } catch (error) {
          console.log(error);
        }
      },
  
      /**
      * Mô tả: Xử lý xuất danh sách nhân viên vào file excel
      * created by: ndthinh
      * created date: 10-07-2023
      */
      async handleExportToExcelFile(){
        // try {
        //   this.handleShowLoadingIcon(); 
        //   this.isShowOverlay = true; 
        //   const response = await employeeService.exportToExcel(); 
        //   if(response.status === this.$_MISAEnum.ResponseCode.success){
        //     const url = URL.createObjectURL(response.data); 
        //     const link = document.createElement('a'); 
        //     link.href = url; 
        //     link.download = `${this.$_MISAResource[this.$_LANGCODE].fileName.employee}.xlsx`; 
        //     document.body.appendChild(link); 
        //     link.click();
        //     link.remove();
        //     this.isLoadingData = false; 
        //     this.isShowOverlay = false; 
        //     URL.revokeObjectURL(); 
        //   }     
        // } catch (error) {
        //   this.isShowOverlay = false; 
        //   this.handleHiddenLoadingIcon(); 
        // }
      },
  
      /**
       * Mô tả: Lấy danh sách nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
      async getAccountList() {
        try {
          this.handleShowLoadingIcon();
          this.isLoadingData = true;
         
          const { Data, TotalRecord } = await accountService.findByFilter(
            this.offset,
            this.limit,
            this.textSearch,
            this.parentId
          );
        
          const listData  = [...this.accounts.slice(0,this.indexClick + 1),...Data,...this.accounts.slice(this.indexClick + 1)]
          const data = handleTreeObject(listData); 
          let flag = data.find(item => item?.children?.length > 0); 
          if(flag === undefined){
            this.accounts = data;
            const arrStr = JSON.stringify(data); 
            this.accountsTemp = JSON.parse(arrStr); 
          }else{  
            const newList = [...this.accounts.slice(0,this.indexClick + 1),...this.accountObject.children,...this.accounts.slice(this.indexClick + 1)]
            this.accounts = newList
            this.accountsTemp = [...this.accountsTemp,...this.accountObject.children]; 
          }
          this.totalRecord = TotalRecord;
          this.isLoadingData = false;
          this.isShowOverlayTransparent = false;
          this.handleHiddenLoadingIcon();
        } catch (error) {
          console.log(error);
          this.isLoadingData = false;
          
        }
      },
    },
  
     /**
      * Mô tả: call api
      * created by: ndthinh
      * created date: 20-06-2023
      */
  
    created() {
      this.getAccountList();
    },
  
  
    /**
      * Mô tả: Theo dõi biến tìm kiếm
      * created by: ndthinh
      * created date: 20-06-2023
      */
    watch: {
      textSearch(newValue) {
        if (this.idTimeOut !== null) {
          clearTimeout(this.idTimeOut);
        }
        const id = setTimeout(() => {
          this.getEmployeeList(newValue);
        }, 600);
        this.idTimeOut = id;
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("./account.css");
  .hidden{
    display: none;
  }
  .show{
    display: flex;
  }
  .menuBottom{
    top: -105px;
  }
  
  .iconReverse{
    transform: rotate(180deg);
  }
  .pagingShow {
    border: 1px solid green;
  }
  .disable{
    border-color: rgba(128, 128, 128, 0.262);
    cursor: default;
  }

  .isTextBold{
    font-weight: bold;
  }
  .isShowUtils{
    display: flex;
  }
  .loader {
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%);
    z-index: 99999;
  }
  
  .isRotate{
    transform: rotate(180deg);
  }
  .zIndexInc{
    z-index: 1;
  }

  
  
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  