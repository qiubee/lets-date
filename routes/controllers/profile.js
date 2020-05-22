function profilepage (req, res) {
	const name = "name",
		age = 18,
		city = "Paris",
		country = "France";
	res.render("profile", {
		title: "Edit profile",
		name: name,
		age: age,
		city: city,
		country: country
	});
}

module.exports = profilepage;