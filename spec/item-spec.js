require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const sinon = require('sinon')
const Item = require('../model/item');
const refresh = require('../util/refresh-util');

describe('ItemContronller', () => {
  before((done) => {
    refresh(done);
  });

  describe('GET /items ', () => {
    it('should return all items', (done) => {
      request
        .get('/items')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(3);
        })
        .end(done);
    });
  })


  describe('GET /items/:itemId ', () => {
    it('should return a item', (done) => {
      request
        .get('/items/587f0f2586653d19297d40c2')
        .expect(200)
        .expect((res) => {
          res.body.should.deepEqual({
            "_id": "587f0f2586653d19297d40c2",
            "name": "钢笔",
            "price": 12,
            "category": {
              "_id": "587f0f2586653d19297d40c8",
              "name": "文具",
              "__v": 0
            },
            "__v": 0
          });
        })
        .end(done);
    });

  })
  describe('POST /items ', () => {
    it('should return uri', (done) => {
      const item = {
        name: 'test',
        price: 45,
        category: '587f0f2586653d19297d40c8'
      };

      request
        .post('/items')
        .send(item)
        .expect(201)
        .expect((res) => {
          Item.findOne(item, (err, doc) => {
            res.body.item_url.should.equal(`items/${doc._id}`);
          })
        })
        .end(done);
    });
  });


  describe('DELETE /items ', ()=> {
    it('should return 204', (done) => {
      const itemId = '587f0f2586653d19297d40c2';
      request
        .delete(`/items/${itemId}`)
        .expect(204)
        .end(done)
    });

  });
  describe('PUT /items/:itemId ', () => {
    it('should return 204', (done) => {
      const itemId = '587f0f2586653d19297d40c3';
      const item = {
        name: 'test6',
        price: 34,
        category: '587f0f2586653d19297d40c8'
      };
      request
        .put(`/items/${itemId}`)
        .send(item)
        .expect(204)
        .end(done)
    });

  })
});