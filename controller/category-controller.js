const Category = require('../model/category');
const async = require('async');
const Item = require('../model/item');
const constants = require('../mixin/constans');

class CategoryController {

  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Category.count(done);
      },
      categories: (done) => {
        Category.find({}, done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constants.httpCode.OK).send(result);
    });


  };

  getOne(req, res, next) {
    Category.findById(req.params.id)
      .exec((err, doc)=> {
        if (!doc) {
          return res.sendStatus(constants.httpCode.NO_FOUND);
        }
        if (err) {
          return next(err);
        }
        res.status(constants.httpCode.OK).send(doc);
      })
  };

  delete(req, res, next) {
    Item.findOne({categoryId: req.params.id}, (err, doc) => {
      if(err) {
        return next(err);
      }
      //todo 这里一开始写成了 !doc，习惯性思维了 
      if(doc) {
        return res.sendStatus(constants.httpCode.BAD_REQUEST);
      }

      Category.findByIdAndRemove(req.params.id, (err, doc)=> {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constants.httpCode.NO_FOUND);
        }
        res.sendStatus(constants.httpCode.NO_CONTENT);
      });
      

    });
  };

  create(req, res, next) {
    new Category(req.body).save((err, doc)=> {
        if (err) {
          return next(err);
        }
        res.status(constants.httpCode.CREATED).send(`categories/${doc._id}`)
      }
    );
  };

  update(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constants.httpCode.NO_CONTENT);
    })
  };

}

module.exports = CategoryController;