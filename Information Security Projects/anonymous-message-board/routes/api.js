'use strict';
const ThreadModel = require("../models").Thread;

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get((req, res) => {
      ThreadModel.find({ board: req.params.board })
        .exec((err, threads) => {
          res.json(threads);
        });
    })
    
  app.route('/api/replies/:board');

};
