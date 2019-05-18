const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Addemote extends Command {

    constructor (client) {
        super(client, {
            name: "addemote",
            description: (language) => language.get('ADDEMOTE_DESCRIPTION'),
            dirname: __dirname,
            usage: "addemote [link]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_EMOJIS",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_EMOJIS" ],
            nsfw: false,
            examples: "$addemote https://image.com",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the url of the emote
        var url = args[0];
        // Gets the name of the emote
        var name = args[1];

        if(!url) return message.channel.send(message.language.get('ADDEMOTE_URL'));
        if(!name) return message.channel.send(message.language.get('ADDEMOTE_NAME'));

        // Add the emote
        message.guild.createEmoji(url, name).then(emote => {
            // send success message
            message.channel.send(message.language.get('ADDEMOTE_SUCCESS', emote));
        }).catch(err => {
            // send error message
            return message.channel.send(message.language.get('ADDEMOTE_ERROR'));
        });
    }

}

module.exports = Addemote;