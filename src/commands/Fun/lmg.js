const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Lmg extends Command {

    constructor (client) {
        super(client, {
            name: "lmg",
            description: (language) => language.get("LMG_DESCRIPTION"),
            usage: (language) => language.get("LMG_USAGE"),
            examples: (language) => language.get("LMG_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "lmgtfy" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let question = args.join(" ");
        if(!question){
            return message.channel.send(message.language.get("LMG_ERR_QUESTION"));
        }
        question = question.replace(/[' '_]/g, "+");
        await message.channel.send("http://lmgtfy.com/?q="+question);
        message.delete();

    }

}

module.exports = Lmg;