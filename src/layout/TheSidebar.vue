<template>
  <div class="container__left-sidebar">
    <ul>
      <li>
        <i class="sprite-multidot-icon"></i>
        <router-link class="link" to="/">
          <img
            id="logo"
            src="@/assets/img/Logo_Module_TiengViet_White.66947422.svg"
            alt=""
          />
        </router-link>
        <!-- <span>KẾ TOÁN</span> -->
      </li>
      <li>
        <i class="sprite-overview-icon"></i>
        <router-link class="link" to="/">
          <span>Tổng quan</span>
        </router-link>
      </li>
      <li>
        <i class="sprite-cash-icon"></i>
        <span>Tiền mặt</span>
      </li>

      <li>
        <i class="sprite-deposits-icon"></i>
        <span>Tiền gửi</span>
      </li>

      <li>
        <i class="sprite-bag-icon"></i>
        <span>Mua hàng</span>
      </li>
      <li>
        <i class="sprite-cart-icon"></i>
        <span>Bán hàng</span>
      </li>

      <li>
        <i class="sprite-bill-icon"></i>
        <span>Quản lý hóa đơn</span>
      </li>
      <li>
        <i class="sprite-wh-icon"></i>
        <span>Kho</span>
      </li>
      <li>
        <i class="sprite-tool-icon"></i>
        <span>Công cụ dụng cụ</span>
      </li>

      <li>
        <i class="sprite-fixed-assets-icon"></i>
        <span>Tải sản cố định</span>
      </li>

      <li>
        <i class="sprite-tax-icon"></i>
        <span>Thuế</span>
      </li>

      <li>
        <i class="sprite-price-icon"></i>
        <span>Giá thành</span>
      </li>

      <li>
        <i class="sprite-composition-icon"></i>
        <span>Tổng hợp</span>
      </li>

      <li>
        <i class="sprite-budget-icon"></i>
        <span>Ngân sách</span>
      </li>

      <li>
        <i class="sprite-report-icon"></i>
        <span>Báo cáo</span>
      </li>

      <li>
        <i class="sprite-analytic-finance-icon"></i>
        <span>Phân tích tài chính</span>
      </li>

      <li>
        <i class="sprite-analytic-finance-icon"></i>
        <router-link  class="link" to="/category">
          <span>Danh mục</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
  components: {},
};
</script>

<style scoped>
#logo {
  height: 36px;
}
.link {
  text-decoration: unset;
  list-style: none;
}
</style>
