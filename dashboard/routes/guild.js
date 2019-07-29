const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/:serverID", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.render("404", {
            user: req.userInfos,
            language: req.language,
            currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
        });
    }

    // Fetch guild informations
    let guildInfos = await fetchGuild(guild.id, req.client, req.user.guilds);

    res.render("guild", {
        guild: guildInfos,
        user: req.userInfos,
        language: req.language,
        client: req.client,
        currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
    });

});

router.post("/:serverID", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.render("404", {
            user: req.userInfos,
            language: req.language,
            currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
        });
    }
    
    let guildData = await req.client.guildsData.findOne({id:guild.id});
    let data = req.body;
    
    if(data.language){
        let english = req.language.get("UTILS").ENGLISH;
        if(data.language === english){
            guildData.language = "english";
        } else {
            guildData.language = "french";
        }
        if(data.prefix.length > 1 && data.prefix.length < 2000){
            guildData.prefix = data.prefix;
        }
        await guildData.save();
    }

    if(data.hasOwnProperty("welcomeEnable") || data.hasOwnProperty("welcomeUpdate")){
        let welcome = {
            enabled: true,
            message: data.message,
            channel: guild.channels.find((ch) => "#"+ch.name === data.channel).id,
            withImage: data.withImage === "on"
        };
        guildData.plugins.welcome = welcome;
        guildData.markModified("plugins.welcome");
        await guildData.save();
    }

    if(data.hasOwnProperty("welcomeDisable")){
        let welcome = {
            enabled: false,
            message: null,
            channel: null,
            withImage: null
        };
        guildData.plugins.welcome = welcome;
        guildData.markModified("plugins.welcome");
        await guildData.save();
    }

    if(data.hasOwnProperty("goodbyeEnable") || data.hasOwnProperty("goodbyeUpdate")){
        let goodbye = {
            enabled: true,
            message: data.message,
            channel: guild.channels.find((ch) => "#"+ch.name === data.channel).id,
            withImage: data.withImage === "on"
        };
        guildData.plugins.goodbye = goodbye;
        guildData.markModified("plugins.goodbye");
        await guildData.save();
    }

    if(data.hasOwnProperty("goodbyeDisable")){
        let goodbye = {
            enabled: false,
            message: null,
            channel: null,
            withImage: null
        };
        guildData.plugins.goodbye = goodbye;
        guildData.markModified("plugins.goodbye");
        await guildData.save();
    }

    if(data.hasOwnProperty("autoroleEnable") || data.hasOwnProperty("autoroleUpdate")){
        let autorole = {
            enabled: true,
            role: guild.roles.find((r) => "@"+r.name === data.role).id
        };
        guildData.plugins.autorole = autorole;
        guildData.markModified("plugins.autorole");
        await guildData.save();
    }

    if(data.hasOwnProperty("autoroleDisable")){
        let autorole = {
            enabled: false,
            role: null
        };
        guildData.plugins.autorole = autorole;
        guildData.markModified("plugins.autorole");
        await guildData.save();
    }

    if(data.suggestions){
        if(data.suggestions === req.language.get("UTILS").NO_CHANNEL){
            guildData.plugins.suggestions = false;
        } else {
            guildData.plugins.suggestions = guild.channels.find((ch) => "#"+ch.name === data.suggestions).id;
        }
        if(data.modlogs === req.language.get("UTILS").NO_CHANNEL){
            guildData.plugins.modlogs = false;
        } else {
            guildData.plugins.modlogs = guild.channels.find((ch) => "#"+ch.name === data.modlogs).id;
        }
        guildData.markModified("plugins");
        await guildData.save();
    }

    res.redirect(303, "/server/"+guild.id);
});

module.exports = router;

/**
 * Fetch guild informations
 * @param {string} guildID The ID of the guild to fetch
 * @param {object} client The discord client instance
 * @param {array} guilds The user guilds
 */
async function fetchGuild(guildID, client, guilds){
    let guild = client.guilds.get(guildID);
    let conf = await client.guildsData.findOne({id:guild.id});
    let logs = await require("../../base/Log").find({});
    let stats = { commands: logs.filter((cmd) => cmd.guild && cmd.guild.id === guild.id) };
    return { ...guild, ...conf.toJSON(), ...guilds.find((g) => g.id === guild.id), ...stats };
}