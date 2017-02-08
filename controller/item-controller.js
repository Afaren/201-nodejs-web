const Item = require('../model/item');
const async = require('async');

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
      return res.status(200).send(result);
      }
    );
  };

  getOne(req, res, next) {
    Item.findById(req.params.id)
      .populate('categoryId')
      .exec((err, doc) => {
        if (!doc) {
          res.sendStatus(404);
        }
        if (err) {
          return next(err)
        }
        res.status(200).send(doc)

      })
  }

  delete(req, res, next) {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {

      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    });
  }

  create(req, res, next) {
    new Item(req.body).save((err, doc) => {
      if (err) {
        next(err);
      }
      res.status(201).send(`items/${doc._id}`);
    })
  }

  update(req, res, next) {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(204);
    })
  }

}

module.exports = ItemController;