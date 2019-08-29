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

        let member = await resolveMember(args[0]);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("ERR_SANCTION_YOURSELF"));
        }
        
        // Gets the kcik reason
        let reason = args.slice(1).join(" ");
        if(!reason){
            reason = message.language.get("UTILS").NO_REASON_PROVIDED;
        }
        
        if(!member.kickable){
            return message.channel.send(message.language.get("KICK_ERR_PERMISSIONS"));
        }

        await member.send(message.language.get("KICK_SUCCESS_DM", member.user, message, reason)).catch((err) => {});

        // Kick the user
        member.kick(reason).then(() => {

            // Send a success message in the current channel
            message.channel.send(message.language.get("KICK_SUCCESS_CHANNEL", member.user, message, reason));

            data.guild.casesCount++;
            data.guild.save();

            let caseInfo = {
                channel: message.channel,
                moderator: message.author,
                date: Date.now(),
                type: "kick",
                case: data.guild.casesCount,
                reason,
            };
            
            memberData.sanctions.push(caseInfo);
            memberData.save();

            if(data.guild.plugins.modlogs){
                let channel = message.guild.channels.get(data.guild.plugins.modlogs);
                if(!channel) return;
                let headings = message.language.get("MODLOGS_HEADINGS");
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get("KICK_TITLE_LOGS", data.guild.casesCount))
                    .addField(headings.USER, `\`${member.user.tag}\` (${member.user.toString()})`, true)
                    .addField(headings.MODERATOR, `\`${message.author.tag}\` (${message.author.toString()})`, true)
                    .addField(headings.REASON, reason, true)
                    .setColor("#e88709");
                channel.send(embed);
            }

        }).catch((err) => {
            return message.channel.send(message.language.get("KICK_ERR_PERMISSIONS"));
        });

    }

}

module.exports = Kick;
