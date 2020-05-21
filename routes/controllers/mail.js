const mail = [{
	stamp: {
		src: "/stamps/paris.png",
		alt: "Stamp with the Eiffel Tower illustrated."
	},
	name: "Nina",
	age: 23,
	title: "Something went missing...",
	city: "Paris",
	country: "France"
}, {
	stamp: {
		src: "/stamps/london.png",
		alt: "Stamp with the Big Ben illustrated."
	},
	name: "Susan",
	age: 23,
	title: "Sailing on a glowing river of hope",
	city: "London",
	country: "United Kingdom"
}, {
	stamp: {
		src: "/stamps/paris.png",
		alt: "Stamp with an illustrated Eiffel tower"
	},
	name: "Liam",
	age: 21,
	title: "Where are you?",
	city: "Amsterdam",
	country: "Netherlands"
}];

function showMail (req, res) {
	res.render("mail", {
		title: "Mail - Liev",
		mail: mail
	});
}

module.exports = showMail;