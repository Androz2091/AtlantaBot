const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setsuggests extends Command {

    constructor (client) {
        super(client, {
            name: "setsuggests",
            description: (language) => language.get('SETSUGGESTS_DESCRIPTION'),
            dirname: __dirname,
            usage: "setsuggests",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$setsuggests",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // update db
        this.client.databases[1].set(`${message.guild.id}.channels.suggestion`, message.channel.id);

        // send success message
        message.channel.send(message.language.get('SETSUGGESTS_SUCCESS', message.channel));
        
    }

}

module.exports = Setsuggests;