/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models").Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (err, data) => {
        if (!data) {
          res.json([]);
        } else {
          const books = data.map((book) => {
            return {
              _id: book._id,
              title: book.title,
              commentcount: book.comments.length
            };
          });
          res.json(books);
        }
      });
    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send("missing required field [title]");
        return;
      }
      const newBook = new Book({ title, comments: [] });
      newBook.save((err, data) => {
        if (err || !data) {
          res.send("a save error occured");
        } else {
          res.json({ _id: data._id, title: data.title });
        }
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      Book.remove({}, (err, data) => {
        if (err || !data) {
          res.send("a delete error occured");
        } else {
          res.send("complete delete successful");
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      let bookID = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookID, (err, data) => {
        if (!data) {
          res.send("no book with this id exists");
        } else {
          res.json({
            _id: bookID,
            title: data.title,
            comments: data.comments
          });
        }
      });
    })

    .post(function (req, res) {
      let bookID = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.send(`missing required field comment`);
        return;
      }
      //json res format same as .get
      Book.findById(bookID, (err, bookdata) => {
        if (!bookdata) {
          res.send("no book with this id exists");
        } else {
          book.comments.push(comment);
          book.save((err, data) => {
            res.json({
              _id: bookID,
              title: data.title,
              comments: data.comments
            });
          });
        }
      });
    })

    .delete(function (req, res) {
      let bookID = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookID, (err, data) => {
        if (err || !data) {
          res.send("no book with this id exists");
        } else {
          res.send("delete successful");
        }
      });
    });
  
};