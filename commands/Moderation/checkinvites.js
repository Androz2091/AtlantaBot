const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Checkinvites extends Command {

    constructor (client) {
        super(client, {
            name: "checkinvites",
            description: (language) => language.get('CHECKINVITES_DESCRIPTION'),
            dirname: __dirname,
            usage: "checkinvites",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$checkinvites",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the member with an ads in their game with RegExp
        const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));

        // Send the message in the channel
        return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || message.language.get('CHECKINVITES_NOBODY'));

    }

}

module.exports = Checkinvites;