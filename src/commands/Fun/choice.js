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
        if (answers.length < 2) return message.error("fun/choice:MISSING");
        if (answers.some(answer => !answer))
            return message.error("fun/choice:EMPTY");

        let m = await message.sendT("fun/choice:PROGRESS", null, false, false, "loading");

        setTimeout(() => {
            m.success("fun/choice:DONE", null, true);
            const result =
                answers[parseInt(Math.floor(Math.random() * answers.length))];
            message.channel.send("```" + result + "```");
        }, 1500);
    }
};
