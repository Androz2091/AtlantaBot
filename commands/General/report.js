const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Report extends Command {

    constructor (client) {
        super(client, {
            name: "report",
            description: (language) => language.get("REPORT_DESCRIPTION"),
            usage: (language) => language.get("REPORT_USAGE"),
            examples: (language) => language.get("REPORT_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let repChannel = message.guild.channels.get(data.guild.plugins.reports);
        if(!repChannel){
            return message.channel.send(message.language.get("REPORT_ERR_NO_CHANNEL"));
        }

        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        if(member.user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        let rep = args.slice(1).join(" ");
        if(!rep){
            return message.channel.send(message.language.get("REPORT_ERR_NO_REP"));
        }
        if(member.id === message.author.id){
            return message.channel.send(message.language.get("REPORT_ERR_USER_YOURSELF"));
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("REPORT_TITLE", message.author), message.author.displayAvatarURL())
            .addField(message.language.get("REPORT_HEADINGS")[0], `\`${message.author.username}#${message.author.discriminator}\``, true)
            .addField(message.language.get("REPORT_HEADINGS")[1], message.language.printDate(new Date(Date.now()), true), true)
            .addBlankField()
            .addField(message.language.get("REPORT_HEADINGS")[2], "**"+rep+"**", true)
            .addField(message.language.get("REPORT_HEADINGS")[3], `\`${member.user.tag}\` (${member.user.toString()})`, true)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        let success = Discord.Util.parseEmoji(message.client.config.emojis.success).id;
        let error = Discord.Util.parseEmoji(message.client.config.emojis.error).id;
        
        repChannel.send(embed).then(async (m) => {
            await m.react(success);
            await m.react(error);
        });

        message.channel.send(message.language.get("REPORT_SUCCESS", repChannel));
    }

}

module.exports = Report;
