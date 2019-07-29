const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
Joker = require("blague.xyz"),
joker = new Joker();

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

        let joke = await joker.random();

        let embed = new Discord.MessageEmbed()
            .setDescription(`${joke.toDiscordSpoils()}`)
            .setFooter(message.language.get("JOKE_FOOTER"))
            .setColor(data.config.embed.color)

        message.channel.send(embed);

    }

}

module.exports = Joke;