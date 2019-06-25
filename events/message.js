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
            await message.guild.fetchMember(message.author.id);
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
        console.log(settings);

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

        /* SLOWMODE */

        /*if(!message.member.hasPermission('MANAGE_GUILD')){
            if(guild_data.slowmode[message.channel.id]){
                if(guild_data.userslowmode[`${message.channel.id}${message.author.id}`]){
                    var the_time = guild_data.userslowmode[`${message.channel.id}${message.author.id}`];
                    if(the_time > Date.now()){
                        message.delete();
                        var delai = message.language.convertMs(the_time - Date.now());
                        return message.author.send(message.language.get('SLOWMODE_PLEASE_WAIT', delai, message.channel));
                    }
                }
                this.client.databases[1].set(`${message.guild.id}.userslowmode.${message.channel.id}${message.author.id}`, Date.now() + guild_data.slowmode[message.channel.id]);
            }
        }*/

        /* DETECT AFK MEMBERS */
        /*let afk_reason = this.client.databases[0].get(`afk.${message.author.id}`);
        if(afk_reason){
            var afk_members = this.client.databases[0].get(`afk`);
            delete afk_members[message.author.id];
            this.client.databases[0].set(`afk`, afk_members);
            message.channel.send(message.language.get('AFK_DELETED', message.author));
        };*/

        // For each members mentionned
        /*message.mentions.members.forEach(m => {
            let afk_reason = this.client.databases[0].get(`afk.${m.id}`);
            if(afk_reason) message.channel.send(message.language.get('AFK_IS_AFK', m, afk_reason));
        });*/


        // Update user xp
        //updateXp(message, membersdata[0], this.client.databases[0], this.client.databases[2].xp);

        

        /* Automod */
        /*if(guild_data.deleteinvite.status === 'enabled' && !guild_data.deleteinvite.channels.includes(message.channel.id)){
            if(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)){
                if(!message.member.hasPermission('MANAGE_MESSAGES')){
                    message.delete();
                    message.author.send('```'+message.content+'```');
                    return message.channel.send(message.language.get('AUTOMOD_MSG', message));
                }
            }
        }*/

        
        
        // Fix everyone mention
        //if(!message.member.hasPermission('MENTION_EVERYONE') && message.mentions.everyone) return message.channel.send(message.language.get('MENTION_EVERYONE'));

        // Check bot permissions :
        /*var neededPermission = [];
        cmd.conf.botpermissions.forEach(perm => { if(!message.channel.permissionsFor(message.guild.me).has(perm)) neededPermission.push(perm); });
        if(neededPermission.length > 0) return message.channel.send(message.language.get('INHIBITOR_MISSING_BOT_PERMS', neededPermission.map(p => p).join(', ')));

        // checks if the command can be launched
        if(guild_data.ignored_channels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")) return (message.delete()) && (message.author.send(message.language.get('CHANNEL_IGNORED', (message.channel))));
        if(cmd.conf.nsfw && !message.channel.nsfw) return message.channel.send(message.language.get('INHIBITOR_NSFW'))
        if(cmd.conf.permission){
            if(!message.member.hasPermission(cmd.conf.permission)) return message.channel.send(message.language.get('INHIBITOR_PERMISSIONS', cmd.conf.permission));
        }
        if(!cmd.conf.enabled) return message.channel.send(message.language.get('COMMAND_DISABLED'));
        if(cmd.conf.owner && message.author.id !== this.client.config.owner) return message.channel.send(message.language.get('OWNER_ONLY'));

        data.cmd = cmd;

        // to display the user's stats
        this.client.databases[4].push('commands', {
            date:Date.now(), 
            author:message.author.id, 
            data:{command:cmd.help.name,channel:{id:message.channel.id,name:message.channel.name},guild:{id:message.guild.id,name:message.guild.name}}
        });

        // If the command exists, **AND** the user has permission, run it.
        this.client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
        cmd.run(message, args, membersdata, guild_data, data);

    }*/
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