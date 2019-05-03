const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Blacklist extends Command {

    constructor (client) {
        super(client, {
            name: "blacklist",
            description: (language) => language.get('BLACKLIST_DESCRIPTION'),
            dirname: __dirname,
            usage: "blacklist [user/guild] [ID] (reason)",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$blacklist user 091292 Spam",
            owner: true
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var [type,id] = args;
        if(!type || !id) return message.channel.send(message.language.get('BLACKLIST_ARGS'));
        if((type !== 'guild' && type !== 'user')) return message.channel.send(message.language.get('BLACKLIST_ARGS'));
        var reason = args.slice(2).join(' ') || 'No reason provided';

        if(type === 'guild'){
            // Try to get the guild 
            var guild = this.client.guilds.get(id);
            if(!guild) message.channel.send(message.language.get('BLACKLIST_GUILD', id));
            else message.channel.send(message.language.get('BLACKLIST_GUILD', guild.name));
            // Update db
            this.client.databases[5].set(`guilds.${id}`, reason);
            // if the bot is in the guild, leave it
            if(guild) guild.leave();
        } else {
            // Fetch the user
            this.client.fetchUser(id).then(user => {
                message.channel.send(message.language.get('BLACKLIST_USER', user.tag));
                // Update db
                this.client.databases[5].set(`users.${id}`, reason);
            }).catch(err => {
                return message.channel.send(message.language.get(`BLACKLIST_ID`, id));
            });
        }

    }

}

module.exports = Blacklist;