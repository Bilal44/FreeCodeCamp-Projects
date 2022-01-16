function ConvertHandler() {
  function numberStringSplitter(input) {
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)[0];
  
    return [number[0], string];
  }
  
  function checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
      return false;
    }
    return nums;
  }

  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let num = checkDiv(result);
    if (!num) {
      return undefined;
    }
    let num1 = num[0];
    let num2 = num[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
