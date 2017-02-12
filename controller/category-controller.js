const Category = require('../model/category');
const async = require('async');
const httpCode = require('../mixin/constants').httpCode;

class CategoryController {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Category.count(done);
      },
      categorys: (done)=> {
        Category.find({}, done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    Category.findById(req.params.categoryId, (err, doc) => {
      if (!doc) {
        return res.sendStatus(httpCode.NO_FOUND)
      }
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(doc);
    })
  }

  update(req, res, next) {
    Category.findByIdAndUpdate(req.params.categoryId, req.body,  (err, doc) => {
      if (!doc) {
        return res.sendStatus(httpCode.NO_FOUND)
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })

  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(`category_url: categories/${doc.id}`);
    } )
  }

  delete(req, res, next) {
    Category.findByIdAndRemove(req.params.categoryId,  (err, doc) => {
      if (!doc) {
        return res.sendStatus(httpCode.NO_FOUND)
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })

  }

}

module.exports = CategoryController;