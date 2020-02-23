const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["eightball", "8"],
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        if (!args[0] || !message.content.endsWith("?")) {
            return message.sendT("fun/8ball:ERR_QUESTION", null, "error");
        }

        const answerNO = parseInt(Math.floor(Math.random() * 10), 10);
        const answer = message.translate(`fun/8ball:RESPONSE_${answerNO + 1}`);

        message.channel.send(`${message.author.username}, ${answer}`);
    }
};
