const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Ban extends Command {

    constructor (client) {
        super(client, {
            name: "ban",
            description: (language) => language.get('BAN_DESCRIPTION'),
            dirname: __dirname,
            usage: "ban [@member] (reason)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "BAN_MEMBERS",
            botpermissions: [ "SEND_MESSAGES", "BAN_MEMBERS" ],
            nsfw: false,
            examples: "$ban @Androz#2091 Spam",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0]) return message.channel.send(message.language.get('BAD_PARAMETERS', data.cmd.help.name, guild_data.prefix));

        var user; 
        
        // Try to get the first mentionned member
        var member = message.mentions.members.first();
        // if he doesn't exist
        if(!member){
            // Try to find a user with that ID
            await this.client.fetchUser(args[0]).then(u => {
                // if a user was found
                user = u;
            }).catch(err => {
                // if no user found, send an error message
                return message.channel.send(message.language.get('BAN_ID', args[0]))
            });
        } else user = member.user;
        
        // If the user is already banned
        var banned = await message.guild.fetchBans();
        if(banned.some(e => e.id === user.id)) return message.channel.send(message.language.get('BAN_ALREADY_BANNED', user));
        
        // Gets the ban reason
        var reason = args.slice(1).join(' ');
        if(!reason) reason = message.language.get('NO_REASON_PROVIDED');

        // if it's a member, check perm
        if(member && !member.bannable) return message.channel.send(message.language.get('BAN_ERROR'));

        // Send a DM to the user
        user.send(message.language.get('BAN_DM', user, message, reason)).catch(err => console.log(err));
        
        // Ban the user
        message.guild.ban(user).catch(err => {
            return message.channel.send(message.language.get('BAN_ERROR'));
        });

        // Update cases
        this.client.databases[1].add(`${message.guild.id}.case`, 1);
        // Gets case
        var tcase = this.client.databases[1].get(`${message.guild.id}.case`);
        
        // Send a success message in the current channel
        message.channel.send(message.language.get('BAN_SUCCESS', user, message, reason));

        // Gets the modlogs channel
        var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
        if(!modlogs) return;

        var modlog_embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[0], user.avatarURL)
            .addField(message.language.get('MODLOGS_UTILS')[0], `\`${user.tag}\` (${user})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`)
            .setTimestamp()
            .setColor(`#e02316`)
            .setFooter(data.embed.footer);

        modlogs.send(modlog_embed);

    }

}

module.exports = Ban;