const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fortnite = require("fortnite");
 
class Fortnite extends Command {
    constructor (client) {
        super(client, {
            name: "fortnite",
            description: (language) => language.get("FORTNITE_DESCRIPTION"),
            usage: (language) => language.get("FORTNITE_USAGE"),
            examples: (language) => language.get("FORTNITE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "fn" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 500
        });
    }
 
    async run (message, args, data) {

        if(!data.config.apiKeys.fortnite || data.config.apiKeys.fortnite.length === ""){
            return message.channel.send(message.language.get("ERR_COMMAND_DISABLED"));
        }

        let fortniteClient = new fortnite(data.config.apiKeys.fortnite);

        let platform = args[0];
        if(!platform || (platform !== "pc" && platform !== "xbl" && platform !== "psn")){
            return message.channel.send(message.language.get("FORTNITE_ERR_PLATFORM"));
        }

        let user = args.slice(1).join(" ");
        if(!user){
            return message.channel.send(message.language.get("FORTNITE_ERR_USERNAME"));
        }

        fortniteClient.user(user, platform).then((tdata) => {

            if(tdata.code === 404){
                return message.channel.send(message.language.get("FORTNITE_ERR_NOT_FOUND", platform, user));
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(tdata.username)
                .setURL(tdata.url.replace(new RegExp(" ", "g"), "%20"))
                .setDescription(message.language.get("FORTNITE_DESC", platform, user)+"\nID: "+tdata.id);

            if(tdata.stats.solo){
                embed.addField("Solo", message.language.get("FORTNITE_SOLO_STATS", tdata), true);
            }
            if(tdata.stats.duo){
                embed.addField("Duo", message.language.get("FORTNITE_DUO_STATS", tdata), true);
            }
            if(tdata.stats.squad){
                embed.addField("Squad", message.language.get("FORTNITE_SQUAD_STATS", tdata), true);
            }
            if(tdata.stats.lifetime){
                embed.addField("Lifetime", message.language.get("FORTNITE_LIFETIME_STATS", tdata), true);
            }

            embed.setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

            message.channel.send(embed);

        });
    }
}

module.exports = Fortnite;