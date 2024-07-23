function convert() {
  const input = document.getElementById('number').value.trim();
  const resultOutput = document.getElementById('resultOutput');

  // Check if the input is empty
  if (!input) {
      resultOutput.innerText = "Please enter a valid number.";
      return;
  }

  // Check if the input is a number
  const num = parseInt(input);
  if (!isNaN(num)) {
      if (num < 1) { // Updated check for negative numbers
          resultOutput.innerText = "Please enter a number greater than or equal to 1.";
          return;
      }
      if (num >= 4000) {
          resultOutput.innerText = "Please enter a number less than or equal to 3999.";
          return;
      }
      const roman = convertToRoman(num);
      resultOutput.innerText = `${roman}`;
  } else {
      // If not a number, treat it as a Roman numeral
      const roman = input.toUpperCase();
      const number = convertFromRoman(roman);
      if (number) {
          resultOutput.innerText = `Number: ${number}`;
      } else {
          resultOutput.innerText = "Please enter a valid Roman numeral.";
      }
  }
}
function convertToRoman(num) {
  const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" }, // Handles number 9
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" }
  ];

  let result = "";
  for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
          result += numeral;
          num -= value;
      }
  }
  return result;
}

function convertFromRoman(roman) {
  const romanNumerals = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1
  };

  let total = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = romanNumerals[roman[i]];
      if (currentValue < prevValue) {
          total -= currentValue;
      } else {
          total += currentValue;
      }
      prevValue = currentValue;
  }

  return total > 0 ? total : null; // Return null for invalid Roman numerals
}