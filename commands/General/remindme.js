const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
ms = require("ms");

class Remindme extends Command {

    constructor (client) {
        super(client, {
            name: "remindme",
            description: (language) => language.get("REMINDME_DESCRIPTION"),
            usage: (language) => language.get("REMINDME_USAGE"),
            examples: (language) => language.get("REMINDME_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "reminder" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false
        });
    }

    async run (message, args, data) {

        let time = args[0];
        if(!time || isNaN(ms(time))){
            return message.channel.send(message.language.get("ERR_INVALID_TIME"));
        }

        let msg = args.slice(1).join(" ");
        if(!msg){
            return message.channel.send(message.language.get("REMINDME_ERR_MESSAGE"));
        }
        
        let rData = {
            message: msg,
            createdAt: Date.now(),
            sendAt: Date.now()+ms(time)
        };

        if(!data.users[0].reminds){
            data.users[0].reminds = [];
        }
        
        data.users[0].reminds.push(rData);
        data.users[0].markModified("reminds");
        data.users[0].save();

        // Send success message
        message.channel.send(message.language.get("REMINDME_SAVED"));
    }

}

module.exports = Remindme;