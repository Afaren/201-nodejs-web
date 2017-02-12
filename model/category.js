/**
 * Created by afaren on 2/12/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
