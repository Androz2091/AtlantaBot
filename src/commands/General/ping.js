const Command = require("../../structures/Command"),
Discord = require("discord.js");
const Constants = require("../../utility/Constants");

class Ping extends Command {

    constructor (client) {
        super(client, {
            name: "ping",
            path: __dirname,
            description: (language) => language.get("PING_DESCRIPTION"),
            usage: (language) => language.get("PING_USAGE"),
            examples: (language) => language.get("PING_EXAMPLES"),
            aliases: [ "pong", "latency" ],
            permissions: ["ADMINISTRATOR"]         
        });
    }

    async execute (message) {
        message.channel.send(message.language.get("PING", 0.0000)).then((m) => {
            m.edit(message.language.get("PING", m.createdTimestamp - message.createdTimestamp));
        });
    }

}

module.exports = Ping;