const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ban extends Command {

    constructor (client) {
        super(client, {
            name: "ban",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "BAN_MEMBERS" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let user = await this.client.resolveUser(args[0]);
        if(!user){
            return message.error("moderation/ban:MISSING_MEMBER");
        }
        
        let memberData = message.guild.members.get(user.id) ? await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id }) : null;

        if(user.id === message.author.id){
            return message.error("moderation/ban:YOURSELF");
        }

        // If the user is already banned
        let banned = await message.guild.fetchBans();
        if(banned.some((m) => m.user.id === user.id)){
            return message.error("moderation/ban:ALREADY_BANNED", {
                username: user.tag
            });
        }
        
        // Gets the ban reason
        let reason = args.slice(1).join(" ");
        if(!reason){
            reason = message.translate("misc:NO_REASON_PROVIDED");
        }

        let member = await message.guild.members.fetch(user.id).catch(() => {});
        if(member){
            const memberPosition = member.roles.highest.position;
            const moderationPosition = message.member.roles.highest.position;
            if(!(moderationPosition > memberPosition)){
                return message.error("moderation/ban:SUPERIOR");
            }
            if(!member.bannable) {
                return message.error("moderation/ban:MISSING_PERM");
            }
        }
        
        await user.send(message.translate("moderation/ban:BANNED_DM", {
            username: user.tag,
            server: message.guild.name,
            moderation: message.author.tag,
            reason
        })).catch((err) => {});

        // Ban the user
        message.guild.members.ban(user, { reason } ).then(() => {

            // Send a success message in the current channel
            message.sendT("moderation/ban:BANNED", {
                username: user.tag,
                server: message.guild.name,
                moderator: message.author.tag,
                reason
            });

            let caseInfo = {
                channel: message.channel.id,
                moderator: message.author.id,
                date: Date.now(),
                type: "ban",
                case: data.guild.casesCount,
                reason
            };

            if(memberData){
                memberData.sanctions.push(caseInfo);
                memberData.save();
            }

            data.guild.casesCount++;
            data.guild.save();

            if(data.guild.plugins.modlogs){
                let channel = message.guild.channels.get(data.guild.plugins.modlogs);
                if(!channel) return;
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.translate("moderation/ban:CASE", {
                        count: data.guild.casesCount
                    }))
                    .addField(message.translate("common:USER"), `\`${user.tag}\` (${user.toString()})`, true)
                    .addField(message.translate("common:MODERATOR"), `\`${message.author.tag}\` (${message.author.toString()})`, true)
                    .addField(message.translate("common:REASON"), reason, true)
                    .setColor("#e02316");
                channel.send(embed);
            }

        }).catch((err) => {
            console.log(err)
            return message.error("moderation/ban:MISSING_PERM");
        });

    }

}

module.exports = Ban;
