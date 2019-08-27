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
        
        let user = await this.client.resolveUser(args[0]);
        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_USER"));
        }
        let memberData = await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id });

        let embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        if(memberData.sanctions.length < 1){
            embed.setDescription(message.language.get("SANCTIONS_ERR_NOTHING"));
            return message.channel.send(embed);
        } else {
            memberData.sanctions.forEach((s) => {
                embed.addField(s.type+" | #"+s.case, message.language.get("PRINT_SANCTION", s), true);
            });
        }

        message.channel.send(embed);
    }

}

module.exports = Sanctions;