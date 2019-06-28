const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Profile extends Command {

    constructor (client) {
        super(client, {
            name: "profile",
            description: (language) => language.get("PROFILE_DESCRIPTION"),
            usage: (language) => language.get("PROFILE_USAGE"),
            examples: (language) => language.get("PROFILE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "profil" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let _userData = message.client.databases[0].get(message.author.id);

        if(args[0] === "migrate"){
            if(!_userData){
                return message.react("❌");
            }
            let credits = _userData.credits;
            let rep = _userData.rep;
            let level = _userData.level;
            let xp = _userData.xp;
            let badges = _userData.badges;
            data.users[0].money = data.users[0].money + credits;
            data.users[0].rep = data.users[0].rep + rep;
            data.users[0].level = data.users[0].rep + rep;
            data.users[0].exp = data.users[0].exp + xp;
            badges.forEach((badge) => {
                badge.emoji = badge.str;
                delete badge.str;
                data.users[0].badges.push(badge);
            });
            data.users[0].save();
            message.client.databases[0].delete(message.author.id);
            return message.react("✅");
        }

        // Gets the user whose profile you want to display
        let user = (message.mentions.users.size > 0 ? message.mentions.users.first() : message.author);

        // Check if the user is a bot
        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        // Gets the data of the user whose profile you want to display
        let userData = (message.author === user) ? data.users[0] : data.users[1];
        
        // Check if the lover is cached 
        if(userData.lover && !message.client.users.get(userData.lover)){
            await message.client.users.fetch(userData.lover, true);
        }

        let profileEmbed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("PROFILE_TITLE", user.username), user.displayAvatarURL())
            .setDescription(userData.bio ? userData.bio : message.language.get("NO_BIO"))
            .addField(message.language.get("PROFILE_HEADINGS").PSEUDO, user.tag, true)
            .addField(message.language.get("PROFILE_HEADINGS").MONEY, message.language.get("DISPLAY_MONEY", userData.money), true)
            .addField(message.language.get("PROFILE_HEADINGS").REP, message.language.get("DISPLAY_REP", userData.rep), true)
            .addField(message.language.get("PROFILE_HEADINGS").REGISTERED_AT, message.language.printDate(new Date(userData.registeredAt)), true)
            .addField(message.language.get("PROFILE_HEADINGS").LEVEL, `**${userData.level}**`, true)
            .addField(message.language.get("PROFILE_HEADINGS").EXP, `**${userData.exp}** xp`, true)
            .addField(message.language.get("PROFILE_HEADINGS").BIRTHDATE, (!userData.birthdate ? message.language.get("NO_BIRTHDATE") : message.language.printDate(new Date(userData.birthdate))), true)
            .addField(message.language.get("PROFILE_HEADINGS").INVITER, (message.client.guilds.some((g) => g.ownerID === user.id) ? message.language.get("UTILS").YES : message.language.get("UTILS").NO), true)
            .addField(message.language.get("PROFILE_HEADINGS").MARRIED, (!userData.lover ? message.language.get("NO_PARTNER") : message.client.users.get(userData.lover).tag), true)
            .addField(message.language.get("PROFILE_HEADINGS").BADGES, (userData.badges.length > 0 ? "=> "+userData.badges.map((b) => b.emoji).join(" ") : message.language.get("NO_BADGE")))
            .setColor(data.config.embed.color) // Sets the color of the embed
            .setFooter(data.config.embed.footer) // Sets the footer of the embed
            .setTimestamp();

        let text = (_userData ? "Use `"+data.settings.prefix+"profile migrate` to migrate your old profile" : "");
        message.channel.send(text, profileEmbed); // Send the embed in the current channel
    }

}

module.exports = Profile;