const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setwarns extends Command {

    constructor (client) {
        super(client, {
            name: "setwarns",
            description: (language) => language.get("SETWARNS_DESCRIPTION"),
            usage: (language) => language.get("SETWARNS_USAGE"),
            examples: (language) => language.get("SETWARNS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS", "KICK_MEMBERS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let sanction = args[0];
        if(!sanction || (sanction !== "kick" && sanction !== "ban")){
            return message.channel.send(message.language.get("SETWARNS_ERR_SANCTION"));
        }

        let number = args[1];

        if(number === "reset"){
            if(sanction === "kick"){
                data.guild.plugins.warnsSanctions.kick = false;
                data.guild.markModified("plugins.warnsSanctions");
                data.guild.save();
                return message.channel.send(message.language.get("SETWARNS_SUCCESS_RESET_KICK", data.guild.prefix, number));
            }
            if(sanction === "ban"){
                data.guild.plugins.warnsSanctions.ban = false;
                data.guild.markModified("plugins.warnsSanctions");
                data.guild.save();
                return message.channel.send(message.language.get("SETWARNS_SUCCESS_RESET_BAN", data.guild.prefix, number));
            }
        }

        if(!number || isNaN(number)){
            return message.channel.send(message.language.get("ERR_INVALID_NUMBER"));
        }
        if(number < 1 || number > 10){
            return message.channel.send(message.language.get("ERR_INVALID_NUMBER_MM", 1, 10));
        }

        if(sanction === "kick"){
            data.guild.plugins.warnsSanctions.kick = number;
            data.guild.markModified("plugins.warnsSanctions");
            data.guild.save();
            return message.channel.send(message.language.get("SETWARNS_SUCCESS_KICK", data.guild.prefix, number));
        }

        if(sanction === "ban"){
            data.guild.plugins.warnsSanctions.ban = number;
            data.guild.markModified("plugins.warnsSanctions");
            data.guild.save();
            return message.channel.send(message.language.get("SETWARNS_SUCCESS_BAN", data.guild.prefix, number));
        }

    }

}

module.exports = Setwarns;