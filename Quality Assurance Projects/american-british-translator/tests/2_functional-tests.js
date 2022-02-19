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

        test("1.2 - Translation with text and invalid locale field: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ text: "The parking lot was full.", locale: "amrican-british" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid value for locale field");
                    done();
                });
        });

        test("1.3 - Translation with missing text field: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ locale: "american-to-british" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                });
        });

        test("1.4 - Translation with missing locale field: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ text: "The parking lot was full." })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                });
        });

        test("1.5 - Translation with empty text: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ text: "", locale: "american-to-british" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "No text to translate");
                    done();
                });
        });

        test("1.6 - Translation with text that needs no translation: POST request to `/api/translate`", function (done) {
            chai.request(server)
                .post("/api/translate")
                .send({ text: "This text requires no translation.", locale: "british-to-american" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, "Everything looks good to me!");
                    done();
                });
        });
    });
});