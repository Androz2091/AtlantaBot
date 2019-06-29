const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Clear extends Command {

    constructor (client) {
        super(client, {
            name: "clear",
            description: (language) => language.get("CLEAR_DESCRIPTION"),
            usage: (language) => language.get("CLEAR_USAGE"),
            examples: (language) => language.get("CLEAR_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "clear", "bulkdelete" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let amount = args[0];
        if(!amount){
            return message.channel.send(message.language.get("CLEAR_ERR_AMOUNT"));
        }

        await message.delete();

        let user = message.mentions.users.first();

        let messages = await message.channel.messages.fetch({limit:100});
        messages = messages.array();
        if(user){
            messages = messages.filter((m) => m.author.id === user.id);
        }
        if(messages.length > amount){
            messages.length = parseInt(amount, 10);
        }
        amount++;

        message.channel.bulkDelete(messages, true);

        let toDelete = null;

        if(user){
            toDelete = await message.channel.send(message.language.get("CLEAR_SUCCESS_USER", --amount, user));
        } else {
            toDelete = await message.channel.send(message.language.get("CLEAR_SUCCESS", --amount));
        }

        setTimeout(function(){
            toDelete.delete();
        }, 2000);
        
    }

}

module.exports = Clear;