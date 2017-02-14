require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const Cart = require('../model/cart');
const refresh = require('../util/refresh-util');

describe('CartContronller', () => {
  before((done) => {
    refresh(done);
  });

  it('GET /carts should return all carts', (done) => {
    request
      .get('/carts')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
        res.body.carts.length.should.equal(1);
      })
      .end(done);
  });

  it('GET /carts/:cartId', (done) => {
    request
      .get('/carts/587f0f2586653d19297d40c6')
      .expect(200)
      .expect((res) => {
        res.body.should.deepEqual({
          "_id": "587f0f2586653d19297d40c6",
          "userId": "1",
          "__v": 0,
          "items": [{
            "item_url": "items/587f0f2586653d19297d40c2",
            "count": 1
          }, {
            "item_url": "items/587f0f2586653d19297d40c3",
            "count": 1
          }, {
            "item_url": "items/587f0f2586653d19297d40c4",
            "count": 1
          }]
        });
      })
      .end(done)
  });

  it('POST /carts should return uri', (done) => {
    const cart = {
      userId: '2',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };

    request
      .post('/carts')
      .send(cart)
      .expect(201)
      .expect((res) => {
        Cart.findOne({userId: '2'}, (err, doc) => {
          res.body.cart_url.should.equal(`carts/${doc._id}`);

        })
      })
      .end(done);
  });

  it('PUT /carts/:cartId should return 204', (done) => {
    const cartId = '587f0f2586653d19297d40c6';
    const cart = {
      userId: '9',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };

    request
      .put(`/carts/${cartId}`)
      .send(cart)
      .expect(204)
      .end(done);
  });

  it('DELETE /carts/:cartId should return 204', (done) => {
    request
      .delete('/carts/587f0f2586653d19297d40c6')
      .expect(204)
      .end(done);
  });
});