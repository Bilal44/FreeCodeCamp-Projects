const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Start of functional test suite
suite('Functional Tests', function () {
  let deleteID;
  suite("Routing Tests", function () {
    // POST REQUEST TESTS
    suite("Post request Tests", function () {

      // Create an issue with every field: POST request to `/api/issues/{project}`
      test("POST request to /api/issues/test-project with every field completed", function () {
        chai
          .request(server)
          .post("/api/issues/test-project")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fCC",
            assigned_to: "Developer 1",
            status_text: "Not Done",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            deleteID = res.body._id;
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.assigned_to, "Developer 1");
            assert.equal(res.body.created_by, "fCC");
            assert.equal(res.body.status_text, "Not Done");
            assert.equal(res.body.issue_text, "Functional Test");
          });
      });

      // Create an issue with only required fields: POST request to `/api/issues/{project}`
      test("POST request to /api/issues/test-project with only required field completed", function () {
        chai
          .request(server)
          .post("/api/issues/test-project")
          .set("content-type", "application/json")
          .send({
            issue_title: "Partially Completed Issue",
            issue_text: "Functional Test",
            created_by: "fCC",
            assigned_to: "",
            status_text: "",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "Partially Completed Issue");
            assert.equal(res.body.created_by, "fCC");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
          });
      });
      
      // Create an issue with missing required fields: POST request to `/api/issues/{project}`
      test("POST request to /api/issues/test-project with missing required fields", function () {
        chai
          .request(server)
          .post("/api/issues/test-project")
          .set("content-type", "application/json")
          .send({
            issue_title: "",
            issue_text: "Functional Test",
            created_by: "fCC",
            assigned_to: "",
            status_text: "",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "required field(s) missing");
          });
      });
    });

      // GET REQUEST TESTS
      suite("Get request Tests", function () {

        // View issues on a project: GET request to `/api/issues/{project}`
        test("GET request to /api/issues/test-get-data to view all issues", function () {
          chai
            .request(server)
            .get("/api/issues/test-get-data")
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 3);
            });
        });
      });
  }); // End of Routing Tests suite
}); // End of Function Tests suite