const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Staff extends Command {

    constructor (client) {
        super(client, {
            name: "staff",
            description: (language) => language.get("STAFF_DESCRIPTION"),
            usage: (language) => language.get("STAFF_USAGE"),
            examples: (language) => language.get("STAFF_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "stafflist", "staffliste" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        let emojis = require("../../config").emojis;
        let guild = await message.guild.fetch();
        let administrators = guild.members.filter((m) => m.hasPermission("ADMINISTRATOR") && !m.user.bot);
        let moderators = guild.members.filter((m) => !administrators.has(m.id) && m.hasPermission("MANAGE_MESSAGES") && !m.user.bot);
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("STAFF_TITLE", message.guild.name))
            .addField(message.language.get("STAFF_HEADINGS").ADMIN, (administrators.size > 0 ? administrators.map((a) => `${emojis.status[a.presence.status]} | ${a.user.tag}`).join("\n") : message.language.get("STAFF_NO_ADMIN")))
            .addField(message.language.get("STAFF_HEADINGS").MOD, (moderators.size > 0 ? moderators.map((m) => `${emojis.status[m.presence.status]} | ${m.user.tag}`).join("\n") : message.language.get("STAFF_NO_MOD")))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        message.channel.send(embed);
    }

}

module.exports = Staff;