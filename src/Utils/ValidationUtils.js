export const validatePAN = (pan) => {
  return pan.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/) && pan.length <= 10;
};

export const validateFullName = (name) => {
  return name.length <= 140;
};

export const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && email.length <= 255;
};

export const validateMobileNumber = (number) => {
  return number.match(/^\d{10}$/);
};

export const validatePostcode = (postcode) => {
  return postcode.match(/^\d{6}$/);
};
