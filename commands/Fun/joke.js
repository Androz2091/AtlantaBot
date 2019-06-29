const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

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

        let res = await fetch("https://blague.xyz/joke/random");
        let json = await res.json();

        let embed = new Discord.MessageEmbed()
            .setDescription(`${json.jokequestion}\n\n||${json.jokereponse}||`)
            .setFooter(message.language.get("JOKE_FOOTER"))
            .setColor(data.config.embed.color)

        message.channel.send(embed);

    }

}

module.exports = Joke;