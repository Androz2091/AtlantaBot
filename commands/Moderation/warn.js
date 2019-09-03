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
        
        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        if(member.user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }
        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("ERR_SANCTION_YOURSELF"));
        }

        let reason = args.slice(1).join(" ");
        if(!reason){
            return message.channel.send(message.language.get("WARN_ERR_REASON"));
        }

        // Gets current member sanctions
        let sanctions = memberData.sanctions.filter((s) => s.type === "warn").length;
        let banCount = data.guild.plugins.warnsSanctions.ban;
        let kickCount = data.guild.plugins.warnsSanctions.kick;
        
        data.guild.casesCount++;
        data.guild.save();

        let caseInfo = {
            channel: message.channel.id,
            moderator: message.author.id,
            date: Date.now(),
            type: "warn",
            case: data.guild.casesCount,
            reason
        };

        let headings = message.language.get("MODLOGS_HEADINGS");
        let embed = new Discord.MessageEmbed()
            .addField(headings.USER, `\`${member.user.tag}\` (${member.user.toString()})`)
            .addField(headings.MODERATOR, `\`${message.author.tag}\` (${message.author.toString()}`)
            .addField(headings.REASON, reason, true);

        if(banCount){
            if(sanctions >= banCount){
                member.send(message.language.get("BAN_SUCCESS_DM", member.user, message, reason));
                caseInfo.type = "ban";
                embed.setAuthor(message.language.get("BAN_TITLE_LOGS", data.guild.casesCount))
                .setColor("#e02316");
                message.guild.members.ban(member).catch((err) => {});
                message.channel.send(message.language.get("WARN_AUTOBAN", member, banCount));
            }
        } else if(kickCount){
            if(sanctions >= kickCount){
                member.send(message.language.get("KICK_SUCCESS_DM", member.user, message, reason));
                caseInfo.type = "kick";
                embed.setAuthor(message.language.get("KICK_TITLE_LOGS", data.guild.casesCount))
                .setColor("#e88709");
                message.guild.members.kick(member).catch((err) => {});
                message.channel.send(message.language.get("WARN_AUTOKICK", member, banCount));
            }
        } else {
            caseInfo.type = "warn";
            embed.setAuthor(message.language.get("WARN_TITLE_LOGS", data.guild.casesCount))
            .setColor("#8c14e2");
            member.send(message.language.get("WARN_SUCCESS_DM", message, reason));
            message.channel.send(message.language.get("WARN_SUCCESS", member, reason));
        }

        memberData.sanctions.push(caseInfo);
        memberData.save();

        if(data.guild.plugins.modlogs){
            let channel = message.guild.channels.get(data.guild.plugins.modlogs);
            if(!channel) return;
            channel.send(embed);
        }
    }

}

module.exports = Warn;
