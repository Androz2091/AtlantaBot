const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Serverinfo extends Command {

    constructor (client) {
        super(client, {
            name: "serverinfo",
            description: (language) => language.get("SERVERINFO_DESCRIPTION"),
            usage: (language) => language.get("SERVERINFO_USAGE"),
            examples: (language) => language.get("SERVERINFO_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "si" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false
        });
    }

    async run (message, args, data) {
        
        let guild = message.guild;

        if(args[0]){
            let found = message.client.guilds.get(args[0]);
            if(!found){
                found = message.client.guilds.find((g) => g.name === args.join(" "));
                if(found){
                    guild = found;
                }
            }
        }

        guild = await guild.fetch();

        let embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .addField(message.language.get("SERVERINFO_HEADINGS")[0], guild.name, true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[1], message.language.printDate(guild.createdAt), true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[2], message.language.get("SERVERINFO_MEMBERCOUNT", guild.members), true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[4], guild.afkChannel || message.language.get("SERVERINFO_NO_AFK"), true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[5], guild.id, true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[6], guild.owner, true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[7], guild.premiumSubscriptionCount || 0, true)
            .addField(message.language.get("SERVERINFO_HEADINGS")[3], message.language.get("SERVERINFO_CHANNELS", guild.channels), true)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Serverinfo;