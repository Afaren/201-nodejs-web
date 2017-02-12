/**
 * Created by afaren on 2/10/17.
 */
const carts = require('./fixture/cart');
const categories = require('./fixture/category');
const items = require('./fixture/item');
const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');


const rawData = {
  Cart: carts,
  Item: items,
  Category: categories
};

const modelMap = {
  Item,
  Cart,
  Category
};


module.exports = function refresh(done) {
  let docs = Object.keys(rawData);

  Object.keys(rawData)
    .forEach(v => {
      modelMap[v].remove(()=> {
        modelMap[v].create(rawData[v], ()=> {
          docs = docs.filter(doc => doc !== v);
          console.log(`The data of ${v} created`);
          if (docs.length === 0) {
            console.log('All data refreshed');
            done();
          }
        });
      });
    });
};


