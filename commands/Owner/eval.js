const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Eval extends Command {

    constructor (client) {
        super(client, {
            name: "eval",
            description: (language) => language.get('EVAL_DESCRIPTION'),
            dirname: __dirname,
            usage: "eval [code]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$eval",
            owner: true
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Somes utils variables
        var users_data = this.client.databases[0];
        var servers_data = this.client.databases[1];
        var cooldowns_data = this.client.databases[2];

        if(message.content.includes('client.token') || message.content.includes('config.token')) return message.channel.send('```Js\nHum... the string may contains the discord bot token```'); 
        
        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then(output => {
            if(typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            if(output.includes(this.client.token)) output = output.replace(this.client.token, 'T0K3N');
            return message.channel.send(output, { code: 'js' });
        }).catch(err => {
            err = err.toString();
            if (err.includes(this.client.token)) err = err.replace(this.client.token, '`T0K3N`');
            return message.channel.send(err, { code: 'js' })
        });

    }

}

module.exports = Eval;