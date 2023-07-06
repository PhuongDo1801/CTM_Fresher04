import BaseApi from "./baseApi";
import instanceAxios from "@/axios/instance";

class EmployeeService extends BaseApi {
  controller = "/Employees";

  /**
   * Mô tả: Hàm lấy danh sách nhân viên theo điều kiện
   * created by : ndthinh
   * created date:16-06-2023
   */
  async findByFilter(offset, limit, textFilter) {
    const response = await instanceAxios.get(
      `${this.controller}/Filter?offset=${offset ? offset : 0}&limit=${
        limit ? limit : 15
      }&textSearch=${textFilter ? textFilter : ""}`
    );
    if (response.data) {
      return response.data;
    }
  }

  /**
   * Mô tả: Hàm lấy mã nhân viên lớn nhất
   * created by : ndthinh
   * created date: 22-06-2023
   */
  async getMaxEmployeeCode() {
    const { data } = await instanceAxios.get(`${this.controller}/MaxCode`);
    if (data) {
      return data;
    }
  }

    /**
   * Mô tả: Hàm xóa nhiều nhân viên
   * created by : ndthinh
   * created date: 22-06-2023
   */
    async deleteMultiple(idList) {
      const { status } = await instanceAxios.delete(`${this.controller}/Multiple`,{
        data:[...idList]
      });
      if (status) {
        return status;
      }
    }

     /**
   * Mô tả: Xuất dữ liệu thành file excel
   * created by : ndthinh
   * created date: 05-07-2023
   */

  async exportToExcel() {
    const response = await instanceAxios.get(
      `${this.controller}/ExcelFile`
    );
    if (response.status) {
      return response.status;
    }
  }
}

export default new EmployeeService();
