const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
ms = require("ms");

class Mute extends Command {

    constructor (client) {
        super(client, {
            name: "mute",
            description: (language) => language.get("MUTE_DESCRIPTION"),
            usage: (language) => language.get("MUTE_USAGE"),
            examples: (language) => language.get("MUTE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
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

        let time = args[1];
        if(!time || isNaN(ms(time))){
            return message.channel.send(message.language.get("ERR_INVALID_TIME"));
        }

        let reason = args.slice(2).join(" ");
        if(!reason){
            reason = message.language.get("UTILS").NO_REASON_PROVIDED;
        }

        message.guild.channels.forEach((channel) => {
            channel.updateOverwrite(member.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            }).catch((err) => {});
        });

        message.channel.send(message.language.get("MUTE_SUCCESS", member, time, reason));

        member.send(message.language.get("MUTE_SUCCESS_DM", message, time, reason));
        
        let caseInfo = {
            channel: message.channel,
            moderator: message.author,
            user: member.user,
            date: Date.now(),
            reason: reason,
            type: "mute",
            time: time
        };

        let Moderator = new(require("../../utils/mod.js"))(this.client);
        Moderator.log(data.settings, caseInfo, message.language);
        await Moderator.addCase(data.settings, caseInfo);
        
        let isAlreadyMuted = data.settings.muted.find((d) => d.userID === member.id);
        if(isAlreadyMuted){
            data.settings.muted = data.settings.muted.filter((d) => d.userID !== member.id);
        }

        data.settings.muted.push({
            userID: member.id,
            endDate: new Date(Date.now()+ms(time)),
            caseNumber: data.settings.cases.count
        });
        await data.settings.save();

    }

}

module.exports = Mute;