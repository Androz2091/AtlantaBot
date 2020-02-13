const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Unmute extends Command {

    constructor (client) {
        super(client, {
            name: "unmute",
            description: (language) => language.get("UNMUTE_DESCRIPTION"),
            usage: (language) => language.get("UNMUTE_USAGE"),
            examples: (language) => language.get("UNMUTE_EXAMPLES"),
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

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

        if(memberData.mute.muted){
            memberData.mute.endDate = Date.now();
            memberData.markModified("mute");
            memberData.save();
            message.channel.send(message.language.get("UNMUTE_SUCCESS_USER", member.user));
        } else {
            message.channel.send(message.language.get("UNMUTE_ERR_NOT_MUTED"));
        }
        

    }

}

module.exports = Unmute;