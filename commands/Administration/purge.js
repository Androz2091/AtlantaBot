const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Purge extends Command {

    constructor (client) {
        super(client, {
            name: "purge",
            description: (language) => language.get('PURGE_DESCRIPTION'),
            dirname: __dirname,
            usage: "purge [amount of days]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "KICK_MEMBERS",
            botpermissions: [ "SEND_MESSAGES", "MANAGE_GUILD", "KICK_MEMBERS" ],
            nsfw: false,
            examples: "$purge 10",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var days = args[0];
        if(!days || isNaN(days)) return message.channel.send(message.language.get("PURGE_DAYS"));
        days = parseInt(days, 10);

        var members = await message.guild.pruneMembers(days, true);

        message.channel.send(message.language.get("PURGE_CONFIRMATION", members))
        .then((m) => {
            message.channel.awaitMessages(response => (response.content === 'confirm') && (response.author.id === message.author.id), {
              max: 1,
              time: 10000,
              errors: ['time'],
            })
            .then((collected) => {
                message.guild.pruneMembers(days, false).then(() => {
                    message.channel.send(message.language.get("PURGE_SUCCESS", members))
                });
            }).catch(() => {
                m.edit(message.language.get("PURGE_TIMEOUT"));
            });
          });
        
    }

}

module.exports = Purge;