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
