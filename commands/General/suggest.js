const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Suggest extends Command {

    constructor (client) {
        super(client, {
            name: "suggest",
            description: (language) => language.get('SUGGEST_DESCRIPTION'),
            dirname: __dirname,
            usage: "suggest [suggestion]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$suggestion A new channel",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var sugg_channel = message.guild.channels.get(guild_data.channels.suggestion);
        if(!sugg_channel) return message.channel.send(message.language.get('SUGGEST_NO_CHANNEL'));

        var sugg = args.join(' ');
        if(!sugg) return message.channel.send(message.language.get('SUGGEST_SUGG'));

        var embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('SUGGEST_HEADER', message.author), message.author.displayAvatarURL)
            .addField(message.language.get('SUGGEST_HEADERS')[0], `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.language.get('SUGGEST_HEADERS')[1], message.language.printDate(new Date(Date.now()), true), true)
            .addField(message.language.get('SUGGEST_HEADERS')[2], '**'+sugg+'**')
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);

        // Gets the emote
        var emotes = [
            this.client.emojis.find(e => e.name === 'atlanta_success'),
            this.client.emojis.find(e => e.name === 'atlanta_error')
        ];

        sugg_channel.send(embed).then(async m => {
            await m.react(emotes[0]);
            await m.react(emotes[1]);
        });

        message.channel.send(message.language.get('SUGGEST_SUCCESS', sugg_channel));
    }

}

module.exports = Suggest;