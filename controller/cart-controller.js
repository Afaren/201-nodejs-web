/**
 * Created by afaren on 2/7/17.
 */
const Cart = require('../model/cart');
const async = require('async');
const constants = require('../mixin/constans');

class CartController {
  getAll(req, res, next) {

    async.series({
      totalCount: (done) => {
        Cart.count(done);
      },
      carts: (done) => {
        Cart.find({}, done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constants.httpCode.OK).send(result);
    });
  };

  getOne(req, res, next) {
    Cart.findById(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constants.httpCode.NO_FOUND);
      }
      res.status(constants.httpCode.OK).send(doc);
    })
  };

  create(req, res, next) {
    Cart.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constants.httpCode.CREATED).send(`carts/${doc._id}`);
    });
  };

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.id, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constants.httpCode.NO_FOUND);
      }
      return res.sendStatus(constants.httpCode.NO_CONTENT);
    })
  };

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constants.httpCode.NO_FOUND);
      }
      return res.sendStatus(constants.httpCode.OK);
    })
  };

}

module.exports = CartController;