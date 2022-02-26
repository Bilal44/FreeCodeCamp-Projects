const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let threadID;
let replyID;

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

    // Functional tests to test `/api/replies/{board}` RESTful end points
    suite("2 - `/api/replies/{board}` Functional Tests", function () {
        test("2.1 - Creating a new reply: POST Request Test", function (done) {
            chai
                .request(server)
                .post("/api/replies/test-board")
                .set("content-type", "application/json")
                .send({
                    thread_id: threadID,
                    text: "test reply",
                    delete_password: "replypass",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.replies[0].text, "test reply");
                    replyID = res.body.replies[0]._id;
                    done();
                });
        });

        test("2.2 - Viewing a single thread with all replies: GET Request Test", function (done) {
            chai
                .request(server)
                .get("/api/replies/test-board")
                .set("content-type", "application/json")
                .query({
                    thread_id: threadID,
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body._id, threadID);
                    assert.equal(res.body.text, "test thread");
                    assert.equal(res.body.replies[0].text, "test reply");
                    done();
                });
        });

        test("2.3 - Deleting a reply with the incorrect password: DELETE Request Test", function (done) {
            chai
                .request(server)
                .delete("/api/replies/test-board")
                .set("content-type", "application/json")
                .send({
                    thread_id: threadID,
                    reply_id: replyID,
                    delete_password: "Incorrect",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "incorrect password");
                    done();
                });
        });

        test("2.4 - Reporting a reply: PUT Request Test", function (done) {
            chai
                .request(server)
                .put("/api/replies/test-board")
                .set("content-type", "application/json")
                .send({
                    thread_id: threadID,
                    reply_id: replyID,
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "reported");
                    done();
                });
        });

        test("2.5 - Deleting a reply with the correct password: DELETE Request Test", function (done) {
            chai
                .request(server)
                .delete("/api/replies/test-board")
                .set("content-type", "application/json")
                .send({
                    thread_id: threadID,
                    reply_id: replyID,
                    delete_password: "replypass",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "success");
                    done();
                });
        });
    });
});