const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Unban extends Command {

    constructor (client) {
        super(client, {
            name: "unban",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "deban", "déban" ],
            memberPermissions: [ "BAN_MEMBERS" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let user = null;

        if(!args[0]){
            return message.error("moderation/unban:MISSING_ID");
        }

        // Check if the arg is an ID or a username
        let isId = !isNaN(args[0]);

        if(isId){
            // Try to find a user with that ID
            await message.client.users.fetch(args[0]).then((u) => {
                // if a user was found
                user = u;
            }).catch((err) => {
                // if no user found, send an error message
                return message.error("misc:NO_USER_FOUND_ID", {
                    id: args[0]
                });
            });
        } else if(!isId) {
            let arr = args[0].split("#");
            if(arr.length < 2){
                return message.error("misc:NO_USER_FOUND_ID", {
                    id: args[0]
                });
            }
            user = message.client.users.filter((u) => u.username === arr[0]).find((u) => u.discriminator === arr[1]);
        }

        if(!user){
            return message.error("misc:NO_USER_FOUND_ID", {
                id: args[0]
            });
        }

        // check if the user is banned
        let banned = await message.guild.fetchBans();
        if(!banned.some((e) => e.user.id === user.id)){
            return message.success("moderation/unban:NOT_BANNED", {
                username: user.tag
            });
        }

        // Unban user
        message.guild.members.unban(user).catch((err) => {});

        // Send a success message in the current channel
        message.success("moderation/unban:UNBANNED", {
            username: user.tag,
            server: message.guild.name
        });

    }

}

module.exports = Unban;