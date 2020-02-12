const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setreports extends Command {

    constructor (client) {
        super(client, {
            name: "setreports",
            description: (language) => language.get("SETREPORTS_DESCRIPTION"),
            usage: (language) => language.get("SETREPORTS_USAGE"),
            examples: (language) => language.get("SETREPORTS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "setreport"],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first() || message.channel;
        data.guild.plugins.reports = channel.id;
        data.guild.markModified("plugins.reports");
        data.guild.save();

        message.channel.send(message.language.get("SETREPORTS_SUCCESS", channel));
        
    }

}

module.exports = Setreports;
