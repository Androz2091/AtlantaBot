const config = require("../config"),
    Discord = require("discord.js"),
    utils = require("./utils"),
    CheckAuth = require("./auth/CheckAuth"),
    availableLanguages = require("fs").readdirSync("languages/");

module.exports.load = async client => {
    /* Init express app */

    const express = require("express"),
        bodyParser = require("body-parser"),
        session = require("express-session"),
        path = require("path"),
        app = express();

    const passport = require("passport");
    const { Strategy } = require("passport-discord");

    /* Routers */
    const mainRouter = require("./routes/index"),
        userRouter = require("./routes/user"),
        loginRouter = require("./routes/login"),
        logoutRouter = require("./routes/logout"),
        settingsRouter = require("./routes/settings"),
        guildStatsRouter = require("./routes/guild-stats"),
        guildManagerRouter = require("./routes/guild-manager");

    /* App configuration */
    app
        // Body parser (for post method)
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
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
        .use(
            session({
                secret: config.dashboard.expressSessionPassword,
                resave: false,
                saveUninitialized: false
            })
        )
        // Passport (for discord authentication)
        .use(passport.initialize())
        .use(passport.session())
        // Multi languages support
        .use(async function(req, res, next) {
            req.client = client;
            let userLang = req.user ? req.user.locale : "en";
            let lang =
                availableLanguages.find(l => l.startsWith(userLang)) ||
                "english";
            let Language = require("../languages/" + lang);
            req.language = new Language();
            if (req.user && req.url !== "/") {
                req.userInfos = await utils.fetchUser(
                    req.user,
                    req.client,
                    req.query.q
                );
            }
            next();
        })
        .use("/login", loginRouter)
        .use("/logout", logoutRouter)
        .use("/manage", guildManagerRouter)
        .use("/stats", guildStatsRouter)
        .use("/settings", settingsRouter)
        .use("/user", userRouter)
        .use("/", mainRouter)
        .use(CheckAuth, function(req, res, next) {
            res.status(404).render("404", {
                user: req.userInfos,
                language: req.language,
                currentURL: `${req.protocol}://${req.get("host")}${
                    req.originalUrl
                }`
            });
        })
        .use(CheckAuth, function(err, req, res, next) {
            console.error(err.stack);
            if (!req.user) return res.redirect("/");
            res.status(500).render("500", {
                user: req.userInfos,
                language: req.language,
                currentURL: `${req.protocol}://${req.get("host")}${
                    req.originalUrl
                }`
            });
        });

    // Listen
    app.listen(app.get("port"), err => {
        console.log(
            "Atlanta Dashboard is listening on port " + app.get("port")
        );
    });

    // Passport is used for discord authentication
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    let disStrat = new Strategy(
        {
            clientID: client.user.id,
            clientSecret: config.dashboard.secret,
            callbackURL: config.dashboard.baseURL + "/login",
            scope: ["identify", "guilds"]
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }
    );

    passport.use(disStrat);
};
