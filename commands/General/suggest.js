const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Suggest extends Command {

    constructor (client) {
        super(client, {
            name: "suggest",
            description: (language) => language.get("SUGGEST_DESCRIPTION"),
            usage: (language) => language.get("SUGGEST_USAGE"),
            examples: (language) => language.get("SUGGEST_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "suggestion", "sugg" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let suggChannel = message.guild.channels.get(data.settings.plugins.suggestions);
        if(!suggChannel){
            return message.channel.send(message.language.get("SUGGEST_ERR_NO_CHANNEL"));
        }

        let sugg = args.join(" ");
        if(!sugg){
            return message.channel.send(message.language.get("SUGGEST_ERR_NO_SUGG"));
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("SUGGEST_TITLE", message.author), message.author.displayAvatarURL())
            .addField(message.language.get("SUGGEST_HEADINGS")[0], `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.language.get("SUGGEST_HEADINGS")[1], message.language.printDate(new Date(Date.now()), true), true)
            .addField(message.language.get("SUGGEST_HEADINGS")[2], "**"+sugg+"**")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        let success = message.client.config.emojis.success.split(":")[1];
        let error = message.client.config.emojis.error.split(":")[1];

        let emotes = [
            message.client.emojis.find((e) => e.name === success),
            message.client.emojis.find((e) => e.name === error)
        ];

        suggChannel.send(embed).then(async (m) => {
            await m.react(emotes[0]);
            await m.react(emotes[1]);
        });

        message.channel.send(message.language.get("SUGGEST_SUCCESS", suggChannel));
    }

}

module.exports = Suggest;