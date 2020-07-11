const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Tobecontinued extends Command {
    constructor (client) {
        super(client, {
            name: "tobecontinued",
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
        let m = await message.sendT("misc:PLEASE_WAIT", null, {
            prefixEmoji: "loading"
        });
        let buffer = await this.client.AmeAPI.generate("tobecontinued", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
        let attachment = new Discord.MessageAttachment(buffer, "tobecontinued.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Tobecontinued;