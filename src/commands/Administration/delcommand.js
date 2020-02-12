const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Delcommand extends Command {

    constructor (client) {
        super(client, {
            name: "delcommand",
            description: (language) => language.get("DELCOMMAND_DESCRIPTION"),
            usage: (language) => language.get("DELCOMMAND_USAGE"),
            examples: (language) => language.get("DELCOMMAND_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let name = args[0];
        if(!name){
            return message.channel.send(message.language.get("DELCOMMAND_ERR_NAME"));
        }

        if(!data.guild.customCommands.find((c) => c.name === name)){
            return message.channel.send(message.language.get("DELCOMMAND_EXISTS", name));
        }
        
        data.guild.customCommands = data.guild.customCommands.filter((c) => c.name !== name);
        data.guild.save();

        message.channel.send(message.language.get("DELCOMMAND_SUCCESS", name));
    }
    
}

module.exports = Delcommand;