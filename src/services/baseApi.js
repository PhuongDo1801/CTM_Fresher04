import instanceAxios from "@/axios/instance";

class BaseApi {
  controller = "";
  async findAll() {
    const response = await instanceAxios.get(`${this.controller}`);
    return {
      data: response.data.slice(0, 10),
      length: response.data.length,
    };
  }

  /**
   * Mô tả: Xóa nhân viên theo id
   * created by : NDTHINH
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
   * created by : NDTHINH
   * created date: 30-05-2023
   */

  async save(objectData) {
    const response = await instanceAxios.post(`${this.controller}`, objectData);
    return { data: response.data, status: response.status };
  }

  /**
   * Mô tả: Cập nhật thông tin nhân viên
   * created by : NDTHINH
   * created date: 30-05-2023
   */
  async updateById(objectId, objectData) {
    const response = await instanceAxios.put(
      `${this.controller}/${objectId}`,
      objectData
    );
    return { data: response.data, status: response.status };
  }

  /**
   * Mô tả: Tìm nhân viên theo tên
   * created by : NDTHINH
   * created date: 30-05-2023
   */
  async findByName(objectName) {
    const textSearch =
      objectName === ""
        ? `${this.controller}`
        : `${this.controller}?name=${objectName}`;
    const response = await instanceAxios.get(textSearch);
    return response.data;
  }

  /**
   * Mô tả: Tìm nhân viên theo số dòng
   * created by : NDTHINH
   * created date: 30-05-2023
   */
  async findByFilter(start, end) {
    const response = await instanceAxios.get(
      `${this.controller}?_start=${start}&_end=${end}`
    );
    return response.data;
  }

  async getPaging(page, limit) {
    const response = await instanceAxios.get(
      `${this.controller}?_page=${page}&_limit=${limit}`
    );
    return response.data;
  }
}

export default BaseApi;
