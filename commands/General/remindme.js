const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const ms = require('ms');

class Remindme extends Command {

    constructor (client) {
        super(client, {
            name: "remindme",
            description: (language) => language.get('REMINDME_DESCRIPTION'),
            dirname: __dirname,
            usage: "remindme [time] [message]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$remindme 10m Hello",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // gets the time 
        var time = args[0];
        if(!time || isNaN(ms(time))) return message.channel.send(message.language.get('INVALID_TIME'));

        // gets the message
        var msg = args.slice(1).join(' ');
        if(!msg) return message.channel.send(message.language.get('REMINDME_MESSAGE'));
        
        var tdata = {
            author:message.author.id,
            msg:msg,
            registeredAt:Date.now()
        };

        // Update database
        var ftime = Date.now()+ms(time);
        ftime = Math.floor(ftime / 1000);
        ftime = String(ftime);
        var db = this.client.databases[3];
        var cdata = db.get(ftime);
        if(!cdata) db.set(ftime, []);
        db.push(ftime, tdata);

        // Send success message
        message.channel.send(message.language.get('REMINDME_SAVED'));
    }

}

module.exports = Remindme;