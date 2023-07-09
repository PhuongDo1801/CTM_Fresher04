<template>
  <EmployeeDetails
    v-if="isShowEmployeeDetails"
    :handleCloseEmployeeForm="handleCloseEmployeeForm"
    :getListEmployee="getEmployeeList"
    :handleShowOverlay="handleShowOverlay"
    :workIsDone="workIsDone"
    :isPopupOverlayShow="isPopupOverlayShow"
    :employeeDataProps="employeeDataProps"
    :departments="departments"
    :getFormSubmit="getFormSubmit"
    :formDetailsType="formDetailsType"
    @reset-employee-state="handleResetEmployeeProps"
    @update-table-employee="handleUpdateEmployeeOnTable"
    @show-loading-icon="handleShowLoadingIcon"
    @hidden-loading-icon="handleHiddenLoadingIcon"
    @get-Input-Error-Text="handleShowDialogErrorInput"
    @show-close-form-question="handleShowCloseFormQuestion"
    @get-Employee-Code-Input="setEmployeeCodeRef"
  />

  <div v-if="isLoadingData">
    <img class="loader" src="../../assets/img/loading.svg" alt="" />
  </div>

  <div
    :style="{
      display: isShowOverlay ? 'block' : 'none',
    }"
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
    <span> {{ this.$_MISAResource[this.$_LANGCODE].pagesName.employee }}</span>
    <button @click="handleShowEmployeeForm" id="btn-add-employee">
      {{ this.$_MISAResource[this.$_LANGCODE].textBtnForm.addEmployee }}
    </button>
  </div>
  <div class="container__right-main-body">
    <div class="container__right-search">
      <button @click="handleMultiAction" :disabled="btnDisable" class="container__right-search-btn" :class="{disable:btnDisable}">
        <span>{{ this.$_MISAResource[this.$_LANGCODE].employeeOptions.multipleAction}}</span>
        &nbsp;&nbsp;
        <i class="sprite-dropdown-container-top-icon"></i>
        <ul :class = "{isShowUtils : isMultiAction}">
          <li @click="handleShowDialogDeleteMultiple">{{ this.$_MISAResource[this.$_LANGCODE].employeeOptions.delete }}</li>
        </ul>
      </button>
      <div class="container__right-search-wrap">
        <div class="container__right-search-input">
          <input
            v-model="textSearch"
            :placeholder="this.$_MISAResource[this.$_LANGCODE].pagesName.findText"
            type="text"
            id="input-search"
          />
          <i class="sprite-search-icon"></i>
        </div>
        <i @click="handleReloadTable" class="sprite-refresh-icon"></i>
        <i @click="handleExportToExcelFile" class="sprite-excel-icon"></i>
      </div>
    </div>

    <div class="container__right-table">
      <div class="container__right-table-item">
        <table id="container__table">
          <thead>
            <tr>
              <th>
                <input @change="handleToggleCheckedAll()" v-model="isCheckedAll" name="input-table-checkbox" type="checkbox"/>
              </th>
              <th model-name="code">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeCode}}
              </th>
              <th model-name="name">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeName}}
              </th>
              <th model-name="gender">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeGender}}
              </th>
              <th model-name="dateOfBirth" type="date">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeDob}}
              </th>
              <th model-name="identityNumber">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeIdentityNum}}
              </th>
              <th model-name="positionName">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeePositionName}}
              </th>
              <th model-name="unitName">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeUnitName}}
              </th>
              <th model-name="bankAccount">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeBankAccount}}
              </th>
              <th model-name="bankName">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeBankName}}
              </th>
              <th model-name="branch">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeBankBranch}}
              </th>
              <th type="operation">
                {{this.$_MISAResource[this.$_LANGCODE].employeeTable.employeeOperation}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              @dblclick="getSingleValueEmployee(employee)"
              v-for="(employee, key) in employees"
              :key="employee.EmployeeId"
            >
              <td>
                <input
                  name="input-table-checkbox"
                  type="checkbox"
                  v-model="idCheckedObject[employee.EmployeeId]"    
                  @change="handleCheckboxChange($event, employee?.EmployeeId)"
                  @dblclick.stop
                />
              </td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.FullName }}</td>
              <td>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.male">
                  {{ this.$_MISAResource[this.$_LANGCODE].employeeGender.male }}
                </span>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.female">
                  {{ this.$_MISAResource[this.$_LANGCODE].employeeGender.female}}
                </span>
                <span v-if="employee.Gender == this.$_MISAEnum.Gender.other">
                  {{this.$_MISAResource[this.$_LANGCODE].employeeGender.other}}
                </span>
              </td>
              <td>
                {{ employee.DateOfBirth && customDateV1(employee.DateOfBirth) }}
              </td>
              <td>
                {{ employee.IdentityNumber }}
              </td>
              <td>{{ employee.JobTitle }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td>
                {{ employee.BankAccount }}
              </td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.BankBranch }}</td>
              <td :class="{zIndexInc:optionIndex === key}"  @dblclick.stop>
                <span>{{this.$_MISAResource[this.$_LANGCODE].employeeOptions.title}}</span>
                <div
                  @click="handleShowOptions(key)"
                  class="sprite-dropdown-blue-icon-wraper"
                >
                  <i class="sprite-dropdown-blue-icon"></i>
                  <ul
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
            >{{ this.$_MISAResource[this.$_LANGCODE].otherText.total }}: <b>{{ totalRecord && totalRecord }}</b></span
          >
        </div>
        <div class="container__right-main-footer-right">
          <div class="container__footer-right-item-first">
            <span>{{ this.$_MISAResource[this.$_LANGCODE].otherText.totalRecord }}:</span>
            <div @click="handleShowPageList">
              <span>&nbsp;{{ originRecord }}</span>
              <i class="sprite-dropdown-gray-d-icon"></i>
              <ul v-show="isPagingShow" class="footer__pagesize-list">
                <li
                  @click="handleChangeRowPage(item.value)"
                  v-for="item in pagings"
                  :key="item"
                >
                  {{ item.value }}
                </li>
              </ul>
            </div>
          </div>
          <div class="container__footer-right-item-second">
            <div>
              <span>{{ this.page === 1 ? 1 : (this.page - 1) * this.limit }}</span>
              <span>&nbsp; - &nbsp;</span>
              <span>{{ employees?.length * this.page }}</span>
              <span> &nbsp; {{ this.$_MISAResource[this.$_LANGCODE].otherText.record }} </span>
            </div>
          </div>
          <div class="container__footer-right-item-three">
            <div class="footer-icon">
              <i  v-if="this.page === 1" @click="handleBackPage" class="sprite-arrow-left-icon"></i>
              <i  v-if="this.page > 1" @click="handleBackPage" class="sprite-arrow-right-icon" :class="{iconReverse:this.page > 1}"></i>
            </div>
           
          
            <div class="footer-icon">
              <i v-if="this.page < Math.ceil(this.totalRecord / this.limit)" @click="handleNextPage" class="sprite-arrow-right-icon"></i>
              <i v-if="this.page >= Math.ceil(this.totalRecord / this.limit)" @click="handleNextPage" class="sprite-arrow-left-icon" :class="{iconReverse:this.page > 1}"></i>
            </div>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDetails from "./EmployeeDetails.vue";
