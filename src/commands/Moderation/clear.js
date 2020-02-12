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
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(args[0] === "all"){
            message.channel.send(message.language.get("CLEAR_CLONE"));
            await message.channel.awaitMessages((m) => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                // if the author of the commands does not confirm the backup loading
                return message.channel.send(message.language.get("CLEAR_ERR_TIMEOUT"));
            });
            let position = message.channel.position;
            let newChannel = await message.channel.clone();
            await message.channel.delete();
            newChannel.setPosition(position);
            return newChannel.send(message.language.get("CLEAR_DELETED"));
        }

        let amount = args[0];
        if(!amount || isNaN(amount) || parseInt(amount) < 1){
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
        messages = messages.filter((m) => !m.pinned);
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
