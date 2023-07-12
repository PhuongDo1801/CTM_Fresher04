import instanceAxios from "@/axios/instance";

class BaseApi {
  controller = "";

  /**
   * Mô tả: Lấy danh sách nhân viên
   * created by : ndthinh
   * created date: 22-06-2023
   */

  async findAll() {
    const response = await instanceAxios.get(`${this.controller}`);
    return response.data;  
  }

  /**
   * Mô tả: Xóa nhân viên theo id
   * created by : ndthinh
   * created date: 30-05-2023
   */

  async deleteById(objectId) {
    const response = await instanceAxios.delete(
      `${this.controller}/${objectId}`
    );
    return response.status;
  }

  /**
   * Mô tả: Tạo nhân viên
   * created by : ndthinh
   * created date: 30-05-2023
   */

  async save(objectData) {
    const response = await instanceAxios.post(`${this.controller}`, objectData);
    return response; 
  }

  /**
   * Mô tả: Cập nhật thông tin nhân viên
   * created by : ndthinh
   * created date: 30-05-2023
   */
  async updateById(objectId, objectData) {
    const response = await instanceAxios.put(
      `${this.controller}/${objectId}`,
      objectData
    );
   return response;
  }
}

export default BaseApi;
