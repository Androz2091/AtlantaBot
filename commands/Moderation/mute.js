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
        
        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("ERR_SANCTION_YOURSELF"));
        }

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

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

        data.guild.casesCount++;

        let caseInfo = {
            channel: message.channel.id,
            moderator: message.author.id,
            date: Date.now(),
            type: "mute",
            case: data.guild.casesCount,
            reason,
            time
        };

        memberData.mute.muted = true;
        memberData.mute.endDate = Date.now()+ms(time);
        memberData.mute.case = data.guild.casesCount;
        memberData.sanctions.push(caseInfo);

        memberData.markModified("sanctions");
        memberData.markModified("mute");
        memberData.save();

        await data.guild.save();

        if(data.guild.plugins.modlogs){
            let channel = message.guild.channels.get(data.guild.plugins.modlogs);
            if(!channel) return;
            let headings = message.language.get("MODLOGS_HEADINGS");
            let embed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("MUTE_TITLE_LOGS", data.guild.casesCount))
                .addField(headings.USER, `\`${member.user.tag}\` (${member.user.toString()})`, true)
                .addField(headings.MODERATOR, `\`${message.author.tag}\` (${message.author.toString()})`, true)
                .addField(headings.REASON, reason, true)
                .addField(headings.TIME, time, true)
                .addField(headings.EXPIRATION, message.language.printDate(new Date(Date.now()+ms(time))), true)
                .setColor("#f44271");
            channel.send(embed);
        }

    }

}

module.exports = Mute;
