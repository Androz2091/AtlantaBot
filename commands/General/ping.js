const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ping extends Command {

    constructor (client) {
        super(client, {
            name: "ping",
            description: (language) => language.get("PING_DESCRIPTION"),
            usage: (language) => language.get("PING_USAGE"),
            examples: (language) => language.get("PING_EXAMPLES"),
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
        message.channel.send(message.language.get("PING", 0.0000)).then((m) => {
            m.edit(message.language.get("PING", m.createdTimestamp - message.createdTimestamp));
        });
    }

}

module.exports = Ping;