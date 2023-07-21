import BaseApi from "./baseApi";
import instanceAxios from "@/axios/instance";
class AccountService extends BaseApi {
  controller = "/Accounts";
  /**
   * Mô tả: Hàm lấy danh sách tài khoản theo điều kiện
   * created by : ndthinh
   * created date:16-06-2023
   */
  async findByFilter(offset, limit, textFilter,parentId,isGetAll) {
    isGetAll = isGetAll !== undefined && isGetAll !== 0 ? 1:0;
    const query = parentId !== null ? 
    `${this.controller}/Filter?offset=${offset ? offset : 0}&limit=${limit ? limit : 15}&textSearch=${textFilter ? textFilter : ""}&parentId=${parentId && parentId}&isGetAll=${isGetAll}` 
    :`${this.controller}/Filter?offset=${offset ? offset : 0}&limit=${limit ? limit : 15}&textSearch=${textFilter ? textFilter : ""}&isGetAll=${isGetAll}`
    const response = await instanceAxios.get(query);
    return response.data; 
  }



}

export default new AccountService();
