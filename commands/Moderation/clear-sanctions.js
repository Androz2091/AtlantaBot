const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Clearsanctions extends Command {

    constructor (client) {
        super(client, {
            name: "clear-sanctions",
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
            return message.error("moderation/clear-sanctions:MISSING_MEMBER");
        }
        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });
        memberData.sanctions = [];
        memberData.save();
        message.success("moderation/clear-sanctions:SUCCESS", {
            username: member.user.tag
        });
    }

}

module.exports = Clearsanctions;