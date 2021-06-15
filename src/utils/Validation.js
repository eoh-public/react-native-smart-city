export const isValidPhoneNumber = (phoneNumber) => {
  return /(0)+([1-9])+([0-9]{8})\b/.test(phoneNumber);
};
