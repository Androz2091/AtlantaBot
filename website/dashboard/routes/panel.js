const express = require('express');  
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Gets servers selector home page
router.get("/dashboard", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");
    var guilds = [];
    req.user.guilds.forEach(guild => {
        if(!guild.owner) return
        guilds.push({
            url: (guild.icon ? "https://cdn.discordapp.com/icons/"+guild.id+"/"+guild.icon+".png?size=128" : "/dist/img/discordcry.png"),
            name: guild.name,
            inviteURL: "https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guild.id,
            id: guild.id
        });
        
    });
    res.render("dashboard", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            client: req.client
        },
        guilds: guilds
    });
});

// Gets guild page
router.get("/guild/:GuildID", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");

    // gets the guild
    var guildID = req.params.GuildID;
    var guild = req.client.guilds.get(guildID);

    if(!guild){
        res.redirect("https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guildID);
    }

    var guilds = [];
    req.user.guilds.forEach(guild => {
        if(!guild.owner) return
        guilds.push({
            url: (guild.icon ? "https://cdn.discordapp.com/icons/"+guild.id+"/"+guild.icon+".png?size=128" : "/dist/img/discordcry.png"),
            name: guild.name,
            inviteURL: "https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guild.id,
            id: guild.id
        });
        
    });

    var conf = req.client.databases[1].get(guildID) || req.client.functions.createGuild(guildID);
    var commands = req.client.databases[4].get("commands").filter(c => c.data.guild.id === guildID);

    var stats = {dates:[],data:[]};
    Last7Days().forEach(date => { // 05/03
        var day = date.split("/")[1];
        day = day.substr(1)
        console.log(new Date(commands.shift().date).getDate())
        var tcommands = commands.filter(c => new Date(c.date).getDate() == day).length;
        stats.dates.push(date);
        stats.data.push(tcommands);
    });

    console.log(stats);

    res.render("manager", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            client: req.client
        },
        guilds: guilds,
        guild: {
            stats: {
                dates:stats.dates,
                data:stats.data
            },
            conf: conf
        }
    });

}); 

function formatDate(date){

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = mm+'/'+dd;
    return date
}

function Last7Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }

    return result;
}

module.exports = router;