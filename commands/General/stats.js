const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stats extends Command {

    constructor (client) {
        super(client, {
            name: "stats",
            description: (language) => language.get("STATS_DESCRIPTION"),
            usage: (language) => language.get("STATS_USAGE"),
            examples: (language) => language.get("STATS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "statistics", "infobot", "botinfos", "bot-infos", "bot-info", "infos-bot", "info-bot" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args) {

        let statsHeadings = message.language.get("STATS_HEADINGS", message.tclient);

        let statsEmbed = new Discord.MessageEmbed()
            .setColor(message.config.embed.color)
            .setFooter(message.config.embed.footer)
            .setAuthor(message.language.get("STATS_HEADINGS")[0])
            .setDescription(message.language.get("STATS_DESC"))
            .addField(statsHeadings[0], message.language.get("STATS", message.tclient.guilds.size, message.tclient.users.size), true)
            .addField(statsHeadings[2], `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
            .addField(statsHeadings[1], `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
            .addField(statsHeadings[3], message.language.get("STATS_ONLINE", message.language.convertMs(message.tclient.uptime)))
            .addField(statsHeadings[5], message.language.get("STATS_VC", message.tclient.voice.connections.size))
            .addField(statsHeadings[6], message.language.get("STATS_CREDITS"))

        message.tclient.functions.supportLink(message.tclient).then((url) => {
            statsEmbed.addField(statsHeadings[4], message.language.get("STATS_LINKS", url, message.tclient.user.id));
            message.channel.send(statsEmbed);
        });

        
    }

}

module.exports = Stats;