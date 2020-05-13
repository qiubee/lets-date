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

router.get("/", beginpage);
router.get("/login", loginpage);
router.get("/signup", signuppage);
router.get("/about", aboutpage);
router.get(/.*secret\/?$/, secret);
router.get("/home/:user", parameter);
router.get("/secret/:item", realSecret);
router.get("/secret/cats?/:download", secretDownload);
router.get("*", error); // give error on any route that has not been defined

module.exports = router;