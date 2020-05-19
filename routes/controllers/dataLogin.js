const userExample = {
	email: "mail@mail.com",
	password: "nononono"
};

function processLogin (req, res) {
	const email = req.body.email || undefined;
	const password = req.body.password || undefined;
	console.log(email, password);
	if (email === userExample.email && password === userExample.password) {
		return res.render("home", {
			title: "Find a date - Liev"
		});
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