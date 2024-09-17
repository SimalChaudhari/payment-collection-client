// utils/formatCurrency.js
export const formatIndianCurrency = (value) => {

  if (value === undefined || value === null) {
    return '₹0'; // Return a default value if no value is provided
  }
    let [integerPart, decimalPart] = value.toString().split('.');
    
    let lastThree = integerPart.substring(integerPart.length - 3);
    let otherNumbers = integerPart.substring(0, integerPart.length - 3);
    
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    
    let formattedNumber = otherNumbers + lastThree;
    
    return `₹${formattedNumber}`;
  };
  