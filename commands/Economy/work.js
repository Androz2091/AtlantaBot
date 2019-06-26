const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Work extends Command {

    constructor (client) {
        super(client, {
            name: "work",
            description: (language) => language.get("WORK_DESCRIPTION"),
            usage: (language) => language.get("WORK_USAGE"),
            examples: (language) => language.get("WORK_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "salaire", "salary", "travail" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        // if the member is already in the cooldown db
        let isInCooldown = data.users[0].cooldowns.work;
        if(isInCooldown){
            /*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
            if(isInCooldown > Date.now()){
                return message.channel.send(message.language.get("WORK_COOLDOWN", message.language.convertMs(isInCooldown - Date.now())));
            }
        }

        // Records in the database the time when the member will be able to execute the command again (in 12 hours)
        let toWait = Date.now() + 43200000;
        data.users[0].cooldowns.work = toWait;

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("SALARY_CLAIMED_TITLE"), message.author.displayAvatarURL())
            .setDescription( message.language.get("SALARY_CLAIMED_CONTENT"))
            .setFooter(data.config.embed.footer)
            .setColor(data.config.embed.color)
            .setTimestamp();

        data.users[0].money = data.users[0].money + 200;
        data.users[0].save();

        // Send the embed in the current channel
        message.channel.send(embed);

    }

}

module.exports = Work;