/**
 * Created by chenchongfa on 2/7/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;