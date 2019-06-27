const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Purge extends Command {

    constructor (client) {
        super(client, {
            name: "purge",
            description: (language) => language.get("PURGE_DESCRIPTION"),
            usage: (language) => language.get("PURGE_USAGE"),
            examples: (language) => language.get("PURGE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "clear-members" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let days = args[0];
        if(!days || isNaN(days)){
            return message.channel.send(message.language.get("PURGE_ERR_DAYS"));
        }
        days = parseInt(days, 10);

        let members = await message.guild.members.prune({
            days: days,
            dry: true
        });
        let m = await message.channel.send(message.language.get("PURGE_CONFIRMATION", members));
        
        message.channel.awaitMessages((res) => (res.content === "confirm") && (res.author.id === message.author.id), {
            max: 1,
            time: 10000,
            errors: ["time"],
        })
        .then(async () => {
            await message.guild.members.prune({
                days: days,
                dry: false
            }).catch((err) => {
                return message.channel.send(message.language.get("ERR_OCCURENCED"));
            });
            message.channel.send(message.language.get("PURGE_SUCCESS", members));
        }).catch(() => {
            m.edit(message.language.get("PURGE_ERR_TIMEOUT"));
        });
        
    }

}

module.exports = Purge;