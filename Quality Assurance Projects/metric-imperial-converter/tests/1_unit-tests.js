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

    // Correctly return an error for an invalid input unit
    test("Invalid Units Input Test", function () {
      let input = "7grams";
      assert.equal(convertHandler.getUnit(input), undefined);
    });
  });
});

suite("Function convertHandler.getReturnUnit(initUnit)", function () {
  // Return the correct return unit for each valid input unit
  test("Valid Unit Conversion (Return Unit) Test", function () {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
    input.forEach(function (value, index) {
      assert.equal(convertHandler.getReturnUnit(value), expect[index]);
    });
  });
});

suite("Function convertHandler.spellOutUnit(unit)", function () {
  // Correctly return the spelled-out string unit for each valid input unit
  test("Valid Fully Spelled-out Unit Test", function () {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
    input.forEach(function (value, index) {
      assert.equal(convertHandler.spellOutUnit(value), expect[index]);
    });
  });
});

suite("Function convertHandler.convert(num, unit)", function () {
  // Correctly convert `gal` to `L`
  test("gal to L Conversion Test", function () {
    let input = [2.41, "gal"];
    let expected = 9.1228381;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });

  // Correctly convert `L` to `gal`
  test("L to gal Conversion Test", function () {
    let input = [22, "l"];
    let expected = 5.81178789;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });

  // Correctly convert `mi` to `km`
  test("mi to km Conversion Test", function () {
    let input = [3, "mi"];
    let expected = 4.82802;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });

  // Correctly convert `km` to `mi`
  test("km to mi Conversion Test", function () {
    let input = [4, "km"];
    let expected = 2.4854909;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });

  // Correctly convert `lbs` to `kg`
  test("lbs to kg Conversion Test", function () {
    let input = [7, "lbs"];
    let expected = 3.175144;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });

  // Correctly convert `kg` to `lbs`
  test("kg to lbs Conversion Test", function () {
    let input = [3.22, "kg"];
    let expected = 7.0988906;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.01 //0.01 tolerance
    );
  });
});