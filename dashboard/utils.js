const Discord = require("discord.js");

/**
 * Fetch guild informations
 * @param {string} guildID The ID of the guild to fetch
 * @param {object} client The discord client instance
 * @param {array} guilds The user guilds
 */
async function fetchGuild(guildID, client, guilds){
    let guild = client.guilds.get(guildID);
    let conf = await client.guildsData.findOne({id:guild.id});
    let logs = await require("../base/Log").find({});
    let stats = { commands: logs.filter((cmd) => cmd.guild && cmd.guild.id === guild.id) };
    return { ...guild, ...conf.toJSON(), ...guilds.find((g) => g.id === guild.id), ...stats };
}

/**
 * Fetch user informations (stats, guilds, etc...)
 * @param {object} userData The oauth2 user informations
 * @param {object} client The discord client instance
 * @param {string} query The optional query for guilds
 * @returns {object} The user informations
 */
async function fetchUser(userData, client, query){
    if(userData.guilds){
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
    }
    let user = await client.users.fetch(userData.id);
    let usersDb = await client.functions.getUsersData(client, [ user ]);
    let userDb = usersDb[0];
    let logs = await require("../base/Log").find({});
    let stats = { commands: logs.filter((cmd) => cmd.user.id === user.id) };
    let userInfos = { ...user.toJSON(), ...userDb.toJSON(), ...userData, ...user.presence,  ...stats};
    return userInfos;
}

/**
 * Get the leaderboard for money, level and reputation
 * @param {object} client The Discord client instance
 * @param {number} amount The amount of members to displays in each category (optional)
 * @returns {object}
 */
async function getLeaderboard(client, amount){
    let leaderboard = [];
    let users = await client.usersData.find({});
    users.forEach((user) => {
        leaderboard.push({
            id: user.id,
            money: user.money || 0,
            rep: user.rep || 0,
            level: parseInt(user.level, 10)
        });
    });
    let leaderboards = {
        money: sortArrayOfObjects("money", leaderboard),
        level: sortArrayOfObjects("level", leaderboard),
        rep: sortArrayOfObjects("rep", leaderboard)
    };
    if(amount){
        for(let cat in leaderboards){
            let e = leaderboards[cat];
            if(e.length > amount){
                e.length = amount;
            }
        }
    }
    let stats = {
        money: await fetchUsers(leaderboards.money, client),
        level: await fetchUsers(leaderboards.level, client),
        rep: await fetchUsers(leaderboards.rep, client)
    };
    return stats;
}

async function fetchUsers(array, client) {
    return new Promise((resolve, reject) => {
        let users = [];
        array.forEach((element) => {
            client.users.fetch(element.id).then((user) => {
                users.push({ ...{
                    money: element.money,
                    level: element.level,
                    rep: element.rep
                }, ...user.toJSON() });
            });
        });
        resolve(users);
    });
}

function sortArrayOfObjects(key, arr){
    let array = arr.slice(0);
    return array.sort((a, b) => {
        return b[key] - a[key];
    });
}

module.exports = { fetchUser, getLeaderboard, fetchGuild };