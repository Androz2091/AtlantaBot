const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Triggered extends Command {
    constructor (client) {
        super(client, {
            name: "triggered",
            description: (language) => language.get("TRIGGERED_DESCRIPTION"),
            usage: (language) => language.get("TRIGGERED_USAGE"),
            examples: (language) => language.get("TRIGGEREDS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        
        if(!message.client.IdiotAPI){
            return message.channel.send(message.language.get("ERR_COMMAND_DISABLED"));
        }

        let options = { format: "png", size: 512 };
        let avatarURL = message.mentions.users.first() ?
        message.mentions.users.first().displayAvatarURL(options)
        : message.author.displayAvatarURL(options);
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        let buffer = await message.client.IdiotAPI.triggered(avatarURL);
        let attachment = new Discord.MessageAttachment(buffer, "triggered.gif");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Triggered;