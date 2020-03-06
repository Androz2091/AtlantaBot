const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["credits"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        
        const member = await Resolvers.resolveMember({
            message,
            search: args.join(" "),
            useMessageContent: false
        }) || message.member;

        if(member.user.bot){
            return message.error("economy/money:ERROR_BOT");
        }

        const memberData = await this.client.handlers.database.fetchMember(member.id, message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.translate("economy/money:TITLE", {
                username: member.user.username
            }), member.user.displayAvatarURL())
            .addField(message.translate("economy/profile:CASH"), message.translate("economy/profile:MONEY", {
                money: memberData.cash
            }), true)
            .addField(message.translate("economy/profile:BANK"), message.translate("economy/profile:MONEY", {
                money: memberData.bank
            }), true)
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer);
        message.channel.send(embed);
    }

}
