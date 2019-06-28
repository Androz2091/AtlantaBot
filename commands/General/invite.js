const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Invite extends Command {

    constructor (client) {
        super(client, {
            name: "invite",
            description: (language) => language.get("INVITE_DESCRIPTION"),
            usage: (language) => language.get("INVITE_USAGE"),
            examples: (language) => language.get("INVITE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "i", "add" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`;
        let voteURL = `https://discordbots.org/bot/${this.client.user.id}/vote`;
        let supportURL = await message.client.functions.supportLink(message.client);

        if(args[0]){
            return message.channel.send(inviteLink);
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("INVITE_TITLE"))
            .setDescription(message.language.get("INVITE_DESC", data.settings.prefix))
            .addField(message.language.get("INVITE_HEADINGS")[0], inviteLink)
            .addField(message.language.get("INVITE_HEADINGS")[1], voteURL)
            .addField(message.language.get("INVITE_HEADINGS")[2], supportURL)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        
        message.channel.send(embed);
           
    }

}

module.exports = Invite;