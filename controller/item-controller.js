const Item = require('../model/item');
const async = require('async');
const httpCode = require('../mixin/constants').httpCode;

class ItemController {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Item.count(done);
      },
      items: (done)=> {
        Item.find({})
          .populate('category')
          .exec(done)
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    Item.findById(req.params.itemId)
      .populate('category')
      .exec((err, doc) => {
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
    Item.findByIdAndUpdate(req.params.itemId, req.body, (err, doc) => {
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
    Item.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(`item_url: items/${doc.id}`);
    })
  }

  delete(req, res, next) {
    Item.findByIdAndRemove(req.params.itemId, (err, doc) => {
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

module.exports = ItemController;