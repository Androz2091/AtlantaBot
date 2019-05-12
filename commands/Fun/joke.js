const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Joke extends Command {

    constructor (client) {
        super(client, {
            name: "joke",
            description: (language) => language.get('JOKE_DESCRIPTION'),
            dirname: __dirname,
            usage: "joke",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$joke",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, tdata) {

        var snekfetch = require('snekfetch');

        // gets joke data
        var data = await snekfetch.get('https://blague.xyz/joke/random');
        
        var embed = new Discord.RichEmbed()
            .setDescription(`${data.body.jokequestion}\n\n||${data.body.jokereponse}||`)
            .setFooter('Using blague.xyz api | By • Skiz •#0001')
            .setColor(tdata.embed.color)

        message.channel.send(embed)

    }

}

module.exports = Joke;