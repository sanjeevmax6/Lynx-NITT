import {Linking} from 'react-native';

export const containOnlyNumbers = value => {
  var numbers = /^[0-9]+$/;
  if (value.match(numbers)) {
    return true;
  }
  return false;
};

export const isAadharValid = aadhar => {
  if (!containOnlyNumbers(aadhar)) return false;
  if (aadhar.trim().length === 12) return true;
  return false;
};

export const isStudentNameValid = name => {
  let letters = /^[A-Za-z ]+$/;
  if (name.match(letters)) {
    return true;
  }
  return false;
};

export const isValidLink = async link => {
  const res = await Linking.canOpenURL(link);
  console.log(res);
  return res;
};

export const validFileSize = (size, limit) => {
  if (size > limit * 1000000) return false;
  return true;
};
