/**
 * Created by afaren on 2/7/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: String,
  items: [{
    count: Number,
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  }]
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
