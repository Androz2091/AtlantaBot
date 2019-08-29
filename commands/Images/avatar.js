const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Avatar extends Command {
    constructor (client) {
        super(client, {
            name: "avatar",
            description: (language) => language.get("AVATAR_DESCRIPTION"),
            usage: (language) => language.get("AVATAR_USAGE"),
            examples: (language) => language.get("AVATAR_EXAMPLES"),
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

        let user = await this.client.resolveUser(args[0]);
        if(!user) user = message.author;
        if(message.content.includes("-v")) message.channel.send("<"+avatarURL+">");
        let attachment = new Discord.MessageAttachment(user.displayAvatarURL({ format: "png", size: 512 }), "avatar.png");
        message.channel.send(attachment);

    }

}

module.exports = Avatar;