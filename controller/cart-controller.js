const Cart = require('../model/cart');
const async = require('async');
const httpCode = require('../mixin/constants').httpCode;


function toUrl(items) {
  return items.map(({item, count})=> {
    return {
      item_url: `items/${item}`,
      count
    }
  })

}
class CartController {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Cart.count(done);
      },
      carts: (done)=> {
        Cart.find({}, (err, docs) => {

          const carts = docs.map((doc)=> {
            let cart = doc.toJSON();
            cart.items = toUrl(cart.items)
            return cart;
          });

          done(null, carts);
        });
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    Cart.findById(req.params.cartId, (err, doc) => {
      if (!doc) {
        return res.sendStatus(httpCode.NO_FOUND)
      }
      if (err) {
        return next(err);
      }
      let cart = doc.toJSON();
      cart.items = toUrl(cart.items);

      return res.status(httpCode.OK).send(cart);
    })
  }

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.cartId, req.body, (err, doc) => {
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
    Cart.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(`cart_url: carts/${doc.id}`);
    })
  }

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.cartId, (err, doc) => {
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

module.exports = CartController;