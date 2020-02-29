const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["setlanguage"],
                permission: Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        if (!args[0]) {
            return message.error("administration/setlang:INVALID_LANGUAGE");
        }

        if (args[0] === "french") {
            await message.guild.settings.setLanguage("fr-FR");
            return message.success("administration/setlang:SUCCESS");
        }

        if (args[0] === "english") {
            await message.guild.settings.setLanguage("en-US");
            return message.success("administration/setlang:SUCCESS");
        }

        return message.error("administration/setlang:INVALID_LANGUAGE");
    }
};
