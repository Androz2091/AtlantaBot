const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        const text = args.join(" ");
        if (!text || text.length > 20) {
            return message.error("fun/ascii:TEXT_MISSING");
        }

        const rendered = await figletAsync(text);
        message.channel.send("```" + rendered + "```");
    }
};
