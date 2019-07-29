const config = require("../config"),
Discord = require("discord.js"),
availableLanguages = require("fs").readdirSync("languages/");

module.exports.load = async(client) => {

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
    discordRouter = require("./routes/discord");

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
    .set('views', path.join(__dirname, "/views"))
    // Set the dashboard port
    .set("port", config.dashboard.port)
    // Set the express session password and configuration
    .use(session({ secret: config.dashboard.expressSessionPassword, resave: false, saveUninitialized: false }))
    // Passport (for discord authentication)
    .use(passport.initialize())
    .use(passport.session())
    // Multi languages support
    .use(async function(req, res, next){
        req.client = client;
        let userLang = req.user ? req.user.locale : "en";
        let lang = availableLanguages.find((l) => l.startsWith(userLang)) || "english";
        let Language = require("../languages/"+lang);
        req.language = new Language();
        if(req.user){
            req.userInfos = await fetchUser(req.user, req.client, req.query.q);
        }
        next();
    })
    .use("/login", discordRouter)
    .use("/", mainRouter)
    .use(function(req, res, next){
        res.status(404).render("404", {
            user: req.userInfos,
            language: req.language
        });
    });

    // Listen
    app.listen(app.get("port"), (err) => {
        console.log("Atlanta Dashboard is listening on port "+app.get("port"));
    });

    // Passport is used for discord authentication
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    let disStrat = new Strategy({
        clientID:       client.user.id,
        clientSecret:   config.dashboard.secret,
        callbackURL:    config.dashboard.baseURL+"/login",
        scope:          [ "identify", "guilds" ]
    }, function (accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null, profile);
        });
    });

    passport.use(disStrat);

}

/**
 * Fetch user informations (stats, guilds, etc...)
 * @param {object} userData The oauth2 user informations
 * @param {object} client The discord client instance
 * @param {string} query The optional query for guilds
 */
async function fetchUser(userData, client, query){
    userData.guilds.forEach((guild) => {
        let perms = new Discord.Permissions(guild.permissions);
        if(perms.has("MANAGE_GUILD")){
            guild.admin = true;
        }
        guild.url = (client.guilds.get(guild.id) ? `/server/${guild.id}/` : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847&guild_id=${guild.id}`);
        guild.iconURL = (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128` : "https://discordemoji.com/assets/emoji/discordcry.png");
        guild.displayed = (query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true);
    });
    userData.displayedGuilds = userData.guilds.filter((g) => g.displayed && g.admin);
    if(userData.displayedGuilds.length < 1){
        delete userData.displayedGuilds;
    }
    let user = await client.users.fetch(userData.id);
    let usersDb = await client.functions.getUsersData(client, [ user ]);
    let userDb = usersDb[0];
    let logs = await require("../base/Log").find({});
    let stats = { commands: logs.filter((cmd) => cmd.user.id === user.id) };
    let userInfos = { ...user.toJSON(), ...userDb.toJSON(), ...userData, ...user.presence,  ...stats};
    return userInfos;
}