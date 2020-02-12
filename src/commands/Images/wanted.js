const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Wanted extends Command {
    constructor (client) {
        super(client, {
            name: "wanted",
            description: (language) => language.get("WANTED_DESCRIPTION"),
            usage: (language) => language.get("WANTED_USAGE"),
            examples: (language) => language.get("WANTED_EXAMPLES"),
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

        let user = await this.client.resolveUser(args[0]) || message.author;
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        let buffer = await this.client.AmeAPI.generate("wanted", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
        let attachment = new Discord.MessageAttachment(buffer, "wanted.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Wanted;