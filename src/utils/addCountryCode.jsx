// utils/addCountryCode.js
export const addCountryCode = (number) => {
    // Ensure the number is a string and remove any non-numeric characters
    const cleanedNumber = number?.toString().replace(/\D/g, '');
    return `+91 ${cleanedNumber}`;
  };
  