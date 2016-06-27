var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var IdHelper = new Schema({
  _id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

var idHelper = mongoose.model('idHelper', IdHelper);

idHelper.create({ _id: 'nanisore' });

var UrlPair  = new Schema({
  original_url: { type: String, unique: true, required: true },
  short_url:    { type: Number, unique: true, required: true }
});

UrlPair.pre('validate', function(next) {
  var doc = this;
  if (doc.short_url) return next();

  idHelper.findByIdAndUpdate(
    { _id: 'nanisore' },
    { $inc: { seq: 1 } },

    function (err, idHelper) {
      if (err) return next(err);
      doc.short_url = idHelper.seq;

      var url = doc.original_url;
      
      if (url.slice(0, 4) !== 'http')
        url = 'http://' + url;

      next();
    }
  );
});

module.exports = mongoose.model('UrlPair', UrlPair);
