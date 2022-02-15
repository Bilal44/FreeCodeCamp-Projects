const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let validPuzzleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('Functional Tests', () => {
    suite('1 - /api/solve End Point Tests', () => {
        test("1.1 - Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({ puzzle: validPuzzleInput })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    let solvedPuzzle = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
                    assert.equal(res.body.solution, solvedPuzzle);
                    done();
                });
        });

        test("1.2 - Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field missing");
                    done();
                });
        });

        test("1.3 - Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({ puzzle: "..9..5.1.85.4....2432......X...69.83.9.....6.62.71...9......1945....4.37.4.3..6.." })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                    done();
                });
        });

        test("1.4 - Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({ puzzle: "..9..5.1.85.4..." })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                    done();
                });
        });

        test("1.5 - Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({ puzzle: ".99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1955....4.37.4.3..6.." })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Puzzle cannot be solved");
                    done();
                });
        });
    });

    suite('2 - /api/check End Point Tests', () => {
        test("2.1 - Check a puzzle placement with all fields: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: validPuzzleInput, coordinate: "A2", value: "6" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isTrue(res.body.valid);
                    done();
                });
        });


        test("2.2 - Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: validPuzzleInput, coordinate: "A2", value: "8" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isFalse(res.body.valid);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                });
        });

        test("2.3 - Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: validPuzzleInput, coordinate: "A1", value: "1" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isFalse(res.body.valid);
                    assert.equal(res.body.conflict.length, 2);
                    done();
                });
        });

        test("2.4 - Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: validPuzzleInput, coordinate: "A1", value: "5" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isFalse(res.body.valid);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                });
        });

        test("2.5 - Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: validPuzzleInput, value: "9" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                });
        });

        test("2.6 - Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: "..9..5.1.85.4....2432......X...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A2", value: "6" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                    done();
                });
        });
        
        test("2.7 - Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({ puzzle: "..9..5.1.85.4...", coordinate: "A2", value: "6" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                    done();
                });
        });
    });
});