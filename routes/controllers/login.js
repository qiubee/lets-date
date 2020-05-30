const { connect } = require("../../database/database");

async function match (email, password) {
	connect(async function(db) {
		const user = await db.collection("users").find({ email: { $eq: email}}).toArray();
		console.log(user);
	});
}

async function post (req, res) {
	const email = req.body.email || undefined;
	const password = req.body.password || undefined;
	if (email === undefined && password === undefined) {
		return res.render("login", {
			title: "Liev - Login",
			empty: true
		});
	}
	const status = await match(email, password);
	console.log(status);
	res.redirect("/login");
	// if (match(email, password) === true) {
	// 	connect(async function (db) {
	// 		const name = await db.users.find({
	// 			email: email
	// 		}).toArray();
	// 		console.log(name);
	// 		// req.session.user = {user: name};
	// 		return;
	// 	});
	// 	return res.redirect("/");
	// }
	
	// if (email !== userExample.email || password !== userExample.password) {
	// 	return res.render("login", {
	// 		title: "Liev - Login",
	// 		incorrect: true,
	// 	});
	// }
}

function get (req, res) {
	res.render("login", {
		title: "Login - Liev"
	});
}

exports.get = get;
exports.post = post;