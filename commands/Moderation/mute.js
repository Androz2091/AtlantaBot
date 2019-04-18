const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const ms = require('ms');

class Mute extends Command {

    constructor (client) {
        super(client, {
            name: "mute",
            description: (language) => language.get('MUTE_DESCRIPTION'),
            dirname: __dirname,
            usage: "mute [@member] [time] (reason)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES", "MANAGE_CHANNELS" ],
            nsfw: false,
            examples: "$mute @Androz#2091 10m Spam",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));

        var time = args[1];
        if(!time || isNaN(ms(time))) return message.channel.send(message.language.get('INVALID_TIME'));

        // Gets the reason of the mute
        var reason = args.slice(2).join(' ');
        if(!reason) reason = message.language.get('NO_REASON_PROVIDED');

        // Mute the member by editing all guild channels
        message.guild.channels.forEach(ch => ch.overwritePermissions(member.user, {SEND_MESSAGES:false}));

        // THen send a success message
        message.channel.send(message.language.get('MUTE_SUCCESS', member, time, reason));

        // Send a message to the member
        member.send(message.language.get('MUTE_DM', message, time, reason));

        // Update database
        guild_data.muted[member.id] = Date.now()+ms(time);
        this.client.databases[1].set(`${message.guild.id}.muted`, guild_data.muted);

        // Update cases
        this.client.databases[1].add(`${message.guild.id}.case`, 1);
        // Gets case
        var tcase = this.client.databases[1].get(`${message.guild.id}.case`);

        // Gets the modlogs channel
        var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
        if(!modlogs) return;
        var modlog_embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[4], member.user.avatarURL)
            .addField(message.language.get('MODLOGS_UTILS')[0], `\`${member.user.tag}\` (${member.user})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`, true)
            .addField(message.language.get('MODLOGS_UTILS')[3], `\`${time}\``)
            .setTimestamp()
            .setColor(`#f44271`)
            .setFooter(data.embed.footer);
        return modlogs.send(modlog_embed);

    }

}

module.exports = Mute;