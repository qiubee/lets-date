const config = require("./config");
const express = require("express");
const hbs = require("express-handlebars");
const router = require("./routes/router");
const errorHandler = require("./routes/errorHandler");
const session = require("express-session");

// server
const app = express();
const host = config.host || "localhost";
const port = config.port || 8000;

app.set("view engine", "hbs") // set handlebars as templating engine
	.engine( "hbs", hbs({ 
		extname: "hbs", 
		defaultLayout: "default", 
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/"
	}))
	.use(session({ // use sessions
		saveUninitialized: true,
		resave: false,
		secret: config.secret,
		cookie: {
			httpOnly: true,
			maxAge: 12 * 60 * 60 * 1000,
			secure: true,
			sameSite: true
		}
	}))
	.use(express.static("public")) // use public folder for static files
	.use(express.urlencoded({extended: true})) // to get data from http body
	.use(router) // routing
	.use(errorHandler)
	.disable("x-powered-by") // security
	.listen(port, function () {
		console.log(`Listening on port \u001b[1m\u001b[36m${port}\u001b[0m\n\u001b[1m\u001b[32m${host}:${port}\u001b[0m`);
	});