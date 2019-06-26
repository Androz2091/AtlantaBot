// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

const Discord = require("discord.js"),
xpCooldown = {},
cmdCooldown = {};

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        // If the messagr author is a bot
        if(message.author.bot){
            return;
        }

        // If the member on a guild is invisible or not cached, fetch them.
        if(message.guild && !message.member){
            await message.guild.members.fetch(message.author.id);
        }
        
        let client = this.client;
        message.config = client.config;
        message.tclient = client;

        if(message.content.startsWith("<@"+client.user.id+">")){
            message.mentions.users = message.mentions.users.filter((u) => u.user.id !== client.user.id);
            message.mentions.members = message.mentions.members.filter((u) => u.user.id !== client.user.id);
        }

        // Gets settings
        let settings = await client.functions.getSettings(client, message.channel);
        message.settings = settings;

        // Gets language
        let language = new(require(`../languages/${settings.language}.js`));
        message.language = language;

        // Check if the bot was mentionned
        if(message.content === `<@${client.user.id}>`){
            return message.reply(language.get("PREFIX_INFO", settings.prefix));
        }

        if(message.content === "@someone"){
            return client.commands.get("someone").run(message);
        }

        // Gets the data of the users
        let usersData = await client.functions.getUsersData(client, [message.author].concat(message.mentions.users));
        message.usersData = usersData;

        if(message.guild){
            updateXp(message);
        }

        // Gets the prefix
        let prefix = client.functions.getPrefix(message);
        if(!prefix){
            return;
        }

        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
        if(!cmd){
            return;
        }

        if(client.databases[5].get(`users.${message.author.id}`)){
            return message.channel.send(message.language.get(`BLACKLIST_BANNED_USER`, this.client.databases[5].get(`users.${message.author.id}`)))
        }

        if(cmd.conf.guildOnly && !message.guild){
            return message.channel.send(language.get("ERR_GUILDONLY"));
        }

        if(message.guild){
            let neededPermission = [];
            if(!cmd.conf.botPermissions.includes("EMBED_LINKS")){
                cmd.conf.botPermissions.push("EMBED_LINKS");
            }
            cmd.conf.botPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send(language.get("ERR_MISSING_BOT_PERMS", neededPermission.map((p) => `\`${p}\``).join(", ")));
            }
            neededPermission = [];
            cmd.conf.memberPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send(language.get("ERR_MISSING_MEMBER_PERMS", neededPermission.map((p) => `\`${p}\``).join(", ")));
            }
            if(settings.ignoredChannels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")){
                return (message.delete()) && (message.author.send(language.get("ERR_UNAUTHORIZED_CHANNEL", (message.channel))));
            }
    
            if(cmd.conf.permission){
                if(!message.member.hasPermission(cmd.conf.permission)){
                    return message.channel.send(message.language.get("INHIBITOR_PERMISSIONS", cmd.conf.permission));
                }
            }
            if(!message.member.hasPermission("MENTION_EVERYONE") && message.mentions.everyone){
                return message.channel.send(language.get("ERR_EVERYONE"));
            }
            if(!message.channel.nsfw && cmd.conf.nsfw){
                return message.channel.send(language.get("ERR_NOT_NSFW"));
            }
        }

        if(!cmd.conf.enabled){
            return message.channel.send(language.get("ERR_COMMAND_DISABLED"));
        }

        if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
            return message.channel.send(language.get("ERR_OWNER_ONLY"));
        }

        let uCooldown = cmdCooldown[message.author.id];
        if(!uCooldown){
            cmdCooldown[message.author.id] = {};
            uCooldown = cmdCooldown[message.author.id];
        }
        let time = uCooldown[cmd.help.name];
        if(time && (time > Date.now())){
            return message.channel.send(language.get("ERR_CMD_COOLDOWN", Math.ceil((time-Date.now())/1000)));
        }
        cmdCooldown[message.author.id][cmd.help.name] = Date.now() + cmd.conf.cooldown;

        client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
        cmd.run(message, args);
    }
};

/**
 * xp
 * This function update userdata by adding xp
*/

async function updateXp(msg){
    
    let user = msg.usersData[0];

    // Gets the user informations
    let points = parseInt(user.exp);
    let level = parseInt(user.level);

    // if the member is already in the cooldown db
    let isInCooldown = xpCooldown[msg.author.id];
    if(isInCooldown){
        if(isInCooldown > Date.now()){
            return;
        }
    }
    // Records in the database the time when the member will be able to win xp again (3min)
    let toWait = Date.now()+60000;
    xpCooldown[msg.author.id] = toWait;
    
    // Gets a random number between 10 and 5 
    let won = Math.floor(Math.random() * ( Math.floor(10) - Math.ceil(5))) + Math.ceil(5);
    
    let newXp = parseInt(points+won, 10);

    // calculation how many xp it takes for the next new one
    let neededXp = 5 * (level * level) + 80 * level + 100;

    // check if the member up to the next level
    if(newXp > neededXp){
        user.level = parseInt(level+1, 10);
    }

    // Update user data
    user.exp = parseInt(newXp, 10);
    await user.save();
}