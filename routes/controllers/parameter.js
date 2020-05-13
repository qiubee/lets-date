function sendParemeter (req, res) {
	const user = req.params.user;
	console.log(user);
	if (user === "love") {
		res.json({message: "I " + user + " you"});
	} else {
		res.redirect("/login");
	}
}

module.exports = sendParemeter;