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

        let member = message.mentions.members.first();
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        
        let index = data.guild.muted.findIndex((d) => d.userID === member.id);
        if(index === 0 || index){
            data.guild.muted[parseInt(index, 10)].endDate = Date.now();
            data.guild.markModified("muted");
            data.guild.save();
            message.channel.send(message.language.get("UNMUTE_SUCCESS_USER", member.user));
        } else {
            message.channel.send(message.language.get("UNMUTE_ERR_NOT_MUTED"));
        }
        

    }

}

module.exports = Unmute;