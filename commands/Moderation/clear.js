const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Clear extends Command {

    constructor (client) {
        super(client, {
            name: "clear",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "clear", "bulkdelete", "purge" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(args[0] === "all"){
            message.sendT("moderation/clear:ALL_CONFIRM");
            await message.channel.awaitMessages((m) => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.error("misc:TIMES_UP");
            });
            let position = message.channel.position;
            let newChannel = await message.channel.clone();
            await message.channel.delete();
            newChannel.setPosition(position);
            return newChannel.send(message.translate("moderation/clear:CHANNEL_CLEARED"));
        }

        let amount = args[0];
        if(!amount || isNaN(amount) || parseInt(amount) < 1){
            return message.error("moderation/clear:MISSING_AMOUNT");
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
            toDelete = await message.success("moderation/clear:CLEARED_MEMBER", {
                amount: --amount,
                username: user.tag
            });
        } else {
            toDelete = await message.success("moderation/clear:CLEARED", {
                amount: --amount
            });
        }

        setTimeout(function(){
            toDelete.delete();
        }, 2000);
        
    }

}

module.exports = Clear;
