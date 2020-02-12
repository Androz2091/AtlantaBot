const Command = require("../../base/Command.js"),
Discord = require("discord.js");

// An object to store pending requests
var pendings = {};

class Wedding extends Command {

    constructor (client) {
        super(client, {
            name: "wedding",
            description: (language) => language.get("WEDDING_DESCRIPTION"),
            usage: (language) => language.get("WEDDING_USAGE"),
            examples: (language) => language.get("WEDDING_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "mariage" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 10000
        });
    }

    async run (message, args, data) {

        // Gets the first mentionned member
        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        
        // if the message author is already wedded
        if(data.userData.lover){
            return message.channel.send(message.language.get("WEDDING_ERR_AUTHOR_MARRIED", data.guild.prefix));
        }
        let userData = await this.client.findOrCreateUser({ id: member.id });
        // if the member is already wedded
        if(userData.lover){
            return message.channel.send(message.language.get('WEDDING_ERR_MEMBER_MARRIED', member.user.username));
        }

        if(member.user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("WEDDING_ERR_YOURSELF"));
        }

        for(let requester in pendings){
            let receiver = pendings[requester];
            if(requester === message.author.id){
                let user =  message.client.users.get(receiver) || await message.client.users.fetch(receiver);
                return message.channel.send(message.language.get("WEDDING_ERR_AUTHOR_PENDING_REQUESTER", user.username));
            } else if (receiver === message.author.id){
                let user =  message.client.users.get(requester) || await message.client.users.fetch(requester);
                return message.channel.send(message.language.get("WEDDING_ERR_AUTHOR_PENDING_RECEIVER", user.username));
            }
            if(requester === member.id){
                let user =  message.client.users.get(receiver) || await message.client.users.fetch(receiver);
                return message.channel.send(message.language.get("WEDDING_ERR_MEMBER_PENDING_REQUESTER", user.username, member.user.username));
            } else if (receiver === member.id){
                let user =  message.client.users.get(requester) || await message.client.users.fetch(requester);
                return message.channel.send(message.language.get("WEDDING_ERR_MEMBER_PENDING_RECEIVER", user.username, member.user.username));
            }
        }

        // Update pending requests
        pendings[message.author.id] = member.id;

        message.channel.send(message.language.get("WEDDING_REQUEST", member, message.author));

        let collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === member.id, { time: 120000 });
        
        collector.on("collect", (msg) => {
            if(msg.content.toLowerCase() === message.language.get("UTILS").YES.toLowerCase()){
                return collector.stop(true);
            }
            if(msg.content.toLowerCase() === message.language.get("UTILS").NO.toLowerCase()){
                return collector.stop(false);
            }
        });

        collector.on("end", async (collected, accepted) => {
            // Delete request 
            delete pendings[message.author.id];
            if(accepted === "time"){
                return message.channel.send(message.language.get("WEDDING_ERR_TIMEOUT", member));
            }
            if(accepted){
                data.userData.lover = member.id;
                await data.userData.save();
                userData.lover = message.author.id;
                await userData.save();
                let messageOptions = {
                    content: `${member.toString()} :heart: ${message.author.toString()}`,
                    files: [
                        {
                            name: "unlocked.png",
                            attachment: "./assets/img/achievements/achievement_unlocked3.png"
                        }
                    ]
                };
                let sent = false;
                if(!userData.achievements.married.achieved){
                    message.channel.send(messageOptions);
                    sent = true;
                    userData.achievements.married.achieved = true;
                    userData.achievements.married.progress.now = 1;
                    userData.markModified("achievements.married");
                    userData.save();
                }
                if(!data.userData.achievements.married.achieved){
                    if(!sent) message.channel.send(messageOptions);
                    data.userData.achievements.married.achieved = true;
                    data.userData.achievements.married.progress.now = 1;
                    data.userData.markModified("achievements.married");
                    data.userData.save();
                }
                return message.channel.send(message.language.get("WEDDING_SUCCESS", message.author, member));
            } else {
                return message.channel.send(message.language.get("WEDDING_ERR_DENIED", message.author, member));
            }

        });
    }

}

module.exports = Wedding;