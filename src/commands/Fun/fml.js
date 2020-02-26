const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message) {

        if (!this.client.config.apiKeys.blagueXYZ)
            return message.sendT("misc:COMMAND_DISABLED", null, "error");

        const fml = await this.client.joker.randomVDM(
            message.guild.settings.language.substr(0, 2)
        );

        const embed = new Discord.MessageEmbed()
            .setDescription(fml.content)
            .setFooter(message.translate("fun/fml:FOOTER"))
            .setColor(this.client.config.embed.color);

        message.channel.send(embed);

    }

}
