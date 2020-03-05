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

    async execute(message, args) {
        // If a command is specified
        if (args[0]) {
            const isCustom = message.guild ? message.guild.settings.customCommands
                ? message.guild.settings.customCommands.find(
                      c => c.name === args[0]
                  )
                : false : false;

            // If the command doesn't exist
            const cmd = this.client.commands.fetch(args[0]);
            if (!cmd && isCustom) {
                return message.error("general/help:CUSTOM", { cmd: args[0] });
            } else if (!cmd) {
                return message.sentT(
                    "general/help:NOT_FOUND",
                    { search: args[0] },
                    "error"
                );
            }

            const description = message.translate(
                `${cmd.category.toLowerCase()}/${cmd.name}:DESCRIPTION`
            );
            const usage = message.translate(
                `${cmd.category.toLowerCase()}/${cmd.name}:USAGE`,
                {
                    prefix: message.guild
                        ? message.guild.settings.prefix
                        : ""
                }
            );
            const examples = message.translate(
                `${cmd.category.toLowerCase()}/${cmd.name}:EXAMPLES`,
                {
                    prefix: message.guild
                        ? message.guild.settings.prefix
                        : ""
                }
            );

            // Creates the help embed
            let groupEmbed = new Discord.MessageEmbed()
                .setAuthor(
                    message.translate("general/help:CMD_TITLE", {
                        prefix: message.guild
                            ? message.guild.settings.prefix
                            : "",
                        cmd: cmd.name
                    })
                )
                .addField(
                    message.translate("general/help:FIELD_DESCRIPTION"),
                    description
                )
                .addField(message.translate("general/help:FIELD_USAGE"), usage)
                .addField(
                    message.translate("general/help:FIELD_EXAMPLES"),
                    examples
                )
                .addField(
                    message.translate("general/help:FIELD_ALIASES"),
                    cmd.aliases.length > 0
                        ? cmd.aliases.map(a => "`" + a + "`").join("\n")
                        : message.translate("general/help:NO_ALIAS")
                )
                .addField(
                    message.translate("general/help:FIELD_PERMISSIONS"),
                    this.client.handlers.permissions.levels.get(cmd.userPermissionLevel)
                        .title
                )
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer);

            // and send the embed in the current channel
            return message.channel.send(groupEmbed);
        }

        const categories = [];

        this.client.commands.forEach(command => {
            if (!categories.includes(command.category)) {
                if (
                    command.category === "Maintainers" &&
                    !this.client.config.owners.includes(message.author.id)
                ) {
                    return;
                }
                categories.push(command.category);
            }
        });

        const embed = new Discord.MessageEmbed()
            .setDescription(
                message.translate("general/help:INFO", {
                    prefix: message.guild
                        ? message.guild.settings.prefix
                        : ""
                })
            )
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer);
        categories.sort().forEach(cat => {
            const commandsCategory = this.client.commands
                .array()
                .filter(cmd => cmd.category === cat);
            embed.addField(
                Constants.Emojis.CATEGORIES[cat.toUpperCase()] +
                    " " +
                    cat +
                    " (" +
                    commandsCategory.length +
                    ")",
                commandsCategory.map(cmd => "`" + cmd.name + "`").join(", ")
            );
        });
        if (message.guild) {
            if (message.guild.settings.customCommands.length > 0) {
                embed.addField(
                    Constants.Emojis.CATEGORIES.CUSTOM +
                        " " +
                        message.guild.name +
                        " | " +
                        message.translate("general/help:CUSTOM_COMMANDS") +
                        " - (" +
                        message.guild.settings.customCommands.length +
                        ")",
                    message.guild.settings.customCommands
                        .map(cmd => "`" + cmd.name + "`")
                        .join(", ")
                );
            }
        }
        embed.addField(
            "\u200B",
            message.translate("misc:STATS_FOOTER", {
                donateLink: Constants.Links.DONATE,
                dashboardLink: Constants.Links.DASHBOARD,
                inviteLink: Constants.Links.OAUTH,
                githubLink: Constants.Links.GITHUB,
                supportLink: Constants.Links.SERVER
            })
        );
        embed.setAuthor(
            message.translate("general/help:TITLE", {
                name: this.client.user.username
            }),
            this.client.user.displayAvatarURL()
        );
        return message.channel.send(embed);
    }
};
