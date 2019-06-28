const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Warn extends Command {

    constructor (client) {
        super(client, {
            name: "warn",
            description: (language) => language.get("WARN_DESCRIPTION"),
            usage: (language) => language.get("WARN_USAGE"),
            examples: (language) => language.get("WARN_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let member = message.mentions.members.first();
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        let reason = args.slice(1).join(" ");
        if(!reason){
            return message.channel.send(message.language.get("WARN_ERR_REASON"));
        }

        // Gets current member sanctions
        let sanctionsCount = data.settings.cases.list.filter((d) => d.user === member.id).length;
        let banCount = data.settings.plugins.warnsSanctions.ban;
        let kickCount = data.settings.plugins.warnsSanctions.kick;
        let Moderator = new(require("../../utils/mod.js"))(this.client);
        let caseInfo = {
            channel: message.channel,
            moderator: message.author,
            user: member,
            date: Date.now(),
            reason: reason
        };

        if(banCount){
            if(sanctionsCount >= banCount){
                member.send(message.language.get("BAN_SUCCESS_DM", member.user, message, reason));
                caseInfo.type = "ban";
                Moderator.log(data.settings, caseInfo, message.language);
                Moderator.addCase(data.settings, caseInfo);
                message.guild.members.ban(member).catch((err) => {});
                return message.channel.send(message.language.get("WARN_AUTOBAN", member, banCount));
            }
        }

        if(kickCount){
            if(sanctionsCount >= kickCount){
                member.send(message.language.get("KICK_SUCCESS_DM", member.user, message, reason));
                caseInfo.type = "kick";
                Moderator.log(data.settings, caseInfo, message.language);
                Moderator.addCase(data.settings, caseInfo);
                message.guild.members.kick(member).catch((err) => {});
                return message.channel.send(message.language.get("WARN_AUTOKICK", member, banCount));
            }
        }
        
        caseInfo.type = "warn";
        Moderator.log(data.settings, caseInfo, message.language);
        Moderator.addCase(data.settings, caseInfo);
        
        member.send(message.language.get("WARN_SUCCESS_DM", message, reason));
        
        message.channel.send(message.language.get("WARN_SUCCESS", member, reason));
    }

}

module.exports = Warn;