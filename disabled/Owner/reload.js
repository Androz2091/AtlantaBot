const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Reload extends Command {

    constructor (client) {
        super(client, {
            name: "reload",
            description: (language) => language.get("RELOAD_DESCRIPTION"),
            usage: (language) => language.get("RELOAD_USAGE"),
            examples: (language) => language.get("RELOAD_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        let command = args[0];
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if(!cmd){
            message.channel.send(message.language.get("RELOAD_ERR_NOT_FOUND", command));
        }
        await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
        await this.client.loadCommand(cmd.conf.location, cmd.help.name);
        message.channel.send(message.language.get("RELOAD_SUCCESS", cmd.help.name));
    }

}

module.exports = Reload;