const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Stats extends Command {

    constructor (client) {
        super(client, {
            name: "stats",
            description: (language) => language.get('STATS_DESCRIPTION'),
            dirname: __dirname,
            usage: "stats",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$stats",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var stats_headers = message.language.get('STATS_HEADERS', this.client);

        var { version } = require('discord.js');

        var embed = new Discord.RichEmbed()
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setAuthor(message.language.get('STATS_HEADING'))
            .setDescription(message.language.get('STATS_DESC'))
            .addField(stats_headers[0], message.language.get('STATS_STATS', this.client.guilds.size, this.client.users.size), true)
            .addField(stats_headers[2], `\`Discord.js : v${version}\`\n\`Nodejs : v${process.versions.node}\``, true)
            .addField(stats_headers[1], `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
            .addField(stats_headers[3], message.language.get('STATS_ONLINE', message.language.convertMs(this.client.uptime)))
            .addField(stats_headers[5], message.language.get('STATS_VC', this.client.voiceConnections.size))
            .addField(stats_headers[6], message.language.get('STATS_CREDITS'))

        this.client.functions.supportLink(this.client).then(url => {
            embed.addField(stats_headers[4], message.language.get('STATS_LINKS', url));
            message.channel.send(embed);
        });

        
    }

}

module.exports = Stats;