const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('UnitTests', () => {
    test("1 - Logic handles a valid puzzle string of 81 characters", function () {
        assert.isTrue(solver.validate(validPuzzleInput));
    });

    test("2 - Logic handles a puzzle string with invalid characters (not 1-9 or `.`)", function () {
        let inputWithInvalidCharacters = "..9..5.1.85.4....2432......X...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.isFalse(solver.validate(inputWithInvalidCharacters));
    });

    test("3 - Logic handles a puzzle string that is not 81 characters in length", function () {
        let inputNot81Characters = "9..5.1.8";
        assert.isFalse(solver.validate(inputNot81Characters));
    });

    test("4 - Logic handles a valid row placement", function () {
        assert.isTrue(solver.checkRowPlacement(validPuzzleInput, "A", "2", "6"));
    });

    test("5 - Logic handles an invalid row placement", function () {
        assert.isFalse(solver.checkRowPlacement(validPuzzleInput, "A", "4", "9"));
    });

    test("6 - Logic handles a valid column placement", function () {
        assert.isTrue(solver.checkColPlacement(validPuzzleInput, "A", "5", "2"));
    });

    test("7 - Logic handles an invalid column placement", function () {
        assert.isFalse(solver.checkColPlacement(validPuzzleInput, "A", "5", "6"));
    });

    test("8 - Logic handles a valid region (3x3 grid) placement", function () {
        assert.isTrue(solver.checkRegionPlacement(validPuzzleInput, "B", "3", "1"));
    });

    test("9 - Logic handles an invalid region (3x3 grid) placement", function () {
        assert.isFalse(solver.checkRegionPlacement(validPuzzleInput, "A", "2", "8"));
    });

    test("10 - Valid puzzle strings pass the solver", function () {
        assert.isNotFalse(solver.solve(validPuzzleInput));
    });
    
    test("11 - Invalid puzzle strings fail the solver", function () {
        let invalidPuzzleInput = "4..437.5794573";
        assert.isFalse(solver.solve(invalidPuzzleInput));
    });

    test("12 - Solver returns the the expected solution for an incomplete puzzzle", function () {
        let expectedSolution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
        assert.equal(solver.solve(validPuzzleInput), expectedSolution);
    });
});
