const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Divorce extends Command {

    constructor (client) {
        super(client, {
            name: "divorce",
            description: (language) => language.get("DIVORCE_DESCRIPTION"),
            usage: (language) => language.get("DIVORCE_USAGE"),
            examples: (language) => language.get("DIVORCE_EXAMPLES"),
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
        if(!data.users[0].lover){
            return message.channel.send(message.language.get("DIVORCE_ERR_NOT_WEDDED"));
        }

        // Updates db
        
        let user = message.client.users.get(data.users[0].lover) || await message.client.users.fetch(data.users[0].lover);
        
        data.users[0].lover = null;
        data.users[0].save();

        let oldLover = await message.client.usersData.findOne({id:user.id});
        oldLover.lover = null;
        oldLover.save();

        // Send success message 
        message.channel.send(message.language.get("DIVORCE_SUCCESS", user.username));

    }

}

module.exports = Divorce;