const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let threadID;

suite('Functional Tests', function () {

    // Functional tests to test `/api/threads/{board}` RESTful end points
    suite("1 - `/api/threads/{board}` Functional Tests", function () {
        test("1.1 - Creating a new thread: POST Request", function (done) {
            chai
                .request(server)
                .post("/api/threads/test-board")
                .set("content-type", "application/json")
                .send({ text: "test thread", delete_password: "pass" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.text, "test thread");
                    assert.equal(res.body.delete_password, "pass");
                    assert.equal(new Date(res.body.created_on).toDateString(), new Date().toDateString());
                    assert.isArray(res.body.replies);
                    threadID = res.body._id;
                    done();
                });
        });

        test("1.2 - Viewing the 10 most recent threads with 3 replies each: GET Request Test", function (done) {
            chai
                .request(server)
                .get("/api/threads/test-board")
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.exists(res.body[0]);
                    assert.equal(res.body[0].text, "test thread");
                    done();
                });
        });

        test("1.3 - Deleting a thread with the incorrect password: DELETE request Test", function (done) {
            chai
                .request(server)
                .delete("/api/threads/test-board")
                .set("content-type", "application/json")
                .send({ thread_id: threadID, delete_password: "incorrect" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "incorrect password");
                    done();
                });
        });

        test("1.4 - Reporting a thread: PUT Request Test", function (done) {
            chai
                .request(server)
                .put("/api/threads/test-board")
                .set("content-type", "application/json")
                .send({ thread_id: threadID })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "reported");
                    done();
                });
        });
    });
});