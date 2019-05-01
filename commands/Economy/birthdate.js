const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Birthdate extends Command {

    constructor (client) {
        super(client, {
            name: "birthdate",
            description: (language) => language.get('BIRTHDATE_DESCRIPTION'),
            dirname: __dirname,
            usage: "birthdate [date]",
            enabled: true,
            guildOnly: false,
            aliases: ["anniv"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$birthdate 01/12/2000",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var date = args[0];
        if(!date) return message.channel.send(message.language.get('BIRTHDATE_VALID_DATE'));

        var _args = date.split('/');
        var [day, month, year] = _args;
        if(!day || !month || !year) return message.channel.send(message.language.get('BIRTHDATE_INVALID_DATE2'));
        
        //Check if the date is valid
        var dateExists = require('date-exists').dateExists;

        if(!dateExists(date)) return message.channel.send(message.language.get('BIRTHDATE_INVALID_DATE3'));

        // Gets the string of the date
        let match = date.match(/\d+/g);
        if (!match) throw new SyntaxError('Date must be in format "(d)d.(m)m.(yy)yy"'); 
        let tday = +match[0], tmonth = +match[1] - 1, tyear = +match[2];
        if (tyear < 100) tyear += tyear < 50 ? 2000 : 1900;
        let d = new Date(tyear, tmonth, tday);
        if(d.getTime() > Date.now()) return message.channel.send(message.language.get('BIRTHDATE_TOO_HIGH'));

        // Updates db
        this.client.databases[0].set(`${message.author.id}.birthdate`, d);

        // Send success message
        return message.channel.send(message.language.get('BIRTHDATE_SUCCESS', message.language.printDate(d)));

    }

}

module.exports = Birthdate;