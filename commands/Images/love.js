const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Love extends Command {
    constructor (client) {
        super(client, {
            name: "love",
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
        
        let users = [
            await this.client.resolveUser(args[0]) || message.author,
            await this.client.resolveUser(args[1]) || message.author
        ];

        let m = await message.sendT("misc:PLEASE_WAIT", null, false, false, "loading");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${users[0].displayAvatarURL({ format: "png", size: 512 })}&user2=${users[1].displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.error("misc:ERROR_OCCURRED", null, true);
        }

    }

}

module.exports = Love;