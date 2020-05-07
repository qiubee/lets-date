function error (req, res, next) {
	const err = new Error("User tried to reach " + req.originalUrl + ": Page not found");
	err.url = req.originalUrl;
	err.status = 404;
	err.redirect = true;
	next(err);
}

module.exports = error;