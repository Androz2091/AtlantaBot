const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Random extends Command {

    constructor (client) {
        super(client, {
            name: "random",
            description: (language) => language.get("RANDOM_DESCRIPTION"),
            usage: (language) => language.get("RANDOM_USAGE"),
            examples: (language) => language.get("RANDOM_EXAMPLES"),
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

        // Gets the answers by spliting on "/"
        let answers = args.join(" ").split("/");
        if(answers.length < 2){
            return message.channel.send(message.language.get("RANDOM_ERR_CHOICES"));
        }
        if(answers.some((answer) => answer === "")){
            return message.channel.send(message.language.get("RANDOM_ERR_BLANK"));
        }

        message.channel.send(message.language.get("RANDOM_WAIT")).then((m) =>{
            setTimeout(function(){
                m.edit(message.language.get("RANDOM_CHOOSED"));
                let result = answers[parseInt(message.client.functions.randomNum(0, answers.length) ,10)];
                message.channel.send("```"+result+"```");
            }, 1500);
        });
        
    }

}

module.exports = Random;