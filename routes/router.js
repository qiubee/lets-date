const router = require("express").Router();

// controllers
const beginpage = require("./controllers/start");
const loginpage = require("./controllers/login");
const signuppage = require("./controllers/signup");
const aboutpage = require("./controllers/about");
const secret = require("./controllers/secret");
const parameter = require("./controllers/parameter");
const realSecret = require("./controllers/gifs");
const secretDownload = require("./controllers/secretdownload");
const error = require("./controllers/error");

router.get("/", beginpage)
	.get("/login", loginpage)
	.get("/signup", signuppage)
	.get("/about", aboutpage)
	.get(/.*secret\/?$/, secret)
	.get("/home/:user", parameter)
	.get("/secret/:item", realSecret)
	.get("/secret/cats?/:download", secretDownload)
	.get("/report", function (req, res) {
		res.json();
	})
	.get("*", error); // give error on any route that has not been defined

module.exports = router;