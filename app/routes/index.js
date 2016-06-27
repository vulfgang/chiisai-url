var path = process.cwd();

// (not) the best url-matching regex
var url_to_shorten = /^(https?:\/\/)?(.*?\.)*?.*?\..*?(\/.*?)?$/;

module.exports = function (app) {
	app.get('/', function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

	// there is no view or page for just '/new'
	app.get('/new', function (req, res) {
		res.redirect('/');
	});

	app.get(url_to_shorten, function(req, res) {
		// TODO: call url-shortener controller
		res.json({
			"original_url": req.url,
			"short_url":"https://chiisai-url.herokuapp.com/" + req.url.length
		});
	});

	app.get('/:url_id', function(req, res) {
		// TODO: call url redirect controller
		res.redirect('/');
	});
};
