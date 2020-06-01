function start (req, res) {
	if (!req.session.auth) {
		return res.render("index", {
			title: "Liev - Let your words find love"
		});
	} else if (req.session.auth) {
		return res.render("home", {
			title: "Liev",
			stamp: "images/stamps/GB-stamp.png",
		});
	}
}

module.exports = start;