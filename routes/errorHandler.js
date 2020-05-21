// eslint-disable-next-line no-unused-vars
function errorHandler (err, req, res, next) {
	if (!err.status) {
		err.status = 500;
	}
	console.log(err);
	switch (err.status) {
	case 404:
		return res.render("error", {
			title: "This page is empty"
		});
	case 500:
		return res.send("500 - Server error");
	}
}

module.exports = errorHandler;