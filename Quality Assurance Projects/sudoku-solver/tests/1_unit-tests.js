const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('UnitTests', () => {
    test("1 - Logic handles a valid puzzle string of 81 characters", function () {
        let completedPuzzle = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
        assert.equal(solver.solve(validPuzzleInput), completedPuzzle);
    });

    test("2 - Logic handles a puzzle string with invalid characters (not 1-9 or `.`)", function () {
        let inValidPuzzleInput = "..9..5.1.85.4....2432......X...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.solve(inValidPuzzleInput), false);
    });

    test("3 - Logic handles a puzzle string that is not 81 characters in length", function () {
        let inValidPuzzleInput = "9..5.1.8";
        assert.equal(solver.solve(inValidPuzzleInput), false);
    });

    test("4 - Logic handles a valid row placement", function () {
        assert.equal(solver.checkRowPlacement(validPuzzleInput, "A", "2", "6"), true);
    });

    test("5 - Logic handles an invalid row placement", function () {
        assert.equal(solver.checkRowPlacement(validPuzzleInput, "A", "4", "9"), false);
    });

    test("6 - Logic handles a valid column placement", function () {
        assert.equal(solver.checkColPlacement(validPuzzle, "A", "5", "2"), true);
    });
});
