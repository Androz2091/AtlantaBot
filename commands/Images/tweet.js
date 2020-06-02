const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Tweet extends Command {

    constructor (client) {
        super(client, {
            name: "tweet",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "twitter" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let user = args[0];
        let text = args.slice(1).join(" ");

        let m = await message.sendT("misc:PLEASE_WAIT", null, {
            prefixEmoji: "loading"
        });

        if(!user){
            return m.error("images/tweet:MISSING_USERNAME");
        }

        if(!text){
            return m.error("images/tweet:MISSING_TEXT");
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
            await message.channel.send(message.translate("images/tweet:SUCCESS", {
                user
            }), attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.error("misc:ERROR_OCCURRED", null, false, false, true);
        }

    }

}

module.exports = Tweet;