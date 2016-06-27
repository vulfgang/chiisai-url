var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UrlPair = new Schema({
  original_url: String,
  short_url:    String
});

module.exports = mongoose.model('UrlPair', UrlPair);
