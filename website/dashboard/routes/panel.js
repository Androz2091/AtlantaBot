const express = require('express');  
const router = express.Router();

// Gets servers selector home page
router.get("/selector", (req, res) => {
    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");
    var guilds = [];
    req.user.guilds.forEach(guild => {
        if(!guild.owner) return
        guilds.push({
            url: (guild.icon ? "https://cdn.discordapp.com/icons/"+guild.id+"/"+guild.icon+".png?size=128" : "dist/img/discordcry.png"),
            name: guild.name,
            inviteURL: "https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guild.id
        });
        
    });
    res.render("index", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            client: req.client
        },
        guilds: guilds
    });
});

module.exports = router;