const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const name = args[0].split("\n")[0];
        if (!name)
            return message.error("administration/addcommand:MISSING_NAME");

        if (
            this.client.commands.fetch(name) ||
            message.guild.settings.customCommands.get(name)
        ) {
            return message.error(
                "administration/addcommand:COMMAND_ALREADY_EXISTS"
            );
        }

        const answer = (args[0].split("\n")[1] || "") + args.slice(1).join(" ");
        if (!answer) {
            return message.error("administration/addcommand:MISSING_ANSWER");
        }

        await message.guild.settings.addCustomCommand({
            name: name.toLowerCase(),
            answer
        });

        message.success("administration/addcommand:SUCCESS", {
            commandName: name,
            prefix: message.guild.settings.prefix
        });
    }
};
