const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Clyde extends Command {
    constructor (client) {
        super(client, {
            name: "clyde",
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
            return message.error("images/clyde:MISSING_TEXT");
        }

        let m = await message.sendT("misc:PLEASE_WAIT", null, {
            prefixEmoji: "loading"
        });
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e);
            m.error("misc:ERROR_OCCURRED", null, {
                edit: true
            });
        }

    }

}

module.exports = Clyde;