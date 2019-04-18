const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setafk extends Command {

    constructor (client) {
        super(client, {
            name: "setafk",
            description: (language) => language.get('SETAFK_DESCRIPTION'),
            dirname: __dirname,
            usage: "setafk [reason]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$setafk sleeping",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the reason
        var reason = args.join(' ');
        if(!reason) return message.channel.send(message.language.get('SETAFK_REASON'));

        // Send success message
        message.channel.send(message.language.get('SETAFK_SUCCESS', reason));

        // Update db
        this.client.databases[0].set(`afk.${message.author.id}`, reason);

    }

}

module.exports = Setafk;