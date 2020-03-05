const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["pong", "latency"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER,
                guildOnly: false
            },
            ...args
        );
    }

    async execute(message, _args, data) {
        let msg = await message.sendT("general/ping:RESPONSE", {
            command: "000",
            api: this.client.ws.ping,
            processTime: data.processTime
        });
        await msg.sendT(
            "general/ping:RESPONSE",
            {
                command: msg.createdTimestamp - message.createdTimestamp,
                api: Math.floor(this.client.ws.ping),
                processTime: data.processTime
            },
            true
        );
    }
};
