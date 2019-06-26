// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

var Discord = require("discord.js");

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
        let membersData = await client.functions.getUsersData(client, [message.author].concat(message.mentions.users));

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
            return message.channel.send(language.get("ERROR_COMMAND_GUILDONLY"));
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
                return message.channel.send(language.get("INHIBITOR_MISSING_BOT_PERMS", neededPermission.map((p) => `\`${p}\``).join(", ")));
            }
            neededPermission = [];
            cmd.conf.memberPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send(language.get("INHIBITOR_MISSING_MEMBER_PERMS", neededPermission.map((p) => `\`${p}\``).join(", ")));
            }
            if(settings.ignoredChannels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")){
                return (message.delete()) && (message.author.send(language.get("CHANNEL_IGNORED", (message.channel))));
            }
    
            if(cmd.conf.permission){
                if(!message.member.hasPermission(cmd.conf.permission)){
                    return message.channel.send(message.language.get("INHIBITOR_PERMISSIONS", cmd.conf.permission));
                }
            }
            if(!message.member.hasPermission("MENTION_EVERYONE") && message.mentions.everyone){
                return message.channel.send(language.get("MENTION_EVERYONE"));
            }
            if(!message.channel.nsfw && cmd.conf.nsfw){
                return message.channel.send(language.get("INHIBITOR_NSFW"));
            }
        }

        if(!cmd.conf.enabled){
            return message.channel.send(language.get("COMMAND_DISABLED"));
        }

        if(cmd.conf.owner && message.author.id !== client.config.owner.id){
            return message.channel.send(language.get("OWNER_ONLY"));
        }

        client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
        cmd.run(message, args);
    }
};

/**
 * xp
 * This function update userdata by adding xp
*/

function updateXp(msg, userdata, db, cooldown_db){

    // require ms (to convert minutes to ms)
    var ms = require('ms');
    
    // Gets the user informations
    var xp = parseInt(userdata.xp);
    var level = parseInt(userdata.level);

    // if the member is already in the cooldown db
    var isInCooldown = cooldown_db.get(msg.author.id);
    if(isInCooldown){
        /*if the timestamp recorded in the database indicating 
        when the member will be able to win xp again
        is greater than the current date, return */
        if(isInCooldown > Date.now()) return;
    }
    // Records in the database the time when the member will be able to win xp again (3min)
    var towait = Date.now() + ms('1m');
    cooldown_db.set(msg.author.id, towait);
    
    // Gets a random number between 10 and 5 
    let won = Math.floor(Math.random() * ( Math.floor(10) - Math.ceil(5))) + Math.ceil(5);
    
    let newXp = parseInt(xp + won);

    // Update user data
    db.set(`${msg.author.id}.xp`, newXp);

    // calculation how many xp it takes for the next new one
    let needed_xp = 5 * (level * level) + 80 * level + 100;

    // check if the member up to the next level
    if(newXp > needed_xp) level++;

    // Update user data
    db.set(`${msg.author.id}.level`, level);
}