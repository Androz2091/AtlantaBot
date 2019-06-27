const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setsuggests extends Command {

    constructor (client) {
        super(client, {
            name: "setsuggests",
            description: (language) => language.get("SETSUGGESTS_DESCRIPTION"),
            usage: (language) => language.get("SETSUGGESTS_USAGE"),
            examples: (language) => language.get("SETSUGGESTS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "setsuggest", "setsuggestions", "setsuggestion" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let channel = message.mentions.channels.first() || message.channel;
        data.settings.plugins.suggestions = channel.id;
        data.settings.markModified("plugins.suggestions");
        data.settings.save();

        message.channel.send(message.language.get("SETSUGGESTS_SUCCESS", message.channel));
        
    }

}

module.exports = Setsuggests;