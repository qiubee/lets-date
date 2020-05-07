function errorHandler (err, req, res, next) {
	if (!err.status) {
		err.status = 500;
	}
	switch (err.status) {
		case 404:
			res.render("error", {
				title: "This page is empty"
			});
			break;
		case 500:
			res.send("500 - Server error");
			break;
	}
}

module.exports = errorHandler;