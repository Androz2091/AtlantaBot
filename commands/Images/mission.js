const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Mission extends Command {
    constructor (client) {
        super(client, {
            name: "mission",
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
        let m = await message.sendT("images/mission:PLEASE_WAIT", null, false, false, "loading");
        let buffer = await this.client.AmeAPI.generate("missionpassed", { url: user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "mission.png");
        m.delete();
        message.channel.send(attachment);

    }

}

module.exports = Mission;