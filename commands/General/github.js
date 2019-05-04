const Command = require("../../base/Command.js"),
Discord = require('discord.js');

var fetch = require('node-fetch');

class Github extends Command {

    constructor (client) {
        super(client, {
            name: "github",
            description: (language) => language.get('GITHUB_DESCRIPTION'),
            dirname: __dirname,
            usage: "github",
            enabled: true,
            guildOnly: true,
            aliases: ["git"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$github",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var res = await fetch('https://api.github.com/repos/Androz2091/AtlantaBot');
        var tdata = await res.json();

        var owner = this.client.users.get(this.client.config.owner);

        var embed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .setDescription(message.language.get("GITHUB_DESC"))
            .addField(message.language.get("GITHUB_HEADERS")[0], tdata.stargazers_count, true)
            .addField(message.language.get("GITHUB_HEADERS")[1], tdata.forks_count, true)
            .addField(message.language.get("GITHUB_HEADERS")[2], tdata.language, true)
            .addField(message.language.get("GITHUB_HEADERS")[3], "["+tdata.owner.login+"]("+tdata.owner.html_url+")")
            .setImage(tdata.owner.avatar_url)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Github;