const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setmodlogs extends Command {

    constructor (client) {
        super(client, {
            name: "setmodlogs",
            description: (language) => language.get("SETMODLOGS_DESCRIPTION"),
            usage: (language) => language.get("SETMODLOGS_USAGE"),
            examples: (language) => language.get("SETMODLOGS_EXAMPLES"),
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
        
        let channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first() || message.channel;
        data.settings.plugins.modlogs = channel.id;
        data.settings.markModified("plugins.modlogs");
        data.settings.save();

        // Send success message
        message.channel.send(message.language.get("SETMODLOGS_SUCCESS", channel.id));
    }

}

module.exports = Setmodlogs;