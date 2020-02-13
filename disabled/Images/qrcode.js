const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Qrcode extends Command {

    constructor (client) {
        super(client, {
            name: "qrcode",
            description: (language) => language.get("QRCODE_DESCRIPTION"),
            usage: (language) => language.get("QRCODE_USAGE"),
            examples: (language) => language.get("QRCODE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "qr" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let text = args.join(" ");
        if(!text){
            return message.channel.send(message.language.get("QRCODE_ERR_TEXT"));
        }
    
        let pleaseWait = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        
        let embed = new Discord.MessageEmbed()
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
            .setColor(data.config.embed.color);

        message.channel.send(embed);
    
    }

}

module.exports = Qrcode;