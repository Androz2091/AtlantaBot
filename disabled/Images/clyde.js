const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Clyde extends Command {
    constructor (client) {
        super(client, {
            name: "clyde",
            description: (language) => language.get("CLYDE_DESCRIPTION"),
            usage: (language) => language.get("CLYDE_USAGE"),
            examples: (language) => language.get("CLYDE_EXAMPLES"),
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

        let text = args.join(" ");

        if(!text){
            return message.channel.send(message.language.get("CLYDE_ERR_TEXT"));
        }

        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e);
            m.edit(message.language.get("ERR_OCCURENCED"));
        }

    }

}

module.exports = Clyde;