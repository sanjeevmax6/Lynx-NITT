export const isLive = (startDate, endDate) => {
  var currentDate = new Date();
  //console.log('startDate' + startDate);
  if (
    currentDate.getTime() >= startDate.getTime() &&
    currentDate.getTime() <= endDate.getTime()
  )
    return true;
  else false;
};
