const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Github extends Command {

    constructor (client) {
        super(client, {
            name: "github",
            description: (language) => language.get("GITHUB_DESCRIPTION"),
            usage: (language) => language.get("GITHUB_USAGE"),
            examples: (language) => language.get("GTIHUB_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "git", "code" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        
        let res = await fetch("https://api.github.com/repos/Androz2091/AtlantaBot");
        let json = await res.json();

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())
            .setDescription(message.language.get("GITHUB_DESC"))
            .addField(message.language.get("GITHUB_HEADERS")[0], json.stargazers_count, true)
            .addField(message.language.get("GITHUB_HEADERS")[1], json.forks_count, true)
            .addField(message.language.get("GITHUB_HEADERS")[2], json.language, true)
            .addField(message.language.get("GITHUB_HEADERS")[3], "["+json.owner.login+"]("+json.owner.html_url+")")
            .setImage(json.owner.avatar_url)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Github;