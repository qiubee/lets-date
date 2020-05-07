const router = require("express").Router();

// controllers
const beginpage = require("./controllers/start");
const loginpage = require("./controllers/login");
const signuppage = require("./controllers/signup");
const aboutpage = require("./controllers/about");
const error = require("./controllers/error");

router.get("/", beginpage);
router.get("/login", loginpage);
router.get("/signup", signuppage);
router.get("/about", aboutpage);
router.get("*", error); // give error on any route that has not been defined

module.exports = router;