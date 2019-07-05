const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Eval extends Command {

    constructor (client) {
        super(client, {
            name: "eval",
            description: (language) => language.get("EVAL_DESCRIPTION"),
            usage: (language) => language.get("EVAL_USAGE"),
            examples: (language) => language.get("EVAL_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let usersData = message.client.usersData;
        let guildsData = message.client.guildsData;
        
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(message.client.token)){
                output = output.replace(message.client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)){
                err = err.replace(message.client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });

    }

}

module.exports = Eval;