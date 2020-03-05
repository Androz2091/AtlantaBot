const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel:
                    Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const status = args[0];
        if(!status || status !== "on" && status !== "off"){
            return message.error("administration/deletemod:MISSING_STATUS");
        }
        if(status === "on"){
            await message.guild.settings.setAutoDeleteModCommands(true);
            message.error("administration/deletemod:SUCCESS_ENABLED");
        } else {
            await message.guild.settings.setAutoDeleteModCommands(false);
            message.error("administration/deletemod:SUCCESS_DISABLED");
        }
    }

}
