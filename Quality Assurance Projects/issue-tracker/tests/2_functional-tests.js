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

      // View issues on a project with one filter: GET request to `/api/issues/{project}`
      test("GET request to /api/issues/test-get-data with assigned_to field set to `Bilal`", function () {
        chai
          .request(server)
          .get("/api/issues/test-get-data")
          .query({
            assigned_to: "Bilal",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
              issue_title: "Test Issue 2",
              issue_text: "Test Details 2",
              created_on: "2022-01-29T22:02:52.756Z",
              updated_on: "2022-01-29T22:02:52.756Z",
              created_by: "Test",
              assigned_to: "Bilal",
              open: true,
              status_text: "",
              _id: "61f5b98caa72b91fe9e35ac5",
            });
          });
      });

      // View issues on a project with multiple filters: GET request to `/api/issues/{project}`
      test("GET request to /api/issues/test-project with issue_title, created_by and open filters", function () {
        chai
          .request(server)
          .get("/api/issues/test-get-data")
          .query({
            issue_title: "Test Issue 3",
            created_by: "Test",
            open: "false",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
              issue_title: "Test Issue 3",
              issue_text: "Test Details 3",
              created_on: "2022-01-29T22:03:12.535Z",
              updated_on: "2022-01-29T22:13:45.767Z",
              created_by: "Test",
              assigned_to: "Developer 1",
              status_text: "Done",
              _id: "61f5b9a0aa72b91fe9e35aca",
              open: false
            });
          });
      });
    });

    // PUT REQUEST TESTS
    suite("Put request Tests", function () {

      // Update one field on an issue: PUT request to `/api/issues/{project}`
      test("PUT request to /api/issues/apitest updating issue_title field", function () {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "61f2f35a6e8053c334c38226",
            issue_title: "Update title by PUT request"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "61f2f35a6e8053c334c38226");
          });
      });

      // Update multiple fields on an issue: PUT request to `/api/issues/{project}`
      test("PUT request to /api/issues/apitest updating assigned_to, created_by and open fields", function () {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "61f2ef40367b6d55f0a9053b",
            assigned_to: "PUT Request Developer",
            created_by: "PUT Requested Creator",
            open: false,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "61f2ef40367b6d55f0a9053b");
          });
      });

      // Update an issue with missing `_id`: PUT request to `/api/issues/{project}`
      test("PUT request to /api/issues/test-project with missing id", function () {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            issue_title: "update",
            issue_text: "update",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id");
          });
      });

      // Update an issue with no fields to update: PUT request to `/api/issues/{project}`
      test("PUT request to /api/issues/test-project with no updated fields", function () {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "61f2ef40367b6d55f0a9053b"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "no update field(s) sent");
          });

        // Update an issue with an invalid `_id`: PUT request to `/api/issues/{project}`
        test("PUT request to /api/issues/test-project with an invalid id", function () {
          chai
            .request(server)
            .put("/api/issues/test-data-put")
            .send({
              _id: "6fffffff",
              issue_title: "update",
              issue_text: "update",
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "could not update");
            });
        });

        // DELETE REQUEST TESTS
        suite("Delete request Tests", function () {

          // Delete an issue: DELETE request to `/api/issues/{project}`
          test("DELETE request to /api/issues/test-project with a valid id", function () {
            chai
              .request(server)
              .delete("/api/issues/test-project")
              .send({
                _id: deleteID,
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, "successfully deleted");
              });
          });
        });
      });
    });
  }); // End of Routing Tests suite
}); // End of Function Tests suite