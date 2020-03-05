const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js"),
    md5 = require("md5");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER,
                clientPermissions: ["EMBED_LINKS"],
                guildOnly: false
            },
            ...args
        );
    }

    async execute(message) {
        const firstMember = message.mentions.members.first();
        const secondMember =
            message.mentions.members
                .filter(m => m.id !== firstMember.id)
                .first() || message.member;
        if (!firstMember || !secondMember)
            return message.error("fun/lovecalc:MISSING");

        const members = [firstMember, secondMember].sort(
            (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
        );
        const hash = md5(
            `${members[0].id}${members[1].user.username}${members[0].user.username}${members[1].id}`
        );

        const string = hash
            .split("")
            .filter(e => !isNaN(e))
            .join("");
        const percent = parseInt(string.substr(0, 2), 10);

        let embed = new Discord.MessageEmbed()
            .setAuthor("❤️ LoveCalc")
            .setDescription(
                message.translate("fun/lovecalc:CONTENT", {
                    percent,
                    firstUsername: firstMember.user.username,
                    secondUsername: secondMember.user.username
                })
            )
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer);

        message.channel.send(embed);
    }
};
