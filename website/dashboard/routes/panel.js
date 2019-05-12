const express = require('express');  
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Gets dashboard home page
router.get("/dashboard", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");

    // Gets the user data
    var uData = req.client.databases[0].get(req.user.id) || req.client.functions.createUser(req.user);

    // Gets the stats (global and for the user)
    var globalStats = getGlobalStats(req.client);
    var userStats = getUserStats(req.client, req.user.id);

    // Gets the guilds of the user
    var guilds = getGuilds(req.user.guilds, req.client, req.user.id);

    // Render 
    res.render("dashboard", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            stats: {
                commands: userStats.total,
                credits: uData.credits,
                rep: uData.rep,
                level: uData.level,
                commandsSent: userStats.graph
            }
        },
        guilds: guilds,
        globalStats: globalStats,
        client: req.client
    });
});

// Gets servers selector page
router.get("/selector", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");

    // Gets the guilds of the user
    var guilds = getGuilds(req.user.guilds, req.client, req.user.id);

    // Render
    res.render("manager/selector", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id
        },
        guilds: guilds,
        client: req.client
    });
});

// Gets guild page
router.get("/guild/:GuildID", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");

    // Gets the guilds of the user
    var guildID = req.params.GuildID;
    var guild = req.client.guilds.get(guildID);

    if(!guild){
        res.redirect("https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guildID);
    }
    
    // Gets user guilds
    var guilds = getGuilds(req.user.guilds, req.client, req.user.id);

    // gets guild stats
    var guildStats = getGuildStats(req.client, guildID);

    // Gets the most used commands
    var topCommands = getMostUsedCommands(req.client, guildID);

    // gets guild conf
    var guildConf = req.client.databases[1].get(guildID) || req.client.functions.createGuild(guild);

    res.render("manager/guild", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            client: req.client
        },
        guilds: guilds,
        guild: {
            stats: {
                commands: guildStats.total,
                memberCount: guild.memberCount,
                commandsSent: guildStats.graph,
                topCommands: topCommands
            },
            guild: guild,
            conf: guildConf
        },
        client: req.client
    });

});


// Gets guild page
router.post("/guild/:GuildID", (req, res) => {

    // if the user is not authenticated
    if(!req.isAuthenticated()) return res.redirect("/api/discord/login");
    // Gets the guilds of the user
    var guildID = req.params.GuildID;
    var guild = req.client.guilds.get(guildID);

    if(!guild){
        res.redirect("https://discordapp.com/oauth2/authorize?client_id="+req.client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guildID);
    }
    
    updateConf(req.client, guildID, req.body);

    // Gets user guilds
    var guilds = getGuilds(req.user.guilds, req.client, req.user.id);

    // gets guild stats
    var guildStats = getGuildStats(req.client, guildID);

    // Gets the most used commands
    var topCommands = getMostUsedCommands(req.client, guildID);

    // gets guild conf
    var guildConf = req.client.databases[1].get(guildID) || req.client.functions.createGuild(guild);

    res.render("manager/guild", {
        user:{
            avatarURL: (req.user.avatar ? "https://cdn.discordapp.com/avatars/"+req.user.id+"/"+req.user.avatar : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"),
            tag: req.user.username+"#"+req.user.discriminator,
            ID: req.user.id,
            client: req.client
        },
        guilds: guilds,
        guild: {
            stats: {
                commands: guildStats.total,
                memberCount: guild.memberCount,
                commandsSent: guildStats.graph,
                topCommands: topCommands
            },
            guild: guild,
            conf: guildConf
        },
        client: req.client
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

function getGuilds(guilds, client, userID){
    var tguilds = [];
    guilds.forEach(guild => {
        tguilds.push({
            url: (guild.icon ? "https://cdn.discordapp.com/icons/"+guild.id+"/"+guild.icon+".png?size=128" : "/dist/img/discordcry.png"),
            name: guild.name,
            inviteURL: "https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot&permissions=2146958847&guild_id="+guild.id,
            id: guild.id,
            perm:(client.guilds.get(guild.id) ? client.guilds.get(guild.id).members.get(userID).hasPermission("MANAGE_GUILD") : "unknow"),
            owner:guild.owner
        });
    });
    tguilds = tguilds.sort((a,b)=>[true,"unknow",false].indexOf(a.perm) - [true,"unknow", false].indexOf(b.perm));
    return tguilds;
}

function getGlobalStats(client){
    let commands = client.databases[4].get("commands");
    let aDateCommand = {};
    commands.forEach(cmd => {
        tDate = formatDate(new Date(cmd.date));
        if(aDateCommand[tDate]){
            aDateCommand[tDate]++;
        } else {
            aDateCommand[tDate] = 1;
        }
    });
    return aDateCommand;
}

function getUserStats(client, userID){
    let commands = client.databases[4].get("commands").filter(c => c.author === userID);
    let aDateCommand = {};
    commands.forEach(cmd => {
        tDate = formatDate(new Date(cmd.date));
        if(aDateCommand[tDate]){
            aDateCommand[tDate]++;
        } else {
            aDateCommand[tDate] = 1;
        }
    });
    return {graph:aDateCommand, total:commands.length};
}

function getGuildStats(client, guildID){
    let commands = client.databases[4].get("commands").filter(c => c.data.guild.id === guildID);
    let aDateCommand = {};
    commands.forEach(cmd => {
        tDate = formatDate(new Date(cmd.date));
        if(aDateCommand[tDate]){
            aDateCommand[tDate]++;
        } else {
            aDateCommand[tDate] = 1;
        }
    });
    return {graph:aDateCommand, total:commands.length};
}

function getMostUsedCommands(client, guildID){
    let commands = client.databases[4].get("commands").filter(c => c.data.guild.id === guildID).map(c => c.data.command);
    let commandsCount = {};
    commands.forEach(cmd => {
        if(!commandsCount[cmd]){
            commandsCount[cmd] = 1;
        } else {
            commandsCount[cmd]++;
        }
    });
    var sortable = [];
    for (var cmd in commandsCount) {
        sortable.push([cmd, commandsCount[cmd]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    var top = [];
    sortable.forEach(e => {
        top.push({command:e[0],count:e[1]});
    });
    if(top.length > 7) top.length = 7;
    return top;
}

function updateConf(client, guildID, data){
    let serversData = client.databases[1];

    // Update suggestion
    let suggest = (data.suggestions ? (client.guilds.get(guildID).channels.find(e => e.name === data.suggestions) ? client.guilds.get(guildID).channels.find(e => e.name === data.suggestions).id : "false") : "false");
    if(!suggest) suggest = "false";
    serversData.set(guildID+".channels.suggestion", suggest);

    // Update modlogs
    let modlogs = (data.modlogs ? (client.guilds.get(guildID).channels.find(e => e.name === data.modlogs) ? client.guilds.get(guildID).channels.find(e => e.name === data.modlogs).id : "false") : "false");
    if(!modlogs) modlogs = "false";
    serversData.set(guildID+".channels.modlogs", modlogs);

    // Update prefix
    let prefix = (data.prefix.length > 0 ? data.prefix : serversData.get(guildID+".prefix"));
    serversData.set(guildID+".prefix", prefix);

    // Update language
    let lang = (data.language === "French" ? "fr" : "en");
    serversData.set(guildID+".lang", lang);

    return;

}

module.exports = router;