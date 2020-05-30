const router = require("express").Router();

// controllers
const index = require("./controllers/index"),
	login = require("./controllers/login"),
	logout = require("./controllers/logout"),
	signup = require("./controllers/signup"),
	about = require("./controllers/about"),
	secret = require("./controllers/secret"),
	mail = require("./controllers/mail"),
	profile = require("./controllers/profile"),
	realSecret = require("./controllers/gifs"),
	secretDownload = require("./controllers/secretdownload"),
	processLogin = require("./controllers/processLogin"),
	processSignup = require("./controllers/processSignup"),
	error = require("./controllers/error");

router.get("/", index)
	.get("/login", login)
	.get("/logout", logout)
	.get("/signup", signup)
	.get("/create-profile", profile.create)
	.get("/about", about)
	.get(/.*secret\/?$/, secret)
	.get("/secret/:item", realSecret)
	.get("/secret/cats?/:download", secretDownload)
	// User pages
	.get("/profile", profile.get)
	.get("/mail", mail)
	// Data processing
	.post("/login", processLogin)
	.post("/signup", processSignup)
	// Error handling
	.get("*", error); // give error on any route that has not been defined
	
module.exports = router;