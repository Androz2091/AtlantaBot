const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Garbage extends Command {
    constructor (client) {
        super(client, {
            name: "garbage",
            description: (language) => language.get("GARBAGE_DESCRIPTION"),
            usage: (language) => language.get("GARBAGE_USAGE"),
            examples: (language) => language.get("GARBAGE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "hate" ],
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

        let user = await this.client.resolveUser(args[0]) || message.author;
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        let buffer = await message.client.IdiotAPI.garbage(user.displayAvatarURL({ format: "png", size: 512 }));
        let attachment = new Discord.MessageAttachment(buffer, "hates.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Garbage;