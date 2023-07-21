<template>
   <div class="container__right-main-top">
      <span> {{ this.$_MISAResource[this.$_LANGCODE].pagesName.category }}</span>   
    </div>
    <div class="container__right-main-body">
        <div class="category__wrapper">
          <div class="category__item">
            <div>
              <ul>
                <li>Đối tượng</li>
                <li>Khách hàng</li>
                <li>Nhà cung cấp</li>
                <li>
                <router-link to="/employee">
                      Nhân viên 
                </router-link>
                </li>
                <li>Nhóm khách hàng, nhà cung cấp</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Vật tư hàng hóa</li>
                <li>Vật tư hàng hóa</li>
                <li>Kho</li>
                <li>Nhóm vật tư, hàng hóa, dịch vụ</li>
                <li>Đơn vị tính</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Tài khoản</li>
                <li>
                  <router-link to="/account">
                    Hệ thống tài khoản 
                  </router-link>
                </li>
                <li>Tài khoản kết chuyển</li>
                <li>Tài khoản ngầm định</li>
              
              </ul>
            </div>
          </div>
          <div class="category__item">
            <div>
              <ul>
                <li>Chi phí</li>
                <li>Đối tượng tập hợp chi phí</li>
                <li>Khoản mục chi phí</li>
                <li>Công trình</li>
                <li>Loại công trình</li>
              </ul>
            </div>
            <div>
               <ul>
                <li>Ngân hàng</li>
                <li>Ngân hàng</li>
                <li>Tài khoản ngân hàng</li>
              
              </ul>
            </div>
            <div>
               <ul>
                <li>Chi nhánh, phòng ban</li>
                <li>Cơ cấu tổ chức</li>
               
              </ul>
            </div>
          </div>
          <div class="category__item">
            <div>
               <ul>
                <li>Tài sản</li>
                <li>Loại công cụ dụng cụ</li>
                <li>Loại tài sản cố định</li>
              </ul>

              <ul>
                <li>Tiền lương</li>
                <li>Ký hiệu chấm công</li>
                <li>Biểu tính thuế thu nhập</li>
              </ul>
            </div>
            <div>
               <ul>
                <li>Thuế</li>
                <li>Biểu thuế tiêu thụ đặc biệt</li>
                <li>Biểu thuế tài nguyên</li>
              </ul>
            </div>
            <div>
               <ul>
                <li>Khác</li>
                <li>Điều khoản thanh toán</li>
                <li>Mục thu/chi</li>
                <li>Mã thống kê</li>
                <li>Loại tiền</li>
                <li>Loại chứng từ</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CategoryList",
};
</script>

<style>
  @import url("./category.css");
</style>
