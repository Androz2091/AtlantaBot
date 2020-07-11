const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Github extends Command {

    constructor (client) {
        super(client, {
            name: "github",
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
            .setDescription("["+message.translate("general/github:CLICK_HERE")+"](https://github.com/Androz2091/AtlantaBot)")
            .addField("Stars", json.stargazers_count, true)
            .addField("Forks", json.forks_count, true)
            .addField(message.translate("general/github:LANGUAGE"), json.language, true)
            .addField(message.translate("general/github:OWNER"), "["+json.owner.login+"]("+json.owner.html_url+")")
            .setImage(json.owner.avatar_url)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Github;