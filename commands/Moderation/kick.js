const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Kick extends Command {

    constructor (client) {
        super(client, {
            name: "kick",
            description: (language) => language.get("KICK_DESCRIPTION"),
            usage: (language) => language.get("KICK_USAGE"),
            examples: (language) => language.get("KICK_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "KICK_MEMBERS" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
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
        let user = member.user;
        
        // Gets the kcik reason
        let reason = args.slice(1).join(" ");
        if(!reason){
            reason = message.language.get("UTILS").NO_REASON_PROVIDED;
        }
        
        let member = message.guild.members.fetch(user.id);
        if(member && !member.kickable){
            return message.channel.send(message.language.get("KICK_ERR_PERMISSIONS"));
        }

        await user.send(message.language.get("KICK_SUCCESS_DM", user, message, reason)).catch((err) => {});

        // Kick the user
        member.kick().then(() => {

            // Send a success message in the current channel
            message.channel.send(message.language.get("KICK_SUCCESS_CHANNEL", user, message, reason));

            let caseInfo = {
                channel: message.channel,
                moderator: message.author,
                user: user,
                date: Date.now(),
                reason: reason,
                type: "kick"
            };

            let Moderator = new(require("../../utils/mod.js"))(this.client);
            Moderator.log(data.settings, caseInfo, message.language);
            Moderator.addCase(data.settings, caseInfo);

        }).catch((err) => {
            return message.channel.send(message.language.get("KICK_ERR_PERMISSIONS"));
        });

    }

}

module.exports = Kick;