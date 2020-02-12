const express = require("express"),
config = require("../../config"),
router = express.Router(),
CheckAuth = require("../auth/CheckAuth"),
passport = require("passport"),
Discord = require("discord.js");

// Gets login page
router.get("/", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function(req, res) {
    if(!req.user.id || !req.user.guilds){
        res.redirect("/");
    }
    let logsChannel = req.client.channels.get(config.dashboard.logs);
    let user = await req.client.users.fetch(req.user.id);
    let usersData = await req.client.functions.getUsersData(req.client, [ req.user ]);
    let userData = usersData[0];
    if(!userData.logged && logsChannel && user){
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL())
            .setColor("#DA70D6")
            .setDescription(req.language.get("FIRST_LOGIN", user.tag));
        logsChannel.send(embed);
        userData.logged = true;
        userData.save();
    }
    res.redirect("/");
});

module.exports = router;