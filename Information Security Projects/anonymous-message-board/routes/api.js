'use strict';
const ThreadModel = require("../models").Thread;
const ReplyModel = require("../models").Reply;

module.exports = function (app) {

  // Thread API end points
  app.route('/api/threads/:board')
    .get((req, res) => {
      ThreadModel.find({ board: req.params.board })
        .select('-reported -delete_password')
        .sort({ bumped_on: 'desc' })
        .limit(10)
        .exec((err, threads) => {
          if (err || !threads) {
            res.send('an error occured')
          } else if (threads.length > 0) {
            threads.forEach((thread) => {

              // Sort replies by creation date
              thread.replies.sort((reply1, reply2) =>
                reply2.created_on - reply1.created_on
              )

              // Limit replies to maximum of 3 per thread
              thread.replies = thread.replies.slice(0, 3);

              thread.replies.forEach((reply) => {
                reply.delete_password = undefined
                reply.reported = undefined
              })
            })
          }
          
          res.json(threads);
        });
    })

    .post((req, res) => {
      const { text, delete_password } = req.body;
      let board = req.params.board;

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
            res.send('an error occured while updating the thread')
          } else {
            res.send('reported')
          }
        });
    })

    .delete((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, data) => {
          if (err || !data) {
            res.send('thread not found')
          } else {
            if (data.delete_password === req.body.delete_password) {
              ThreadModel.findByIdAndRemove(
                req.body.thread_id,
                (err, data) => {
                  if (err || !data) {
                    res.send('an error occured while deleting the thread')
                  } else {
                    res.send('success')
                  }
                });
            } else {
              res.send('incorrect password')
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
            res.send('thread not found')
          } else {
            data.delete_password = undefined
            data.reported = undefined

            // Sort replies by creation date
            data.replies.sort((reply1, reply2) =>
              reply2.created_on - reply1.created_on
            )

            // Limit replies to maximum of 3 per thread
            data.replies = data.replies.slice(0, 3);

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
        { bumped_on: new Date() },
        (err, data) => {
          if (err || !data) {
            res.send("an error occured while posting the reply")
          } else {
            res.send('success')
          }
        })
    })

    .put((req, res) => {
      ThreadModel.findById(
        req.body.thread_id,
        (err, thread) => {
          if (err || !thread) {
            res.send('thread not found')
          } else {
            let replyIndex = thread.replies.map(function (r) { return r.id; }).indexOf(req.body.reply_id);
            if (replyIndex === -1) {
              res.send('reply not found in the thread')
              return;
            } else {
              thread.replies[replyIndex].reported = true
            }

            thread.save((err, data) => {
              if (err || !data) {
                res.send('an error occured while updating the reply')
              } else {
                res.send('reported');
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
            res.send('thread not found')
          } else {
            let replyIndex = thread.replies.map(function (r) { return r.id; }).indexOf(req.body.reply_id);
            if (replyIndex === -1) {
              res.send('reply not found in the thread')
              return;
            } else {
              thread.replies[replyIndex].text = '[deleted]';
            }

            thread.save((err, data) => {
              if (err || !data) {
                res.send('an error occured while updating the reply')
              } else {
                res.send('success')
              }
            })
          }
        }
      )
    })
};