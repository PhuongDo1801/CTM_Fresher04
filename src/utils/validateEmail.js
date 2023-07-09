/**
* Mô tả: Hàm validate email 
* created by: ndthinh
* created date: 06-07-2023
*/

function validateEmail(email) {
    // Biểu thức chính quy để kiểm tra tính hợp lệ của email
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    return emailRegex.test(email);
  }

export default validateEmail; 