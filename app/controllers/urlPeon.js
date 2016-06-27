// All of your URL are belong to me

var UrlPair = require('../models/urlPairs.js');

function UrlPeon () {
  this.shorten = function (req, res, dontRespond) {
    var original = req.url.slice(1);

    // if the url has been shortened before, return the saved object
    UrlPair.findOne({'original_url': original}, function(err, urlPair) {
      var result = { short_url: process.env.APP_URL };

      if (urlPair) {
        result.original_url = urlPair.original_url;
        result.short_url += urlPair.short_url;

        if (dontRespond)
          return result;

        return res.json(result);
      }

      // if the url has not been shortened before, shorten now
      UrlPair.create({ original_url: original }, function(err, newPair) {
        if (err && !newPair) throw err;

        result.original_url = newPair.original_url;
        result.short_url += newPair.short_url;

        if (dontRespond)
          return result;

        return res.json(result);
      });
    });

    
  };

  this.getUrlPairById = function (id, callback) {
    UrlPair.findOne({ short_url: id }, function(err, urlPair) {
      var result;

      if (urlPair)
        result = {
          original_url: urlPair.original_url,
          short_url: process.env.APP_URL + urlPair.short_url
        };

      callback(err, result);
    });
  };
}

module.exports = UrlPeon;
