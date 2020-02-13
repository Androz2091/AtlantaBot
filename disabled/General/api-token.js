const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
math = require("mathjs");

class ApiToken extends Command {
    constructor (client) {
        super(client, {
            name: "api-token",
            description: (language) => language.get("APITOKEN_DESCRIPTION"),
            usage: (language) => language.get("APITOKEN_USAGE"),
            examples: (language) => language.get("APITOKEN_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "apitoken" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 10
        });
    }
 
    async run (message, args, data) {

        if(args[0] === "regenerate"){
            let token = await data.userData.genApiToken();
            message.author.send(message.language.get("APITOKEN_SUCCESS_REGENERATE", token));
            message.channel.send(message.language.get("APITOKEN_DM_SUCCESS_REGENERATE", token));
        } else {
            let token = data.userData.apiToken;
            if(!token){
                token = await data.userData.genToken();
            }
            message.author.send(message.language.get("APITOKEN_SUCCESS", token));
            message.channel.send(message.language.get("APITOKEN_DM_SUCCESS", token));
        }

    }
}

module.exports = ApiToken;
