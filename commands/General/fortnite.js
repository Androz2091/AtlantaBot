const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const fortnite = require('fortnite');

class Fortnite extends Command {

    constructor (client) {
        super(client, {
            name: "fortnite",
            description: (language) => language.get('FORTNITE_DESCRIPTION'),
            dirname: __dirname,
            usage: "fortnite [ps4/pc/xb1] [username]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$fortnite pc Ninja",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Create an instance of the client with your API Key
        const fortniteClient = new fortnite(this.client.config.apiKeys.fortnite);
        
        var platform = args[0];
        if(!platform || (platform !== 'pc' && platform !== 'xbl' && platform !== 'psn')) return message.channel.send(message.language.get('FORTNITE_PLATFORM'));

        var user = args[1];
        if(!user) return message.channel.send(message.language.get('FORTNITE_USERNAME'));

        // All methods
        fortniteClient.user(user, platform).then(tdata => {
            if(tdata.code === 404) return message.channel.send(message.language.get('FORTNITE_404', platform, user));
            var embed = new Discord.RichEmbed()
                .setTitle(tdata.username)
                .setURL(tdata.url)
                .setDescription(message.language.get('FORTNITE_DESC', platform, user)+'\nID: '+tdata.id)
                if(tdata.stats.solo) embed.addField('Solo', message.language.get('FORTNITE_SOLO_STATS', tdata), true);
                if(tdata.stats.duo) embed.addField('Duo', message.language.get('FORTNITE_DUO_STATS', tdata), true);
                if(tdata.stats.squad) embed.addField('Squad', message.language.get('FORTNITE_SQUAD_STATS', tdata), true);
                if(tdata.stats.lifetime) embed.addField('Lifetime', message.language.get('FORTNITE_LIFETIME_STATS', tdata), true);
                embed.setColor(data.embed.color)
                .setFooter(data.embed.footer)

            message.channel.send(embed)

        });
        /*
        fortnite.store().then(console.log);
        fortnite.challenges().then(console.log);*/
        
    }

}

module.exports = Fortnite;