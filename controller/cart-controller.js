/**
 * Created by afaren on 2/7/17.
 */
const Cart = require('../model/cart');
const async = require('async');

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
      return res.status(200).send(result);
    });
  };

  getOne(req, res, next) {
    Cart.findById(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      res.status(200).send(doc);
    })
  };

  create(req, res, next) {
    Cart.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send(`carts/${doc._id}`);
    });
  };

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.id, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
  };

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(200);
    })
  };

}

module.exports = CartController;