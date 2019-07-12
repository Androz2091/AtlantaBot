const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Phcomment extends Command {
    constructor (client) {
        super(client, {
            name: "phcomment",
            description: (language) => language.get("PHCOMMENT_DESCRIPTION"),
            usage: (language) => language.get("PHCOMMENT_USAGE"),
            examples: (language) => language.get("PHCOMMENT_EXAMPLES"),
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

        let user = message.author;
        let text = args.join(" ");

        if(message.mentions.users.first()){
            text = args.slice(1).join(" ");
            user = message.mentions.users.first();
        }

        if(!text){
            return message.channel.send(message.language.get("PHCOMMENT_ERR_TEXT"));
        }

        let options = { format: "png", size: 512 };
        let avatarURL = user.displayAvatarURL(options);
        let username = user.username;

        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${username}&image=${avatarURL}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.edit(message.language.get("ERR_OCCURENCED"));
        }

    }

}

module.exports = Phcomment;