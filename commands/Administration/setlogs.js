const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setlogs extends Command {

    constructor (client) {
        super(client, {
            name: "setlogs",
            description: (language) => language.get('SETLOGS_DESCRIPTION'),
            dirname: __dirname,
            usage: "setlogs",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$setlogs",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Update database
        this.client.databases[1].set(`${message.guild.id}.channels.modlogs`, message.channel.id);

        // Send success message
        message.channel.send(message.language.get('SETLOGS_SUCCESS', message.channel.id));
    }

}

module.exports = Setlogs;