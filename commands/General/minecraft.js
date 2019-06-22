const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const request = require('request');
const snekfetch = require('snekfetch');

class Minecraft extends Command {

    constructor (client) {
        super(client, {
            name: "minecraft",
            description: (language) => language.get('MINECRAFT_DESCRIPTION'),
            dirname: __dirname,
            usage: "minecraft [ip]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$minecraft",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var ip = args[0];
        if(!ip) return message.channel.send(message.language.get('MINECRAFT_IP'));
        var img = `https://eu.mc-api.net/v3/server/favicon/${ip}`;

        var url = '';
        if(ip.split(':').length > 1) url = `https://mcapi.us/server/status?ip=${ip.split(':')[0]}&port=${ip.split(':')[1]}`;
        else url = `https://mcapi.us/server/status?ip=${ip}`;

        request(url, { json: true }, async function (error, response, body) {
            if(error) return message.channel.send(message.language.get('MINECRAFT_ERR1'));
            if(!body.online){
                return message.channel.send(message.language.get('MINECRAFT_IS_OFFLINE'));
            }
            if(body.error.length > 1){
                if(body.error === "invalid hostname or port"){
                    return message.channel.send(message.language.get('MINECRAFT_IS_OFFLINE'));
                }
                else return message.channel.send(message.language.get('AN_ERROR_OCCURENCED'));
            }

            request('https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t=mc.hypixel.net', function (err, r, b) {
                var mc_embed = new Discord.RichEmbed()
                    .setAuthor(message.language.get('MINECRAFT_UTILS', ip)[0])
                    .addField(message.language.get('MINECRAFT_UTILS', ip)[1], body.server.name)
                    .addField(message.language.get('MINECRAFT_UTILS', ip)[2], message.language.get('MINECRAFT_PLAYERS', body.players.now))
                    .addField(message.language.get('MINECRAFT_UTILS', ip)[3], message.language.get('MINECRAFT_PLAYERS', body.players.max))
                    .addField(message.language.get('MINECRAFT_UTILS', ip)[4], message.language.get('MINECRAFT_ONLINE'))
                    .setColor(data.embed.color)
                    .setThumbnail(img)
                    .setFooter(data.embed.footer);

                var url = `https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t=${ip}`;
                snekfetch.get(url).then(r => {
                    message.channel.send(mc_embed);
                    message.channel.send('', {
                        file:{
                            attachment:r.body,
                            name:'success.png'
                        }
                    });
                });
            }); 
            
        });
    }

}

module.exports = Minecraft;