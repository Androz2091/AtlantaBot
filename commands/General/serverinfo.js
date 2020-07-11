const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Serverinfo extends Command {

    constructor (client) {
        super(client, {
            name: "serverinfo",
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
            .addField(this.client.config.emojis.title+message.translate("common:NAME"), guild.name, true)
            .addField(this.client.config.emojis.calendar+message.translate("common:CREATION"), message.printDate(guild.createdAt), true)
            .addField(this.client.config.emojis.users+message.translate("common:MEMBERS"), message.translate("general/serverinfo:MEMBERS", {
                count: guild.members.cache.filter(m => !m.user.bot).size
            })+" | "+message.translate("general/serverinfo:BOTS", {
                count: guild.members.cache.filter(m => m.user.bot).size
            }), true)
            .addField(this.client.config.emojis.afk+message.translate("general/serverinfo:AFK_CHANNEL"), guild.afkChannel || message.translate("general/serverinfo:NO_AFK_CHANNEL"), true)
            .addField(this.client.config.emojis.id+message.translate("common:ID"), guild.id, true)
            .addField(this.client.config.emojis.crown+message.translate("common:OWNER"), guild.owner, true)
            .addField(this.client.config.emojis.boost+message.translate("general/serverinfo:BOOSTS"), guild.premiumSubscriptionCount || 0, true)
            .addField(this.client.config.emojis.channels+message.translate("common:CHANNELS"), message.translate("general/serverinfo:TEXT_CHANNELS", {
                count: guild.channels.filter(c => c.type === "text").size
            })+" | "+message.translate("general/serverinfo:VOICE_CHANNELS", {
                count: guild.channels.filter(c => c.type === "voice").size
            })+" | "+message.translate("general/serverinfo:CAT_CHANNELS", {
                count: guild.channels.filter(c => c.type === "category").size
            }), true)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Serverinfo;