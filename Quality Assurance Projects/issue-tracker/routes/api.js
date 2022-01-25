'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res) {
      let project = req.params.project;
      const {
        _id,
        open,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.query;

      ProjectModel.aggregate([
        { $match: { name: project } },
        { $unwind: "$issues" },
        _id != undefined
          ? { $match: { "issues._id": ObjectId(_id) } }
          : { $match: {} },
        open != undefined
          ? { $match: { "issues.open": open } }
          : { $match: {} },
        issue_title != undefined
          ? { $match: { "issues.issue_title": issue_title } }
          : { $match: {} },
        issue_text != undefined
          ? { $match: { "issues.issue_text": issue_text } }
          : { $match: {} },
        created_by != undefined
          ? { $match: { "issues.created_by": created_by } }
          : { $match: {} },
        assigned_to != undefined
          ? { $match: { "issues.assigned_to": assigned_to } }
          : { $match: {} },
        status_text != undefined
          ? { $match: { "issues.status_text": status_text } }
          : { $match: {} },
      ]).exec((err, data) => {
        if (!data) {
          res.json([]);
        } else {
          let mappedData = data.map((item) => item.issues);
          res.json(mappedData);
        }
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
