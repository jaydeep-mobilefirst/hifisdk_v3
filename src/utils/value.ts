import web3 from "web3";

// let value = 0.02252833;
export function convertToHex(value: any) {
  // Convert the number to a string
  let valueStr = value.toString();

  // Split the string into two parts: before and after the decimal point
  let [integerPart, decimalPart = ""] = valueStr.split(".");

  // Calculate the total length required after decimal point
  let totalLength = 18;

  // Calculate how many zeros we need to add
  let zerosNeeded = totalLength - decimalPart.length;

  // Create a string of zeros of required length
  let zeros = "0".repeat(zerosNeeded > 0 ? zerosNeeded : 0);

  // Concatenate the integer part, decimal part, and the additional zeros
  let resultStr = integerPart + decimalPart + zeros;

  return web3.utils.toHex(BigInt(resultStr.replace(/^0+/, "")));
}

// let convertedValue = convertToHex(value);

// console.log(convertedValue); // Output: '2252800000000000000'
