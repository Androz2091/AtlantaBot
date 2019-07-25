const express = require("express"),
config = require("../../config"),
router = express.Router(),
passport = require("passport"),
Discord = require("discord.js");

// Gets login page
router.get("/", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function(req, res) {
    let logsChannel = req.client.channels.get(config.dashboard.logs);
    let user = await req.client.users.fetch(req.user.id);
    let userData = await req.client.usersData.findOne({id:req.user.id});
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