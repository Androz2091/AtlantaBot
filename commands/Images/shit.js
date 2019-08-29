const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Shit extends Command {
    constructor (client) {
        super(client, {
            name: "shit",
            description: (language) => language.get("SHIT_DESCRIPTION"),
            usage: (language) => language.get("SHIT_USAGE"),
            examples: (language) => language.get("SHIT_EXAMPLES"),
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

        let user = await this.client.resolveUser(args[0]) || message.author;
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        let buffer = await message.client.IdiotAPI.stepped(user.displayAvatarURL({ format: "png", size: 512 }));
        let attachment = new Discord.MessageAttachment(buffer, "shit.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Shit;