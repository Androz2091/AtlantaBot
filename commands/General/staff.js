const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Staff extends Command {

    constructor (client) {
        super(client, {
            name: "staff",
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
        let guild = await message.guild.fetch();
        let administrators = guild.members.filter((m) => m.hasPermission("ADMINISTRATOR") && !m.user.bot);
        let moderators = guild.members.filter((m) => !administrators.has(m.id) && m.hasPermission("MANAGE_MESSAGES") && !m.user.bot);
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.translate("general/staff:TITLE", {
                guild: message.guild.name
            }))
            .addField(message.translate("general/staff:ADMINS"), (administrators.size > 0 ? administrators.map((a) => `${this.client.config.emojis.status[a.presence.status]} | ${a.user.tag}`).join("\n") :message.translate("general/staff:NO_ADMINS")))
            .addField(message.translate("general/staff:MODS"), (moderators.size > 0 ? moderators.map((m) => `${this.client.config.emojis.status[m.presence.status]} | ${m.user.tag}`).join("\n") : message.translate("general/staff:NO_MODS")))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        message.channel.send(embed);
    }

}

module.exports = Staff;