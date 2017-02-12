/**
 * Created by afaren on 2/12/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: String,
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
