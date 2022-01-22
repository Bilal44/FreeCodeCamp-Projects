const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite("Routing Tests", function () {
        suite("GET /api/convert EndPoint Tests", function () {
            // Convert a valid input such as `10L`: `GET` request to `/api/convert`
            test("10L (Valid Input) Conversion Request Test", function () {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "10L" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, "L");
                        assert.approximately(res.body.returnNum, 2.64172, 0.01);
                        assert.equal(res.body.returnUnit, "gal");
                    });
            });
            
            // Convert an invalid input such as `32g`: `GET` request to `/api/convert`
            test("32g (Invalid Input) Conversion Request Test", function () {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "32g" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, undefined);
                    });
            });

            // Convert an invalid number such as `3/7.2/4kg`: `GET` request to `/api/convert`
            test("3/7.2/4kg (Invalid Number) Conversion Request Test", function () {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "3/7.2/4kg" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                    });
            });
        });
    });
});
