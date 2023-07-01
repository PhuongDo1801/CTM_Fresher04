/**
 * Mô tả: Loại bỏ dấu của chuỗi
 * created by : NDTHINH
 * created date: 24-06-2023
 */
const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export { removeDiacritics };
