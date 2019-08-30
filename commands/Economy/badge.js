const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Badge extends Command {

    constructor (client) {
        super(client, {
            name: "badge",
            description: (language) => language.get("BADGE_DESCRIPTION"),
            usage: (language) => language.get("BADGE_USAGE"),
            examples: (language) => language.get("BADGE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "badges" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        function searchBadge(badgeName){
            let badge = null;
            for(let type in badges){
                let tBadges = badges[type];
                tBadges.forEach((b) => {
                    if(b.name.toLowerCase() === badgeName){
                        badge = b;
                    }
                });
            }
            return badge;
        }

        const badges = require("../../config.js").badges;
        let bought = data.userData.badges;

        // If the member wants to buy
        if(args[0]){
            let badgeName = args.join(" ").toLowerCase();
            let found = searchBadge(badgeName);
            if(!found){
                return message.channel.send(message.language.get("BADGE_ERR_NOT_FOUND", badgeName));
            }
            if(data.userData.badges.some((b) => b.emoji === found.emoji)){
                return message.channel.send(message.language.get("BADGE_ERR_BOUGHT"));
            }
            if(data.userData.money < found.price){
                return message.channel.send(message.language.get("BADGE_ERR_PRICE"));
            }
            data.userData.badges.push(found);
            data.memberData.money = data.memberData.money - found.price;
            data.memberData.save();
            data.userData.save();
            return message.channel.send(message.language.get("BADGE_SUCCESS", found));
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("BADGE_EMBED_TITLE"))
            .setDescription(message.language.get("BADGE_EMBED_DESCRIPTION", data.guild.prefix))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
            
        for(let type in badges){
            let cat = "";
            badges[type].forEach((b) => {
                if(!bought.some((bg) => b.emoji === bg.emoji)){
                    cat += message.language.get("BADGE_FORMAT", b);
                } else {
                    cat += message.language.get("BADGE_FORMAT_BOUGHT", b);
                }
            });
            embed.addField(message.language.get("BADGE_HEADINGS")[type], cat.substr(0, cat.length-10), true);
        }
       
        message.channel.send(embed);

    }

}

module.exports = Badge;