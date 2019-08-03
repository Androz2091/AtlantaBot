const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
ms = require("ms");

class Slowmode extends Command {

    constructor (client) {
        super(client, {
            name: "slowmode",
            description: (language) => language.get("SLOWMODE_DESCRIPTION"),
            usage: (language) => language.get("SLOWMODE_USAGE"),
            examples: (language) => language.get("SLOWMODE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "slowmotion" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first();
        if(!channel){
            return message.channel.send(message.language.get("ERR_INVALID_CHANNEL"));
        }
        let time = args[1];
        if(!time){
            if(!data.settings.slowmode.channels.find((ch) => ch.id === channel.id)){
                return message.channel.send(message.language.get("ERR_INVALID_TIME"));
            }
            data.settings.slowmode.channels = data.settings.slowmode.channels.filter((ch) => ch.id !== channel.id);
            data.settings.markModified("slowmode.channels");
            data.settings.save();
            message.channel.send(message.language.get("SLOWMODE_DISABLED", channel.id));
        } else {
            if(isNaN(ms(time))){
                return message.channel.send(message.language.get("ERR_INVALID_TIME"));
            }
            data.settings.slowmode.channels.push({
                id: channel.id,
                time: ms(time)
            });
            data.settings.markModified("slowmode.channels");
            data.settings.save();
            message.channel.send(message.language.get("SLOWMODE_ENABLED", channel.id, time));
        }
    }
}

module.exports = Slowmode;