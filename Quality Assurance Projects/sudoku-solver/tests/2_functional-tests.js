const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let validPuzzleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('Functional Tests', () => {
    suite('/api/solve End Point Tests', () => {
        test("1 - Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
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
    });
});