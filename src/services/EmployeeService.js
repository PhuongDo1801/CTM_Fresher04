import BaseApi from "./baseApi";

class EmployeeService extends BaseApi {
  controller = "/employees";
}

export default new EmployeeService();
