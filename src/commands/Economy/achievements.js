const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Achievements extends Command {

    constructor (client) {
        super(client, {
            name: "achievements",
            description: (language) => language.get("ACHIEVEMENTS_DESCRIPTION"),
            usage: (language) => language.get("ACHIEVEMENTS_USAGE"),
            examples: (language) => language.get("ACHIEVEMENTS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "ac" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.language.get("ACHIEVEMENTS_TITLE"))
        .setColor(data.config.embed.color)
        .setFooter(data.config.embed.footer);
        
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[0], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.firstCommand.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[1], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.work.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[2], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.married.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[3], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.slots.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[4], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.tip.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[5], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.rep.progress));
        embed.addField(message.language.get("ACHIEVEMENTS_DESC")[6], message.language.get("ACHIEVEMENTS_PROGRESS", data.userData.achievements.invite.progress));

        message.channel.send(embed);

    }

}

module.exports = Achievements;
