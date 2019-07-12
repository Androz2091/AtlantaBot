const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Love extends Command {
    constructor (client) {
        super(client, {
            name: "love",
            description: (language) => language.get("LOVE_DESCRIPTION"),
            usage: (language) => language.get("LOVE_USAGE"),
            examples: (language) => language.get("LOVE_EXAMPLES"),
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

        let user1 = message.mentions.users.first();
        if(!user1){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        let avatarURL1 = user1.displayAvatarURL(options);

        let user2 = message.mentions.users.filter((u) => u.id !== user1.id).first() || message.author;
        let avatarURL2 = user2.displayAvatarURL(options);

        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${avatarURL1}&user2=${avatarURL2}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.edit(message.language.get("ERR_OCCURENCED"));
        }

    }

}

module.exports = Love;