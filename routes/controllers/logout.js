function logout (req, res) {
	try {
		req.session.destroy();
	} catch (err) {
		return console.log(err);
	}
	return res.redirect("/");
}

module.exports = logout;