const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Joke extends Command {

    constructor (client) {
        super(client, {
            name: "joke",
            description: (language) => language.get("JOKE_DESCRIPTION"),
            usage: (language) => language.get("JOKE_USAGE"),
            examples: (language) => language.get("JOKE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "blague" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if (!this.client.config.apiKeys.blagueXYZ)
            return message.error("misc:COMMAND_DISABLED");

        const joke = await this.client.joker.randomJoke(
            message.guild.settings.language.substr(0, 2)
        );

        const embed = new Discord.MessageEmbed()
            .setDescription(joke.toDiscordSpoils())
            .setFooter(message.translate("fun/joke:FOOTER"))
            .setColor(this.client.config.embed.color);

        message.channel.send(embed);

    }

}

module.exports = Joke;