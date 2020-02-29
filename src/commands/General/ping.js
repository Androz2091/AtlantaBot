const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["pong", "latency"],
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message) {
        let msg = await message.sendT("general/ping:RESPONSE", {
            command: "..",
            api: this.client.ws.ping
        });
        await msg.sendT("general/ping:RESPONSE", {
            command: msg.createdTimestamp - message.createdTimestamp,
            api: Math.floor(this.client.ws.ping)
        }, true);
    }
};
