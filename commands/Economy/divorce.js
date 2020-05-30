const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Divorce extends Command {

    constructor (client) {
        super(client, {
            name: "divorce",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "profil" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        // Check if the message author is wedded
        if(!data.userData.lover){
            return message.error("economy/divorce:NOT_MARRIED"));
        }

        // Updates db
        
        let user = message.client.users.get(data.userData.lover) || await message.client.users.fetch(data.userData.lover);
        
        data.userData.lover = null;
        data.userData.save();

        let oldLover = await message.client.findOrCreateUser({ id:user.id });
        oldLover.lover = null;
        oldLover.save();

        // Send success message 
        message.success("economy/divorce:SUCCESS", {
            username: user.username
        });

    }

}

module.exports = Divorce;