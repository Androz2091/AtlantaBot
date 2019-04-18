const Command = require("../../base/Command.js"),
Discord = require('discord.js');

var request = require('request');

class Minimize extends Command {

    constructor (client) {
        super(client, {
            name: "minimize",
            description: (language) => language.get('MINIMIZE_DESCRIPTION'),
            dirname: __dirname,
            usage: "minimize [link]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$minimize https://google.fr",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
    
        var url = args[0];
        if(!url) return message.channel.send(message.language.get('MINIMIZE_URL'));

        request(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`, { json: true }, (err, res, fbody) => {
            if(fbody === 'Error: Please enter a valid URL to shorten') return message.channel.send(message.language.get('MINIMIZE_ERROR'))
            var tnew_url = fbody;
            var embed = new Discord.RichEmbed()
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)
                .addField('URL Minimizer', tnew_url)
            message.channel.send(embed);
        });

    }

}

module.exports = Minimize;