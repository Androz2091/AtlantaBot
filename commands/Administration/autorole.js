const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Autorole extends Command {

    constructor (client) {
        super(client, {
            name: "autorole",
            description: (language) => language.get("AUTOROLE_DESCRIPTION"),
            usage: (language) => language.get("AUTOROLE_USAGE"),
            examples: (language) => language.get("AUTOROLE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "ar" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let status = args[0];
        if(status !== "on" && status !== "off"){
            return message.channel.send(message.language.get("AUTOROLE_ERR_STATUS"));
        }
        
        if(status === "on"){

            if(!args[1]){
                return message.channel.send(message.language.get("AUTOROLE_ERR_STATUS"));
            }
            let role = message.mentions.roles.first();
            if(!role){
                role = message.guild.roles.find((r) => r.name === args.slice(1).join("  "));
                if(!role){
                    return message.channel.send(message.language.get("ERR_ROLE_NOT_FOUND", args.slice(1).join(" ")));
                }
            }

            data.settings.plugins.autorole = {
                enabled: true,
                role: role.id
            };
            data.settings.markModified("plugins.autorole");
            data.settings.save();

            message.channel.send(message.language.get("AUTOROLE_ENABLED", data.settings.prefix));
        }

        if(status === "off"){

            data.settings.plugins.autorole = {
                enabled: false,
                role: null
            };
            data.settings.markModified("plugins.autorole");
            data.settings.save();
            
            message.channel.send(message.language.get("AUTOROLE_DISABLED", data.settings.prefix));

        }
        
    }

}

module.exports = Autorole;