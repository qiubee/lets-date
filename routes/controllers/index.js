function start (req, res) {
	res.render("index", {
		title: "Liev - Let your words find love"
	});
}

module.exports = start;