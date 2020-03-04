const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel:
                    Constants.PermissionsLevels.SERVER_MODERATOR,
                clientPermissions: ["MANAGE_EMOJIS"]
            },
            ...args
        );
    }

    async execute(message, args) {
        const URL = args[0];
        if (!URL) {
            return message.error("administration/addemoji:MISSING_URL");
        }

        const name = args[1].replace(/[^a-z0-9]/gi, "");
        if (!name) {
            return message.error("administration/addemoji:MISSING_NAME");
        }

        message.guild.emojis
            .create(URL, name)
            .then(emoji => {
                message.success("administration/addemoji:SUCCESS", {
                    emojiName: emoji.name,
                    emojiString: emoji.toString()
                });
            })
            .catch(() => {
                message.error("administration/addemoji:ERROR");
            });
    }
};
