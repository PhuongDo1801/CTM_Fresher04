const MISAResource = {
  "vn-VI": {
    employeeMsg: {
      addSuccess: "Thêm nhân viên thành công !",
      updateSuccess: "Cập nhật nhân viên thành công !",
      deleteSuccess: "Xóa nhân viên thành công !",
      duplicateCode: (code) => {
        return `Mã nhân viên < ${code} > đã tồn tại trong hệ thống vui lòng
                kiểm tra lại.`;
      },
      deleteQuestion: "Bạn có thực sự muốn xóa người dùng này không ?",
      updateQuestion: "Bạn có chắc chắn muốn sửa nhân viên này không ?",
      employeeCodeTitleErr: "Mã nhân viên bắt buộc",
      employeeNameTitleErr: "Tên nhân viên bắt buộc",
      employeeUnitNameTitleErr: "Tên đơn vị bắt buộc",
      employeeCodeEmptyErr: "<Mã> không được để trống.",
      employeeNameEmptyErr: "<Tên> không được để trống.",
      employeeUnitNameErr: "<Đơn vị> không được để trống.",
    },
    pagesName: {
      employee: "Nhân viên",
    },
    navbar: {
      companyName: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUY PHÚC",
    },
    employeeTable: {
      employeeCode: "MÃ NHÂN VIÊN",
      employeeName: "TÊN NHÂN VIÊN",
      employeeGender: "GIỚI TÍNH",
      employeeDob: "NGÀY SINH",
      employeeIdentityNum: "SỐ CMND",
      employeePositionName: "CHỨC DANH",
      employeeUnitName: "TÊN ĐƠN VỊ",
      employeeBankAccount: "SỐ TÀI KHOẢN",
      employeeBankName: "TÊN NGÂN HÀNG",
      employeeBankBranch: "CHI NHÁNH TK NGÂN HÀNG",
      employeeOperation: "CHỨC NĂNG",
    },
    employeeOptions: {
      title: "Sửa",
      replication: "Nhân bản",
      delete: "Xóa",
      stopUsing: "Ngưng sử dụng",
    },
    employeeForm: {
      employeeCode: "Mã",
      employeeName: "Tên",
      employeeGender: "Giới Tính",
      employeeDob: "Ngày Sinh",
      employeeIdentityNum: "Số CMND",
      employeePositionName: "Chức Danh",
      employeeUnitName: "Đơn vị",
      employeeBankAccount: "Tài khoản ngân hàng",
      employeeBankName: "Tên ngân hàng",
      employeeBankBranch: "Chi nhánh",
      employeePhone: "Điện thoại di động",
      employeePhonePermanent: "Điện thoại cố định",
      employeeEmail: "Email",
      employeeAddress: "Địa chỉ",
      employeeIdentityDateRelease: "Ngày cấp",
      employeeIdentityPlaceRelease: "Nơi cấp",
      employeeIsCustomer: "Là khách hàng",
      employeeIsProvider: "Là nhà cung cấp",
      employeeTitleFormCreate: "Thông tin nhân viên",
      employeeTitleFormUpdate: "Sửa thông tin nhân viên",
    },
    employeeGender: {
      male: "Nam",
      female: "Nữ",
      other: "Khác",
    },
    textBtnForm: {
      keep: "CẤT",
      keepAndAdd: "CẤT VÀ THÊM",
      cancel: "HỦY",
      confirmText: "Đồng ý",
      cancelText: "Hủy",
      addEmployee: "Thêm mới nhân viên",
    },
    unitName: [
      "Phòng nhân sự",
      "Phòng công nghệ",
      "Phòng hành chính",
      "Phòng kinh doanh",
    ],
    serverTextErr:{
      serverErr:"Lỗi server !", 
      clientBadRequest:"Yêu cầu không hợp lệ !", 
      clientNotFound:"Không tìm thấy tài nguyên !",
      clientUnAuthenticate:"Xác thực người dùng lỗi !", 
      clientUnAuthorization:"Không có quyền !",
      defaultErr:"Có lỗi xảy ra !"
    }
  },
};

export default MISAResource;
