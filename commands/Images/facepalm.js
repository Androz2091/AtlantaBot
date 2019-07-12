const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Facepalm extends Command {
    constructor (client) {
        super(client, {
            name: "facepalm",
            description: (language) => language.get("FACEPALM_DESCRIPTION"),
            usage: (language) => language.get("FACEPALM_USAGE"),
            examples: (language) => language.get("FACEPALM_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "palm" ],
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
        let buffer = await message.client.IdiotAPI.facepalm(avatarURL);
        let attachment = new Discord.MessageAttachment(buffer, "facepalm.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Facepalm;