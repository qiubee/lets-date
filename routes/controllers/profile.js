const { getAge } = require("../../modules/age");
const { getCountryName } = require("../../modules/country");
const db = require("../../database/database");

async function get (req, res) {
	if (!req.session.auth) {
		res.status(401);
		return res.redirect("/login");
	}
	let age, country, place;
	await db.connect(async function(db) {
		const user = await db.collection("users").find({ email : { $eq: req.session.email}});
		country = getCountryName(user.country);
		age = getAge(user.age[0], user.age[1]);
		if (user.place) {
			place = user.place;
		}
	});
	res.render("profile", {
		title: "Edit profile",
		name: req.session.name,
		age: age,
		country: country,
		place: place
	});
}

function setup (req, res) {
	if (!req.session.auth) {
		res.status(401);
		return res.redirect("/login");
	}
	res.render("create-profile", {
		title: "Set up your profile - Liev",
		maxYear: new Date().getFullYear() - 18
	});
}

function create (req, res) {
	const user = req.body;
	const name = user.name.replace(/[\d\W\0_]/g, "");
	db.update("users", { email: { $eq: req.session.email }}, { $set: { 
		name: name,
		age: user.age,
		country: user.country
	}});
	req.session.name = name;
	res.redirect("/");
}

function update (req, res) {
	// update profile changes to database and refresh profile page
}

exports.get = get;
exports.getSetup = setup;
exports.create = create;
exports.update = update;