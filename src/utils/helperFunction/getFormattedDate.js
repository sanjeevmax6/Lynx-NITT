export const getFormattedDate = date => {
  let dateObject = new Date(date);

  return dateObject.toDateString();
};
