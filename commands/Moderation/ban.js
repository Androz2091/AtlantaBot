const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ban extends Command {

    constructor (client) {
        super(client, {
            name: "ban",
            description: (language) => language.get("BAN_DESCRIPTION"),
            usage: (language) => language.get("BAN_USAGE"),
            examples: (language) => language.get("BAN_EXAMPLES"),
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
        
        let user = message.mentions.users.first() || await message.client.users.fetch(args[0]).catch((err) => {});
        let memberData = message.guild.members.get(user.id) ? await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id }) : null;

        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        // If the user is already banned
        let banned = await message.guild.fetchBans();
        if(banned.some((m) => m.user.id === user.id)){
            return message.channel.send(message.language.get("BAN_ERR_BANNED", user));
        }
        
        // Gets the ban reason
        let reason = args.slice(1).join(" ");
        if(!reason){
            reason = message.language.get("UTILS").NO_REASON_PROVIDED;
        }

        let member = await message.guild.members.fetch(user.id);
        if(member && !member.bannable){
            return message.channel.send(message.language.get("BAN_ERR_PERMISSIONS"));
        }
        
        await user.send(message.language.get("BAN_SUCCESS_DM", user, message, reason)).catch((err) => {});

        // Ban the user
        message.guild.members.ban(user).then(() => {

            // Send a success message in the current channel
            message.channel.send(message.language.get("BAN_SUCCESS_CHANNEL", user, message, reason));

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
                let headings = message.language.get("MODLOGS_HEADINGS");
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get("BAN_TITLE_LOGS", data.guild.casesCount))
                    .addField(headings.USER, `\`${user.tag}\` (${user.toString()})`, true)
                    .addField(headings.MODERATOR, `\`${message.author.tag}\` (${message.author.toString()})`, true)
                    .addField(headings.REASON, reason, true)
                    .setColor("#e02316");
                channel.send(embed);
            }

        }).catch((err) => {
            console.log(err)
            return message.channel.send(message.language.get("BAN_ERR_PERMISSIONS"));
        });

    }

}

module.exports = Ban;