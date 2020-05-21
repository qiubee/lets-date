const name = "Olivia";

function home (req, res) {
	res.render("home", {
		title: "Home - Liev",
		stamp: "stamps/london.png",
		username: name
	});
}

module.exports = home;