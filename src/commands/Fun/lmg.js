const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["lmgtfy"],
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        const question = args.join(" ");
        if (!question) return message.sendT("fun/lmg:MISSING", null, "error");
        const encodedQuestion = question.replace(/[' '_]/g, "+");
        await message.channel.send(`http://lmgtfy.com/?q=${encodedQuestion}`);
        message.delete().catch(() => {});
    }
};
