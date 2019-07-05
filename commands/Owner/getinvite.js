const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Getinvite extends Command {

    constructor (client) {
        super(client, {
            name: "getinvite",
            description: (language) => language.get("GETINVITE_DESCRIPTION"),
            usage: (language) => language.get("GETINVITE_USAGE"),
            examples: (language) => language.get("GETINVITE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "gi" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let guild = null;

        if(args[0]){
            let found = message.client.guilds.get(args[0]);
            if(!found){
                found = message.client.guilds.find((g) => g.name === args.join(" "));
                if(found){
                    guild = found;
                }
            }
        } else {
            return message.channel.send("ERR_INVALID_ID");
        }

        if(guild){
            let tChannel = guild.channels.find((ch) => ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel){
                return message.channel.send(message.language.get("ERR_OCCURENCED")); 
            }
            let invite = await tChannel.createInvite({ maxAge : "0" }).catch((err) => {
                return message.channel.send(message.language.get("ERR_OCCURENCED"));
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(message.language.get("GETINVITE_ERR_NO_GUILD", args[0]));
        }
    }

}

module.exports = Getinvite;