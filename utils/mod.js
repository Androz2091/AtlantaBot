const Discord = require("discord.js");

module.exports = class {

    constructor(client){
        this.client = client;
    }

    /**
     * Send a log embed in the logs channel
     * @param {object} settings The guild settings
     * @param {object} options The sanction options
     * @param {object} language The guild language
     */ 
    log(settings, options, language){

        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .addField(language.get("MODLOGS_HEADINGS")[0], `\`${options.user.tag}\` (${options.user.toString()})`, true)
            .addField(language.get("MODLOGS_HEADINGS")[1], `\`${options.moderator.tag}\` (${options.moderator.toString()})`, true)
            .addField(language.get("MODLOGS_HEADINGS")[2], options.reason, true)
            .setFooter(this.client.config.embed.footer);

        switch(options.type){
            case "ban":
                embed.setAuthor(language.get("MODLOGS_TYPES").BAN.replace("{case}", settings.cases.count+1))
                .setColor("#e02316");
                break;
            case "kick":
                embed.setAuthor(language.get("MODLOGS_TYPES").KICK.replace("{case}", settings.cases.count+1))
                .setColor("#e88709");
                break;
            case "warn":
                embed.setAuthor(language.get("MODLOGS_TYPES").WARN.replace("{case}", settings.cases.count+1))
                .setColor("#8c14e2");
                break;
            case "mute":
                embed.setAuthor(language.get("MODLOGS_TYPES").MUTE.replace("{case}", settings.cases.count+1))
                .setColor("#f44271");
                break;
            case "unmute":
                embed.setAuthor(language.get("MODLOGS_TYPES").UNMUTE.replace("{case}", settings.cases.count+1))
                .setColor("#f44271");
                break;
        }

        let channel = this.client.channels.get(settings.plugins.modlogs);
        if(channel){
            channel.send(embed);
        }

    }

    /**
     * Update guild cases
     * @param {object} settings The guild settings
     * @param {object} options The sanction options
     */
    addCase(settings, options){
        
        // Add one to guild cases
        settings.cases.count = settings.cases.count+1;

        // Save the case
        settings.cases.list.push({
            case: settings.cases.count,
            type: options.type,
            moderator: options.moderator,
            date: options.date,
            channel: options.channel,
            time: options.time,
            reason: options.reason
        });

        settings.markModified("cases");
        settings.save();

    }

    /**
     * Fetch user sanctions
     * @param {object} settings The guild settings
     * @param {object} userID The ID of the user to fetch
     * @returns The user sanctions
     */
    fetchUserSanctions(settins, userID){
        
    }

}