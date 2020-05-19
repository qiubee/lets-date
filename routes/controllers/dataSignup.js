function processSignup (req, res) {
	console.log(req.body);
	res.redirect("/");
}

module.exports = processSignup;