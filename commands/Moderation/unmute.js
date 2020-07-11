const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Unmute extends Command {

    constructor (client) {
        super(client, {
            name: "unmute",
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
            return message.success("moderation/unmute:MISSING_MEMBER");
        }

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

        if(memberData.mute.muted){
            memberData.mute.endDate = Date.now();
            memberData.markModified("mute");
            memberData.save();
            message.success("moderation/unmute:SUCCESS", {
                username: member.user
            });
        } else {
            message.error("moderation/unmute:NOT_MUTED", {
                username: member.user.tag
            });
        }
        

    }

}

module.exports = Unmute;