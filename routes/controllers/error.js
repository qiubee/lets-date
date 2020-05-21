function error (req, res, next) {
	const err = new Error("404 - Page not found: User tried to reach " + req.originalUrl);
	err.url = req.originalUrl;
	err.status = 404;
	err.redirect = true;
	next(err);
}

module.exports = error;