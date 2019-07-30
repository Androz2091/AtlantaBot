const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Goodbye extends Command {

    constructor (client) {
        super(client, {
            name: "goodbye",
            description: (language) => language.get("GOODBYE_DESCRIPTION"),
            usage: (language) => language.get("GOODBYE_USAGE"),
            examples: (language) => language.get("GOODBYE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "au-revoir" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(args[0] === "test" && data.settings.plugins.goodbye.enabled){
            message.client.emit("guildMemberRemove", message.member);
            return message.channel.send(message.language.get("GOODBYE_TEST_SUCCESS"));
        }

        if(data.settings.plugins.goodbye.enabled){
            data.settings.plugins.goodbye = {
                enabled: false,
                message: null,
                channel: null,
                withImage: null
            };
            data.settings.markModified("plugins.goodbye");
            data.settings.save();
            return message.channel.send(message.language.get("GOODBYE_DISABLED", data.settings.prefix));
        }

        let goodbye = {
            enabled: true,
            channel: null,
            message: null,
            withImage: null,
        };

        message.channel.send(message.language.get("GOODBYE_FORM_CHANNEL", message.author.username));
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, { time: 120000 }); // 2 min

        collector.on("collect", async (msg) => {

            if(goodbye.message){
                if(msg.content.toLowerCase() === message.language.get("UTILS").YES.toLowerCase()){
                    goodbye.withImage = true;
                    message.channel.send(message.language.get("GOODBYE_FORM_SUCCESS", goodbye.channel, data.settings.prefix));
                    data.settings.plugins.goodbye = goodbye;
                    data.settings.markModified("plugins.goodbye");
                    await data.settings.save();
                    return collector.stop();
                }
                if(msg.content.toLowerCase() === message.language.get("UTILS").NO.toLowerCase()){
                    goodbye.withImage = false;
                    message.channel.send(message.language.get("GOODBYE_FORM_SUCCESS", goodbye.channel, data.settings.prefix));
                    data.settings.plugins.goodbye = goodbye;
                    data.settings.markModified("plugins.goodbye");
                    await data.settings.save();
                    return collector.stop();
                }
                return message.channel.send(message.language.get("ERR_YES_NO"));
            }

            if(goodbye.channel && !goodbye.message){
                if(msg.content.length < 1501){
                    goodbye.message = msg.content;
                    return message.channel.send(message.language.get("GOODBYE_FORM_IMAGE"));
                }
                return message.channel.send(message.language.get("GOODBYE_ERR_CARACT"));
            }

            if(!goodbye.channel){
                let channel = msg.mentions.channels.filter((ch) => ch.type === "text" && channel.guild.id === message.guild.id).first();
                if(!channel){
                    return message.channel.send(message.language.get("ERR_INVALID_CHANNEL"));
                }
                if(channel.guild !== msg.guild){
                    return;
                }
                goodbye.channel = channel.id;
                message.channel.send(message.language.get("GOODBYE_FORM_MESSAGE", channel, message));
            }

        });

        // When the collector is stopped
        collector.on("end", (collected, reason) => {
            if(reason === "time"){
                return message.channel.send(message.language.get("GOODBYE_ERR_TIMEOUT"));
            }
        });
    }

}

module.exports = Goodbye;
