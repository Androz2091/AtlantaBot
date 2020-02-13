const Command = require("../../structures/Command"),
Discord = require("discord.js");
const Constants = require("../../utility/Constants");

class Ping extends Command {

    constructor (client, name, path) {
        super(client, {
            name: "ping",
            aliases: [ "pong", "latency" ],
            permission: Constants.PermissionsLevels.ATLANTA_MAINTAINER        
        }, path);
    }

    async execute (message) {
        let msg = await message.sendT("core/ping:RESPONSE", {
            command: '..',
            api: this.client.ws.ping
        });
        await msg.editT("core/ping:RESPONSE", {
            command: msg.createdTimestamp - message.createdTimestamp,
            api: Math.floor(this.client.ws.ping)
        });
    }

}

module.exports = Ping;