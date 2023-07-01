/**
 * Mô tả: Tùy chỉnh lại ngày
 * created by : NDTHINH
 * created date: 29-06-2023
 */
const customDateV1 = (date) => {
  const dateSplit = date.slice(0, 10).split("-");
  const newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
  return newDate;
};

const customDateV2 = (date) => {
  const newDate = date.slice(0, 10);
  return newDate;
};



export { customDateV1, customDateV2};
