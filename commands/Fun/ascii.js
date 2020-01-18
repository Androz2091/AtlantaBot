const Command = require("../../base/Command.js"),
Discord = require("discord.js");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

class Ascii extends Command {

    constructor (client) {
        super(client, {
            name: "ascii",
            description: (language) => language.get("ASCII_DESCRIPTION"),
            usage: (language) => language.get("ASCII_USAGE"),
            examples: (language) => language.get("ASCII_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let text = args.join(" ");
        if(!text || text.length > 20){
            return message.channel.send(message.language.get("ASCII_ERR_TEXT"));
        }
    
        let rendered = await figletAsync(text);
        message.channel.send("```"+rendered+"```");

    }

}

module.exports = Ascii;