const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Profile extends Command {

    constructor (client) {
        super(client, {
            name: "profile",
            description: (language) => language.get('PROFILE_DESCRIPTION'),
            dirname: __dirname,
            usage: "profile (@membre)",
            enabled: true,
            guildOnly: true,
            aliases: ["profil"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$profile\$profile @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the guildMember whose profile you want to display
        var member = message.mentions.members.size > 0 ? message.mentions.members.first() : message.member;

        // Check if the member is a bot
        if(member.user.bot) return message.channel.send(message.language.get('IS_A_BOT'));

        // Gets the data of the guildMember whose profile you want to display
        var member_data = (message.member === member) ? membersdata[0] : membersdata[1];
        
        // Check if the partner is cached 
        if(member_data.partner !== 'false' && !this.client.users.get(member_data.partner)) await this.client.fetchUser(member_data.partner);

        var profile_embed = new Discord.RichEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed)
            .setAuthor(message.language.get('PROFILE_HEADING', member.user.username), member.user.displayAvatarURL) // Sets the heading of the embed
            // if the member has a description, display them, else display "Aucune description enregistrée !"
            .setDescription(member_data.bio !== 'unknow' ? member_data.bio : message.language.get('NO_BIO'))
            // Display the username of the member
            .addField(message.language.get('PSEUDO'), member.user.username+'#'+member.user.discriminator, true)
            // Display the amount of credits of the member
            .addField(message.language.get('MONEY'), message.language.get('DISPLAY_CREDITS', member_data.credits), true)
            // Display the amount of reputation points of the member
            .addField(message.language.get('REP'), message.language.get('DISPLAY_REP', member_data.rep), true)
            // Display the creation date of the member
            .addField(message.language.get('REGISTERED_AT'), `${message.language.printDate(new Date(member_data.registeredAt))}`, true)
            // Display the level of the member
            .addField(message.language.get('LEVEL'), `**${member_data.level}**`, true)
            // Display the xp of the member
            .addField(message.language.get('EXP'), `**${member_data.xp}** xp`, true)
            // Display the birthdate of the member
            .addField(message.language.get('BIRTHDATE'), `${(member_data.birthdate === 'unknow') ? message.language.get('NO_BIRTHDATE') : message.language.printDate(new Date(member_data.birthdate))}`, true)
            // Whether the member is the founder of a guild which has Atlanta on it
            .addField(message.language.get('INVITER'), `${(this.client.guilds.some(g => g.ownerID === member.id)) ? message.language.get('YES') : message.language.get('NO')}`, true)
            // Display the member partner
            .addField(message.language.get('COUPLE'), `${member_data.partner === 'false' ? message.language.get('NO_PARTNER') : this.client.users.get(member_data.partner).username}`, true)
            // Display the badges of the member
            .addField(message.language.get('BADGES'), (member_data.badges.length > 0) ? '=> '+member_data.badges.map(b => b.str).join(' ') : message.language.get('NO_BADGE'))
            .setColor(data.embed.color) // Sets the color of the embed
            .setFooter(data.embed.footer) // Sets the footer of the embed
            .setTimestamp();

        message.channel.send(profile_embed); // Send the embed in the current channel
    }

}

module.exports = Profile;