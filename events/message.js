// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

var localDB = [];
var Discord = require("discord.js");

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        // An array of client mention
        var clientMentions = [
            `<@${this.client.user.id}> `,
            `<@!${this.client.user.id}> `,
            `<@?${this.client.user.id}> `
        ];

        // If the messagr author is a bot
        if (message.author.bot) return;

        // If the member on a guild is invisible or not cached, fetch them.
        if (message.guild && !message.member) await message.guild.fetchMember(message.author.id);

        // Check if Alanta is mentionned
        var isMentionned = false;
        clientMentions.forEach(cm => {
            if(message.content.startsWith(cm) && (message.content.length > cm[0].length)){
                isMentionned = true;
            }
        });

        // if Atlanta is mentionned
        if(isMentionned){
            // Creates new array with users mentions
            var withoutAtlanta = message.mentions.users.array();
            // Delete first item from the array (atlanta)
            withoutAtlanta.shift();
            // Creates new empty collection
            var newUsersMentions = new Discord.Collection();
            // For each user, add it to the ollection
            withoutAtlanta.forEach(u => newUsersMentions.set(u.id, u));
            // Update usersMentions variable
            message.mentions.users = newUsersMentions;
        }

        var ms = require('ms');

        // gets the data of the users
        var membersdata = this.client.functions.getUsersData(this.client, message);

        // Inits new object to more easily access certain data
        var data = { embed:{ color:this.client.config.embed.color, footer:this.client.config.embed.footer } };

        // If the command is run is DM
        if(message.channel.type === 'dm'){
            var bl = this.client.databases[5].get(`users.${message.author.id}`)
            if(bl){
                return message.channel.send(message.language.get(`BLACKLIST_BANNED_USER`, bl))
            }
            // Utils variables
            const args = message.content.trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            message.language = new(require('../languages/'+this.client.config.defaultLanguage+'.js'));
            // Gets the command
            let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if(!cmd) return message.channel.send(message.author.username+', no command found with name `'+command+'`.');
            // Checking for permissions
            if ((cmd && cmd.conf.guildOnly) || (cmd && cmd.conf.permissions)) return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
            if(cmd.conf.owner && message.author.id !== this.client.config.owner) return message.channel.send(message.language.get('OWNER_ONLY'));
            data.cmd = cmd;
            // If the command exists, run it
            this.client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name} in DM`, "cmd");
            return cmd.run(message, args, membersdata, {prefix:''}, data);
        }

        // Gets guild data or inits with default config
        var guild_data = this.client.databases[1].get(message.guild.id) || this.client.functions.createGuild(this.client, message.guild);

        // gets the language of the guild
        message.language = new(require('../languages/'+guild_data.lang+'.js'));

        /* SLOWMODE */

        if(!message.member.hasPermission('MANAGE_GUILD')){
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
        }

        // Checks if the bot was mentioned, with no message after it, returns the prefix.
        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if(message.content.match(prefixMention)) return message.reply(message.language.get('PREFIX_INFO', guild_data.prefix));

        /* DETECT AFK MEMBERS */
        let afk_reason = this.client.databases[0].get(`afk.${message.author.id}`);
        if(afk_reason){
            var afk_members = this.client.databases[0].get(`afk`);
            delete afk_members[message.author.id];
            this.client.databases[0].set(`afk`, afk_members);
            message.channel.send(message.language.get('AFK_DELETED', message.author));
        };

        // For each members mentionned
        message.mentions.members.forEach(m => {
            let afk_reason = this.client.databases[0].get(`afk.${m.id}`);
            if(afk_reason) message.channel.send(message.language.get('AFK_IS_AFK', m, afk_reason));
        });


        // Update user xp
        updateXp(message, membersdata[0], this.client.databases[0], this.client.databases[2].xp);

        if(message.content === '@someone'){
            return this.client.commands.get('someone').run(message, null, membersdata, guild_data, data);
        }

        /* Automod */
        if(guild_data.deleteinvite.status === 'enabled' && !guild_data.deleteinvite.channels.includes(message.channel.id)){
            if(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)){
                if(!message.member.hasPermission('MANAGE_MESSAGES')){
                    message.delete();
                    message.author.send('```'+message.content+'```');
                    return message.channel.send(message.language.get('AUTOMOD_MSG', message));
                }
            }
        }

        var validPrefixes = [
            guild_data.prefix,
            'atlanta'
        ].concat(clientMentions);

        var prefix = null;
        validPrefixes.forEach(p => {
            if(message.content.startsWith(p)) prefix = p;
        });
        if(!prefix) return;


        // If the message content is "/pay @Androz 10", the args will be : [ "pay", "@Androz", "10" ]
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        // The command will be : "pay" and the args : [ "@Androz", "10" ]
        var command = args.shift();

        if(guild_data.commands[command]){
            if(guild_data.ignored_channels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")) return (message.delete()) && (message.author.send(message.language.get('CHANNEL_IGNORED', (message.channel))));
            return message.channel.send(guild_data.commands[command]);
        }

        command = command.toLowerCase();

        // Gets the command
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        // If no command found, return;
        if (!cmd) return;

        if(this.client.databases[5].get(`users.${message.author.id}`)){
            return message.channel.send(message.language.get(`BLACKLIST_BANNED_USER`, this.client.databases[5].get(`users.${message.author.id}`)))
        }
        
        // Fix everyone mention
        if(!message.member.hasPermission('MENTION_EVERYONE') && message.mentions.everyone) return message.channel.send(message.language.get('MENTION_EVERYONE'));

        // Check bot permissions :
        var neededPermission = [];
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