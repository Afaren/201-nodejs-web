/**
 * Created by afaren on 2/12/17.
 */
const refreshMongo = require('./refresh-util');
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('mongoUri'));
refreshMongo(() => {
  process.exit(0);
});
