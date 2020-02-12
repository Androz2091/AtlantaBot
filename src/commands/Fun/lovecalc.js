const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
md5 = require("md5");

class Lovecalc extends Command {

    constructor (client) {
        super(client, {
            name: "lovecalc",
            description: (language) => language.get("LOVECALC_DESCRIPTION"),
            usage: (language) => language.get("LOVECALC_USAGE"),
            examples: (language) => language.get("LOVECALC_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let member1 = message.mentions.members.first();
        let member2 = message.mentions.members.filter((m) => m.id !== member1.id).first() || message.member;
        if(!member1 || !member2){
            return message.channel.send(message.language.get("LOVECALC_ERR_MENTIONS"));
        }

        let members = [ member1, member2 ].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        let str = `${members[0].id}${members[1].user.username}${members[0].user.username}${members[1].id}`;
        let hash = md5(str);

        let string = "";
        hash.split("").forEach((e) => {
            if(!isNaN(e)){
                string+=e;
            }
        });
        let percent = parseInt(string.substr(0, 2), 10);
        
        let embed = new Discord.MessageEmbed()
            .setAuthor("❤️ LoveCalc")
            .setDescription(message.language.get("LOVECALC_CONTENT", percent, member1.user.username, member2.user.username))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
        
        message.channel.send(embed);
        
    }

}

module.exports = Lovecalc;