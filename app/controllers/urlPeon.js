// All of your URL are belong to me

var UrlPair = require('../models/urlPairs.js');

function UrlPeon () {
  this.shorten = function (req, res, dontRespond) {
    var original = req.url.slice(1);

    // if the url has been shortened before, return the saved object
    UrlPair.findOne({'original_url': original}, function(err, urlPair) {
      if (urlPair) {
        if (dontRespond)
          return urlPair;

        res.json(urlPair);
      }
    });

    // if the url has not been shortened before, shorten now
    UrlPair.create({original_url: original}, function(err, newPair) {
      if (err) throw err;

      newPair.update({
        short_url: process.env.APP_URL + newPair.id
      });

      if (dontRespond)
        return newPair.toObject();

      res.json(newPair.toObject());
    });
  };

  this.getUrlPairById = function (id) {
    UrlPair.findById(id, function(err, urlPair) {
      if (urlPair)
        urlPair = urlPair.toObject();

      return urlPair;
    });
  };
}

module.exports = UrlPeon;
