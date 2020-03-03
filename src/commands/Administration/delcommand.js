const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: [],
                permission: Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const name = args[0];
        if (!name) {
            return message.error("administration/delcommand:MISSING");
        }

        if (!message.guild.settings.customCommands.get(name)) {
            return message.error("administration/delcommand:UNKNOWN_COMMAND", {
                prefix: message.guild.settings.prefix,
                commandName: name
            });
        }

        await message.guild.settings.deleteCustomCommand(name);

        message.success("administration/delcommand:SUCCESS", {
            prefix: message.guild.settings.prefix,
            commandName: name
        });
    }
};
