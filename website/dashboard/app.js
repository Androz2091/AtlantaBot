const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const passport = require("passport");
const { Strategy } = require("passport-discord");

const app = express();

module.exports.init = async(client) => {
    
    // For the home page
    var indexRouter = require("./routes/index");

    // To handle votes
    var votesRouter = require("./routes/votes");

    // Panel 
    var panelRouter = require("./routes/panel");

    // Login
    var discordRouter = require("./routes/discord");

    app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .engine("html", require("ejs").renderFile)
    .use(express.static(path.join(__dirname, "/public")))
    .set("view engine", "ejs")
    .set("views", path.join(__dirname, "views"))
    .set("port", client.config.server.port)
    .use(session({
        secret: client.config.server.sessionPassword,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());
    
    // Add client variable to request
    app.use(function(req,res,next){
        req.client = client;
        next();
    });

    // Redirect
    app.use("/votes", votesRouter)
    .use("/panel", panelRouter)
    .use("/api/discord/", discordRouter)
    .use("/", indexRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404);
        return res.render("errors/error", {
            status:404, 
            message:"Not Found..."
        });
    });
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(500);
        return res.render("errors/error", {
            status:500, 
            message:"Something went wrong..."
        });
    });
  
    // Listen on the port 
    app.listen(app.get('port'), (err) => {
        if (err) throw err;
        console.log("Atlanta is listening on port "+app.get('port'));
    });

    // passport is used for discord authentification
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    
    passport.use(new Strategy({
        clientID: client.user.id,
        clientSecret: client.config.server.oauth2.secret,
        callbackURL: client.config.server.oauth2.websiteURL+"/api/discord/login",
        scope: ["identify", "guilds"]
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));

};