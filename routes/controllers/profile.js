function get (req, res) {
	if (!req.session.auth) {
		res.status(401);
		return res.redirect("/login");
	}
	res.render("profile", {
		title: "Edit profile",
		// name: name,
		// age: age,
		// city: city,
		// country: country
	});
}

function setup (req, res) {
	if (!req.session.auth) {
		res.status(401);
		return res.redirect("/login");
	}
	res.render("create-profile", {
		maxYear: new Date().getFullYear() - 18
	});
}

function create (req, res) {
	const user = req.body;
	const name = user.name.replace(/[\d\W\0_]/g, "");
	// process new user information and add to database
}

function update (req, res) {
	// update profile changes to database and refresh profile page
}

exports.get = get;
exports.getSetup = setup;
exports.create = create;
exports.update = update;