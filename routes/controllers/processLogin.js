const userExample = {
	email: "mail@mail.com",
	password: "nononono"
};

function processLogin (req, res) {
	const email = req.body.email || undefined;
	const password = req.body.password || undefined;
	console.log(email, password);
	if (email === userExample.email && password === userExample.password) {
		// redirect to index with authorization token JWT and render homepage
		return res.redirect("/");
	} else if (email === undefined && password === undefined) {
		return res.render("login", {
			title: "Liev - Login",
			empty: true
		});
	} else if (email !== userExample.email || password !== userExample.password) {
		return res.render("login", {
			title: "Liev - Login",
			incorrect: true,
		});
	}
}

module.exports = processLogin;