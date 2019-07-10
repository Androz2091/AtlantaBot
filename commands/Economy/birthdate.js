const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Birthdate extends Command {

    constructor (client) {
        super(client, {
            name: "birthdate",
            description: (language) => language.get("BIRTHDATE_DESCRIPTION"),
            usage: (language) => language.get("BIRTHDATE_USAGE"),
            examples: (language) => language.get("BIRTHDATE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "anniversaire" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        
        let date = args[0];
        if(!date){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_DATE"));
        }

        let tArgs = date.split("/");
        let [day, month, year] = tArgs;
        if(!day || !month || !year){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_DATE_FORMAT"));
        }
        
        // Gets the string of the date
        let match = date.match(/\d+/g);
        if (!match){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_INVALID_DATE_FORMAT"));
        }
        let tday = +match[0], tmonth = +match[1] - 1, tyear = +match[2];
        if (tyear < 100){
            tyear += tyear < 50 ? 2000 : 1900;
        }
        let d = new Date(tyear, tmonth, tday);
        if(!(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear())){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_INVALID_DATE_FORMAT"));
        }
        if(d.getTime() > Date.now()){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_TOO_HIGH"));
        }
        if(d.getTime() < (Date.now()-2523e+12)){
            return message.channel.send(message.language.get("BIRTHDATE_ERR_TOO_LOW"));
        }

        data.users[0].birthdate = d;
        data.users[0].save();
        
        message.channel.send(message.language.get("BIRTHDATE_SUCCESS", message.language.printDate(d)));

    }

}

module.exports = Birthdate;