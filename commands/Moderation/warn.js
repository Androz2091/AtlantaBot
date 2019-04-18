const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Warn extends Command {

    constructor (client) {
        super(client, {
            name: "warn",
            description: (language) => language.get('WARN_DESCRIPTION'),
            dirname: __dirname,
            usage: "warn [@member] [reason]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$warn @Androz#2091 Spam",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));

        // Gets the reason of the warn
        var reason = args.slice(1).join(' ');
        if(!reason) return message.channel.send(message.language.get('WARN_REASON'));

        // Update cases
        this.client.databases[1].add(`${message.guild.id}.case`, 1);
        // Gets case
        var tcase = this.client.databases[1].get(`${message.guild.id}.case`);

        // Gets current member sanctions
        var memberSanctions = guild_data.warns_sanctions[member.id] || [];
        
        // If the member need to be banned
        if(memberSanctions.length >= guild_data.automod_warns['ban']){
            // Reset member sanctions
            this.client.databases[1].set(`${message.guild.id}.warns_sanctions.${member.id}`, []);
            // Send ban message to the member
            member.send(message.language.get('BAN_DM', member.user, message, reason));
            // Send a message in the current channel
            message.channel.send(message.language.get('WARN_AUTOBAN', member, guild_data.automod_warns['ban']));
            // Ban the member
            message.guild.ban(member.user);
            // Gets the modlogs channel
            var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
            if(!modlogs) return;
            var modlog_embed = new Discord.RichEmbed()
                .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[0], member.user.avatarURL)
                .addField(message.language.get('MODLOGS_UTILS')[0], `\`${member.user.tag}\` (${member.user})`, true)
                .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
                .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`)
                .setTimestamp()
                .setColor(`#e02316`)
                .setFooter(data.embed.footer);
            return modlogs.send(modlog_embed);
        }
        
        // If the member need to be kicked
        if(memberSanctions.length >= guild_data.automod_warns['kick']){
            // add sanction to member sanctions
            memberSanctions.push({ date:Date.now(), moderator:message.author.id, case:tcase, reason:reason });
            this.client.databases[1].set(`${message.guild.id}.warns_sanctions.${member.id}`, memberSanctions);
            // Send kick message to the member
            member.send(message.language.get('KICK_DM', member.user, message, reason));
            // Send a message in the current channel
            message.channel.send(message.language.get('WARN_AUTOKICK', member, guild_data.automod_warns['kick']));
            // Kick the member
            member.kick();
            // Gets the modlogs channel
            var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
            if(!modlogs) return;
            var modlog_embed = new Discord.RichEmbed()
                .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[1], member.user.avatarURL)
                .addField(message.language.get('MODLOGS_UTILS')[0], `\`${member.user.tag}\` (${member.user})`, true)
                .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
                .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`)
                .setTimestamp()
                .setColor(`#e02316`)
                .setFooter(data.embed.footer);
            return modlogs.send(modlog_embed);
        }

        // add sanction to member sanctions
        memberSanctions.push({ date:Date.now(), moderator:message.author.id, case:tcase, reason:reason });
        this.client.databases[1].set(`${message.guild.id}.warns_sanctions.${member.id}`, memberSanctions);
        
        // Send a dm to the member
        member.send(message.language.get('WARN_DM', message, reason));

        // Send a message in the current channel
        message.channel.send(message.language.get('WARN_SUCCESS', member, reason));

        // Gets the modlogs channel
        var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
        if(!modlogs) return;

        var modlog_embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[3], member.user.avatarURL)
            .addField(message.language.get('MODLOGS_UTILS')[0], `\`${member.user.tag}\` (${member.user})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[2], `${reason}`)
            .setTimestamp()
            .setColor(`#8c14e2`)
            .setFooter(data.embed.footer);

        modlogs.send(modlog_embed);
    }

}

module.exports = Warn;