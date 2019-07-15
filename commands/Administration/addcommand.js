const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Addcommand extends Command {

    constructor (client) {
        super(client, {
            name: "addcommand",
            description: (language) => language.get("ADDCOMMAND_DESCRIPTION"),
            usage: (language) => language.get("ADDCOMMAND_USAGE"),
            examples: (language) => language.get("ADDCOMMAND_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "custom-command" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let name = args[0].toLowerCase();
        if(!name){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_NAME"));
        }

        if(this.client.commands.get(name) || this.client.aliases.get(name) || data.settings.customCommands.find((c) => c.name === name)){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_EXISTS", name));
        }

        let answer = args.slice(1).join(" ");
        if(!answer){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_ANSWER"));
        }
        
        data.settings.customCommands.push({
            name: name,
            answer: answer
        });
        data.settings.save();
        
        message.channel.send(message.language.get("ADDCOMMAND_SUCCESS", name));
    }
    
}

module.exports = Addcommand;
