'use strict';
const ThreadModel = require("../models").Thread;
const ReplyModel = require("../models").Reply;

module.exports = function (app) {

  // Thread API end points
  app.route('/api/threads/:board')
    .get((req, res) => {
      ThreadModel.find({ board: req.params.board })
        .exec((err, threads) => {
          if (err || !threads) {
            res.json('an error occured')
          } else {
            res.json(threads);
          }
        });
    })

    .post((req, res) => {
      let { text, board, delete_password } = req.body;

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
          if (err || !data) {
            res.json('an error occured while updating the thread')
          } else {
            res.json('reported')
          }
        });
    })

    .delete((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, data) => {
          if (err || !data) {
            res.json('thread not found')
          } else {
            if (data.delete_password === req.body.delete_password) {
              ThreadModel.findByIdAndRemove(
                req.body.thread_id,
                (err, data) => {
                  if (err || !data) {
                    res.json('an error occured while deleting the thread')
                  } else {
                    res.json('success')
                  }
                });
            } else {
              res.json('incorrect password')
            }
          }
        });
    })

  // Replies API end points
  app.route('/api/replies/:board')
    .get((req, res) => {
      ThreadModel.findOne(
        { board: req.params.board },
        (err, data) => {
          if (err || !data) {
            res.json('thread not found')
          } else {
            data.delete_password = undefined
            data.reported = undefined

            // Add total number of replies
            data['replycount'] = data.replies.length

            // Sort replies by creation date
            data.replies.sort((thread1, thread2) => {
              thread2.created_on - thread1.created_on
            })

            // remove delete_password and reported fields from replies
            data.replies.forEach((reply) => {
              reply.delete_password = undefined
              reply.reported = undefined
            })

            res.json(data)
          }
        }
      )
    })

    .post((req, res) => {
      let reply = new ReplyModel(req.body)
      ThreadModel.findByIdAndUpdate(
        req.body.thread_id,
        { $push: { replies: reply } },
        (err, data) => {
          if (err || !data) {
            res.send("an error occured while posting the reply")
          } else {
            res.json('success')
          }
        })
    })

    .put((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, thread) => {
          if (err || !thread) {
            res.json('thread not found')
          } else {
            let replyIndex = thread.replies.map(function(r) { return r.id; }).indexOf(req.body.reply_id);
            if (replyIndex === -1) {
              res.json('reply not found in the thread')
              return;
            } else {
              thread.replies[replyIndex].reported = true
            }

            thread.save((err, data) => {
              if (err || !data) {
                res.json('an error occured while updating the reply')
              } else {
                res.json('reported');
              }
            })
          }
        }
      )
    })
    
    .delete((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, thread) => {
          if (err || !thread) {
            res.json('thread not found')
          } else {
            let replyIndex = thread.replies.map(function(r) { return r.id; }).indexOf(req.body.reply_id);
            if (replyIndex === -1) {
              res.json('reply not found in the thread')
              return;
            } else {
              thread.replies[replyIndex].text = [deleted];
            }

            thread.save((err, data) => {
              if (err || !data) {
                res.json('an error occured while updating the reply')
              } else {
                res.json('success')
              }
            })
          }
        }
      )
    })
};