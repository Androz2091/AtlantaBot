const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Clearsanctions extends Command {

    constructor (client) {
        super(client, {
            name: "clear-sanctions",
            description: (language) => language.get("CLEARSANCTIONS_DESCRIPTION"),
            usage: (language) => language.get("CLEARSANCTIONS_USAGE"),
            examples: (language) => language.get("CLEARSANCTIONS_EXAMPLES"),
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
        memberData.sanctions = [];
        memberData.save();
        message.channel.send(message.language.get("CLEARSANCTIONS_SUCCESS"));
    }

}

module.exports = Clearsanctions;