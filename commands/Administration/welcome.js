const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Welcome extends Command {

    constructor (client) {
        super(client, {
            name: "welcome",
            description: (language) => language.get("WELCOME_DESCRIPTION"),
            usage: (language) => language.get("WELCOME_USAGE"),
            examples: (language) => language.get("WELCOME_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "bienvenue" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(args[0] === "test" && data.settings.plugins.welcome.enabled){
            message.client.emit("guildMemberAdd", message.member);
            return message.channel.send(message.language.get("WELCOME_TEST_SUCCESS"));
        }
        if(args[0] === "color" && data.settings.plugins.welcome.enabled && data.settings.plugins.welcome.withImage){
            //Color ?
            if(args[1]){
                // Hexadecimal value
                if(args[1].startsWith("#")){
                    let color = args[1],
                    hexacolor = color.replace(/[^a-z0-9]/gi, "");
                    if(hexacolor.length === 6){
                        data.settings.plugins.welcome.color.enabled = true;
                        data.settings.plugins.welcome.color.color = "#"+hexacolor.toUpperCase();
                        data.settings.markModified("plugins.welcome");
                        data.settings.save();
                        return message.channel.send(message.language.get("WELCOME_SUCCESS_COLOR", data.settings.plugins.welcome.color.color, data.settings.prefix));
                    } else {
                        return message.channel.send(message.language.get("WELCOME_ERR_COLOR"));
                    }
                }
                // Defaults values
                if(args[1] === "white" || args[1] === "orange" || args[1] === "red" || args[1] === "blue" || args[1] === "green" || args[1] === "purple"){
                    data.settings.plugins.welcome.color.enabled = true;
                    data.settings.plugins.welcome.color.color = args[1].toLowerCase();
                    data.settings.markModified("plugins.welcome");
                    data.settings.save();
                    return message.channel.send(message.language.get("WELCOME_SUCCESS_COLOR", data.settings.plugins.welcome.color.color, data.settings.prefix));
                } else {
                    return message.channel.send(message.language.get("WELCOME_ERR_COLOR"));

                }
            } else {
                return message.channel.send(message.language.get("WELCOME_ERR_COLOR"));
            } 
        }

        if(data.settings.plugins.welcome.enabled){
            data.settings.plugins.welcome = {
                enabled: false,
                message: null,
                channel: null,
                withImage: null,
                color: {
                    enabled: false,
                    color: null
                }
            };
            data.settings.markModified("plugins.welcome");
            data.settings.save();
            return message.channel.send(message.language.get("WELCOME_DISABLED", data.settings.prefix));
        }

        let welcome = {
            enabled: true,
            channel: null,
            message: null,
            withImage: null,
            color: {
                enabled: false,
                color: null
            }
        };

        message.channel.send(message.language.get("WELCOME_FORM_CHANNEL", message.author.username));
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, { time: 120000 }); // 2 min

        collector.on("collect", async (msg) => {

            if(welcome.message && !welcome.withImage){
                if(msg.content.toLowerCase() === message.language.get("UTILS").YES.toLowerCase()){
                    welcome.withImage = true;
                    return message.channel.send(message.language.get("WELCOME_FORM_COLOR"));
                }
                if(msg.content.toLowerCase() === message.language.get("UTILS").NO.toLowerCase()){
                    welcome.withImage = false;
                    message.channel.send(message.language.get("WELCOME_FORM_SUCCESS", welcome.channel, data.settings.prefix));
                    data.settings.plugins.welcome = welcome;
                    data.settings.markModified("plugins.welcome");
                    await data.settings.save();
                    return collector.stop();
                }
                return message.channel.send(message.language.get("ERR_YES_NO"));
            }

            if(welcome.withImage){
                if(msg.content.startsWith("#")){
                    let color = msg.content,
                    hexacolor = color.replace(/[^a-z0-9]/gi, "");
                    if(hexacolor.length === 6){
                        welcome.color.enabled = true;
                        welcome.color.color = "#"+hexacolor.toUpperCase();
                        message.channel.send(message.language.get("WELCOME_FORM_SUCCESS_COLOR", welcome.color.color, welcome.channel, data.settings.prefix));
                        data.settings.plugins.welcome = welcome;
                        data.settings.markModified("plugins.welcome");
                        await data.settings.save();
                        return collector.stop();
                    } else {
                        return message.channel.send(message.language.get("WELCOME_ERR_COLOR"));
                    }
                }
                if(msg.content === "white" || msg.content === "orange" || msg.content === "red" || msg.content === "blue" || msg.content === "green" || msg.content === "purple"){
                    welcome.color.enabled = true;
                    welcome.color.color = msg.content.toLowerCase();
                    message.channel.send(message.language.get("WELCOME_FORM_SUCCESS_COLOR", welcome.color.color, welcome.channel, data.settings.prefix));
                    data.settings.plugins.welcome = welcome;
                    data.settings.markModified("plugins.welcome");
                    await data.settings.save();
                    return collector.stop();
                } else {
                    return message.channel.send(message.language.get("WELCOME_ERR_COLOR"));
                }
            }
            
            if(welcome.channel && !welcome.message){
                if(msg.content.length < 1501){
                    welcome.message = msg.content;
                    return message.channel.send(message.language.get("WELCOME_FORM_IMAGE"));
                }
                return message.channel.send(message.language.get("WELCOME_ERR_CARACT"));
            }

            if(!welcome.channel){
                let channel = msg.mentions.channels.first();
                if(!channel){
                    return message.channel.send(message.language.get("ERR_INVALID_CHANNEL"));
                }
                if(channel.guild !== msg.guild){
                    return;
                }
                welcome.channel = channel.id;
                message.channel.send(message.language.get("WELCOME_FORM_MESSAGE", channel, message));
            }

        });

        // When the collector is stopped
        collector.on("end", (collected, reason) => {
            if(reason === "time"){
                return message.channel.send(message.language.get("WELCOME_ERR_TIMEOUT"));
            }
        });
    }

}

module.exports = Welcome;