/**
 * Mô tả: Tùy chỉnh lại ngày
 * created by : NDTHINH
 * created date: 29-06-2023
 */
const customDate = (date) => {
  const dateSplit = date.split("-");
  const newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
  return newDate;
};

export { customDate };
