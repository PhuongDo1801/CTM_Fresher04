<template>
  <div class="table-wrapper">
    <table id="tbEmployee">
      <thead>
        <tr>
          <th
            v-for="(col, key, index) in EmployeeCol"
            :key="index"
            :class="{
              'th-anchor': key === 'checkbox' || key === 'action',
              'th-anchor--end': key === 'action',
            }"
            :style="{ minWidth: key === 'checkbox' ? '40px' : '160px' }"
            :title="col?.title">
            <input
              v-if="key === 'checkbox'"
              type="checkbox"
              style="width: 24px; height: 24px" />
            <span v-else>{{ col?.text }}</span>
          </th>
          <!-- <th style="min-width: 40px; width: 40px" class="th-anchor">
            <input type="checkbox" style="width: 24px; height: 24px" />
          </th>
          <th style="min-width: 160px">Mã nhân viên</th>
          <th style="min-width: 160px">Tên nhân viên</th>
          <th style="min-width: 160px">Giới tính</th>
          <th style="min-width: 160px">Ngày sinh</th>
          <th style="min-width: 160px" title="Số chứng minh nhân dân">
            Số CMND
          </th>
          <th style="min-width: 160px">Chức danh</th>
          <th style="min-width: 160px">Tên đơn vị</th>
          <th style="min-width: 160px">Số tài khoản</th>
          <th style="min-width: 160px">Tên ngân hàng</th>
          <th style="min-width: 160px">Chi nhánh ngân hàng</th>

          <th style="min-width: 160px" class="th-anchor th-anchor--end">
            Chức năng
          </th> -->
        </tr>
      </thead>
      <tbody>
        <!-- <tr>
          <td class="td-anchor td-anchor--start">
            <input type="checkbox" style="width: 24px; height: 24px" />
          </td>
          <td>MF1444</td>
          <td>Vũ Đình Tiến</td>
          <td>Nam</td>
          <td>03/10/2001</td>
          <td>123456789</td>
          <td>Fresher</td>
          <td>Customize</td>
          <td>123456789</td>
          <td>ViettinBank</td>
          <td>Hai Bà Trưng</td>
          <td
            id="employee1"
            class="td-anchor td-anchor--end td-action td-action--selected">
            <div class="flex items-center justify-center h-full">
              <a
                href=""
                class="text-blue font-semi-bold h-full flex items-center px-4"
                >Sửa</a
              >

              <div class="td-action__icon">
                <div class="icon-wrapper w-8 h-8">
                  <div class="icon icon--down-small-blue"></div>
                </div>
                <div class="dropdown-list td-action-list">
                  <div
                    class="dropdown-item td-action-item td-action-item--remove">
                    Xóa
                  </div>
                  <div class="dropdown-item td-action-item">Nhân bản</div>
                </div>
              </div>
            </div>
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import { EmployeeCol } from "@/constants";
export default {
  props: {},
  setup(props) {
    return {
      EmployeeCol,
    };
  },
};
</script>
<style></style>
