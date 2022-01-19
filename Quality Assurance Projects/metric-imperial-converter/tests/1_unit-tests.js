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
  });
});