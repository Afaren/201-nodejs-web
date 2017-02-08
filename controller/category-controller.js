const Category = require('../model/category');
const async = require('async');

class CategoryController {

  getAll(req, res, next){
    async.series({
      totalCount: (done) => {
          Category.count(done);
      },
      categories: (done) => {
        Category.find({}, done);
      }
    }, (err, result) => {
      if( err ) {
        return next(err);
      }
      return res.status(200).send(result);
    });


  };
  getOne(req, res, next){
    Category.findById(req.params.id)
      .exec((err, doc)=> {
        if(!doc) {
          return res.sendStatus(404);
        }
        if(err) {
          return next(err);
        }
        res.status(200).send(doc);
      })
  };
  delete(req, res, next){
    Category.findByIdAndRemove(req.params.id, (err, doc)=> {
      if(err) {
        return next(err);
      }
      if(!doc) {
        return res.statusCode(404);
      }
      res.sendStatus(204);
    });
  };
  create(req, res, next){
    new Category(req.body).save((err, doc)=> {
        if(err) {
          return next(err);
        }
        res.status(201).send(`categories/${doc._id}`)
      }
    );
  };
  update(req, res, next){
    Category.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if(err) {
        return next(err);
      }
      return res.sendStatus(204);
    })
  };

}

module.exports = CategoryController;