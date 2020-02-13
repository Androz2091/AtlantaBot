const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Someone extends Command {

    constructor (client) {
        super(client, {
            name: "someone",
            description: (language) => language.get("SOMEONE_DESCRIPTION"),
            usage: (language) => language.get("SOMEONE_USAGE"),
            examples: (language) => language.get("SOMEONE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "somebody", "something" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 500
        });
    }

    async run (message, args, data) {
        
        let member = message.guild.members.random(1)[0];
        
        let embed = new Discord.MessageEmbed()
            .addField(message.language.get("SOMEONE_HEADINGS")[0], member.user.username, true)
            .addField(message.language.get("SOMEONE_HEADINGS")[1], member.user.discriminator, true)
            .addField(message.language.get("SOMEONE_HEADINGS")[2], member.user.id, true)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(data.config.embed.color);
        message.channel.send(embed);
        
    }

}

module.exports = Someone;