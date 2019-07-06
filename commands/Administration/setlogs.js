const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setlogs extends Command {

    constructor (client) {
        super(client, {
            name: "setlogs",
            description: (language) => language.get("SETLOGS_DESCRIPTION"),
            usage: (language) => language.get("SETLOGS_USAGE"),
            examples: (language) => language.get("SETLOGS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "setmodlogs" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let channel = message.mentions.channels.first() || message.channel;
        data.settings.plugins.modlogs = channel.id;
        data.settings.markModified("plugins.modlogs");
        data.settings.save();

        // Send success message
        message.channel.send(message.language.get("SETLOGS_SUCCESS", message.channel.id));
    }

}

module.exports = Setlogs;