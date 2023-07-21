<template>
    
    <AccountDetails v-if="isShowAccountDetails"
     @handle-close-account-form="handleCloseAccountForm"
     :accountDataProps="accountDataProps"
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
      :handleDeleteEmployee="handleDeleteEmployee"
      :handleSubmitForm="handleSubmitForm"
      :handleCloseEmployeeForm="handleCloseEmployeeForm"
      :handleDeleteMultiple="handleDeleteMultiple"
      :handleCloseDeleteMultipleDialog="handleCloseDeleteMultipleDialog"

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
          <span class="container-extend-text">Mở rộng</span>
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
                    <i :class="{hidden: this.AccountKeyObjectClick[account.AccountId] === true}" v-if="account.IsParent === 1" @click="()=>handleGetChildAccount(account,key)" class="sprite-box-plus-icon"></i>
                    <i :class="{show:this.AccountKeyObjectClick[account.AccountId] === true}" class="sprite-box-div-icon" @click="()=>handleHiddenChildAccount(account)"></i>
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
                          @click="handleShowDialogDelete(employee)"
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
        AccountKeyObjectClick:{},
        idListFilter:[],
        idListTempFilter:[],
        accountDataProps:null,
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
      handleResetEmployeeProps() {
        this.employeeDataProps = null;
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
           this.employeeCodeRef.focus(); 
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
  
      /**
       * Mô tả: Hàm xóa nhiều nhân viên
       * created by : ndthinh
       * created date: 22-06-2023
       */
      async handleDeleteMultiple(){
        
      },

      handleGetChildAccount(account,key){
          this.parentId = account.AccountId; 
          this.indexClick = key; 
          this.isParentClick = true; 
          this.accountObject = account; 
          if(!Object.prototype.hasOwnProperty.call(this.AccountKeyObjectClick, account.AccountId)){
            this.AccountKeyObjectClick[account.AccountId] = true; 
            this.getAccountList();   
          }else{  
            this.AccountKeyObjectClick[account.AccountId] = true; 
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
                if(this.AccountKeyObjectClick[branchItem.AccountId] === true){
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
        if(Object.prototype.hasOwnProperty.call(this.AccountKeyObjectClick, account.AccountId)){
            this.AccountKeyObjectClick[account.AccountId] = false; 
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
       * Mô tả: Đóng form tạo nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
  
      handleCloseAccountForm() {
        this.isShowAccountDetails = false;
        this.handleResetEmployeeProps();
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
      handleShowDialogDelete(employee) {
        this.isShowDialog = true;
        this.dialogType = this.$_MISAEnum.DialogType.delete;
        this.handleShowOverlay();
        this.isOptionShow = true;
        this.employeeId = employee?.EmployeeId;
        this.textDialog.push(
          this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteQuestion(
            employee?.EmployeeCode
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
  
      handleUpdateEmployeeOnTable(employee, type, typeBtn) {
        try {
          if (typeBtn !== this.$_MISAResource[this.$_LANGCODE].textBtnForm.keepAndAdd) {
              this.handleCloseEmployeeForm();
          }  
          //thêm
          if (type === this.$_MISAEnum.ApiType.created) {
            
            this.employees.unshift(employee);
            this.totalRecord += 1;
            this.employeeDataProps = null;
            this.isShowOverlayTransparent = false; 
            return;
          }
  
          //cập nhật
          if (type === this.$_MISAEnum.ApiType.updated) {
            if (employee !== null) {
              this.employees = this.employees.map((item) => {
                if (item.EmployeeId === employee?.EmployeeId) {
                  return employee;
                }
                return item;
              });
            }
            this.employeeDataProps = null;
            this.isShowOverlayTransparent = false; 
            return;
          }
  
          //xóa
          this.employees = this.employees.filter((item, index) => {
            return this.optionIndex !== index;
          });
          this.optionIndex = null;
          this.textMessage = this.$_MISAResource[this.$_LANGCODE].employeeMsg.deleteSuccess;
          this.isDone = true;
          this.isDialogDeleteClick = false;
          this.isShowOverlayTransparent = false; 
          this.isOptionShow = false;
          setTimeout(() => {
            this.isDone = false;
          }, 3000);
        } catch (error) {
          console.log(error);
        }
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
        this.getEmployeeList();
      },
  
      /**
       * Mô tả: Call API xóa nhân viên
       * created by : ndthinh
       * created date: 29-05-2023
       */
      async handleDeleteEmployee() {
        // try {
        //   this.handleShowLoadingIcon();
        //   const status = await employeeService.deleteById(this.employeeId);
        //   if (status === this.$_MISAEnum.ResponseCode.success) {
        //     this.isShowDialog = false;
        //     this.handleCloseOverlay();
        //     this.isOptionShow = false;
        //     this.handleUpdateEmployeeOnTable();
        //     this.textDialog = [];
        //     this.totalRecord -= 1;
        //     this.dialogType = null;
        //   }
        //   this.handleHiddenLoadingIcon();
        // } catch (error) {
        //   console.log(error);
        // }
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
      async getAccountList(textFilter) {
        try {
          this.handleShowLoadingIcon();
          this.isLoadingData = true;
         
          const { Data, TotalRecord } = await accountService.findByFilter(
            this.offset,
            this.limit,
            textFilter || this.textSearch,
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
  