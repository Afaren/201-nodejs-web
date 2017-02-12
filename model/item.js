/**
 * Created by afaren on 2/12/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: Number,
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
