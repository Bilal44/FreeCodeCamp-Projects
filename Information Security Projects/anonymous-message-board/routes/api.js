'use strict';
const ThreadModel = require("../models").Thread;

module.exports = function (app) {

  // Thread API end points
  app.route('/api/threads/:board')
    .get((req, res) => {
      ThreadModel.find({ board: req.params.board })
        .exec((err, threads) => {
          res.json(threads);
        });
    })

    .post((req, res) => {
      const { board, text, delete_password } = req.body;

      if (!board) {
        board = req.params.board;
      }

      const thread = new ThreadModel({
        text: text,
        delete_password: delete_password,
        board,
        replies: [],
      });

      thread.save((err, data) => {
        if (err || !data) {
          res.send("an error occured while saving the post");
        } else {
          res.json(thread);
        }
      });
    })

    .put((req, res) => {
      ThreadModel.findByIdAndUpdate(
        req.body.thread_id,
        { reported: true },
        (err, data) => {
          if (!err && data) {
            res.json('success')
          }
        });
    })

    .delete((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, data) => {
          if (!err && data) {
            if (data.delete_password === req.body.delete_password) {
              ThreadModel.findByIdAndRemove(
                req.body.thread_id,
                (err, data) => {
                  if (!err && data) {
                    res.json('success')
                  }
                }
              )
            } else {
              res.json('incorrect password')
            }
          } else {
            res.json('thread not found')
          }
        });
    })


  app.route('/api/replies/:board');

};
