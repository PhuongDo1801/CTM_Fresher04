const MISAResource = {
  "vn-VI": {
    employeeMsg: {
      addSuccess: "Thêm nhân viên thành công !",
      updateSuccess: "Cập nhật nhân viên thành công !",
      deleteSuccess: "Xóa nhân viên thành công !",
      exportExcelSuccess:"Xuất file excel thành công !",
      duplicateCode: (code) => {
        return `Mã nhân viên < ${code} > đã tồn tại trong hệ thống vui lòng
                kiểm tra lại.`;
      },
      deleteQuestion: (code) => {
        return `Bạn có muốn xóa Nhân viên <${code}> không ?`;
      },
      dateOfBirthInValid:"Ngày sinh không được phép lớn hơn ngày hiện tại.",
      lengthInValid:"Độ dài không hợp lệ",
      dateRangeInValid:"Ngày cấp không được phép lớn hơn ngày hiện tại.",
      deleteMuitipleQuestion:"Bạn có thực sự muốn xóa những nhân viên đã chọn không ?",
      updateQuestion: "Bạn có chắc chắn muốn sửa nhân viên này không ?",
      closeFormQuestion: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không ?",
      employeeCodeTitleErr: "Mã nhân viên bắt buộc",
      employeeNameTitleErr: "Tên nhân viên bắt buộc",
      employeeDepartmentNameTitleErr: "Tên đơn vị bắt buộc",
      employeeCodeEmptyErr: "Mã không được để trống.",
      employeeNameEmptyErr: "Tên không được để trống.",
      employeeUnitNameErr: "Đơn vị không được để trống.",
      emailErr:"Email không hợp lệ."
    },
    pagesName: {
      employee: "Nhân viên",
      findText:"Tìm theo mã, tên nhân viên"
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
      employeeIdentityNumTitle:"Số chứng minh nhân dân",
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
      multipleAction:"Thực hiện hàng loạt"
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
      identityNumberTitle:"Số chứng minh thư"
    },
    employeeGender: {
      male: "Nam",
      female: "Nữ",
      other: "Khác",
    },
    otherText:{
      total:"Tổng số", 
      totalRecord:"Số bản ghi / trang",
      record:"Bản ghi"
    },
    textBtnForm: {
      keep: "CẤT",
      keepAndAdd: "CẤT VÀ THÊM",
      cancel: "HỦY",
      confirmText: "Có",
      notAllowText: "Không",
      agreeText:"Đồng ý",
      closeText: "Đóng",
      cancelText: "Hủy",
      addEmployee: "Thêm mới nhân viên",
    },
    unitName: [
      "Phòng nhân sự",
      "Phòng công nghệ",
      "Phòng hành chính",
      "Phòng kinh doanh",
    ],
    serverTextErr: {
      serverErr: "Lỗi server !",
      clientBadRequest: "Yêu cầu không hợp lệ !",
      clientNotFound: "Không tìm thấy tài nguyên !",
      clientUnAuthenticate: "Xác thực người dùng lỗi !",
      clientUnAuthorization: "Không có quyền truy cập !",
      defaultErr: "Có lỗi xảy ra !",
    },

  },
};

export default MISAResource;
