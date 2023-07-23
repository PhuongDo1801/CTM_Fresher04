export const validateNumber = (number)=>{
    const pattern = /^-?\d+(\.\d+)?$/;
    return pattern.test(number);
}
  
