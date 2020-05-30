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
        
        const name = args[0].split("\n")[0];
        if (!name)
            return message.error("administration/addcommand:MISSING_NAME");

        if (
            this.client.commands.get(name) ||
            this.client.aliases.get(name) ||
            data.guild.customCommands.find((c) => c.name === name)
        ) {
            return message.error(
                "administration/addcommand:COMMAND_ALREADY_EXISTS"
            );
        }

        const answer = (args[0].split("\n")[1] || "") + args.slice(1).join(" ");
        if (!answer) {
            return message.error("administration/addcommand:MISSING_ANSWER");
        }

        data.guild.customCommands.push({
            name: name.toLowerCase(),
            answer: answer
        });
        data.guild.save();

        message.success("administration/addcommand:SUCCESS", {
            commandName: name,
            prefix: message.guild.settings.prefix
        });
    }
    
}

module.exports = Addcommand;
