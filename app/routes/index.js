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
  });

  // this route should also catch invalid URLs
  app.get('/:url_id', function(req, res) {
    var url_id = req.params.url_id;
    var id = parseInt(url_id);
    if (isNaN(id)) id = -1;

    urlPeon.getUrlPairById(id, function (err, urlPair) {

      if (urlPair)
        return res.redirect(urlPair.original_url);

      // if urlPair is not found or an invalid URL is entered
      res.json({
        error: 'Invalid URL or no shortened URL with id "'+url_id+'"'
      });
    });
  });
};
