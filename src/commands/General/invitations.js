const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Invitations extends Command {

    constructor (client) {
        super(client, {
            name: "invitations",
            description: (language) => language.get("INVITATIONS_DESCRIPTION"),
            usage: (language) => language.get("INVITATIONS_USAGE"),
            examples: (language) => language.get("INVITATIONS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let member = await this.client.resolveMember(args[0]);

        // Gets the invites
        let invites = await message.guild.fetchInvites().catch((err) => {});
        
        let memberInvites = invites.filter((i) => i.inviter && i.inviter.id === member.user.id);

        if(memberInvites.size <= 0){
            return message.channel.send(message.language.get("INVITATIONS_ERR_NO_INVITE", (member === message.member ? null : member)));
        }

        let content = memberInvites.map((i) => message.language.get("INVITATIONS_CODE", i)).join("\n");
        let index = 0;
        memberInvites.forEach((invite) => index += invite.uses);
        
        let embed = new Discord.MessageEmbed()
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setAuthor('Invites Tracker')
            .setDescription(message.language.get("INVITATIONS_TITLE", member, message))
            .addField(message.language.get("INVITATIONS_FIELDS")[0], message.language.get("INVITATIONS_FIELDS", index)[2])
            .addField(message.language.get("INVITATIONS_FIELDS")[1], content);

        message.channel.send(embed);
    }

}

module.exports = Invitations;