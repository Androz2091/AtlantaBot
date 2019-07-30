const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ignore extends Command {

    constructor (client) {
        super(client, {
            name: "ignore",
            description: (language) => language.get("IGNORE_DESCRIPTION"),
            usage: (language) => language.get("IGNORE_USAGE"),
            examples: (language) => language.get("IGNORE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "disableChannel" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let channel = message.mentions.channels.filter((ch) => ch.type === "text" && channel.guild.id === message.guild.id).first();
        if(!channel){
            return message.channel.send(message.language.get("ERR_INVALID_CHANNEL"));
        }

        let ignored = data.settings.ignoredChannels.includes(channel.id);

        if(ignored){
            data.settings.ignoredChannels = data.settings.ignoredChannels.filter((ch) => ch !== channel.id);
            data.settings.save();
            return message.channel.send(message.language.get("IGNORE_SUCCESS_DISABLED", channel));
        } else if(!ignored){
            data.settings.ignoredChannels.push(channel.id);
            data.settings.save();
            return message.channel.send(message.language.get("IGNORE_SUCCESS_ENABLED", channel));
        }
        
    }

}

module.exports = Ignore;