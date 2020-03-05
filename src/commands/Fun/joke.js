const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

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
        if (!this.client.config.apiKeys.blagueXYZ)
            return message.error("misc:COMMAND_DISABLED");

        const joke = await this.client.joker.randomJoke(
            message.guild.settings.language.substr(0, 2)
        );

        const embed = new Discord.MessageEmbed()
            .setDescription(joke.toDiscordSpoils())
            .setFooter(message.translate("fun/joke:FOOTER"))
            .setColor(this.client.config.embed.color);

        message.channel.send(embed);
    }
};
