const Discord = require("discord.js"),
ms = require("ms");

module.exports = class Mod {

    constructor(client){
        this.client = client;
    }

    /**
     * Send a log embed in the logs channel
     * @param {object} guildData The guild data
     * @param {object} options The sanction options
     * @param {object} language The guild language
     */ 
    log(guildData, options, language){

        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .addField(language.get("MODLOGS_HEADINGS")[0], `\`${options.user.tag}\` (${options.user.toString()})`, true)
            .addField(language.get("MODLOGS_HEADINGS")[1], `\`${options.moderator.tag}\` (${options.moderator.toString()})`, true)
            .addField(language.get("MODLOGS_HEADINGS")[2], options.reason, true)
            .setFooter(this.client.config.embed.footer);

        switch(options.type){
            case "ban":
                embed.setAuthor(language.get("MODLOGS_TYPES").BAN.replace("{case}", guildData.cases.count+1))
                .setColor("#e02316");
                break;
            case "kick":
                embed.setAuthor(language.get("MODLOGS_TYPES").KICK.replace("{case}", guildData.cases.count+1))
                .setColor("#e88709");
                break;
            case "warn":
                embed.setAuthor(language.get("MODLOGS_TYPES").WARN.replace("{case}", guildData.cases.count+1))
                .setColor("#8c14e2");
                break;
            case "mute":
                embed.setAuthor(language.get("MODLOGS_TYPES").MUTE.replace("{case}", guildData.cases.count+1))
                .addField(language.get("MODLOGS_HEADINGS")[3], options.time, true)
                .addField(language.get("MODLOGS_HEADINGS")[4], language.printDate(new Date(Date.now()+ms(options.time)), true), true)
                .setColor("#f44271");
                break;
        }

        let channel = this.client.channels.get(guildData.plugins.modlogs);
        if(channel){
            channel.send(embed);
        }

    }

    /**
     * Update guild cases
     * @param {object} guildData The guild data
     * @param {object} options The sanction options
     */
    addCase(guildData, options){
        return new Promise(async function(resolve, reject){
            // Add one to guild cases
            guildData.cases.count = guildData.cases.count+1;

            // Save the case
            guildData.cases.list.push({
                case: guildData.cases.count,
                type: options.type,
                user: options.user.id,
                moderator: options.moderator.id,
                date: options.date,
                channel: options.channel.id,
                time: options.time,
                reason: options.reason
            });

            guildData.markModified("cases");
            await guildData.save();
            resolve(guildData);
        });
    }

    /**
     * Fetch user sanctions
     * @param {object} guildData The guild data
     * @param {object} userID The ID of the user to fetch
     * @param {object} embed The embed to return
     * @param {object} language The language of the guild
     * @returns The user sanctions
     */
    async fetchUserSanctions(guildData, userID, embed, language){
        let sanctions = guildData.cases.list.filter((c) => c.user === userID);
        if(sanctions.length < 1){
            return false;
        }
        sanctions.forEach((sanction) => {
            let title = language.get("MODLOGS_TYPES")[sanction.type.toUpperCase()].replace("{case}", sanction.case);
            let content = 
            "**"+language.get("MODLOGS_HEADINGS")[1]+"**: <@"+sanction.moderator+">\n"+
            "**"+language.get("MODLOGS_HEADINGS")[2]+"**: `"+sanction.reason+"`\n";
            embed.addField(title, content, true);
        });
        return embed;
    }

}