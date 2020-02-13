const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Eightball extends Command {

    constructor (client) {
        super(client, {
            name: "8ball",
            description: (language) => language.get("EIGHTBALL_DESCRIPTION"),
            usage: (language) => language.get("EIGHTBALL_USAGE"),
            examples: (language) => language.get("EIGHTBALL_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "eight-ball", "eightball" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        if(!args[0] || (!message.content.endsWith("?"))){
            return message.channel.send(message.language.get("EIGHTBALL_ERR_QUESTION"));
        }

        let answers = message.language.get("EIGHTBALL_ANSWERS");
        
        let answer = answers[parseInt(Math.floor((Math.random() * answers.length)), 10)];

        message.channel.send(message.author.username+", "+answer);
    }

}

module.exports = Eightball;