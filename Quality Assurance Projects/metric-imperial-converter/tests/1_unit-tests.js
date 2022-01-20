const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite("Function convertHandler.getNum(input)", function () { 
    // Correctly read a whole number input
    test("Whole Number Input Test", function () {
      let input = "4L";
      assert.equal(convertHandler.getNum(input), 4);
    });

    // Correctly read a decimal number input
    test("Decimal Input Test", function () {
      let input = "4.52L";
      assert.equal(convertHandler.getNum(input), 4.52);
    });

    // Correctly read a fractional input
    test("Fractional Input Test", function () {
      let input = "4/3L";
      assert.equal(convertHandler.getNum(input), 4 / 3);
    });

    // Correctly read a fractional input with a decimal
    test("Fractional Input with Decimal Test", function () {
      let input = "4.71/2.09L";
      assert.equal(convertHandler.getNum(input), 4.71 / 2.09);
    });

    // Correctly return an error on a double-fraction (i.e. `3/2/3`)
    test("Invalid Input (Double Fraction) Test", function () {
      let input = "3/2/3L";
      assert.equal(convertHandler.getNum(input), undefined);
    });

    // Correctly default to a numerical input of 1 when no numerical input is provided
    test("No Numerical Input Test", function () {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    // Correctly read each valid input unit
    test("Valid Units Input Test", function () {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
        "GaL",
        "Mi",
        "Km",
        "LbS",
        "Kg",
        "gAl",
        "mI",
        "kM",
        "lBs",
        "kG",
        "Gal",
        "GAl",
        "gAL",
        "gaL",
        "Lbs",
        "LBs",
        "lBS",
        "LBs",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "gal",
        "gal",
        "gal",
        "lbs",
        "lbs",
        "lbs",
        "lbs",
      ];
      input.forEach(function (value, index) {
        assert.equal(convertHandler.getUnit(value), output[index]);
      });
    });
  });
});