const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Tweet extends Command {

    constructor (client) {
        super(client, {
            name: "tweet",
            description: (language) => language.get("TWEET_DESCRIPTION"),
            usage: (language) => language.get("TWEET_USAGE"),
            examples: (language) => language.get("TWEET_EXAMPLES"),
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

        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);

        if(!user){
            return m.edit(message.language.get("TWEET_ERR_USERNAME"));
        }

        if(!text){
            return m.edit(message.language.get("TWEET_ERR_TEXT"));
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
            await message.channel.send(message.language.get("TWEET_CONTENT", user), attachment);
            m.delete();
        } catch(e){
            console.log(e)
            m.edit(message.language.get("ERR_OCCURENCED"));
        }

    }

}

module.exports = Tweet;