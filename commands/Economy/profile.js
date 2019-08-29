const Command = require("../../base/Command.js"),
Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


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

        let client = this.client;

        let member = await client.resolveMember(args[0], message.guild);
        if(!member) member = message.member;

        // Check if the user is a bot
        if(member.user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        // Gets the data of the user whose profile you want to display
        let memberData = (member.id === message.author.id ? data.memberData : await client.findOrCreateMember({ id: member.id, guildID: message.guild.id}));
        let userData = (member.id === message.author.id ? data.userData : await client.findOrCreateUser({ id: member.id }));

        // Check if the lover is cached 
        if(userData.lover && !message.client.users.get(userData.lover)){
            await message.client.users.fetch(userData.lover, true);
        }

        let commonsGuilds = client.guilds.filter((g) => g.members.get(member.id));
        let globalMoney = 0;
        await asyncForEach(commonsGuilds.array(), async (guild) => {
            let memberData = await client.findOrCreateMember({ id: member.id, guildID: guild.id });
            globalMoney+=memberData.money;
        });

        let profileEmbed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("PROFILE_TITLE", member.user.tag), member.user.displayAvatarURL())
            .setDescription(userData.bio ? userData.bio : message.language.get("NO_BIO"))
            .addField(message.language.get("PROFILE_HEADINGS").MONEY, message.language.get("DISPLAY_MONEY", memberData.money), true)
            .addField(message.language.get("PROFILE_HEADINGS").BANK, message.language.get("DISPLAY_MONEY", memberData.bankSold), true)
            .addField(message.language.get("PROFILE_HEADINGS").GLOBAL_MONEY, message.language.get("DISPLAY_MONEY", globalMoney), true)
            .addField(message.language.get("PROFILE_HEADINGS").REP, message.language.get("DISPLAY_REP", userData.rep), true)
            .addField(message.language.get("PROFILE_HEADINGS").LEVEL, `**${memberData.level}**`, true)
            .addField(message.language.get("PROFILE_HEADINGS").EXP, `**${memberData.exp}** xp`, true)
            .addField(message.language.get("PROFILE_HEADINGS").REGISTERED_AT, message.language.printDate(new Date(memberData.registeredAt)), true)
            .addField(message.language.get("PROFILE_HEADINGS").BIRTHDATE, (!userData.birthdate ? message.language.get("NO_BIRTHDATE") : message.language.printDate(new Date(userData.birthdate))), true)
            .addField(message.language.get("PROFILE_HEADINGS").MARRIED, (!userData.lover ? message.language.get("NO_PARTNER") : message.client.users.get(userData.lover).tag), true)
            .addField(message.language.get("PROFILE_HEADINGS").BADGES, (userData.badges.length > 0 ? "=> "+userData.badges.map((b) => b.emoji).join(" ") : message.language.get("NO_BADGE")))
            .setColor(data.config.embed.color) // Sets the color of the embed
            .setFooter(data.config.embed.footer) // Sets the footer of the embed
            .setTimestamp();

        message.channel.send(profileEmbed); // Send the embed in the current channel
    }

}

module.exports = Profile;