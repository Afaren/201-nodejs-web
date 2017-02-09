const Item = require('../model/item');
const async = require('async');
const constants = require('../mixin/constants');

class ItemController {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Item.count(done);
      },
      items: (done) => {
        Item.find({})
          .populate('categoryId')
          .exec(done);
      }
    }, (err, result) => {
      if(err) {
        return next(err);
      }
      return res.status(constants.httpCode.OK).send(result);
      }
    );
  };

  getOne(req, res, next) {
    Item.findById(req.params.id)
      .populate('categoryId')
      .exec((err, doc) => {
        if (!doc) {
          res.sendStatus(constants.httpCode.NO_FOUND);
        }
        if (err) {
          return next(err)
        }
        res.status(constants.httpCode.OK).send(doc)

      })
  }

  delete(req, res, next) {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {

      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constants.httpCode.NO_FOUND);
      }

      res.sendStatus(constants.httpCode.NO_CONTENT);
    });
  }

  create(req, res, next) {
    new Item(req.body).save((err, doc) => {
      if (err) {
        next(err);
      }
      res.status(constants.httpCode.CREATED).send(`items/${doc._id}`);
    })
  }

  update(req, res, next) {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constants.httpCode.NO_CONTENT);
    })
  }

}

module.exports = ItemController;