const config = require("../config"),
	utils = require("./utils"),
	CheckAuth = require("./auth/CheckAuth");

module.exports.load = async(client) => {

	/* Init express app */

	const express = require("express"),
		session = require("express-session"),
		path = require("path"),
		app = express();

	/* Routers */
	const mainRouter = require("./routes/index"),
		discordAPIRouter = require("./routes/discord"),
		logoutRouter = require("./routes/logout"),
		settingsRouter = require("./routes/settings"),
		guildStatsRouter = require("./routes/guild-stats"),
		guildManagerRouter = require("./routes/guild-manager");

	/* App configuration */
	app
		// For post methods
		.use(express.json())
		.use(express.urlencoded({ extended: true }))
		// Set the engine to html (for ejs template)
		.engine("html", require("ejs").renderFile)
		.set("view engine", "ejs")
		// Set the css and js folder to ./public
		.use(express.static(path.join(__dirname, "/public")))
		// Set the ejs templates to ./views
		.set("views", path.join(__dirname, "/views"))
		// Set the dashboard port
		.set("port", config.dashboard.port)
		// Set the express session password and configuration
		.use(session({ secret: config.dashboard.expressSessionPassword, resave: false, saveUninitialized: false }))
		// Multi languages support
		.use(async function(req, res, next){
			req.user = req.session.user;
			req.client = client;
			req.locale = req.user ? (req.user.locale === "fr" ? "fr-FR" : "en-US") : "en-US";
			if(req.user && req.url !== "/") req.userInfos = await utils.fetchUser(req.user, req.client);
			if(req.user){
				req.translate = req.client.translations.get(req.locale);
				req.printDate = (date) => req.client.printDate(date, null, req.locale);
			}
			next();
		})
		.use("/api", discordAPIRouter)
		.use("/logout", logoutRouter)
		.use("/manage", guildManagerRouter)
		.use("/stats", guildStatsRouter)
		.use("/settings", settingsRouter)
		.use("/", mainRouter)
		.use(CheckAuth, function(req, res){
			res.status(404).render("404", {
				user: req.userInfos,
				translate: req.translate,
				currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
			});
		})
		.use(CheckAuth, function(err, req, res) {
			console.error(err.stack);
			if(!req.user) return res.redirect("/");
			res.status(500).render("500", {
				user: req.userInfos,
				translate: req.translate,
				currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
			});
		});

	// Listen
	app.listen(app.get("port"), () => {
		console.log("Atlanta Dashboard is listening on port "+app.get("port"));
	});

};
