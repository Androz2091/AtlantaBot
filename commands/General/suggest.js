const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Suggest extends Command {

    constructor (client) {
        super(client, {
            name: "suggest",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "suggestion", "sugg" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let suggChannel = message.guild.channels.get(data.guild.plugins.suggestions);
        if(!suggChannel){
            return message.error("general/suggest:MISSING_CHANNEL");
        }

        let sugg = args.join(" ");
        if(!sugg){
            return message.error("general/suggest:MISSING_CONTENT");
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.translate("general/suggests:TITLE", {
                user: message.author.username
            }), message.author.displayAvatarURL())
            .addField(message.translate("common:AUTHOR"), `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.translate("common:DATE"), message.language.printDate(new Date(Date.now()), true), true)
            .addField(message.translate("common:CONTENT"), "**"+sugg+"**")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        let success = Discord.Util.parseEmoji(message.client.config.emojis.success).id;
        let error = Discord.Util.parseEmoji(message.client.config.emojis.error).id;
        
        suggChannel.send(embed).then(async (m) => {
            await m.react(success);
            await m.react(error);
        });

        message.success("general/suggest:SUCCESS", {
            channel: suggChannel.toString()
        });
    }

}

module.exports = Suggest;