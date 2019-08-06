const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Automod extends Command {

    constructor (client) {
        super(client, {
            name: "automod",
            description: (language) => language.get("AUTOMOD_DESCRIPTION"),
            usage: (language) => language.get("AUTOMOD_USAGE"),
            examples: (language) => language.get("AUTOMOD_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args,data) {

        let status = args[0];
        if(!status || (status !== "on" && status !== "off")){
            return message.channel.send(message.language.get("AUTOMOD_ERR_STATUS"));
        }

        if(status === "on"){
            data.settings.plugins.automod = { enabled: true, ignored: [] };
            data.settings.markModified("plugins.automod");
            data.settings.save();
            message.channel.send(message.language.get("AUTOMOD_SUCCESS_ENABLED", data.settings.prefix));
        } else if (status === "off"){
            if(message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first()){
                let channel = message.mentions.channels.first();
                data.settings.plugins.automod.ignored.push(channel);
                data.settings.markModified("plugins.automod");
                data.settings.save();
                message.channel.send(message.language.get("AUTOMOD_SUCCESS_DISABLED_CHANNEL", channel));
            } else {
                data.settings.plugins.automod = { enabled: false, ignored: [] };
                data.settings.markModified("plugins.automod");
                data.settings.save();
                message.channel.send(message.language.get("AUTOMOD_SUCCESS_DISABLED"));
            }
        }
    }

}

module.exports = Automod;