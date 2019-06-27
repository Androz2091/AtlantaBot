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

        const badges = require("../../config.js").badges;
        let bought = data.users[0].badges;

        // If the member wants to buy
        if(args[0]){
            let badgeName = args.join(" ").toLowerCase();
            let found = searchBadge(badgeName);
            if(!found){
                return message.channel.send(message.language.get("BADGE_ERR_NOT_FOUND", badgeName));
            }
            if(data.users[0].badges.some((b) => b.emoji === found.emoji)){
                return message.channel.send(message.language.get("BADGE_ERR_BOUGHT"));
            }
            if(data.users[0].money < found.price){
                return message.channel.send(message.language.get("BADGE_ERR_PRICE"));
            }
            data.users[0].badges.push(found);
            data.users[0].save();
            return message.channel.send(message.language.get("BADGE_SUCCESS", found));
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("BADGE_TITLE"))
            .setDescription(message.language.get("BADGE_DESCRIPTION", data.settings.prefix))
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
    }

}

module.exports = Badge;