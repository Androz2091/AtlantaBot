const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Rep extends Command {

    constructor (client) {
        super(client, {
            name: "rep",
            description: (language) => language.get("REP_DESCRIPTION"),
            usage: (language) => language.get("REP_USAGE"),
            examples: (language) => language.get("REP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "reputation" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        // if the member is already in the cooldown db
        let isInCooldown = data.users[0].cooldowns.rep;
        if(isInCooldown){
            /*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
            if(isInCooldown > Date.now()){
                return message.channel.send(message.language.get("REP_ERR_COOLDOWN", message.language.convertMs(isInCooldown - Date.now())));
            }
        }

        let user = message.mentions.users.first();
        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }
        if(user.id === message.author.id){
            return message.channel.send(message.language.get("REP_ERR_YOURSELF"));
        }

        // Records in the database the time when the member will be able to execute the command again (in 12 hours)
        let toWait = Date.now() + 43200000;
        data.users[0].cooldowns.rep = toWait;
        data.users[0].save();
        
        data.users[1].rep++;
        data.users[1].save();

        message.channel.send(message.language.get("REP_SUCCESS", user.username));

    }

}

module.exports = Rep;