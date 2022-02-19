const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite("1 - `/api/translate` POST Request Tests", function () {
        test("1.1 - Translation with text and locale fields: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ text: "The parking lot was full.", locale: "american-to-british" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(
                        res.body.translation,
                        'The <span class="highlight">car park</span> was full.'
                    );
                    done();
                });
        });
    });
});