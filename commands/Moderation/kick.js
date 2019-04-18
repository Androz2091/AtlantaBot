const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Kick extends Command {

    constructor (client) {
        super(client, {
            name: "kick",
            description: (language) => language.get('KICK_DESCRIPTION'),
            dirname: __dirname,
            usage: "kick [@member] (reason)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "KICK_MEMBERS",
            botpermissions: [ "SEND_MESSAGES", "KICK_MEMBERS" ],
            nsfw: false,
            examples: "$kick @Androz#2091 Spam",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0]) return message.channel.send(message.language.get('BAD_PARAMETERS', data.cmd.help.name, guild_data.prefix));
        
        // Try to get the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));

        // Gets the kick reason
        var reason = args.slice(1).join(' ');
        if(!reason) reason = message.language.get('NO_REASON_PROVIDED');

        // if it's a member, check perm
        if(member && !member.kickable) return message.channel.send(message.language.get('KICK_ERROR'));

        // Send a DM to the user
        member.user.send(message.language.get('KICK_DM', member.user, message, reason)).catch(err => console.log(err));

        // Kick the user
        member.kick().catch(err => {
            return message.channel.send(message.language.get('KICK_ERROR'));
        });

        // Send a success message in the current channel
        message.channel.send(message.language.get('KICK_SUCCESS', member.user, message, reason));

        // Update cases
        this.client.databases[1].add(`${message.guild.id}.case`, 1);
        // Gets case
        var tcase = this.client.databases[1].get(`${message.guild.id}.case`);

        // Gets the modlogs channel
        var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
        if(!modlogs) return;

        var modlog_embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[1], member.user.avatarURL)
            .addField(message.language.get('MODLOGS_UTILS')[0], `\`${member.user.tag}\` (${member.user})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`)
            .setTimestamp()
            .setColor(`#e88709`)
            .setFooter(data.embed.footer);

        modlogs.send(modlog_embed);

    }

}

module.exports = Kick;