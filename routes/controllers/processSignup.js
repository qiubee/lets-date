const { connect } = require("../../database/database");
const { hash } = require("bcrypt");

function checkMail (mail) {
	connect(function(db) {
		db.users.find({ email : { $eq: mail}});
	});
}

function hashPassword (password) {
	return hash(password, 10);
}

function checkFalsy (data) {
	let falsy = 0;
	Object.keys(data).map(function(key) {
		if (!data[key]) {
			falsy += 1;
		}
	});
	if (falsy > 0) {
		return true;
	} else if (falsy === 0) {
		return false;
	}
}

function processSignup (req, res) {
	const user = req.body;
	if (checkFalsy(user) === true) {
		return res.render("signup", {
			title: "Sign Up - Liev",
			empty: true
		});
	}
	const mail = user.mail;
	if (checkMail(mail) === "in use") {
		return res.render("signup", {
			title:" Sign Up - Liev",
			emailInUse: true
		});
	}
	if (user.password[0] !== user.password[1]) {
		return res.render("signup", {
			title: "Sign Up - Liev",
			passwordMismatch: true
		});
	}
	console.log("\u001b[32mPassword match\u001b[0m");
	const password = hashPassword(user.password[0]);
	console.log(password);
	const name = user.name.replace(/[\d\W\0_]/g, "");
	res.redirect("/");
}

module.exports = processSignup;