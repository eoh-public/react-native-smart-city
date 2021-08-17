export const isValidPhoneNumber = (phoneNumber) => {
  return /(0)+([1-9])+([0-9]{8})\b/.test(phoneNumber);
};

export const isValidEmailAddress = (emailAddress) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailAddress);
};
