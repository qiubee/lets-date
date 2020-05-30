const { connect, add } = require("../../database/database");
const { genSalt, hash } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function checkMail (mail) {
	let free = true;
	await connect(async function(db) {
		const existingEmails = await db.collection("users").find({ email : { $eq: mail}});
		if (!existingEmails.length) {
			return;
		} else if (existingEmails.length > 0) {
			free = false;
			return;
		}
	});
	console.log("result");
	if (free === true) {
		return "free";
	} else {
		return "used";
	}
}

async function hashString (string) {
	try {
		const salt = await genSalt();
		const hashed = await hash(string, salt);
		return hashed;
	} catch (err) {
		console.error(err);
	}
}

function checkForFalsy (data) {
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

async function post (req, res) {
	const user = req.body;
	if (checkForFalsy(user) === true) {
		return res.render("signup", {
			title: "Sign Up - Liev",
			empty: true
		});
	}
	const email = user.email;
	if (await checkMail(email) === "used") {
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
	const password = await hashString(user.password[0]);

	add("users", {
		email: email,
		password: password
	});

	req.session.auth = uuidv4();
	req.session.email = email;
	res.redirect("/create-profile");
}

function get (req, res) {
	res.render("signup", {
		title: "Sign Up - Liev"
	});
}

exports.get = get;
exports.post = post;