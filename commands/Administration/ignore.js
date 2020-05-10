const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ignore extends Command {

    constructor (client) {
        super(client, {
            name: "ignore",
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

        let channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first();
        if(!channel){
            return message.error("misc:INVALID_CHANNEL");
        }

        let ignored = data.guild.ignoredChannels.includes(channel.id);

        if(ignored){
            data.guild.ignoredChannels = data.guild.ignoredChannels.filter((ch) => ch !== channel.id);
            data.guild.save();
            return message.error("administration/ignore:ALLOWED", {
                channel
            });
        } else if(!ignored){
            data.guild.ignoredChannels.push(channel.id);
            data.guild.save();
            return message.error("administration/ignore:IGNORED", {
                channel
            });
        }
        
    }

}

module.exports = Ignore;