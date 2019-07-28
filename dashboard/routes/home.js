const express = require("express"),
Discord = require("discord.js"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/", CheckAuth, async (req, res) => {
    let userInfos = await fetchUser(req.user, req.client);
    console.log(req.user.guilds)
    res.render("dashboard", {
        user: userInfos,
        language: req.language
    });
});

async function fetchUser(userData, client){
    userData.guilds.forEach((guild) => {
        let perms = new Discord.Permissions(guild.permissions);
        if(perms.has("MANAGE_GUILD")){
            userData.guilds.find((g) => g.id === guild.id).admin = true;
        }
    });
    let user = await client.users.fetch(userData.id);
    let usersDb = await client.functions.getUsersData(client, [ user ]);
    let userDb = usersDb[0];
    let logs = await require("../../base/Log").find({});
    let stats = { commands: logs.filter((cmd) => cmd.user.id === user.id) };
    let userInfos = { ...user.toJSON(), ...userDb.toJSON(), ...userData, ...user.presence,  ...stats};
    return userInfos;
}

module.exports = router;