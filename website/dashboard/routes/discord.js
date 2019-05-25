const express = require('express');  
const router = express.Router();
const passport = require("passport");
const Discord = require("discord.js");

// Gets login page
router.get("/login", passport.authenticate("discord", { failureRedirect: "/login" }), async function(req, res) {
    res.redirect("/panel/dashboard");
    var connected = req.client.databases[0].get(req.user.id).dashboard;
    if(!connected){
        var user = await req.client.fetchUser(req.user.id);
        var embed = new Discord.RichEmbed().setAuthor(user.tag, user.displayAvatarURL)
            .setDescription(user.username+" s'est connecté pour la première fois au dashboard ! :tada:")
            .setColor("#DA70D6");
        req.client.channels.get(req.client.config.support.logs).send(embed);
        req.client.databases[0].set(req.user.id+".dashboard", "true");
    }
    
});

router.get("/", function(req, res){
    res.redirect("/login");
});

router.get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
});

module.exports = router;