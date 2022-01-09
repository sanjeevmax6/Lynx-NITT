import moment from 'moment';
export const getFormattedTime = date => {
  let dateObject = new Date(date);

  return moment(dateObject).format('HH:mm');
};
