const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Captcha extends Command {
    constructor (client) {
        super(client, {
            name: "captcha",
            description: (language) => language.get("CAPTCHA_DESCRIPTION"),
            usage: (language) => language.get("CAPTCHA_USAGE"),
            examples: (language) => language.get("CAPTCHA_EXAMPLES"),
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
        
        let options = { format: "png", size: 512 };
        let avatarURL = message.mentions.users.first() ?
        message.mentions.users.first().displayAvatarURL(options)
        : message.author.displayAvatarURL(options);
        let username = message.mentions.users.first() ?
        message.mentions.users.first().username :
        message.author.username;
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${username}&url=${avatarURL}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "captcha.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.edit(message.language.get("ERR_OCCURENCED"));
        }

    }

}

module.exports = Captcha;