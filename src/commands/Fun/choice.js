const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["random"],
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        // Gets the answers by spliting on "/"
        const answers = args.join(" ").split("/");
        if (answers.length < 2)
            return message.sendT("fun/choice:MISSING", null, "error");
        if (answers.some(answer => !answer))
            return message.sendT("fun/choice:EMPTY", null, "error");

        let m = await message.sendT("fun/choice:PROGRESS", null, "loading");

        setTimeout(() => {
            m.editT("fun/choice:DONE", null, "success");
            const result =
                answers[parseInt(Math.floor(Math.random() * answers.length))];
            message.channel.send("```" + result + "```");
        }, 1500);
    }
};
