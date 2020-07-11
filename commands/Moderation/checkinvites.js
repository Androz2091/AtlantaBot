const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Checkinvites extends Command {

    constructor (client) {
        super(client, {
            name: "checkinvites",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "checkinvite", "checki" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let members = message.guild.members;
        
        let withInvite = members.cache.filter((m) => m.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(m.user.presence.game.name));

        let text = (withInvite.length > 0 ?
            withInvite.map((m) => "`"+m.id+"` ("+m.displayName+") ["+m.user.presence.game.name+"]").join("\n")
        :   message.translate("moderation/checkinvites:NOBODY"));

        let embed = new Discord.MessageEmbed()
            .setDescription(text)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
            
        message.channel.send(embed);
    }

}

module.exports = Checkinvites;