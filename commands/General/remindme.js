const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
ms = require("ms");

class Remindme extends Command {

    constructor (client) {
        super(client, {
            name: "remindme",
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
            return message.error("misc:INVALID_TIME");
        }

        let msg = args.slice(1).join(" ");
        if(!msg){
            return message.error("general/remindme:MISSING_MESSAGE");
        }
        
        let rData = {
            message: msg,
            createdAt: Date.now(),
            sendAt: Date.now()+ms(time)
        };

        if(!data.userData.reminds){
            data.userData.reminds = [];
        }
        
        data.userData.reminds.push(rData);
        data.userData.markModified("reminds");
        data.userData.save();

        // Send success message
        message.success("general/remindme:SAVED");
    }

}

module.exports = Remindme;