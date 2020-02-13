const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Partners extends Command {

    constructor (client) {
        super(client, {
            name: "partners",
            description: (language) => language.get("PARTNERS_DESCRIPTION"),
            usage: (language) => language.get("PARTNERS_USAGE"),
            examples: (language) => language.get("PARTNERS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let partners = require("../../assets/json/partners.json");
        let embed = new Discord.MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer)
            .setAuthor(message.language.get("PARTNERS_TITLE"));
        partners.forEach((partner) => {
            embed.addField(partner.name, partner["description_"+message.language.getLang()]+"\n["+message.language.get("UTILS").KNOW_MORE+"]("+partner.link+")");
        });
        message.channel.send(embed);
    }

}

module.exports = Partners;