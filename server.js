const dotenv = require("dotenv");
const express = require("express");
const hbs = require("express-handlebars");
const router = require("./routes/router");
const errorHandler = require("./routes/errorHandler");

dotenv.config();

// server
const app = express();
const port = process.env.PORT || 8000;

// set handlebars as templating engine
app.set("view engine", "hbs");
app.engine( "hbs", hbs({ 
	extname: "hbs", 
	defaultLayout: "default", 
	layoutsDir: __dirname + "/views/layouts/",
	partialsDir: __dirname + "/views/partials/"
}));

// use public folder for static files
app.use(express.static("public"));

// routing
app.use(router);
app.use(errorHandler);

app.listen(port, function () {
	console.log(`Listening on port \u001b[1m\u001b[36m${port}\u001b[0m\n\u001b[1m\u001b[32mlocalhost:${port}\u001b[0m`);
});