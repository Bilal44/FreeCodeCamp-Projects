const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite("1 - /api/stock-prices/ GET Request Tests", function () {
        test("1.1 - Viewing one stock: GET request to `/api/stock-prices/`", function (done) {
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: "MSFT" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.stockData.stock, "MSFT");
                    assert.exists(res.body.stockData.price);
                    done();
                });
        });
    });
});