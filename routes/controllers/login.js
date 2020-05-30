const { connect } = require("../../database/database");
const { compare } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function match (email, password) {
	let match = false;
	await connect(async function(db) {
		console.log("[--Verifying credentials--]");
		const user = await db.collection("users").findOne({ email: { $eq: email}});
		if (!user) {
			return;
		} else if (await compare(password, user.password) === false) {
			return;
		} else {
			match = true;
		}
	});
	return match;
}

async function post (req, res) {
	const email = req.body.email || undefined;
	const password = req.body.password || undefined;
	if (email === undefined && password === undefined) {
		return res.render("login", {
			title: "Liev - Login",
			empty: true
		});
	} else if (await match(email, password) === false) {
		return res.render("login", {
			title: "Liev - Login",
			incorrect: true,
		});
	}
	req.session.auth = uuidv4();
	req.session.email = email;
	res.redirect("/");
}

function get (req, res) {
	res.render("login", {
		title: "Login - Liev"
	});
}

exports.get = get;
exports.post = post;