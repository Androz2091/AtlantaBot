const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Credits extends Command {

    constructor (client) {
        super(client, {
            name: "money",
            description: (language) => language.get("MONEY_DESCRIPTION"),
            usage: (language) => language.get("MONEY_USAGE"),
            examples: (language) => language.get("MONEY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "credits", "balance" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        
        let user = message.mentions.users.size > 0 ? message.mentions.users.first() : message.author;

        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        let userData = (message.author === user) ? data.memberData : await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id }); 

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("CREDITS_TITLE", user.tag), user.displayAvatarURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setDescription(message.language.get("CREDITS_CONTENT", userData.money, user.username))
        message.channel.send(embed);
    }

}

module.exports = Credits;