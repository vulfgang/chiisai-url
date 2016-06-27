var path = process.cwd();

var UrlPeon = require(path + '/app/controllers/urlPeon.js');

// (not) the best url-matching regex
var url_to_shorten = /^(https?:\/\/)?(.*?\.)*?.*?\..*?(\/.*?)?$/;

module.exports = function (app) {
  var urlPeon = new UrlPeon();

  app.get('/', function (req, res) {
    res.sendFile(path + '/public/index.html');
  });

  // there is no view or page for just '/new'
  app.get('/new', function (req, res) {
    res.redirect('/');
  });

  app.get(url_to_shorten, function(req, res) {
    urlPeon.shorten(req, res);

    // res.json({
    //  "original_url": req.url,
    //  "short_url":"https://chiisai-url.herokuapp.com/" + req.url.length
    // });
  });

  app.get('/:url_id', function(req, res) {
    urlPeon.getUrlPairById(parseInt(req.params.url_id), function (err, urlPair) {
      if (urlPair)
        res.redirect(url);

      res.end('<h3>No url with id '+req.params.url_id+'</h3>');
    });
    // res.redirect('/');
  });
};
