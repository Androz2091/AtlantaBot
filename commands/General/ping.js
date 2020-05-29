const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ping extends Command {

    constructor (client) {
        super(client, {
            name: "ping",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "pong", "latency" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        message.sendT("general/ping:CONTENT", {
            ping: "..."
        }).then((m) => {
            m.sendT("general/ping:CONTENT", {
                ping: m.createdTimestamp - message.createdTimestamp
            }, true);
        });
    }

}

module.exports = Ping;