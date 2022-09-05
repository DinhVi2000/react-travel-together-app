export const dateSortDesc = (array, dateType) => {
  !dateType && (dateType = "createdDate");
  console.log("dateType", dateType);
  if (array.length > 0) {
    array.sort(
      (a, b) => Number(new Date(b[dateType])) - Number(new Date(a[dateType]))
    );
  }
  return array;
};
