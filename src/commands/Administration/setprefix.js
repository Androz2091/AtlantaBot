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
        const prefix = args[0];
        if(!prefix) return message.error("administration/setprefix:MISSING");
        if(prefix.length > 10) prefix = prefix.substr(0, 10);
        
        await message.guild.settings.setPrefix(prefix);

        return message.success("administration/setprefix:SUCCESS", {
            prefix
        });
    }
};