import { customDateV1, customDateV2 } from "@/utils/date";
import employeeService from "../../services/EmployeeService";
import departmentService from "../../services/DepartmentService";
import { pagings } from "../../data/paging";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetails,
  },
  data() {
    return {
      isLoadingData: false,
      employeeCodeRef: null,
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
      isShowEmployeeDetails: false,
      optionIndex: null,
      isOptionShow: false,
      isShowOverlayTransparent: false,
      dialogType: null,
      isShowDialog: false,
      isShowOverlay: false,
      employeeId: null,
      employees: [],
      employeeDataProps: null,
      formDetailsType:null, 
      isPagingShow: false,
      totalRecord: null,
      originRecord: 15,
      btnDisable:true,
      numCheckedNull:0,
      numCheckedNotNull:0
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
      this.isMultiAction = !this.isMultiAction;
      this.isShowDialog = true;
      this.dialogType = this.$_MISAEnum.DialogType.deleteMultiple;
      this.handleShowOverlay();
      this.isOptionShow = true;
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
      this.textDialog = []; 
      this.handleCloseOverlay(); 
    }, 

    /**
     * Mô tả: Hàm xóa nhiều nhân viên
     * created by : ndthinh
     * created date: 22-06-2023
     */
    async handleDeleteMultiple(){
      try {
        const keys = Object.keys(this.idCheckedObject);       
        let idList = []; 
        for(let key of keys){
          idList.push(key);
        }    
        this.handleShowLoadingIcon();
        const status = await employeeService.deleteMultiple(idList); 
        if(status === this.$_MISAEnum.ResponseCode.success){
           this.handleCloseDialog();
           this.getEmployeeList(); 
           this.handleUpdateEmployeeOnTable(); 
        }
        this.handleHiddenLoadingIcon(); 
      } catch (error) {
        console.log(error); 
      }
    },

    /**
     * Mô tả: Xử lý thay đổi số dòng hiển thị trên table
     * created by : ndthinh
     * created date: 31-05-2023
     */
    async handleChangeNumberRow(num) {
      this.rowNumber = num;
      try {
        const data = await employeeService.findByFilter(0, parseInt(num));
        this.employees = data;
      } catch (error) {
        console.log(error);
      }
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
    customDateV1,

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
    handleShowEmployeeForm() {
      this.isShowEmployeeDetails = true;
      this.formDetailsType = this.$_MISAEnum.FormMode.Add;
      this.handleShowOverlay();
    },

    /**
     * Mô tả: Đóng form tạo nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */

    handleCloseEmployeeForm() {
      this.isShowEmployeeDetails = false;
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
    handleShowOptions(key) {
      this.optionIndex = key;
      this.isOptionShow = !this.isOptionShow;
      this.isShowOverlayTransparent = true; 
    },

    /**
     * Mô tả: Lấy danh sách phòng ban
     * created by : NDTHINH
     * created date: 26-06-2023
     */
    async getDepartment() {
      try {
        const { Data } = await departmentService.findAll(
          this.offset,
          this.limit,
          this.inputValue
        );
        this.departments = Data;
      } catch (error) {
        console.log(error);
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

    getSingleValueEmployee(employee) {
      employee.DateOfBirth =
        employee?.DateOfBirth && customDateV2(employee.DateOfBirth);
      employee.DateRange =
        employee?.DateRange && customDateV2(employee.DateRange);
      this.employeeDataProps = employee;
      this.isShowEmployeeDetails = true;
      this.formDetailsType = this.$_MISAEnum.FormMode.Update
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
      try {
        this.handleShowLoadingIcon();
        const status = await employeeService.deleteById(this.employeeId);
        if (status === this.$_MISAEnum.ResponseCode.success) {
          this.isShowDialog = false;
          this.handleCloseOverlay();
          this.isOptionShow = false;
          this.handleUpdateEmployeeOnTable();
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
      try {
        this.handleShowLoadingIcon(); 
        this.isShowOverlay = true; 
        const status = await employeeService.exportToExcel(); 
        if(status === this.$_MISAEnum.ResponseCode.success){
          this.workIsDone(this.$_MISAResource[this.$_LANGCODE].employeeMsg.exportExcelSuccess,true);
          this.isLoadingData = false; 
          this.isShowOverlay = false; 
        }
      } catch (error) {
        this.isShowOverlay = false; 
        this.handleHiddenLoadingIcon(); 
      }
    },

    /**
     * Mô tả: Lấy danh sách nhân viên
     * created by : ndthinh
     * created date: 29-05-2023
     */
    async getEmployeeList(textFilter) {
      try {
        this.handleShowLoadingIcon();
        this.isLoadingData = true;
        const { Data, TotalRecord } = await employeeService.findByFilter(
          this.offset,
          this.limit,
          textFilter || this.textSearch
        );
        this.employees = Data;
        this.totalRecord = TotalRecord;
        this.isLoadingData = false;
        this.isShowOverlayTransparent = false; 
        this.handleHiddenLoadingIcon();
      } catch (error) {
        this.isLoadingData = false;
        switch (error.code) {
          case 500:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.serverErr,
                true
              )
            );
            break;
          default:
            this.workIsDone(
              this.workIsDone(
                this.$_MISAResource[this.$_LANGCODE].serverTextErr.defaultErr,
                true
              )
            );
        }
      }
    },
  },

   /**
    * Mô tả: call api
    * created by: ndthinh
    * created date: 20-06-2023
    */

  created() {
    this.getEmployeeList();
    this.getDepartment();
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

.hidden{
  display: none;
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
