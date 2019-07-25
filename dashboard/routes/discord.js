const express = require("express"),
config = require("../../config"),
router = express.Router(),
passport = require("passport"),
Discord = require("discord.js");

// Gets login page
router.get("/", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function(req, res) {
    let logsChannel = req.client.channels.get(config.dashboard.logs);
    let user = await req.client.users.fetch(req.user.id);
    if(logsChannel){
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURl())
            .setDescription(`user.tag`)
        logsChannel.send(embed);
    }
    res.redirect("/");
});

module.exports = router;