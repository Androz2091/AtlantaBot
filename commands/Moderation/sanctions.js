const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Sanctions extends Command {

    constructor (client) {
        super(client, {
            name: "sanctions",
            description: (language) => language.get("SANCTIONS_DESCRIPTION"),
            usage: (language) => language.get("SANCTIONS_USAGE"),
            examples: (language) => language.get("SANCTIONS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "warns", "see-warns", "view-warns", "see-sanctions", "view-sanctions" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let user = message.mentions.users.first();
        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        let Moderator = new(require("../../utils/mod.js"))(this.client);

        let newEmbed = await Moderator.fetchUserSanctions(data.guild, user.id, embed, message.language);

        if(!newEmbed){
            embed.setDescription(message.language.get("SANCTIONS_ERR_NOTHING"));
            return message.channel.send(embed);
        }

        message.channel.send(newEmbed);
    }

}

module.exports = Sanctions;