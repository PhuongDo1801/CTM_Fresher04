import axios from "axios";
const baseURL = "https://localhost:44341/api/v1/";
const instanceAxios = axios.create({
  baseURL
});

let vueInstance;

/**
* Mô tả: Gán giá trị cho biến tham chiếu trước khi interceptor được khởi tạo
* created by: ndthinh
* created date: 06-07-2023
*/
export function setVueInstance(instance) {
  vueInstance = instance;
}


/**
* Mô tả: Xử lý lỗi chung với axios interceptors
* created by: ndthinh
* created date: 10-07-2023
*/

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Lấy thông tin lỗi từ phản hồi của backend
      const errorMessage = error.response.data.ErrorMsgs;    
       // Xử lý các loại lỗi cụ thể
        switch (error?.response?.status) {
           case vueInstance.$_MISAEnum.ResponseCode.conflict:
            vueInstance.errorList.push(...errorMessage);
            vueInstance.isErrInputEmplCode = true;
            vueInstance.inputErrorListRef.push(vueInstance.$refs.employeeCodeRef);
            vueInstance.$emit(
              "getInputErrorText",
              vueInstance.errorList,
              vueInstance.inputErrorListRef,
              vueInstance.$_MISAEnum.DialogType.conflict
            );  
            break; 
           case vueInstance.$_MISAEnum.ResponseCode.badRequest:
             vueInstance.errorList.push(...errorMessage);
             errorMessage.forEach(item => {
               const key = Object.keys(item); 
              if(key.includes(vueInstance.$_MISAEnum.ErrorField.employeeCode)){
                  vueInstance.isErrInputEmplCode = true;
                  vueInstance.inputErrorListRef.push(vueInstance.$refs.employeeCodeRef);
              }else{
                vueInstance.isErrInputEmplCode = false;
              }

              if(key.includes(vueInstance.$_MISAEnum.ErrorField.fullName)){
                vueInstance.isErrInputEmplName = true
                vueInstance.inputErrorListRef.push(vueInstance.$refs.employeeNameRef);
              }else{
                vueInstance.isErrInputEmplName = false
              }

              if(key.includes(vueInstance.$_MISAEnum.ErrorField.departmentId)){
                vueInstance.isErrDepartmentName = true
                vueInstance.inputErrorListRef.push(vueInstance.$refs.departmentNameRef);
              }else{
                vueInstance.isErrDepartmentName = false
              }
              if(key.includes(vueInstance.$_MISAEnum.ErrorField.dateOfBirth)){
                vueInstance.isErrInputDbo = true; 
                vueInstance.inputErrorListRef.push(vueInstance.$refs.dateOfBirthRef);
              }else{
                vueInstance.isErrInputDbo = false; 
              }

              if(key.includes(vueInstance.$_MISAEnum.ErrorField.dateRange)){
                vueInstance.isErrInputDateRange = true;
                vueInstance.inputErrorListRef.push(vueInstance.$refs.dateRangeRef);
              }else{
                vueInstance.isErrInputDateRange = false;
              } 

              if(key.includes(vueInstance.$_MISAEnum.ErrorField.email)){
                vueInstance.isErrInputEmail = true;
                vueInstance.inputErrorListRef.push(vueInstance.$refs.emailRef);
              }else{
                vueInstance.isErrInputEmail = false;
              }              
             });
            
             vueInstance.$emit(
               "getInputErrorText",
               vueInstance.errorList,
               vueInstance.inputErrorListRef,
               vueInstance.$_MISAEnum.DialogType.badRequest
             );   
             break
           case vueInstance.$_MISAEnum.ResponseCode.notFound:
           vueInstance.errorList.push(...errorMessage);
             vueInstance.$emit(
               "getInputErrorText",
               vueInstance.errorList,
               vueInstance.inputErrorListRef,
               vueInstance.$_MISAEnum.DialogType.notFound
             );         
             break;
           default:
            vueInstance.errorList.push(vueInstance.$_MISAResource[vueInstance.$_LANGCODE].serverTextErr.serverErr);
            vueInstance.$emit(
              "getInputErrorText",
              vueInstance.errorList,
              vueInstance.inputErrorListRef,
              vueInstance.$_MISAEnum.DialogType.serverErr
            )
        }
        vueInstance.handleShowOverlay();
        vueInstance.errorList = [];
        vueInstance.inputErrorListRef = [];
        vueInstance.$emit("hiddenLoadingIcon");
    }

    return Promise.reject(error);
  }
);

export default instanceAxios;
