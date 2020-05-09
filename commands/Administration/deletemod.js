const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Deletemod extends Command {

    constructor (client) {
        super(client, {
            name: "deletemod",
            description: (language) => language.get("DELETEMOD_DESCRIPTION"),
            usage: (language) => language.get("DELETEMOD_USAGE"),
            examples: (language) => language.get("DELETEMOD_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "autodeletemodcommands" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        let status = args[0];
        if(!status || status !== "on" && status !== "off"){
            return message.error("administration/deletemod:MISSING_STATUS");
        }
        if(status === "on"){
            data.guild.autoDeleteModCommands = true;
            data.guild.save();
            message.error("administration/deletemod:ENABLED");
        } else {
            data.guild.autoDeleteModCommands = false;
            data.guild.save();
            message.error("administration/deletemod:DISABLED");
        }
    }

}

module.exports = Deletemod;