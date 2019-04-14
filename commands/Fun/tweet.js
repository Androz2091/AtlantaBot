const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Tweet extends Command {

    constructor (client) {
        super(client, {
            name: "tweet",
            description: (language) => language.get('TWEET_DESCRIPTION'),
            dirname: __dirname,
            usage: "tweet [@twitter] [text]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$tweet @2091_androz Hello World !",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var user = args[0];
        var text = args.slice(1).join(' ');

        message.channel.send(message.language.get('PLEASE_WAIT')).then(async m => {

            if(!user) return m.edit(message.language.get('TWEET_USERNAME'));
            if(!text) return m.edit(message.language.get('TWEET_TEXT'));

            const { body } = await require('snekfetch').get(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`))
            message.channel.send(message.language.get('TWEET_TXT', user),{  
                files: [{   
                    attachment: body.message,
                    name: 'twt.png'
                }]
            }).then( () => m.delete());
        });

        
    }

}

module.exports = Tweet;